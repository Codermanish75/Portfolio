import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Floating particles
    const particleCount = 1200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const color1 = new THREE.Color('#00f5c4')
    const color2 = new THREE.Color('#7b5ea7')
    const color3 = new THREE.Color('#ff6b6b')
    const palette = [color1, color2, color3]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      sizes[i] = Math.random() * 3 + 1
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Wireframe torus knot
    const torusGeo = new THREE.TorusKnotGeometry(1.8, 0.4, 128, 16)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f5c4,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(3.5, -0.5, -2)
    scene.add(torus)

    // Wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x7b5ea7,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(-4, 1.5, -3)
    scene.add(ico)

    // Floating ring
    const ringGeo = new THREE.TorusGeometry(1, 0.02, 8, 80)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5c4, transparent: true, opacity: 0.25 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.set(-3, -2, -1)
    scene.add(ring)

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Animation
    let frame = 0
    const animate = () => {
      frame++
      const t = frame * 0.005

      particles.rotation.y = t * 0.05 + mouseX * 0.03
      particles.rotation.x = t * 0.03 + mouseY * 0.02

      torus.rotation.x = t * 0.4
      torus.rotation.y = t * 0.6

      ico.rotation.x = t * 0.5
      ico.rotation.z = t * 0.3

      ring.rotation.x = t * 0.8
      ring.rotation.y = t * 0.4

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Resize
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} style={{
      position: 'absolute', inset: 0, zIndex: 0
    }} />
  )
}

export default function Hero() {
  const [typed, setTyped] = useState('')
  const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'LLM Specialist', 'Problem Solver']
  const roleRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    let timeout
    const type = () => {
      const role = roles[roleRef.current]
      if (!deletingRef.current) {
        setTyped(role.slice(0, charRef.current + 1))
        charRef.current++
        if (charRef.current === role.length) {
          deletingRef.current = true
          timeout = setTimeout(type, 1800)
          return
        }
      } else {
        setTyped(role.slice(0, charRef.current - 1))
        charRef.current--
        if (charRef.current === 0) {
          deletingRef.current = false
          roleRef.current = (roleRef.current + 1) % roles.length
        }
      }
      timeout = setTimeout(type, deletingRef.current ? 60 : 100)
    }
    timeout = setTimeout(type, 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '6rem 2rem 4rem'
    }}>
      <ThreeBackground />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(5,5,8,0.9) 0%, transparent 60%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 50% 50% at 10% 50%, rgba(123,94,167,0.07) 0%, transparent 60%)'
      }} />

      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,245,196,0.06)', border: '1px solid rgba(0,245,196,0.2)',
          borderRadius: 100, padding: '0.4rem 1.2rem', marginBottom: '2rem',
          fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', fontFamily: 'var(--mono)'
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
            animation: 'blink 1.5s infinite',
            display: 'inline-block'
          }} />
          B.Tech CSE @ NIET · Greater Noida
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 900,
          lineHeight: 1.0, marginBottom: '1rem', letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #00f5c4 50%, #7b5ea7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          Manish<br />Singh
        </h1>

        {/* Typewriter */}
        <div style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontFamily: 'var(--mono)',
          color: 'var(--accent)', marginBottom: '1.5rem', minHeight: '2rem',
          letterSpacing: '0.02em'
        }}>
          {typed}<span style={{ animation: 'blink 1s infinite', opacity: 1 }}>|</span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'var(--muted)',
          maxWidth: 560, margin: '0 auto 3rem', lineHeight: 1.8
        }}>
          Building intelligent systems at the intersection of AI/ML and full-stack development.
          150+ LeetCode · 300+ GFG · IBM & Michigan certified.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <a href="#projects" style={{
            padding: '0.85rem 2.5rem', borderRadius: 100,
            background: 'var(--accent)', color: '#000',
            fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em',
            transition: 'all 0.2s', boxShadow: '0 0 30px rgba(0,245,196,0.3)'
          }}
          onMouseEnter={e => e.target.style.boxShadow = '0 0 50px rgba(0,245,196,0.6)'}
          onMouseLeave={e => e.target.style.boxShadow = '0 0 30px rgba(0,245,196,0.3)'}
          >
            View Projects ↓
          </a>
          <a href="https://linkedin.com/in/manish-singh-6b8060285" target="_blank" rel="noreferrer" style={{
            padding: '0.85rem 2.5rem', borderRadius: 100,
            border: '1px solid var(--border-hover)', color: 'var(--text)',
            fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(0,245,196,0.08)'; e.target.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'var(--border-hover)' }}
          >
            LinkedIn →
          </a>
          <a href="https://github.com/Codermanish75" target="_blank" rel="noreferrer" style={{
            padding: '0.85rem 2.5rem', borderRadius: 100,
            border: '1px solid var(--border-hover)', color: 'var(--text)',
            fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(0,245,196,0.08)'; e.target.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'var(--border-hover)' }}
          >
            GitHub →
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap'
        }}>
          {[
            { num: '150+', label: 'LeetCode' },
            { num: '300+', label: 'GFG Problems' },
            { num: '7.43', label: 'CGPA' },
            { num: '2+', label: 'Certifications' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '1.8rem', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '-0.02em'
              }}>{num}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}
