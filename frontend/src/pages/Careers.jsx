import { Link } from 'react-router-dom';

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      description: 'Join our team of developers in building the most beautiful note-taking app on the planet.'
    },
    {
      title: 'UX/UI Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Design',
      description: 'Help us design user-centric interfaces and experiences for MindPad users.'
    },
    {
      title: 'Marketing Manager',
      type: 'Full-time',
      location: 'Remote',
      department: 'Marketing',
      description: 'We are looking for a marketing leader with experience in SaaS products.'
    }
  ];

  return (
    <div className="careers-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Join MindPad
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              We're a remote-first team of 20+ people building tools to help people organized their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3">
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Remote First</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Work from anywhere in the world.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Ownership</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We empower everyone to be a leader.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Growth</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Learn and grow with our team.</p>
            </div>
          </div>

          <div style={{ marginTop: '6rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Open Positions</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {jobs.map((job, idx) => (
                <div key={idx} className="feature-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-color)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>{job.type}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{job.department} • {job.location}</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-color)' }}>{job.description}</p>
                  </div>
                  <button className="btn btn-outline" style={{ minWidth: '150px' }}>Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
