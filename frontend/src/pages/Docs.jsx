import { Link } from 'react-router-dom';

export default function Docs() {
  const sections = [
    {
      title: 'Getting Started',
      icon: '🚀',
      content: 'Learn how to get up and running with MindPad in minutes, including creating your first note.'
    },
    {
      title: 'Note Management',
      icon: '📁',
      content: 'Tips for organizing your notes with tags, folders, and powerful searching.'
    },
    {
      title: 'Markdown Guide',
      icon: '📝',
      content: 'A comprehensive guide to all the Markdown features we support for formatting your notes.'
    },
    {
      title: 'Collaborative Work',
      icon: '👥',
      content: 'How to share your notes with your team and collaborate on ideas in real-time.'
    },
    {
      title: 'Account Settings',
      icon: '⚙️',
      content: 'Managing your profile, notification settings, and personalizing your dashboard.'
    },
    {
      title: 'Keyboard Shortcuts',
      icon: '⌨️',
      content: 'Increase your productivity with our power-user shortcuts for faster note-taking.'
    }
  ];

  return (
    <div className="docs-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Documentation Center
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Find detailed guides, resources, and help for everything MindPad.
            </p>
            <div style={{ marginTop: '3rem', maxWidth: '600px', margin: '3rem auto 0' }}>
              <input type="text" placeholder="Search for help..." style={{ width: '100%', padding: '1rem 1.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', fontSize: '1rem', boxShadow: 'var(--shadow-lg)' }} />
            </div>
          </div>

          <div className="grid md:grid-cols-2" style={{ gap: '2rem' }}>
            {sections.map((s, idx) => (
              <div key={idx} className="feature-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '2.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {s.content}
                  </p>
                  <Link to="#" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)' }}>Learn More →</Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '6rem', padding: '4rem', background: 'var(--surface-color)', borderRadius: '3rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Still need help?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Our support team is always ready to assist you with any questions.</p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button className="btn btn-primary">Mail Support</button>
              <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span>📖</span> Community Docs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
