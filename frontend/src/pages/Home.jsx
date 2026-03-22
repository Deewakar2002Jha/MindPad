import { Link } from 'react-router-dom';
import { Show } from '@clerk/react';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '6rem' }}>
      <h1 className="page-title" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        Capture Your Ideas
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
        A beautiful, simple, and secure notes application for organizing your thoughts. Full-stack power, right at your fingertips.
      </p>

      <Show when="signed-in">
        <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
          Go To Dashboard
        </Link>
      </Show>

      <Show when="signed-out">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
            Get Started
          </Link>
          <Link to="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.25rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
            Login
          </Link>
        </div>
      </Show>
    </div>
  );
}
