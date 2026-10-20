import { syncroShots, qrimientoShots, palacioShots } from './content'
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
    'palacio-de-papas': {
    title: 'El Palacio de las Papas',
    subtitle:
      'App de pedidos online mobile-first para gastronomía argentina. Es un negocio ficticio creado como proyecto de demostración: todos los datos son de ejemplo y no hay cobros reales.',
    status: 'En desarrollo · fases 0 a 5 hechas',
    shots: palacioShots,
    shotsNote: 'Captura de la home. El negocio y sus datos son ficticios.',
    facts: [
      { label: 'tipo', value: 'Proyecto personal de demostración (negocio ficticio)' },
      { label: 'mi rol', value: 'Diseño y desarrollo fullstack' },
      { label: 'estado', value: 'Fases 0 a 5 hechas; panel admin y checkout por construir' },
      { label: 'stack', value: 'Next.js 16, React 19, TypeScript, PostgreSQL (Supabase), Prisma 7, Tailwind CSS 4, shadcn/ui, Zod, TanStack Query, Zustand, BetterAuth' },
      { label: 'método', value: 'Una rama por fase, pull requests y desarrollo guiado con un asistente de IA como mentor técnico' },
      { label: 'repositorio', value: 'Público en GitHub' },
    ],
    contribution: [
      { area: 'Modelo de datos', detail: '15 tablas en PostgreSQL con Prisma, migración inicial y seed idempotente con el menú de ejemplo.' },
      { area: 'Backend', detail: 'Motor de precios y promociones, endpoint del carrito con validación y autenticación con roles.' },
      { area: 'Frontend', detail: 'Home, catálogo, detalle de producto y combo, carrito persistente, registro e inicio de sesión.' },
      { area: 'Diseño', detail: 'Dirección visual «Banquete Real»: paleta, tipografías y sistema de tokens.' },
      { area: 'Flujo de trabajo', detail: 'Ramas por fase, pull requests y commits con prefijos.' },
    ],
    teamNote: 'Negocio ficticio creado como pieza de portfolio. El menú, los precios, los horarios y los datos de contacto son de ejemplo.',
    sections: [
      {
        title: 'Qué es y para qué sirve',
        paragraphs: [
          'Sitio de pedidos online para una casa de comidas especializada en papas fritas, hamburguesas, pizzas, sánguches de milanesa, empanadas y combos. El cliente ve el menú, arma un carrito y hace el pedido; el dueño recibe los pedidos en un panel, los avanza de estado y ve estadísticas de ventas.',
          'El sitio incluye un aviso discreto en el footer que aclara que es un negocio ficticio.',
        ],
        points: [
          'Demostrar un producto fullstack completo y no solo una landing: catálogo, carrito, autenticación, pedidos, panel admin y métricas.',
          'Mostrar el tipo de solución que se puede entregar a un local que quiere vender por su propia web, sin comisiones de plataformas de delivery.',
          'Practicar un flujo profesional: ramas por fase, pull requests, validación en el servidor y accesibilidad.',
        ],
      },
      {
        title: 'Estado por fases',
        points: [
          'Hecho, fase 0: dirección visual, plan y modelo de datos.',
          'Hecho, fase 1: setup con Next.js, Tailwind, shadcn/ui, Prisma, Supabase y repositorio en GitHub.',
          'Hecho, fase 2: modelo de datos, migración inicial y seed con el menú.',
          'Hecho, fase 3: home, catálogo y detalle de producto y combo (solo lectura).',
          'Hecho, fase 4: carrito persistente con precios y descuentos calculados en el servidor.',
          'Hecho, fase 5: registro, inicio y cierre de sesión, y sesión en el header.',
          'En curso: rol ADMIN por seed y protección de /admin en el servidor.',
          'Planificado: checkout (6), perfil del cliente (7), panel admin de pedidos (8), catálogo y métricas (9), estado del pedido en tiempo real (10), pasada de diseño (11), control previo a publicar (12) y deploy en Vercel (13).',
        ],
      },
      {
        title: 'Qué se puede hacer hoy',
        points: [
          'Ver la home con hero, ofertas, combos y el menú por categorías, con precio original tachado y precio con descuento.',
          'Entrar al detalle de un producto o combo; el combo muestra qué incluye y cuánto se ahorra.',
          'Armar el carrito: agregar, quitar, cambiar cantidades y dejar una nota por producto. El carrito sobrevive a recargar la página.',
          'Registrarse, iniciar sesión y cerrar sesión; el header muestra el nombre del usuario.',
        ],
      },
      {
        title: 'Backend: precios y API (hecho)',
        paragraphs: [
          'Los descuentos pueden apuntar a un producto, una categoría o un combo, en porcentaje o monto fijo. Si varios aplican al mismo ítem se usa el de mayor descuento, sin acumular.',
          'El endpoint recibe solo qué se quiere y cuánto, nunca precios: el servidor los busca en la base, aplica las promociones y devuelve el carrito calculado.',
        ],
        code: `POST /api/cart/price
{ "items": [{ "kind": "product", "id": "...", "quantity": 2 }] }`,
        points: [
          'Validación con Zod: tipo, id, cantidad entera de 1 a 20 y hasta 50 líneas. Ante un error responde 400 con un mensaje genérico, sin detalles internos.',
          'Los productos que ya no están disponibles vuelven en una lista aparte y la interfaz ofrece quitarlos del carrito.',
          'La lógica vive en funciones puras reutilizables, que el checkout va a usar para calcular el total real del pedido.',
        ],
      },
      {
        title: 'Autenticación y seguridad',
        points: [
          'Hecho: el servidor calcula todos los precios y totales; el cliente nunca los envía.',
          'Hecho: validación de toda entrada con Zod en el carrito y los formularios.',
          'Hecho: contraseñas guardadas como hash y sesiones por cookie con BetterAuth, con mínimo de 8 caracteres.',
          'Hecho: el rol no se puede asignar desde el registro (por defecto CLIENT) y la ruta de retorno ?next= se valida para evitar redirecciones a sitios externos.',
          'Hecho: manejo en la interfaz del límite de intentos de login (respuesta 429) y secretos fuera del repositorio.',
          'En curso: protección de /admin por rol en el servidor, no solo ocultando botones.',
          'Planificado: transiciones de estado del pedido validadas en el servidor.',
        ],
      },
      {
        title: 'Modelo de datos',
        paragraphs: ['15 tablas: 12 del negocio y 3 de sesiones de autenticación. Incluye usuarios con rol, direcciones y zonas de envío, categorías, productos, combos, promociones, pedidos, pagos y configuración del local.'],
        points: [
          'Precios en enteros (pesos sin decimales), con una única función de redondeo.',
          'Los pedidos están pensados para guardar copia de nombres, precios y dirección, así que cambiar el menú no altera el historial.',
          'Si se borra un producto, las líneas de pedidos viejos conservan su información (la relación se anula).',
          'Los datos del local viven en la base y no en el código, para que el admin pueda editarlos.',
        ],
      },
      {
        title: 'Frontend, diseño y accesibilidad',
        points: [
          'Dirección visual «Banquete Real»: negro carbón, dorado, rojo y crema, con Alfa Slab One para títulos y Nunito Sans para texto.',
          'Mobile-first, con botones grandes y chips de categorías con scroll horizontal.',
          'Estados de carga (esqueletos), vacío y error en cada pantalla. Con Cache Components, la estructura aparece al instante y los datos llegan después.',
          'Enlace «Saltar al contenido», foco visible, áreas táctiles de al menos 44 px, formularios con etiquetas y errores vinculados a cada campo, y contraste revisado.',
        ],
      },
      {
        title: 'Decisiones técnicas',
        points: [
          'Precios en el servidor: el carrito del navegador no guarda precios, así que ningún dato local puede alterar un total.',
          'Cache Components de Next 16: se resolvió leyendo params y consultando la base dentro de Suspense.',
          'Prisma 7 con adaptador: dos cadenas de conexión, el pooler para la app y la conexión directa para migraciones y seed. Se fijó la versión estable y se evitó la 8 en etapa de pruebas.',
          'Tablas de autenticación escritas a mano: el generador de BetterAuth cambió de nombre entre versiones, así que se definieron los cuatro modelos fijos en el schema.',
          'Zustand con skipHydration: el carrito se rehidrata manualmente después de que Next hidrata la página, para evitar diferencias entre servidor y cliente.',
          'TanStack Query para calcular el carrito, con los datos anteriores visibles mientras recalcula.',
          'Seed idempotente: se puede correr varias veces sin duplicar datos.',
          'Sistema de diseño con tokens: colores y fuentes definidos una sola vez en Tailwind 4.',
        ],
      },
      {
        title: 'Flujo de trabajo',
        points: [
          'Visual Studio Code con Git Bash en Windows. Una rama por fase (phase-N-nombre), pull request, merge a main y borrado de la rama, con commits con prefijos (feat, chore, docs).',
          'Una fase termina cuando hay algo visible funcionando y una lista de pruebas manuales.',
          'Verificación: Prisma Studio para inspeccionar la base, tsc --noEmit para revisar tipos y las herramientas de desarrollo de Chrome.',
          'Desarrollo guiado paso a paso con un asistente de IA como mentor técnico, verificando la documentación vigente de cada librería antes de usarla.',
          'Convenciones: nombres de variables, funciones y archivos en inglés, y textos de la interfaz en español rioplatense.',
        ],
      },
      {
        title: 'Hoja de ruta pendiente',
        points: [
          'Roles y admin (en curso): usuario administrador por seed y protección de /admin en el servidor.',
          'Checkout: retiro o envío, pago por transferencia con comprobante o efectivo, pedido mínimo, costo de envío por zona y creación del pedido con precios congelados.',
          'Perfil del cliente: pedido activo con estado, historial y direcciones.',
          'Panel admin: pedidos con filtros y cambio de estado; ABM de productos, combos y promociones; métricas con gráfico.',
          'Estado del pedido en tiempo real, pasada de diseño, control de calidad y deploy en Vercel.',
        ],
      },
      {
        title: 'Qué demuestra',
        paragraphs: [
          'Hoy: modelado relacional y migraciones con Prisma y PostgreSQL, una API con validación y lógica de negocio en el servidor, autenticación con sesiones, manejo de estado del cliente y del servidor, y una interfaz accesible con identidad propia, con un flujo de ramas y pull requests por fase.',
          'Pendiente de demostrar: autorización por roles completa, checkout, panel de administración, tiempo real y deploy.',
        ],
      },
    ],
    links: [{ label: 'Repositorio', href: 'https://github.com/rodrisebastian/palacio-de-papas' }],
  },
}