import { Fragment } from 'react'
import { Badge, ButtonLink, WindowPanel } from './ui'
import Carousel from './Carousel'
import type { CaseStudy as Study } from './caseStudies'

export default function CaseStudy({ data }: { data: Study }) {
  return (
    <section aria-labelledby="cs-title">
      <div className="wrap cs">
        <p className="mono"><a href="/#proyectos">← Volver a proyectos</a></p>
        <h1 id="cs-title">{data.title}</h1>
        <p className="lead measure">{data.subtitle}</p>
        <p><Badge tone="ok">{data.status}</Badge></p>
        {data.shots && (
          <WindowPanel title="capturas">
            <Carousel shots={data.shots} label={`Capturas de ${data.title}`} />
            {data.shotsNote && <p className="muted small">{data.shotsNote}</p>}
          </WindowPanel>
        )}
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
            <div key={s.title} className={s.code ? 'wide' : undefined}>
              <WindowPanel title={s.title}>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.code && <pre className="code"><code>{s.code}</code></pre>}
                {s.points && <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              </WindowPanel>
            </div>
          ))}
        </div>
        {data.links.length > 0 && (
          <div className="row">
            {data.links.map((l) => <ButtonLink key={l.href} href={l.href} external>{l.label}</ButtonLink>)}
          </div>
        )}
      </div>
    </section>
  )
}