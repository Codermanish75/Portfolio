import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 2rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)',
        marginBottom: '0.5rem'
      }}>
        <span style={{ color: 'var(--accent)' }}>&lt;</span>
        Manish Singh
        <span style={{ color: 'var(--accent)' }}> /&gt;</span>
        {' '}— AI/ML Engineer & Full-Stack Developer
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', opacity: 0.5 }}>
        Built with React + Vite + Three.js · {new Date().getFullYear()}
      </div>
    </footer>
  )
}
