import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminLogin } from '../api';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminLogin({ email, password });
      localStorage.setItem('admin_token', data.token);
      toast.success('Admin access granted');
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid credentials');
      console.error('Admin Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '5rem' }}>
      <div className="card fade-in-up" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            backgroundColor: 'rgba(99, 102, 241, 0.1)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <ShieldCheck size={32} style={{ color: 'var(--primary-color)' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Admin Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Access the management console</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              placeholder="admin@mindpad.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
