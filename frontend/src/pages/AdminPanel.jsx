import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import { getUsers, getUserCount, deleteUser, banUser, updateAdminProfile } from '../api';
import { Users, UserX, ShieldAlert, Trash2, Settings, Mail, Lock, Save, LogOut } from 'lucide-react';

export default function AdminPanel() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [banningId, setBanningId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const fetchAdminData = async () => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const clerkToken = await getToken();
      const token = adminToken || clerkToken;
      
      if (!token) return;

      const [usersRes, countRes] = await Promise.all([
        getUsers(token),
        getUserCount(token)
      ]);

      setUsers(usersRes.data);
      setCount(countRes.data.count);
    } catch (err) {
      toast.error('Failed to fetch admin data');
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const clerkToken = await getToken();
      const token = adminToken || clerkToken;
      await deleteUser(id, token);
      toast.success('User deleted successfully');
      setDeletingId(null);
      fetchAdminData();
    } catch (err) {
      toast.error('Failed to delete user');
      console.error('Failed to delete user', err);
    }
  };

  const handleBanUser = async (id) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const clerkToken = await getToken();
      const token = adminToken || clerkToken;
      await banUser(id, token);
      toast.success('User status updated');
      setBanningId(null);
      fetchAdminData();
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Failed to ban user', err);
    }
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const adminToken = localStorage.getItem('admin_token');
      const clerkToken = await getToken();
      const token = adminToken || clerkToken;
      
      await updateAdminProfile({ email: newEmail, password: newPassword }, token);
      toast.success('Admin profile updated');
      setNewPassword('');
      setShowSettings(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out');
    window.location.href = '/admin-login';
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Admin Panel...</div>;
  }

  return (
    <div className="fade-in-up">
      <Modal 
        isOpen={!!deletingId} 
        onClose={() => setDeletingId(null)} 
        onConfirm={() => handleDeleteUser(deletingId)}
        title="Delete User"
        message="Permanently remove this user? This cannot be undone."
      />
      <Modal 
        isOpen={!!banningId} 
        onClose={() => setBanningId(null)} 
        onConfirm={() => handleBanUser(banningId)}
        title="Account Status"
        message="Are you sure you want to change this user's account status?"
      />

      <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldAlert size={32} style={{ color: 'var(--primary-color)' }} /> Admin Dashboard
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-sm" onClick={() => setShowSettings(!showSettings)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={18} /> Settings
          </button>
          <button className="btn btn-sm" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </h2>

      {showSettings && (
        <div className="card fade-in-up" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} /> Admin Account Settings
          </h3>
          <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Mail size={14} /> New Email (Optional)
              </label>
              <input 
                type="email" 
                placeholder="new@email.com" 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Lock size={14} /> New Password
              </label>
              <input 
                type="password" 
                placeholder="Min. 8 characters" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Save size={18} /> Save Changes
            </button>
          </form>
        </div>
      )}

      <div className="card" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 2.5rem' }}>
        <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '1.25rem', borderRadius: '1rem' }}>
          <Users size={32} style={{ color: 'var(--primary-color)' }} />
        </div>
        <div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Users</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '800' }}>{count}</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Identity</th>
              <th>Privileges</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.id}</td>
                <td>
                  <div style={{ fontWeight: '600' }}>{u.email}</div>
                </td>
                <td>
                  <span style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    backgroundColor: u.role === 'admin' ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface-lighter)',
                    color: u.role === 'admin' ? 'var(--primary-color)' : 'var(--text-muted)'
                  }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: u.banned ? '#ef4444' : '#10b981' }}></div>
                    <span style={{ color: u.banned ? '#ef4444' : '#10b981', fontWeight: '600', fontSize: '0.875rem' }}>
                      {u.banned ? 'Banned' : 'Active'}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-sm"
                      onClick={() => setBanningId(u.id)}
                      disabled={u.banned || u.role === 'admin'}
                      style={{
                        backgroundColor: u.banned ? 'var(--surface-color)' : 'rgba(245, 158, 11, 0.1)',
                        color: u.banned ? 'var(--text-muted)' : '#f59e0b',
                        opacity: u.banned || u.role === 'admin' ? 0.5 : 1,
                        cursor: u.banned || u.role === 'admin' ? 'not-allowed' : 'pointer'
                      }}
                      title="Ban User"
                    >
                      <UserX size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setDeletingId(u.id)}
                      disabled={u.role === 'admin'}
                      style={{
                        opacity: u.role === 'admin' ? 0.5 : 1,
                        cursor: u.role === 'admin' ? 'not-allowed' : 'pointer',
                        padding: '0.5rem'
                      }}
                      title="Delete User"
                    >
                      <Trash2 size={16} />
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
