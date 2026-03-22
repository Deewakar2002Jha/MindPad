import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals starting their journey.',
      features: ['Up to 100 Notes', 'Basic Formatting', 'Mobile & Web Support', 'Standard Security']
    },
    {
      name: 'Pro',
      price: '499',
      description: 'For power users who want more control and power.',
      features: ['Unlimited Notes', 'Premium Markdown Support', 'Priority Sync', 'Enhanced Security', 'Collaboration Tools'],
      popular: true
    },
    {
      name: 'Team',
      price: '999',
      description: 'Ideal for small teams and collaborators.',
      features: ['Everything in Pro', 'Unlimited Team Members', 'Admin Controls', 'Shared Workspaces', 'API Access']
    }
  ];

  return (
    <div className="pricing-page fade-in-up">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #020617 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Choose Your Plan
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto' }}>
              From individuals to growing teams, we have a plan that fits your needs.
              Start for free and upgrade whenever you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3" style={{ gap: '2rem' }}>
            {plans.map((plan, idx) => (
              <div key={idx} className={`feature-card ${plan.popular ? 'popular' : ''}`} style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                position: 'relative',
                border: plan.popular ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                zIndex: plan.popular ? 2 : 1
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary-color)',
                    color: '#fff',
                    padding: '0.25rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{plan.name}</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800 }}>₹{plan.price}</span>
                  <span style={{ color: 'var(--text-muted)' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>{plan.description}</p>
                <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--primary-color)' }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/register" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', padding: '1rem' }}>
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '6rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>Have a larger team? <Link to="/contact" style={{ fontWeight: 600 }}>Contact Sales</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}
