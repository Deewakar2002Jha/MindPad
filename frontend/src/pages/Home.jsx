import { Link } from 'react-router-dom';
import { Show } from '@clerk/react';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero fade-in-up">
        <div className="container">
          <div className="hero-badge" style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '2rem', 
            fontSize: '0.875rem', 
            color: 'var(--primary-color)',
            fontWeight: '600',
            marginBottom: '1.5rem',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            ✨ New: Collaborative Notebooks
          </div>
          <h1 className="hero-title">
            Your Thoughts, <br /> 
            <span style={{ color: 'var(--primary-color)' }}>Organized</span>
          </h1>
          <p className="hero-subtitle">
            Capture ideas, organize notes, and boost your productivity with MindPad. 
            The most elegant note-taking app designed for modern thinkers.
          </p>
          <div className="hero-cta">
            <Show when="signed-out">
              <Link to="/register" className="btn btn-primary">Start Writing for Free</Link>
              <Link to="/#features" className="btn btn-outline">Explore Features</Link>
            </Show>
            <Show when="signed-in">
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            </Show>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.7 }}>
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: '800' }}>10k+</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Users</div>
        </div>
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: '800' }}>1M+</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Notes Created</div>
        </div>
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: '800' }}>4.9/5</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>User Rating</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Everything you need to <br/> stay <span style={{ color: 'var(--primary-color)' }}>organized</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Rich Text Editing</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Format your notes with Markdown support and beautiful typography.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Sync</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Your notes are always with you, synced across all your devices.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                End-to-end encryption ensures your thoughts stay your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--surface-color)', borderRadius: '2rem', margin: '4rem auto', maxWidth: '1000px' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to declutter your mind?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Join thousands of users who are already organizing their life with MindPad.
          </p>
          <Show when="signed-out">
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Create Your Free Account</Link>
          </Show>
          <Show when="signed-in">
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>View Your Notes</Link>
          </Show>
        </div>
      </section>
    </div>
  );
}
