import React, { useState, useEffect } from 'react'

const links = ['About', 'Skills', 'Projects', 'Certifications', 'Education', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 2.5rem',
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <a href="#" style={{
        fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 500,
        color: 'var(--accent)', letterSpacing: '0.05em'
      }}>
        &lt;MS /&gt;
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.08em',
            textTransform: 'uppercase', transition: 'color 0.2s', fontWeight: 500
          }}
          onMouseEnter={e => e.target.style.color = 'var(--accent)'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >
            {l}
          </a>
        ))}
        <a href="mailto:officialmanish7518@gmail.com" style={{
          padding: '0.5rem 1.25rem', borderRadius: '100px',
          border: '1px solid var(--accent)', color: 'var(--accent)',
          fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.05em',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#000' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)' }}
        >
          Hire Me
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', flexDirection: 'column', gap: '5px',
        padding: '4px'
      }} className="hamburger">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 24, height: 2,
            background: 'var(--accent)', borderRadius: 2,
            transition: 'all 0.3s'
          }} />
        ))}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
