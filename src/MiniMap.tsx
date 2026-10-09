const rooms = [
  ['perfil', 'perfil'], ['stack', 'stack'], ['proyectos', 'proyectos'],
  ['experiencia', 'experiencia'], ['formacion', 'formación'], ['contacto', 'contacto'],
] as const
const W = 72, H = 36, STEP = 48
const pos = (i: number) => ({ x: i % 2 === 0 ? 8 : 80, y: 8 + i * STEP })

export default function MiniMap({ active }: { active: string }) {
  const pts = rooms.map((_, i) => { const p = pos(i); return `${p.x + W / 2},${p.y + H / 2}` }).join(' ')
  return (
    <aside className="minimap" aria-label="Mapa de secciones">
      <p className="mono">mapa</p>
      <svg viewBox={`0 0 160 ${rooms.length * STEP + 4}`} role="group" aria-label="Plano con las secciones">
        <polyline points={pts} className="mm-route" />
        {rooms.map(([id, label], i) => {
          const { x, y } = pos(i)
          const on = active === id
          return (
            <a key={id} href={`#${id}`} className={on ? 'on' : ''} aria-label={`Ir a ${label}`} aria-current={on ? 'location' : undefined}>
              <rect x={x} y={y} width={W} height={H} />
              <text x={x + W / 2} y={y + H / 2 + 3} textAnchor="middle">{label}</text>
            </a>
          )
        })}
      </svg>
    </aside>
  )
}