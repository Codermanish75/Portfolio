import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'Virtual Assistant (AI)',
    emoji: '🤖',
    accent: '#00f5c4',
    description:
      'A full-featured AI Voice Assistant using Speech Recognition, NLP, Deep Learning, and Text-to-Speech. Cloud-deployed with real-time API integrations for weather, maps, and music.',
    points: [
      'Implemented ASR to convert voice to text in real-time',
      'NLP-powered intent detection and response generation',
      'ML/Deep Learning models for personalized responses',
      'Integrated TTS for natural voice output',
      'Deployed on AWS/GCP/Azure for scalability',
    ],
    stack: [
      'RAG',
      'LangChain',
      'React',
      'Node.js',
      'MongoDB',
      'ASR',
      'TTS',
      'Cloud',
    ],
    github: 'https://github.com/Codermanish75',
    live: null,
  },

  {
    title: 'AI-Based Pothole Detection System',
    emoji: '🛣️',
    accent: '#7b5ea7',
    description:
      'Real-time road anomaly detection system using computer vision and deep learning. GPS-integrated reporting with a maintenance dashboard for smart city applications.',
    points: [
      'Computer vision for real-time road anomaly detection',
      'ML models to classify potholes from video streams',
      'GPS integration for location-based reporting',
      'Data augmentation to reduce false positives',
      'Dashboard for road maintenance planning',
    ],
    stack: [
      'Python',
      'OpenCV',
      'Deep Learning',
      'GPS',
      'React',
      'Node.js',
      'MongoDB',
    ],
    github:
      'https://github.com/Codermanish75/Ai-Based-Pothole_Detection_System',
    live: 'https://ai-based-pothole-detection-system-lpbf.onrender.com',
  },

  {
    title: 'Task Manager',
    emoji: '📋',
    accent: '#00d4ff',
    description:
      'Modern full-stack task management application with authentication, dashboard, task tracking, and productivity-focused UI.',
    points: [
      'User authentication with login & registration',
      'Create, update, and manage daily tasks',
      'Responsive dashboard with modern UI',
      'Protected routes and JWT authentication',
      'REST API integration with MongoDB database',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'CSS'],
    github: 'https://github.com/Codermanish75/Task_Manager.git',
    live: 'https://taskmanager-ayn5.onrender.com',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const { ref, inView } = useInView({
    threshold: 0.12,
    triggerOnce: true,
  })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cx = rect.width / 2
    const cy = rect.height / 2

    const rotX = ((y - cy) / cy) * -5
    const rotY = ((x - cx) / cx) * 5

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotX}deg)
      rotateY(${rotY}deg)
      translateY(-6px)
    `
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    }
  }

  const delay = index * 120

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (project.live) {
            window.open(project.live, '_blank')
          }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = project.accent + '55'
          e.currentTarget.style.boxShadow = `0 20px 50px ${project.accent}18`
        }}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '2.2rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition:
            'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s',
          position: 'relative',
          overflow: 'hidden',
          cursor: project.live ? 'pointer' : 'default',
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Glow Circle */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 180,
            height: 180,
            background: project.accent + '08',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Emoji */}
        <div
          style={{
            fontSize: '2.3rem',
            marginBottom: '1.2rem',
          }}
        >
          {project.emoji}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            marginBottom: '0.9rem',
            color: 'var(--text)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '0.9rem',
            lineHeight: 1.75,
            marginBottom: '1.6rem',
          }}
        >
          {project.description}
        </p>

        {/* Points */}
        <ul
          style={{
            marginBottom: '1.8rem',
            paddingLeft: 0,
            listStyle: 'none',
            flex: '1 0 auto',
          }}
        >
          {project.points.map((point, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '0.6rem',
                color: 'var(--muted)',
                fontSize: '0.84rem',
                lineHeight: 1.75,
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  color: project.accent,
                  flexShrink: 0,
                }}
              >
                ▸
              </span>

              {point}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.8rem',
          }}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                padding: '0.22rem 0.65rem',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                fontSize: '0.7rem',
                fontFamily: 'var(--mono)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.8rem',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}
        >
          {/* GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.3rem',
              borderRadius: 100,
              border: `1px solid ${project.accent}44`,
              color: project.accent,
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = project.accent + '12'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            GitHub →
          </a>

          {/* Live Demo */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.3rem',
                borderRadius: 100,
                border: `1px solid ${project.accent}44`,
                color: project.accent,
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = project.accent + '12'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      id="projects"
      style={{
        padding: '7rem 0',
        width: '100%',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Heading */}
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '3.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          03 / Projects
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
          }}
        >
          Things I've Built
        </h2>

        <p
          style={{
            color: 'var(--muted)',
            maxWidth: 600,
            margin: '0 auto',
            fontSize: '0.95rem',
          }}
        >
          AI-powered applications solving real-world problems with modern tech
          stacks.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            projects.length === 1
              ? 'minmax(0, 560px)'
              : projects.length === 2
              ? 'repeat(2, 1fr)'
              : 'repeat(3, 1fr)',
          gap: '1.4rem',
          padding: '0 2rem',
          maxWidth: 1200,
          margin: '0 auto',
          justifyContent: projects.length === 1 ? 'center' : 'unset',
        }}
        className="projects-grid"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
          />
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 560px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}