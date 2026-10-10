import { Fragment } from 'react'
import { Badge, ButtonLink, WindowPanel } from './ui'
import type { CaseStudy as Study } from './caseStudies'

export default function CaseStudy({ data }: { data: Study }) {
  return (
    <section aria-labelledby="cs-title">
      <div className="wrap cs">
        <p className="mono"><a href="/#proyectos">← Volver a proyectos</a></p>
        <h1 id="cs-title">{data.title}</h1>
        <p className="lead measure">{data.subtitle}</p>
        <p><Badge tone="ok">{data.status}</Badge></p>
        <div className="two">
          <WindowPanel title="ficha.cfg">
            <dl className="cfg">
              {data.facts.map((f) => (
                <Fragment key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></Fragment>
              ))}
            </dl>
          </WindowPanel>
          <WindowPanel title="mi-contribucion">
            <ul className="plain">
              {data.contribution.map((c) => (
                <li key={c.area}><strong>{c.area}</strong> <span className="muted">{c.detail}</span></li>
              ))}
            </ul>
            <p className="muted small">{data.teamNote}</p>
          </WindowPanel>
        </div>
        <div className="grid">
          {data.sections.map((s) => (
            <WindowPanel key={s.title} title={s.title}>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.points && <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
            </WindowPanel>
          ))}
        </div>
        <div className="row">
          {data.links.map((l) => <ButtonLink key={l.href} href={l.href} external>{l.label}</ButtonLink>)}
        </div>
      </div>
    </section>
  )
}