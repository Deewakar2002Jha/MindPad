import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    {
      title: 'How to Organize Your Thoughts with MindPad',
      excerpt: 'Discover our top tips for capturing and organizing your ideas more efficiently in MindPad.',
      author: 'Deewakar Jha',
      date: 'Dec 12, 2024',
      category: 'Productivity',
      icon: '🧠'
    },
    {
      title: 'The Future of Note-Taking',
      excerpt: 'How AI and decentralized apps are shaping the way we write and share our thoughts.',
      author: 'Jane Doe',
      date: 'Jan 5, 2025',
      category: 'Insights',
      icon: '🚀'
    },
    {
      title: 'Best Productivity Apps for 2025',
      excerpt: 'Our curated list of tools to help you stay focused and achieve more this year.',
      author: 'John Smith',
      date: 'Feb 15, 2025',
      category: 'Review',
      icon: '⚡'
    }
  ];

  return (
    <div className="blog-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              The MindPad Blog
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              Insights into productivity, organizing thoughts, and the future of note-taking.
            </p>
          </div>

          <div className="grid md:grid-cols-3" style={{ gap: '2rem' }}>
            {posts.map((post, idx) => (
              <div key={idx} className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{post.icon}</div>
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-color)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', flex: 1 }}>{post.excerpt}</p>
                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>By {post.author}</span>
                  <Link to="#" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>Read More →</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '5rem' }}>
            <div style={{ padding: '3rem', background: 'var(--surface-color)', borderRadius: '2rem', border: '1px solid var(--border-color)', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Subscribe to our newsletter</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Get the latest productivity tips and product updates delivered to your inbox.</p>
              <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                <input type="email" placeholder="you@email.com" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '0.75rem 1.25rem', color: '#fff', flex: 1, outline: 'none' }} />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
