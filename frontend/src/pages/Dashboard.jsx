import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import { getNotes, createNote, updateNote, deleteNote } from '../api';
import { Trash2, Edit3, Plus, X } from 'lucide-react';

export default function Dashboard() {
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const fetchNotes = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await getNotes(token);
      setNotes(res.data);
    } catch (err) {
      toast.error('Failed to load notes');
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
        toast.success('Note updated successfully');
      } else {
        await createNote({ title, body }, token);
        toast.success('Note created successfully');
      }

      setTitle('');
      setBody('');
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      toast.error('Failed to save note');
      console.error('Failed to save note', err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await deleteNote(id, token);
      toast.success('Note deleted successfully');
      setDeletingId(null);
      fetchNotes();
    } catch (err) {
      toast.error('Failed to delete note');
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
      <Modal 
        isOpen={!!deletingId} 
        onClose={() => setDeletingId(null)} 
        onConfirm={() => handleDelete(deletingId)}
        title="Delete Note"
        message="Are you sure you want to permanently delete this note? This action cannot be undone."
      />
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
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? <><Edit3 size={14} className="mr-2" /> Update Note</> : <><Plus size={14} className="mr-2" /> Add Note</>}
            </button>
            {editingId && (
              <button type="button" className="btn btn-sm" style={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }} onClick={cancelEdit}>
                <X size={14} style={{ marginRight: '0.4rem' }} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--surface-color)', borderRadius: '1.5rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
          {searchQuery 
            ? `No notes matching "${searchQuery}" found.`
            : "You don't have any notes yet. Create your first note above!"}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map(note => (
            <div key={note._id} className="card note-card">
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{note.title}</h4>
              <p className="line-clamp-3" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1, whiteSpace: 'pre-wrap' }}>{note.body}</p>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button onClick={() => handleEdit(note)} className="btn" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)' }}>
                  <Edit3 size={16} />
                </button>
                <button onClick={() => setDeletingId(note._id)} className="btn" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
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
