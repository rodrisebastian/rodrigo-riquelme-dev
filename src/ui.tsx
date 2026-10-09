import type { ReactNode } from 'react'

export function Badge({ tone, children }: { tone?: 'ok' | 'wip'; children: ReactNode }) {
  return <span className={`badge ${tone ?? ''}`}>{children}</span>
}

export function ButtonLink({
  href, variant, external, children,
}: { href: string; variant?: 'primary'; external?: boolean; children: ReactNode }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <a className={`btn ${variant ?? ''}`} href={href} {...ext}>{children}</a>
}

export function WindowPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="win">
      <div className="win-bar">
        <span className="mono">{title}</span>
        <span className="win-btns" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  )
}

export function SectionHeader({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <header className="sec-head">
      <h2 id={id}>{title}</h2>
      {intro && <p className="muted">{intro}</p>}
    </header>
  )
}
