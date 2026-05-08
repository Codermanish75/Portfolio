import React from 'react'
import { useInView } from 'react-intersection-observer'

const certs = [
  {
    issuer: 'IBM',
    name: 'Introduction to Artificial Intelligence (AI)',
    detail: 'Hands-on experience with Machine Learning, Neural Networks, and NLP. Built AI models using Python & IBM Watson.',
    accent: '#00a1f1',
    badge: 'IBM'
  },
  {
    issuer: 'University of Michigan',
    name: 'Python Basics',
    detail: 'Proficient in Python syntax, data types, loops, functions, lists, dictionaries, and conditionals.',
    accent: '#ffcb05',
    badge: 'UMich'
  }
]

export default function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section id="certifications" style={{
      padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div ref={ref} style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
        transition: 'all 0.7s ease', marginBottom: '4rem', textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          04 / Certifications
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Verified Credentials
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {certs.map((cert, i) => {
          const { ref: cRef, inView: cIn } = useInView({ threshold: 0.2, triggerOnce: true })
          return (
            <div key={cert.name} ref={cRef} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '2rem',
              opacity: cIn ? 1 : 0,
              transform: cIn ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = cert.accent + '55'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12, flexShrink: 0,
                background: cert.accent + '20', border: `1px solid ${cert.accent}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, color: cert.accent,
                fontFamily: 'var(--mono)', letterSpacing: '0.05em'
              }}>
                {cert.badge}
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: cert.accent, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--mono)', marginBottom: '0.4rem', fontWeight: 600 }}>
                  {cert.issuer}
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                  {cert.name}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {cert.detail}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
