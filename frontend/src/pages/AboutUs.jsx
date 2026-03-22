import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-us-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Mission
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              We believe that ideas are the most valuable currency. Our mission is to provide 
              the best digital vellum for your thoughts to flourish.
            </p>
          </div>

          <div className="grid md:grid-cols-2" style={{ alignItems: 'center', marginBottom: '6rem' }}>
            <div style={{ paddingRight: '1rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Who We Are</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                MindPad was founded by a group of passionate thinkers, designers, and developers 
                who were tired of cluttered and complex note-taking apps. We wanted something 
                simple yet powerful, beautiful yet functional.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Based in San Francisco, we are a fully remote team dedicated to building 
                tools that help you capture life's fleeting moments of inspiration.
              </p>
            </div>
            <div style={{ background: 'var(--surface-color)', borderRadius: '2rem', padding: '3rem', border: '1px solid var(--border-color)', textAlign: 'center', marginTop: '2rem' }} className="md:mt-0">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Growing Fast</h3>
              <p style={{ color: 'var(--text-muted)' }}>Joined by 500k+ users in just 2 years.</p>
            </div>
          </div>

          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Our Core Values</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>Simplicity</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  We believe in removing friction, not adding features just for the sake of it.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3>Privacy</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Your notes are private by default. We never sell your data or compromise your security.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Craftsmanship</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Every pixel, line of code, and word is chosen with intention and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section placeholder */}
      <section className="section" style={{ background: 'var(--surface-color)', borderRadius: '3rem', margin: '4rem 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>The Team Behind MindPad</h2>
          <div className="grid md:grid-cols-3" style={{ gap: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="card" style={{ padding: '2rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--surface-lighter)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👤</div>
                <h4 style={{ fontSize: '1.25rem' }}>Team Member {i}</h4>
                <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem' }}>Co-Founder & Developer</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
