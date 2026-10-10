import { syncroShots } from './content'
import type { Shot } from './Carousel'

export type CaseStudy = {
  title: string
  subtitle: string
  status: string
  shots?: Shot[]
  shotsNote?: string
  facts: { label: string; value: string }[]
  contribution: { area: string; detail: string }[]
  teamNote: string
  sections: { title: string; paragraphs?: string[]; code?: string; points?: string[] }[]
  links: { label: string; href: string }[]
}

const patron = `const backendConectado = false;

const datosReservasMock: DatosReservas = { reservas: [], proximosSieteDias: 0 };
const datosReservasReal: DatosReservas = { reservas: [], proximosSieteDias: 0 };

export const datosReservas = backendConectado ? datosReservasReal : datosReservasMock;`

export const caseStudies: Record<string, CaseStudy> = {
  syncro: {
    title: 'Syncro',
    subtitle:
      'Plataforma web de reservas de canchas orientada al juego en equipo. Proyecto formativo escalable, desarrollado en el marco de Fundación Pescar.',
    status: 'Frontend completado · backend en incorporación',
    shots: syncroShots,
    shotsNote: 'Capturas de la aplicación. No todas las pantallas son de mi autoría: mi parte está detallada en «Mi contribución».',
    facts: [
      { label: 'tipo', value: 'Proyecto en equipo' },
      { label: 'equipo', value: '8–9 personas: Project Manager, backend y frontend' },
      { label: 'mi rol', value: 'Desarrollador frontend' },
      { label: 'método', value: 'Scrumban con Jira' },
      { label: 'stack', value: 'React, TypeScript, Vite, React Router, CSS con variables, Node.js, Express, APIs REST' },
    ],
    contribution: [
      { area: 'HomeHost', detail: 'Página principal del usuario Host.' },
      { area: 'PerfilPlayer', detail: 'Dashboard del jugador: sidebar, lógica visual de XP y niveles, topbar, tarjetas de estadísticas, próximo partido, equipo y actividad reciente.' },
      { area: 'Reservas', detail: 'Tabs, tarjetas de reservas y paneles laterales.' },
      { area: 'Equipos', detail: 'Tarjetas con badges (dueño, tipo, división), próximo partido, panel de cupos y beneficios.' },
      { area: 'PerfilHost · Estadísticas', detail: 'Selector de período y gráfico de líneas multi-segmento.' },
      { area: 'PerfilHost · Staff', detail: 'Tabla paginada con badges de rol.' },
      { area: 'PerfilHost · Valoraciones', detail: 'Gráfico de dona, tarjetas estadísticas y listado de reseñas.' },
      { area: 'Escudos de equipos', detail: 'Participé en la implementación de los logos de los equipos.' },
    ],
    teamNote: 'Syncro es un trabajo de equipo: el backend y la gestión del proyecto estuvieron a cargo de otros integrantes.',
    sections: [
      {
        title: 'El problema que resuelve',
        paragraphs: [
          'Armar un partido de fútbol hoy implica coordinar por WhatsApp quién juega, qué cancha hay libre y quién la paga. Los dueños de complejos, por su parte, llevan reservas, pagos y horarios en herramientas dispersas.',
          'Syncro es una plataforma web que conecta jugadores, equipos y canchas. El jugador busca partidos, equipos y canchas, reserva y sigue su progreso (nivel, XP e historial). El host administra su complejo desde un solo lugar: reservas, canchas, caja, estadísticas, staff y valoraciones.',
        ],
      },
      {
        title: 'Patrón de datos mock / API',
        paragraphs: [
          'Cada vista tiene un archivo de datos tipado con interfaces de TypeScript, y los componentes leen siempre de un único objeto exportado, sin datos escritos a mano en el JSX.',
          'Una bandera, backendConectado, elige entre un objeto mock con datos de ejemplo y un objeto real vacío, con marcadores ddbb_* que indican qué campo del backend va en cada lugar. Cuando el backend está listo, se cambia la bandera y se completa el objeto real, sin tocar ningún componente.',
        ],
        code: patron,
        points: [
          'Los valores derivados (contadores de pestañas, porcentajes, cantidad de páginas de una tabla) se calculan a partir de los datos y no se guardan aparte, para que nunca se desincronicen.',
          'La Project Manager lo usó como ejemplo para el resto del equipo y después pidió evolucionarlo hacia una capa de servicios, con tipos que representen el contrato del endpoint y estados de carga y error en el componente.',
        ],
      },
      {
        title: 'Otras decisiones técnicas',
        points: [
          'Variables CSS --player-* y utilidades compartidas para mantener la consistencia visual de las vistas del jugador.',
          'Mi lógica de conexión con el backend se usó como ejemplo para el equipo.',
        ],
      },
      {
        title: 'Equipo y flujo de trabajo',
        points: [
          'Tareas organizadas en Jira con Scrumban.',
          'Una rama por vista (front-<vista>) a partir de develop, con commits separados por sección.',
          'Pull Requests, Code Reviews y correcciones solicitadas por la Project Manager.',
        ],
      },
      {
        title: 'Dificultades y aprendizajes',
        points: [
          'CSS global: el proyecto no usa CSS Modules y dos compañeros usaron la misma clase para cosas distintas. Me generó un bug visual difícil de rastrear. Aprendí a diagnosticar con búsqueda global en el editor y con el inspector del navegador, en vez de probar cambios a ciegas.',
          'Layout y overflow: resolví desbordes en flexbox y grid con min-width: 0 y minmax(0, 1fr), y la inestabilidad de una tabla paginada con table-layout: fixed.',
          'Fidelidad al diseño: aprendí a comparar con los patrones que ya existían en el proyecto antes de inventar uno nuevo. Una vez agregué íconos con círculos de color que no estaban en el Figma.',
          'Git en equipo: una rama nació de un develop desactualizado y unos íconos quedaron sin commitear porque mis git add apuntaban solo a la carpeta de la vista. Desde entonces reviso con git status antes de cada add.',
          'Review y entorno: trabajé con feedback real de la PM (por ejemplo, un NaN% cuando los datos reales llegan en cero) y con un backend en el plan gratuito de Render que se duerme, CORS atado al puerto 5173 y variables de entorno.',
        ],
      },
      {
        title: 'Qué haría distinto',
        points: [
          'Diseñaría desde el principio una capa de servicios con estados de carga y error, y acordaría con backend el contrato de los endpoints (por ejemplo, si los roles de Staff los fija el front o los manda el back).',
          'Dupliqué Header, Hero y otros componentes por no tocar código ajeno. Fue una decisión defendible, pero hoy propondría al equipo una variante en el componente compartido, con un acuerdo previo.',
          'Usaría CSS Modules o prefijos únicos desde el inicio y resolvería el menú móvil: el sidebar desaparece bajo cierto ancho y no hay alternativa de navegación.',
        ],
      },
      {
        title: 'Estado actual',
        paragraphs: ['El frontend está terminado. Me estoy incorporando al desarrollo backend a partir del documento de arquitectura del sistema; hoy trabajo en las validaciones de usuario.'],
      },
    ],
    links: [
      { label: 'Sitio', href: 'https://syncro.dev.ar/home-player' },
      { label: 'Equipo', href: 'https://syncro-hub.vercel.app/' },
    ],
  },
}