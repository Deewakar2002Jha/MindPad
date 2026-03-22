import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { getNotes, createNote, updateNote, deleteNote } from '../api';
import { Trash2, Edit3, Plus, X } from 'lucide-react';

export default function Dashboard() {
  const { getToken } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await getNotes(token);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;

    try {
      const token = await getToken();
      if (editingId) {
        await updateNote(editingId, { title, body }, token);
      } else {
        await createNote({ title, body }, token);
      }

      setTitle('');
      setBody('');
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      const token = await getToken();
      await deleteNote(id, token);
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  const cancelEdit = () => {
    setTitle('');
    setBody('');
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="page-title">My Notes</h2>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
          {editingId ? 'Edit Note' : 'Create New Note'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Title</label>
            <input
              className="input-field"
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Content</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="What's heavily on your mind?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ resize: 'vertical' }}
              required
            ></textarea>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? <><Edit3 size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Update Note</> : <><Plus size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Add Note</>}
            </button>
            {editingId && (
              <button type="button" className="btn" style={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }} onClick={cancelEdit}>
                <X size={16} style={{ marginRight: '0.5rem' }} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading notes...</div>
      ) : notes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--surface-color)', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
          You don't have any notes yet. Create your first note above!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {notes.map(note => (
            <div key={note._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{note.title}</h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1, whiteSpace: 'pre-wrap' }}>{note.body}</p>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button onClick={() => handleEdit(note)} className="btn" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)' }}>
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(note._id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
