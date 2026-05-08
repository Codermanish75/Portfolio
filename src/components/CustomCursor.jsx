import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)'
      cursor.style.background = 'transparent'
      cursor.style.border = '1px solid var(--accent)'
    }
    const onLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      follower.style.transform = 'translate(-50%,-50%) scale(1)'
      cursor.style.background = 'var(--accent)'
      cursor.style.border = 'none'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: 'var(--accent)', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)', transition: 'transform 0.15s, background 0.2s',
        mixBlendMode: 'difference'
      }} />
      <div ref={followerRef} style={{
        position: 'fixed', width: 32, height: 32, borderRadius: '50%',
        border: '1px solid rgba(0,245,196,0.4)', pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)', transition: 'transform 0.3s'
      }} />
    </>
  )
}
