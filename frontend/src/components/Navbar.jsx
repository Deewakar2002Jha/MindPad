import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserButton, Show, useUser } from '@clerk/react';
import { Menu, X, Search as SearchIcon } from 'lucide-react';

export default function Navbar({ isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const query = e.target.value;
    if (location.pathname !== '/dashboard') {
      navigate(`/dashboard?search=${encodeURIComponent(query)}`);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('search', query);
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  };

  return (
    <nav className="nav-bar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo" style={{ zIndex: 2000 }}>
          <span style={{ color: 'var(--primary-color)' }}>●</span> MindPad
        </Link>

        {isSignedIn && !isAdmin && (
          <div className="nav-search">
            <SearchIcon className="nav-search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              onChange={handleSearch}
              defaultValue={new URLSearchParams(location.search).get('search') || ''}
            />
          </div>
        )}

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {!isAdmin && (
            <>
              <Link to="/features" className="nav-link" onClick={() => setIsOpen(false)}>Features</Link>
              <Link to="/pricing" className="nav-link" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link to="/docs" className="nav-link" onClick={() => setIsOpen(false)}>Docs</Link>
              <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>Blog</Link>
            </>
          )}
          
          <Show when="signed-out">
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>Get Started</Link>
          </Show>
          <Show when="signed-in">
            {isAdmin ? (
              <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>Admin Panel</Link>
            ) : (
              <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </Show>
        </div>
      </div>
    </nav>
  );
}
