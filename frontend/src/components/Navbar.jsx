import { Link } from 'react-router-dom';
import { UserButton, Show } from '@clerk/react';

export default function Navbar({ isAdmin }) {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Notify
      </Link>

      <div className="nav-links">
        <Show when="signed-out">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </Show>
        <Show when="signed-in">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          {isAdmin && <Link to="/admin" className="nav-link">Admin Panel</Link>}
          <UserButton afterSignOutUrl="/" />
        </Show>
      </div>
    </nav>
  );
}
