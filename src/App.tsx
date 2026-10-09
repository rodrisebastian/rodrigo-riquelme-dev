import { useState } from 'react'
import { About, Contact, Education, Experience, Hero, Projects, Stack } from './sections'
import { useActiveSection, useReveal, useSpotlight } from './hooks'
import MiniMap from './MiniMap'

const nav = [
  ['perfil', 'Perfil'], ['stack', 'Stack'], ['proyectos', 'Proyectos'],
  ['experiencia', 'Experiencia'], ['contacto', 'Contacto'],
] as const
const ids = ['perfil', 'stack', 'proyectos', 'experiencia', 'formacion', 'contacto']

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="top">
      <div className="wrap bar">
        <a className="brand" href="#top">
          <img src="/logo-rr.png" alt="" width="28" height="28" />
          Rodrigo Riquelme
        </a>
        <button type="button" className="btn menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          Menú
        </button>
        <nav id="nav" aria-label="Principal" className={open ? 'open' : ''}>
          <ul>
            {nav.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  useReveal()
  useSpotlight()
  const active = useActiveSection(ids)
  return (
    <div id="top">
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">Saltar al contenido</a>
      <Navbar active={active} />
      <MiniMap active={active} />
      <main id="main">
        <Hero /><About /><Stack /><Projects /><Experience /><Education /><Contact />
      </main>
      <footer className="foot">
        <div className="wrap mono">Hecho con React, TypeScript y Vite · build {__BUILD_DATE__}</div>
      </footer>
    </div>
  )
}
