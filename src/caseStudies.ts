import { syncroShots, qrimientoShots } from './content'
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

    qrimiento: {
    title: 'QRimiento',
    subtitle:
      'Regalos digitales con código QR para cualquier ocasión: en lugar de un objeto, se regala una página privada con fotos, una carta y una canción que se abre al escanear un QR.',
    status: 'MVP publicado · backend y pagos por construir',
    shots: qrimientoShots,
    shotsNote: 'Capturas de la landing publicada, con regalos de ejemplo.',
    facts: [
      { label: 'tipo', value: 'Proyecto personal, trabajado en solitario' },
      { label: 'mi rol', value: 'Producto, diseño UX/UI y desarrollo frontend' },
      { label: 'estado', value: 'MVP publicado, en validación con ventas manuales' },
      { label: 'stack', value: 'React, TypeScript, Vite, CSS, Cloudflare (Workers), Fontsource' },
      { label: 'repositorio', value: 'Privado, disponible a pedido' },
    ],
    contribution: [
      { area: 'Producto', detail: 'Análisis de competencia, definición de producto y de precios.' },
      { area: 'Diseño', detail: 'UX/UI e identidad visual propia.' },
      { area: 'Frontend', detail: 'Landing de venta, carrusel de ocasiones y experiencia de regalo.' },
      { area: 'Publicación', detail: 'Despliegue en Cloudflare con publicación automática desde GitHub.' },
    ],
    teamNote: 'Proyecto personal, trabajado en solitario de la idea a la publicación.',
    sections: [
      {
        title: 'De qué se trata',
        paragraphs: [
          'QRimiento es una plataforma de regalos digitales: en lugar de un objeto, se regala una página privada con fotos, una carta y una canción, que la otra persona abre escaneando un código QR. Está pensada para cualquier ocasión: pareja, amistad, mamá, papá, cumpleaños, casamiento, mascotas, Halloween y más.',
          'Los regalos con QR ya existen en el mercado europeo y anglosajón, pero casi no están pensados para Latinoamérica: pagos locales, voseo y precios en moneda local. QRimiento busca cubrir ese hueco, empezando por Argentina. Además del objetivo comercial, lo uso para llevar un producto real de punta a punta.',
        ],
      },
      {
        title: 'Qué incluye hoy',
        points: [
          'Landing de venta con demo en vivo: el celular del inicio muestra un regalo de ejemplo funcionando.',
          'Cuenta regresiva real hacia la próxima fecha importante, calculada según el día actual.',
          'Carrusel de 9 ocasiones con movimiento continuo y flechas; cada tarjeta lleva a un regalo de ejemplo propio.',
          'Experiencia de regalo: portada interactiva, carta, galería estilo polaroid, canción con el reproductor oficial de Spotify y nota de voz opcional, con un acento de color por ocasión.',
          'Identidad visual propia: fondo degradado, tipografías combinadas, símbolos musicales flotantes y animaciones al hacer scroll.',
          'Planes de precios en pesos, contacto por WhatsApp y mail, preguntas frecuentes y una sección de reseñas pensada para mostrar solo opiniones reales.',
          'Responsive y con soporte de «reducir movimiento».',
        ],
      },
      {
        title: 'Decisiones técnicas (implementadas)',
        points: [
          'Arquitectura guiada por datos: cada regalo es un archivo JSON y las ocasiones son datos, así que sumar una ocasión no requiere tocar componentes.',
          'Privacidad por diseño: enlaces largos y no adivinables, páginas no indexables, validación de rutas de imágenes y solo reproductores oficiales de Spotify o YouTube.',
          'Dinero tratado correctamente: importes en unidades mínimas y formato con Intl, preparado para varios mercados.',
          'Rendimiento: imágenes convertidas a WebP (de más de 20 MB a menos de 1 MB en el primer lote), fuentes alojadas en el propio sitio y un carrusel animado con requestAnimationFrame.',
          'Despliegue: repositorio privado en GitHub con publicación automática en Cloudflare, a costo cero.',
        ],
      },
      {
        title: 'Flujo previsto del producto',
        paragraphs: ['Hoy existen la landing y la página del regalo con su demo. El resto del flujo está en diseño:'],
        points: [
          'La persona elige la ocasión (pareja, amigas, mamá, mascota, casamiento, cumpleaños).',
          'Personaliza el regalo con fotos, carta, música y nota de voz.',
          'Paga: Mercado Pago en Argentina y PayPal para el resto.',
          'Recibe un enlace mágico y el QR para imprimir.',
          'El destinatario escanea el QR y abre la página del regalo.',
        ],
      },
      {
        title: 'Arquitectura diseñada (por construir)',
        points: [
          'Estados separados para Pedido, Pago y Regalo, para no mezclar el ciclo de cada uno.',
          'El pago se confirma solo por webhook verificado e idempotente, nunca por lo que diga el navegador.',
          'Un proveedor de pago por mercado y moneda detrás de una interfaz (patrón adaptador), para sumar mercados sin reescribir.',
          'Importes en unidades mínimas con código ISO 4217 y tabla de precios explícita por mercado; textos por mercado en archivos de traducción.',
          'Roles y permisos con modelo recurso:acción: administrador, cliente (sin cuenta, con enlace mágico), colaborador (por invitación), destinatario (token del QR, solo lectura) y soporte.',
          'Pruebas críticas obligatorias: acceso entre clientes, matriz de permisos, webhook repetido, token vencido, archivos inválidos, borrado con archivos, regalo suspendido e importe por mercado.',
        ],
      },
      {
        title: 'Método de trabajo',
        points: [
          'Desarrollo incremental: cada paso termina en algo que se puede ver y probar antes de seguir.',
          'Decisiones documentadas: qué se decidió, por qué y qué alternativa se descartó.',
          'Validación antes de construir: primero vendo de forma manual (hacia el Día de la Madre en Argentina) para probar oferta y precios.',
          'Priorización explícita: si el tiempo aprieta, se recortan extras visuales y mercados, nunca seguridad, privacidad ni pruebas.',
          'Datos verificados: precios, comisiones y normas se contrastan con fuentes oficiales.',
        ],
      },
      {
        title: 'Estado y próximos pasos',
        paragraphs: ['MVP publicado y en validación. Las ventas se gestionan de forma manual por WhatsApp para validar la demanda antes de automatizar.'],
        points: [
          'Próximos pasos: generador de QR con PDF imprimible, formulario de pedido, cobro con Mercado Pago y dominio propio.',
          'Por construir: editor de personalización, backend y base de datos (a definir; evalúo Node.js, Express y MongoDB), pagos con webhook, roles y permisos, almacenamiento de archivos, mails, enlaces mágicos y multi-mercado.',
        ],
      },
      {
        title: 'Qué demuestra',
        paragraphs: [
          'Hoy: pensamiento de producto, diseño UX/UI y desarrollo frontend de punta a punta, con publicación y foco en privacidad y rendimiento.',
          'Pendiente de demostrar al construir el backend: integración de pagos, seguridad y control de acceso.',
        ],
      },
    ],
    links: [{ label: 'Demo', href: 'https://qrimiento.qrimiento.workers.dev/' }],
  },
}