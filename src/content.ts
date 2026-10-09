// Todo el contenido del sitio. Regla: nada se afirma sin respaldo.
export const profile = {
  name: 'Rodrigo Riquelme',
  role: 'Full Stack Web Developer Jr',
  focus: 'Foco en Frontend · React + TypeScript',
  intro:
    'Desarrollo interfaces web con React y TypeScript en equipos que trabajan con Git, Pull Requests y Jira. Hoy sumo backend con Node.js. Hace 8 años trabajo en cobranzas: sé comunicar, priorizar y entregar bajo presión.',
  email: 'rodrigoriquelme2198@gmail.com',
  github: 'https://github.com/rodrisebastian',
  // [VERIFICAR] copiar la URL exacta desde el perfil de LinkedIn (la original lleva tilde)
  linkedin: 'https://www.linkedin.com/in/rodrigosebastiánriquelme',
  cv: '/cv.pdf', // [PENDIENTE] agregar public/cv.pdf (sin teléfono)
}

export const facts = [
  'Equipo de 8–9 personas en Syncro',
  'Jira, GitHub, Pull Requests y Code Reviews',
  '8 años de experiencia profesional en cobranzas',
]

// Para estar en "usadas" hay que declarar evidencia: el tipo lo exige.
export type UsedTech = { name: string; evidence: string }
export const used: UsedTech[] = [
  { name: 'React', evidence: 'Syncro' },
  { name: 'TypeScript', evidence: 'Syncro' },
  { name: 'JavaScript', evidence: 'Syncro' },
  { name: 'HTML y CSS', evidence: 'Syncro' },
  { name: 'Node.js y Express', evidence: 'Syncro' }, // [CONFIRMAR] alcance en backend
  { name: 'APIs REST', evidence: 'Syncro' },
  { name: 'Git y GitHub', evidence: 'Syncro' },
  { name: 'Jira', evidence: 'Syncro' },
  { name: 'Figma', evidence: 'Syncro' },
]
export const learning = [
  'AWS (fundamentos)', 'MongoDB', 'Tailwind CSS', 'Bootstrap',
  'Python (básico)', 'Java (básico)', 'PHP (básico)', 'Power BI (intermedio)', 'Excel avanzado',
]

export type Project = {
  id: string
  title: string
  kind: string
  status: string
  tone: 'ok' | 'wip'
  summary: string
  points: string[]
  stack?: { label: string; items: string[] }
  links: { label: string; href: string }[]
}
export const projects: Project[] = [
  {
    id: 'syncro',
    title: 'Syncro',
    kind: 'Proyecto formativo escalable · Fundación Pescar · Equipo de 8–9',
    status: 'Frontend completado · backend en incorporación',
    tone: 'ok',
    summary:
      'Plataforma web de reservas de canchas y gestión de equipos, partidos y torneos.',
    points: [
      'Mi rol: frontend con React y TypeScript. Dashboard del jugador, reservas, equipos y panel del host (estadísticas, staff, valoraciones).',
      'Definí un patrón tipado para alternar datos mock y datos reales de API; la Project Manager lo destacó como ejemplo para el equipo.',
      'Mi lógica de conexión con el backend se usó como ejemplo para el equipo. Hoy trabajo en las validaciones de usuario.',
      'Flujo de equipo: Jira (Scrumban), ramas por funcionalidad, Pull Requests y Code Reviews.',
    ],
    links: [
      { label: 'Sitio', href: 'https://syncro.dev.ar/home-player' },
      { label: 'Equipo', href: 'https://syncro-hub.vercel.app/' },
      { label: 'Repositorio', href: 'https://github.com/Syncro-sports/Syncro' },
    ],
  },
  {
    id: 'nerdaula',
    title: 'NerdAula',
    kind: 'Proyecto personal',
    status: 'En desarrollo · backend y base de datos primero',
    tone: 'wip',
    summary:
      'Plataforma EdTech multiinstitución para gestión escolar, pensada como monolito modular. Arquitectura definida; implementación en curso.',
    points: [
      'Aislamiento entre instituciones diseñado en capas: guards, repositorios con contexto de institución, claves foráneas compuestas, pruebas de acceso cruzado y auditoría. Row-Level Security está en evaluación.',
      'Hoy es un proyecto en construcción, no un producto terminado. Hay más avance en backend y base de datos que en frontend.',
    ],
    stack: { label: 'Stack planificado', items: ['Nuxt', 'Vue', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker'] },
    links: [], // [PENDIENTE] repositorio
  },
]

export const experience = {
  title: 'Cobranzas — GGGroup',
  period: 'Octubre 2018 – Actualidad',
  points: [
    'Cumplimiento sostenido de objetivos operativos y seguimiento de KPIs.',
    'Gestión de cartera de clientes y negociación de pagos.',
    'Uso intensivo de CRM y manejo de grandes volúmenes de información.',
    'Resolución de conflictos y coordinación con equipos multidisciplinarios.',
  ],
}

export const timeline = [
  { when: '2017–2020', what: 'Ingeniería en Informática, UNLaM (hasta 2.º año)' },
  { when: '2018–hoy', what: 'Cobranzas en GGGroup' },
  { when: '2024', what: 'Desarrollo Web Full Stack, UTN' },
  { when: '2026', what: 'Fundación Pescar (J.P. Morgan), AWS y Syncro' },
  { when: 'En curso', what: 'NerdAula y backend de Syncro' },
]

export const education = [
  { title: 'Desarrollo Web Full Stack', where: 'Fundación Pescar (J.P. Morgan)', year: '2026' },
  { title: 'Desarrollador de Nube AWS', where: 'AWS Entrena Argentina / TIDWIT', year: '2026' },
  { title: 'Desarrollo Web Full Stack', where: 'Universidad Tecnológica Nacional (UTN)', year: '2024' },
  { title: 'Ingeniería en Informática (hasta 2.º año)', where: 'Universidad Nacional de La Matanza (UNLaM)', year: '2017–2020' },
]
export const language = 'Inglés intermedio (lectura y comprensión comunicativa)'
