import React from 'react'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    title: 'Core Languages',
    icon: '⌨️',
    color: '#00f5c4',
    skills: ['Python 3', 'JavaScript', 'SQL', 'HTML/CSS']
  },
  {
    title: 'AI / ML Stack',
    icon: '🤖',
    color: '#7b5ea7',
    skills: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'FastAPI']
  },
  {
    title: 'Frameworks',
    icon: '⚡',
    color: '#ff6b6b',
    skills: ['React', 'Django', 'REST API']
  },
  {
    title: 'CS Fundamentals',
    icon: '🧠',
    color: '#00f5c4',
    skills: ['OOP', 'DSA', 'Operating System','System Design', 'Computer Network']
  },
  {
    title: 'Dev Tools',
    icon: '🛠️',
    color: '#7b5ea7',
    skills: ['Git', 'GitHub', 'VS Code', 'AWS']
  },
  {
    title: 'Soft Skills',
    icon: '🌟',
    color: '#ff6b6b',
    skills: ['Leadership', 'Communication', 'Teamwork', 'Time Management']
  }
]

function SkillCard({ group, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.75rem',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.2s`,
      cursor: 'default'
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = group.color + '44'; e.currentTarget.style.transform = 'translateY(-4px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '1.3rem' }}>{group.icon}</span>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: group.color, fontWeight: 600, fontFamily: 'var(--mono)' }}>
          {group.title}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {group.skills.map(skill => (
          <span key={skill} style={{
            padding: '0.3rem 0.8rem', borderRadius: 100,
            background: group.color + '0f',
            border: `1px solid ${group.color}22`,
            color: 'var(--text)', fontSize: '0.8rem', fontWeight: 500
          }}>{skill}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="skills" style={{ padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div ref={ref} style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
        transition: 'all 0.7s ease', marginBottom: '4rem', textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          02 / Skills
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Technical Arsenal
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem' }}>
          A battle-tested combination of AI/ML expertise and full-stack engineering.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {skillGroups.map((g, i) => <SkillCard key={g.title} group={g} delay={i * 80} />)}
      </div>
    </section>
  )
}
