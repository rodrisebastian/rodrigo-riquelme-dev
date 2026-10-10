import { useEffect, useRef, useState } from 'react'
import { profile } from './content'
import { ButtonLink } from './ui'

const items = [
  { app: 'linkedin', text: 'Conectemos: acá está mi perfil profesional.', cta: 'Ver LinkedIn', href: profile.linkedin },
    { app: 'instagram', text: 'También estoy en Instagram.', cta: 'Ver Instagram', href: profile.instagram },
  { app: 'github', text: 'Mis repositorios y mi actividad de código.', cta: 'Ver GitHub', href: profile.github },
  { app: 'cv', text: 'Mi CV en PDF.', cta: 'Ver CV', href: profile.cv },
  { app: 'email', text: 'Si tenés una posición Jr o Trainee, escribime.', cta: 'Escribir', href: `mailto:${profile.email}` },
]
const KEY = 'rr-toasts-off'

export default function Notifier() {
  const [n, setN] = useState<number | null>(null)
  const hide = useRef<number>()
  const off = useRef(false)

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return } catch { /* sin storage: se muestra igual */ }
    let count = 0
    const show = () => {
      if (off.current || count >= items.length) { window.clearInterval(loop); return }
      setN(count)
      count++
      hide.current = window.setTimeout(() => setN(null), 9000)
    }
    const first = window.setTimeout(show, 12000)
    const loop = window.setInterval(show, 35000)
    return () => { clearTimeout(first); clearInterval(loop); clearTimeout(hide.current) }
  }, [])

  function close(silence = false) {
    clearTimeout(hide.current)
    setN(null)
    if (silence) {
      off.current = true
      try { sessionStorage.setItem(KEY, '1') } catch { /* nada */ }
    }
  }

  const it = n === null ? null : items[n]
  return (
    <div className="toasts" role="status" aria-live="polite">
      {it && (
        <div
          className="win toast"
          onMouseEnter={() => clearTimeout(hide.current)}
          onFocus={() => clearTimeout(hide.current)}
          onMouseLeave={() => { hide.current = window.setTimeout(() => setN(null), 4000) }}
        >
          <div className="win-bar">
            <span className="mono">{it.app}</span>
            <button type="button" className="toast-x" aria-label="Cerrar notificación" onClick={() => close()}>×</button>
          </div>
          <div className="win-body">
            <p>{it.text}</p>
            <div className="row">
              <ButtonLink href={it.href} external={!it.href.startsWith('mailto:')}>{it.cta}</ButtonLink>
              <button type="button" className="btn" onClick={() => close(true)}>No mostrar más</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}