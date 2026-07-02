import React from 'react'
import { useInView } from 'react-intersection-observer'

const education = [
  {
    degree: 'B.Tech(Honors) — Computer Science & Engineering',
    school: 'Noida Institute of Engineering & Technology',
    location: 'Greater Noida',
    period: '2022 – 2026',
    score: 'CGPA: 7.60 / 10',
    accent: '#00f5c4',
    // current: true
  },
  {
    degree: 'Intermediate (Class 12)',
    location: '',
    period: '',
    score: '83%',
    accent: '#7b5ea7'
  },
  {
    degree: 'High School (Class 10)',
    location: '',
    period: '',
    score: '89%',
    accent: '#ff6b6b'
  }
]

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="education" style={{
      padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div ref={ref} style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
        transition: 'all 0.7s ease', marginBottom: '4rem', textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          05 / Education
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Academic Journey
        </h2>
      </div>

      <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 20, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, var(--accent), #7b5ea7, transparent)'
        }} />

        {education.map((edu, i) => {
          const { ref: eRef, inView: eIn } = useInView({ threshold: 0.2, triggerOnce: true })
          return (
            <div key={edu.degree} ref={eRef} style={{
              paddingLeft: '4rem', paddingBottom: '3rem', position: 'relative',
              opacity: eIn ? 1 : 0,
              transform: eIn ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`
            }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: 12, top: 6, width: 16, height: 16,
                borderRadius: '50%', background: edu.accent,
                boxShadow: `0 0 16px ${edu.accent}88`
              }} />

              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1.75rem',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = edu.accent + '44'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: edu.accent, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                      {edu.period || 'Completed'}
                      {edu.current && <span style={{ marginLeft: '0.5rem', background: edu.accent + '22', padding: '0.1rem 0.5rem', borderRadius: 100, fontSize: '0.65rem' }}>Current</span>}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{edu.degree}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.87rem' }}>{edu.school}{edu.location ? `, ${edu.location}` : ''}</div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700,
                    color: edu.accent, whiteSpace: 'nowrap'
                  }}>
                    {edu.score}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
