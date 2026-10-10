import { useEffect, useState } from 'react'
import { About, Contact, Education, Experience, Hero, Projects, Stack } from './sections'
import { useActiveSection, useReveal, useSpotlight } from './hooks'
import { ButtonLink } from './ui'
import MiniMap from './MiniMap'
import CaseStudy from './CaseStudy'
import { caseStudies } from './caseStudies'
import Notifier from './Notifier'

const nav = [
  ['perfil', 'Perfil'], ['stack', 'Stack'], ['proyectos', 'Proyectos'],
  ['experiencia', 'Experiencia'], ['contacto', 'Contacto'],
] as const
const ids = ['perfil', 'stack', 'proyectos', 'experiencia', 'formacion', 'contacto']
const none: string[] = []

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const base = window.location.pathname === '/' ? '' : '/'
  return (
    <header className="top">
      <div className="wrap bar">
        <a className="brand" href="/#top">
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
                <a href={`/#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Home() {
  return <><Hero /><About /><Stack /><Projects /><Experience /><Education /><Contact /></>
}

function NotFound() {
  return (
    <section>
      <div className="wrap">
        <h1>Mapa no encontrado</h1>
        <p className="measure">Esta ruta no existe.</p>
        <ButtonLink href="/" variant="primary">Volver al inicio</ButtonLink>
      </div>
    </section>
  )
}

export default function App() {
  const path = window.location.pathname
  const isHome = path === '/'
  const study = path.startsWith('/proyectos/') ? caseStudies[path.split('/')[2]] : undefined
  useReveal()
  useSpotlight()
  const active = useActiveSection(isHome ? ids : none)
  useEffect(() => {
    const h = window.location.hash.slice(1)
    if (h) document.getElementById(h)?.scrollIntoView()
  }, [])
  return (
    <div id="top">
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">Saltar al contenido</a>
      <Navbar active={active} />
      {isHome && <MiniMap active={active} />}
      <main id="main">
        {study ? <CaseStudy data={study} /> : isHome ? <Home /> : <NotFound />}
      </main>
      <footer className="foot">
        <div className="wrap mono">Hecho con React, TypeScript y Vite · build {__BUILD_DATE__}</div>
      </footer>
      <Notifier />
    </div>
  )
}