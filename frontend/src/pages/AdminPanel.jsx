import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { getUsers, getUserCount, deleteUser, banUser } from '../api';
import { Users, UserX, ShieldAlert } from 'lucide-react';

export default function AdminPanel() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const [usersRes, countRes] = await Promise.all([
        getUsers(token),
        getUserCount(token)
      ]);

      setUsers(usersRes.data);
      setCount(countRes.data.count);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you absolutely sure you want to delete this user? This action cannot be undone.')) return;
    try {
      const token = await getToken();
      await deleteUser(id, token);
      fetchAdminData(); // Refresh list
    } catch (err) {
      console.error('Failed to delete user', err);
      alert('Failed to delete user. Check console for details.');
    }
  };

  const handleBanUser = async (id) => {
    if (!confirm('Are you sure you want to ban this user?')) return;
    try {
      const token = await getToken();
      await banUser(id, token);
      fetchAdminData(); // Refresh list
    } catch (err) {
      console.error('Failed to ban user', err);
      alert('Failed to ban user. Check console for details.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading Admin Panel...</div>;
  }

  return (
    <div>
      <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ShieldAlert size={32} color="var(--primary-color)" /> Admin Dashboard
      </h2>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%' }}>
          <Users size={32} color="var(--primary-color)" />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{u.id}</td>
                <td style={{ fontWeight: '500' }}>{u.email}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: u.role === 'admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                    color: u.role === 'admin' ? 'var(--primary-color)' : 'var(--text-muted)'
                  }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  {u.banned ? (
                    <span style={{ color: 'var(--danger-color)', fontWeight: '600', fontSize: '0.875rem' }}>Banned</span>
                  ) : (
                    <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.875rem' }}>Active</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn"
                      onClick={() => handleBanUser(u.id)}
                      disabled={u.banned || u.role === 'admin'}
                      style={{
                        backgroundColor: u.banned ? 'var(--surface-color)' : 'rgba(245, 158, 11, 0.1)',
                        color: u.banned ? 'var(--text-muted)' : 'var(--warn-color)',
                        opacity: u.banned || u.role === 'admin' ? 0.5 : 1,
                        cursor: u.banned || u.role === 'admin' ? 'not-allowed' : 'pointer',
                        padding: '0.5rem'
                      }}
                      title="Ban User"
                    >
                      <UserX size={16} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(u.id)}
                      disabled={u.role === 'admin'}
                      style={{
                        opacity: u.role === 'admin' ? 0.5 : 1,
                        cursor: u.role === 'admin' ? 'not-allowed' : 'pointer',
                        padding: '0.5rem'
                      }}
                      title="Delete User"
                    >
                      <UserX size={16} /> {/* Can use a different icon like Trash2 but UserX works */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
