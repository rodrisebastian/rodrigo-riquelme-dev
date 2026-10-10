import { useRef, useState } from 'react'

export type Shot = { src: string; alt: string; caption: string; w: number; h: number }

export default function Carousel({ shots, label }: { shots: Shot[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const go = (n: number) => {
    const el = ref.current
    if (!el) return
    const t = (n + shots.length) % shots.length
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: t * el.clientWidth, behavior: calm ? 'auto' : 'smooth' })
    setI(t)
  }
  const onScroll = () => {
    const el = ref.current
    if (el) setI(Math.round(el.scrollLeft / el.clientWidth))
  }
  return (
    <div className="carousel" role="group" aria-roledescription="carrusel" aria-label={label}>
      <div
        className="slides" ref={ref} onScroll={onScroll} tabIndex={0}
        aria-label="Capturas: deslizá o usá las flechas del teclado"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(i + 1)
          if (e.key === 'ArrowLeft') go(i - 1)
        }}
      >
        {shots.map((s, n) => (
          <figure key={s.src} className="slide" role="group" aria-roledescription="diapositiva" aria-label={`${n + 1} de ${shots.length}`}>
            <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading={n === 0 ? 'eager' : 'lazy'} />
            <figcaption className="mono">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="row car-ctl">
        <button type="button" className="btn" onClick={() => go(i - 1)} aria-label="Captura anterior">←</button>
        <span className="mono" aria-live="polite">{i + 1} / {shots.length}</span>
        <button type="button" className="btn" onClick={() => go(i + 1)} aria-label="Captura siguiente">→</button>
      </div>
    </div>
  )
}