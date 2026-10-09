import { useState } from 'react'
import { About, Contact, Education, Experience, Hero, Projects, Stack } from './sections'

const nav = [
  ['perfil', 'Perfil'], ['stack', 'Stack'], ['proyectos', 'Proyectos'],
  ['experiencia', 'Experiencia'], ['contacto', 'Contacto'],
] as const

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="top">
      <div className="wrap bar">
        <a className="brand" href="#top">RR_ Rodrigo Riquelme</a>
        <button type="button" className="btn menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          Menú
        </button>
        <nav id="nav" aria-label="Principal" className={open ? 'open' : ''}>
          <ul>
            {nav.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div id="top">
      <a className="skip" href="#main">Saltar al contenido</a>
      <Navbar />
      <main id="main">
        <Hero /><About /><Stack /><Projects /><Experience /><Education /><Contact />
      </main>
      <footer className="foot">
        <div className="wrap mono">Hecho con React, TypeScript y Vite · build {__BUILD_DATE__}</div>
      </footer>
    </div>
  )
}
