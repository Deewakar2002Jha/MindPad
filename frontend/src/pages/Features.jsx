import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      title: 'Smart Organization',
      icon: '🧠',
      description: 'Auto-categorize your notes and find what you need with tagging and powerful search.'
    },
    {
      title: 'Real-time Collaboration',
      icon: '👥',
      description: 'Work together with your team in real-time, sharing thoughts and capturing ideas.'
    },
    {
      title: 'Markdown Powered',
      icon: '📝',
      description: 'Full markdown support for distraction-free writing and beautiful documentation.'
    },
    {
      title: 'Cross-platform Sync',
      icon: '🔄',
      description: 'Access your notes anywhere, anytime with automatic synchronization and offline support.'
    },
    {
      title: 'Encrypted Security',
      icon: '🔒',
      description: 'End-to-end encryption ensures your private thoughts stay private and secure.'
    },
    {
      title: 'Dark & Light Mode',
      icon: '🌗',
      description: 'Switch between modes to suit your working environment and preferences.'
    }
  ];

  return (
    <div className="features-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Built for Modern Thinkers
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Discover everything you need to capture, organize, and share your ideas.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{f.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '6rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to experience it?</h2>
            <Link to="/register" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
              Create Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
