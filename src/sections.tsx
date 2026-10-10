import { useState, type KeyboardEvent } from 'react'
import { Badge, ButtonLink, SectionHeader, WindowPanel } from './ui'
import {
  profile, facts, used, learning, projects, experience, timeline, education, language,
  type Project,
} from './content'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="in">
          <p className="mono">Portfolio · desarrollador web junior</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="lead"><strong>{profile.role}</strong><br />{profile.focus}</p>
          <p className="measure">{profile.intro}</p>
          <div className="row">
            <ButtonLink href="#proyectos" variant="primary">Ver proyectos</ButtonLink>
            <ButtonLink href="#contacto">Contacto</ButtonLink>
            <ButtonLink href={profile.cv} external>Ver CV (PDF)</ButtonLink>
          </div>
          <p className="links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            {'  ·  '}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
        <WindowPanel title="perfil.cfg">
          <dl className="cfg">
            <dt>rol</dt><dd>Full Stack Web Developer Jr</dd>
            <dt>foco</dt><dd>Frontend, React + TypeScript</dd>
            <dt>equipo</dt><dd>Syncro, 8–9 personas</dd>
            <dt>en curso</dt><dd>Backend de Syncro y NerdAula</dd>
          </dl>
        </WindowPanel>
      </div>
      <ul className="wrap facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
    </section>
  )
}

export function About() {
  return (
    <section aria-labelledby="perfil">
      <div className="wrap">
        <SectionHeader id="perfil" title="Perfil" />
        <div className="two">
          <div className="measure">
            <p>Hace 8 años trabajo en cobranzas en un entorno corporativo: negociación diaria, objetivos medibles, CRM y grandes volúmenes de información. Eso me enseñó a comunicar con claridad, priorizar bajo presión y trabajar con indicadores.</p>
            <p>Mientras sigo en ese puesto, me formé en desarrollo web (UTN, Fundación Pescar / J.P. Morgan) y en nube (AWS).</p>
            <p>Mi primer proyecto en equipo fue Syncro: 8–9 personas, Jira, ramas por funcionalidad, Pull Requests y Code Reviews. Me encargué del frontend. Hoy me sumo al backend y construyo NerdAula, un proyecto propio.</p>
          </div>
          <ol className="timeline" aria-label="Trayectoria">
            {timeline.map((t) => (
              <li key={t.when}><span className="mono">{t.when}</span><span>{t.what}</span></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const tabs = ['Usado en proyectos', 'Conocimientos', 'IA aplicada'] as const

function StackTabs() {
  const [i, setI] = useState(0)
  function onKey(e: KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    setI(n)
    document.getElementById('tab-' + n)?.focus()
  }
  return (
    <div className="win">
      <div className="tabs" role="tablist" aria-label="Stack" onKeyDown={onKey}>
        {tabs.map((t, n) => (
          <button key={t} type="button" role="tab" id={'tab-' + n} aria-selected={i === n}
            aria-controls="tabpanel" tabIndex={i === n ? 0 : -1} onClick={() => setI(n)}>{t}</button>
        ))}
      </div>
      <div className="win-body" role="tabpanel" id="tabpanel" aria-labelledby={'tab-' + i}>
        {i === 0 && (
          <ul className="plain">
            {used.map((t) => (
              <li key={t.name}><strong>{t.name}</strong> <span className="muted">en {t.evidence}</span></li>
            ))}
          </ul>
        )}
        {i === 1 && (
          <>
            <ul className="chips">{learning.map((l) => <li key={l}>{l}</li>)}</ul>
            <p className="muted small">Sin proyecto propio que lo respalde todavía.</p>
          </>
        )}
        {i === 2 && (
          <p className="measure">Uso ChatGPT, Claude, Gemini y DeepSeek para explorar alternativas, depurar y documentar. Reviso lo que genero y las decisiones técnicas son mías.</p>
        )}
      </div>
    </div>
  )
}

export function Stack() {
  return (
    <section aria-labelledby="stack">
      <div className="wrap">
        <SectionHeader id="stack" title="Stack" intro="Separado por evidencia: lo que usé en proyectos y lo que conozco o estoy aprendiendo." />
        <StackTabs />
      </div>
    </section>
  )
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="win project">
      <div className="win-bar"><span className="mono">{p.id}</span><Badge tone={p.tone}>{p.status}</Badge></div>
      <div className="win-body">
        <h3>{p.title}</h3>
        <p className="mono">{p.kind}</p>
        <p>{p.summary}</p>
        <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
        {p.stack && (
          <p className="small"><span className="muted">{p.stack.label}: </span>{p.stack.items.join(', ')}</p>
        )}
        {(p.caseStudy || p.links.length > 0) && (
          <div className="row">
            {p.caseStudy && <ButtonLink href={p.caseStudy} variant="primary">Caso de estudio</ButtonLink>}
            {p.links.map((l) => <ButtonLink key={l.href} href={l.href} external>{l.label}</ButtonLink>)}
          </div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section aria-labelledby="proyectos">
      <div className="wrap">
        <SectionHeader id="proyectos" title="Proyectos" />
        <div className="grid">
          {projects.map((p) => <ProjectCard key={p.id} p={p} />)}
          <WindowPanel title="proximamente">
            <p>Hay más proyectos en preparación. Se suman acá a medida que estén listos.</p>
          </WindowPanel>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section aria-labelledby="experiencia">
      <div className="wrap">
        <SectionHeader id="experiencia" title="Experiencia" />
        <div className="two">
          <div>
            <h3>Práctica en desarrollo de software</h3>
            <p className="measure">Syncro (frontend, equipo de 8–9 personas) y NerdAula (proyecto personal en desarrollo). El detalle está en Proyectos.</p>
          </div>
          <div>
            <h3>Experiencia profesional, actual</h3>
            <p className="mono">{experience.title} · {experience.period}</p>
            <ul>{experience.points.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section aria-labelledby="formacion">
      <div className="wrap">
        <SectionHeader id="formacion" title="Formación" />
        <ul className="plain edu">
          {education.map((e) => (
            <li key={e.title + e.year}><strong>{e.title}</strong> <span className="muted">{e.where} · {e.year}</span></li>
          ))}
          <li><strong>Idioma</strong> <span className="muted">{language}</span></li>
        </ul>
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }
  return (
    <section aria-labelledby="contacto">
      <div className="wrap">
        <SectionHeader id="contacto" title="Contacto" intro="Busco mi primera oportunidad como desarrollador en un equipo. Si querés hablar de Syncro, NerdAula o una posición Jr o Trainee, escribime." />
        <div className="row">
          <ButtonLink href={`mailto:${profile.email}`} variant="primary">{profile.email}</ButtonLink>
          <button type="button" className="btn" onClick={copy}>Copiar email</button>
          <ButtonLink href={profile.linkedin} external>LinkedIn</ButtonLink>
          <ButtonLink href={profile.github} external>GitHub</ButtonLink>
        </div>
        <p className="muted small" role="status">{copied ? 'Email copiado' : ''}</p>
      </div>
    </section>
  )
}
