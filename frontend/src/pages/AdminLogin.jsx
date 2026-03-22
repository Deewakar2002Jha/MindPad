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
    <div className="container" style={{ 
      maxWidth: '440px', 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className="card fade-in-up" style={{ 
        padding: '3rem', 
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        borderRadius: '1.5rem',
        border: '1px solid var(--surface-lighter)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            backgroundColor: 'rgba(99, 102, 241, 0.1)', 
            width: '72px', 
            height: '72px', 
            borderRadius: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.1)'
          }}>
            <ShieldCheck size={36} style={{ color: 'var(--primary-color)' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure management access</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              placeholder="admin@mindpad.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--surface-lighter)',
                backgroundColor: 'var(--surface-color)',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--surface-lighter)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--surface-lighter)',
                backgroundColor: 'var(--surface-color)',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--surface-lighter)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '0.75rem',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? 'Verifying...' : 'Access Admin Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
