import React from 'react'
import { useInView } from 'react-intersection-observer'

const contacts = [
  { label: 'Email', value: 'officialmanish7518@gmail.com', href: 'mailto:officialmanish7518@gmail.com', icon: '✉', accent: '#00f5c4' },
  { label: 'Phone', value: '+91 7518981368', href: 'tel:7518981368', icon: '📱', accent: '#7b5ea7' },
  { label: 'LinkedIn', value: 'manish-singh-6b8060285', href: 'https://linkedin.com/in/manish-singh-6b8060285', icon: 'in', accent: '#0077b5' },
  { label: 'GitHub', value: 'Codermanish75', href: 'https://github.com/Codermanish75', icon: '⌥', accent: '#e8e8f0' },
  { label: 'LeetCode', value: 'codermanish_75 · 150+', href: 'https://leetcode.com/codermanish_75', icon: '⚡', accent: '#ffa116' },
  { label: 'GFG', value: 'officialmau8 · 300+', href: 'https://www.geeksforgeeks.org/profile/officialmau8?tab=activity', icon: '🌿', accent: '#2f8d46' },
  { label: 'LeetCode', value: 'codermanish_75 · 150+', href: 'https://leetcode.com/u/manish_7518/', icon: '⚡', accent: '#ffa116' },
  { label: 'GFG', value: 'officialmau8 · 300+', href: 'https://www.geeksforgeeks.org/profile/manishsiy5ep?tab=activity', icon: '🌿', accent: '#41b63d' }
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="contact" style={{
      padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div ref={ref} style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
        transition: 'all 0.7s ease', textAlign: 'center', marginBottom: '4rem'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          06 / Contact
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Let's Build Something
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Open to internships, collaborations, and full-time AI/ML & full-stack roles. Let's connect!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
        {contacts.map((c, i) => {
          const { ref: cRef, inView: cIn } = useInView({ threshold: 0.1, triggerOnce: true })
          return (
            <a key={c.label} ref={cRef} href={c.href} target="_blank" rel="noreferrer" style={{
              display: 'block', background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '1.5rem', textAlign: 'center',
              transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, border-color 0.2s, background 0.2s`,
              opacity: cIn ? 1 : 0,
              transform: cIn ? 'translateY(0)' : 'translateY(20px)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.accent + '55'
              e.currentTarget.style.background = c.accent + '08'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--card)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{c.icon}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', fontFamily: 'var(--mono)' }}>{c.label}</div>
              <div style={{ fontSize: '0.82rem', color: c.accent, fontWeight: 600, wordBreak: 'break-all' }}>{c.value}</div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
