export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', padding: '60px 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="/logo.png" alt="Muscle Ocean Logo" style={{ height: '80px' }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
        <a href="https://www.instagram.com/flexwithhunny/?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', textDecoration: 'none', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px', transition: '0.3s' }} className="social-link">
          Instagram
        </a>
      </div>
      
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', color: 'var(--light)', fontSize: '0.9rem', flexWrap: 'wrap', gap: '20px' }}>
        <p>&copy; 2026 Muscle Ocean Gym. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
