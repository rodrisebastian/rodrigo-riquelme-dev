import { useEffect, useState } from 'react'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// Aparición suave al hacer scroll. Sin JS (o con movimiento reducido) todo queda visible.
export function useReveal() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const els = document.querySelectorAll<HTMLElement>('.sec-head, .win, .timeline li, .facts li, .edu li')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        el.classList.add('shown')
        setTimeout(() => el.classList.remove('will', 'shown'), 900)
        io.unobserve(el)
      })
    }, { threshold: 0.12 })
    els.forEach((el, i) => {
      el.style.setProperty('--d', `${(i % 3) * 70}ms`)
      el.classList.add('will')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}

// Luz que sigue al cursor dentro de los paneles.
export function useSpotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest?.('.win') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

// Sección visible, para resaltar el menú.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const secs = ids.map((id) => document.getElementById(id)?.closest('section')).filter((s): s is HTMLElement => !!s)
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(e.target.querySelector('h2')?.id ?? '') })
    }, { rootMargin: '-35% 0px -60% 0px' })
    secs.forEach((s) => io.observe(s))
    // Al llegar al final de la página la última sección nunca cruza la franja: se activa a mano
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(ids[ids.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [ids])
  return active
}
