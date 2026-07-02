import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useInView } from 'react-intersection-observer'

function FloatingCube() {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const geo = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const edges = new THREE.EdgesGeometry(geo)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f5c4, transparent: true, opacity: 0.8 })
    const wireframe = new THREE.LineSegments(edges, lineMat)
    scene.add(wireframe)

    const innerGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0)
    const innerEdges = new THREE.EdgesGeometry(innerGeo)
    const innerMat = new THREE.LineBasicMaterial({ color: 0x7b5ea7, transparent: true, opacity: 0.5 })
    const innerCube = new THREE.LineSegments(innerEdges, innerMat)
    scene.add(innerCube)

    // Orbiting sphere
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00f5c4 })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    let frame = 0
    const animate = () => {
      frame++
      const t = frame * 0.01
      wireframe.rotation.x = t * 0.5
      wireframe.rotation.y = t * 0.7
      innerCube.rotation.x = -t * 0.8
      innerCube.rotation.z = t * 0.6
      sphere.position.x = Math.cos(t * 2) * 1.5
      sphere.position.y = Math.sin(t * 2) * 1.5
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    return () => { mount.removeChild(renderer.domElement); renderer.dispose() }
  }, [])
  return <div ref={mountRef} style={{ width: 300, height: 300 }} />
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{
      padding: '7rem 2rem', maxWidth: 1100, margin: '0 auto',
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            01 / About
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Crafting the future<br />
            <span style={{ color: 'var(--accent)' }}>with code & AI</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '0.98rem' }}>
            I'm Manish Singh, a B.Tech CSE student at <strong style={{ color: 'var(--text)' }}>Noida Institute of Engineering & Technology</strong> (2022–26), passionate about building AI-driven applications that solve real-world problems.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.98rem' }}>
            My expertise spans <strong style={{ color: 'var(--accent)' }}> Python3 ,DSA ,MERN ,LLMs and RAG pipelines</strong> on the AI side, combined with full-stack proficiency in mongoDB ,React ,Express.js and Node.js. I'm an active competitive programmer with 150+ LeetCode and 300+ GFG solutions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['Python3', 'DSA', 'LLMs', 'React', 'Node.js', 'System Design'].map(tag => (
              <span key={tag} style={{
                padding: '0.35rem 1rem', borderRadius: 100,
                background: 'rgba(0,245,196,0.07)', border: '1px solid rgba(0,245,196,0.2)',
                color: 'var(--accent)', fontSize: '0.8rem', fontFamily: 'var(--mono)'
              }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FloatingCube />
        </div>
      </div>
      <style>{`@media(max-width:768px){#about > div{grid-template-columns:1fr!important;} }`}</style>
    </section>
  )
}
