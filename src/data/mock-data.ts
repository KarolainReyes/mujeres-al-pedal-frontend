export const currentEvent = {
  edition: "VI TRAVESÍA",
  name: "Mujeres al Pedal",
  campaign: "MONTAÑA ADENTRO",
  date: "11 de octubre de 2026",
  isoDate: "2026-10-11T05:30:00-05:00",
  place: "Restrepo, Valle del Cauca",
  startPoint: "Parque principal de Restrepo",
  startTime: "5:30 a. m.",
  description:
    "Una travesía para pedalear con libertad, retar la montaña y celebrar la fuerza de una comunidad que avanza junta.",
  heroImage: "/images/hero-cycling.jpg",
};

export const routes = [
  {
    slug: "ruta-baja",
    name: "Ruta Baja",
    label: "Disfruta",
    distance: 28,
    elevation: 430,
    difficulty: "Iniciación",
    bike: "MTB o gravel",
    time: "2–3 horas",
    color: "green",
    image: "/images/community-ride.jpg",
    description:
      "Una ruta amable para vivir la travesía a tu ritmo, conectar con el paisaje y sumar tus primeros kilómetros en comunidad.",
    recommendations: ["Hidratación de 1 litro", "Casco obligatorio", "Revisión básica de frenos", "Protector solar"],
  },
  {
    slug: "ruta-media",
    name: "Ruta Media",
    label: "Supérate",
    distance: 54,
    elevation: 980,
    difficulty: "Intermedia",
    bike: "MTB o gravel",
    time: "4–5 horas",
    color: "pink",
    image: "/images/mountain-route.jpg",
    description:
      "Subidas sostenidas, terreno cambiante y paisajes abiertos. El equilibrio perfecto entre aventura, ritmo y desafío.",
    recommendations: ["Hidratación de 1.5 litros", "Kit básico de pinchazos", "Alimentación para ruta", "Guantes y gafas"],
  },
  {
    slug: "ruta-alta",
    name: "Ruta Alta",
    label: "Conquista",
    distance: 82,
    elevation: 1750,
    difficulty: "Avanzada",
    bike: "MTB",
    time: "6–8 horas",
    color: "white",
    image: "/images/solo-cyclist.jpg",
    description:
      "El reto mayor: montaña, resistencia y técnica para ciclistas con experiencia que quieren dejarlo todo en el camino.",
    recommendations: ["Entrenamiento previo", "Hidratación de 2 litros", "Kit mecánico completo", "Nutrición planificada"],
  },
];

export const products = [
  {
    id: "p1",
    slug: "jersey-montana-adentro",
    name: "Jersey Montaña Adentro",
    category: "Jerseys",
    price: 189000,
    badge: "Nuevo",
    featured: true,
    description: "Jersey técnico de secado rápido, corte deportivo y bolsillos posteriores. Diseño oficial de la VI Travesía.",
    images: ["/images/jersey-pink.jpg", "/images/jersey-detail.jpg"],
    stock: { XS: 4, S: 8, M: 12, L: 5, XL: 2 },
  },
  {
    id: "p2",
    slug: "enterizo-fuerza-colectiva",
    name: "Enterizo Fuerza Colectiva",
    category: "Enterizos",
    price: 329000,
    badge: "Destacado",
    featured: true,
    description: "Enterizo premium de compresión media, badana de larga distancia y acabado aerodinámico.",
    images: ["/images/skinsuit-black.png", "/images/skinsuit-detail.jpg"],
    stock: { XS: 0, S: 3, M: 6, L: 2, XL: 0 },
  },
  {
    id: "p3",
    slug: "kit-esencial-pedal",
    name: "Kit Esencial Pedal",
    category: "Kits",
    price: 89000,
    badge: "Últimas unidades",
    featured: true,
    description: "Caramañola, medias técnicas y bandana en una edición que acompaña cada kilómetro.",
    images: ["/images/cycling-kit.jpg", "/images/kit-detail.png"],
    stock: { XS: 1, S: 2, M: 4, L: 1, XL: 0 },
  },
  {
    id: "p4",
    slug: "jersey-clasico-negro",
    name: "Jersey Clásico Negro",
    category: "Jerseys",
    price: 169000,
    badge: "Atemporal",
    featured: false,
    description: "La identidad de Mujeres al Pedal en una prenda versátil para entrenar durante todo el año.",
    images: ["/images/jersey-black.jpg", "/images/jersey-detail.jpg"],
    stock: { XS: 5, S: 7, M: 9, L: 6, XL: 3 },
  },
];

export const history = [
  { slug: "rodamos-sin-limites-2025", year: "2025", edition: "V", name: "Rodamos sin límites", place: "Buga, Valle", routes: "32 / 58 / 76 km", image: "/images/past-ride.jpg" },
  { slug: "juntas-somos-montana-2024", year: "2024", edition: "IV", name: "Juntas somos montaña", place: "Calima, Valle", routes: "25 / 48 / 70 km", image: "/images/community-ride.jpg" },
  { slug: "el-camino-es-nuestro-2023", year: "2023", edition: "III", name: "El camino es nuestro", place: "Ginebra, Valle", routes: "22 / 44 / 65 km", image: "/images/mountain-route.jpg" },
  { slug: "mas-fuertes-juntas-2022", year: "2022", edition: "II", name: "Más fuertes juntas", place: "Palmira, Valle", routes: "20 / 38 / 60 km", image: "/images/solo-cyclist.jpg" },
];

export const productCategories = ["Todo", "Jerseys", "Enterizos", "Kits"];

export const statistics = [
  { value: "5", label: "travesías realizadas" },
  { value: "+1.800", label: "mujeres rodando" },
  { value: "+89K", label: "kilómetros compartidos" },
  { value: "14", label: "municipios recorridos" },
];

export const testimonials = [
  { name: "Laura Mendoza", edition: "V Travesía · 2025", quote: "Llegué buscando un reto y terminé encontrando una comunidad que me impulsa a seguir.", image: "/images/testimonial-one.jpg" },
  { name: "Diana Valdés", edition: "IV Travesía · 2024", quote: "En la montaña entendí que cada una lleva su ritmo, pero ninguna tiene que pedalear sola.", image: "/images/testimonial-two.jpg" },
  { name: "Sofía Rojas", edition: "III Travesía · 2023", quote: "Mi primera ruta larga fue aquí. Ahora vuelvo para acompañar a otras en la suya.", image: "/images/community-ride.jpg" },
];

export const sponsors = ["Cicla Pro", "Valle Activo", "BiciLab", "Andina", "Rueda Libre", "Restrepo Vive"];

export const pickupPoints = [
  { id: "norte", name: "Punto Norte", address: "Av. 6 Norte # 24–18" },
  { id: "centro", name: "Punto Centro", address: "Calle 9 # 5–42" },
  { id: "sur", name: "Punto Sur", address: "Cra. 100 # 16–55" },
];

export const faqs = [
  { q: "¿La inscripción tiene costo?", a: "No. La inscripción a la VI Travesía Mujeres al Pedal es completamente gratuita." },
  { q: "¿Qué bicicleta necesito?", a: "La Ruta Baja y la Ruta Media admiten MTB o gravel. Para la Ruta Alta recomendamos una bicicleta MTB en excelente estado." },
  { q: "¿Puedo cambiar de ruta?", a: "En este prototipo el cambio no está habilitado. La política definitiva será comunicada antes de abrir inscripciones." },
  { q: "¿Dónde recojo mi kit?", a: "La fecha y el punto de entrega del kit de participante se comunicarán antes del evento." },
  { q: "¿Puedo comprar merch sin participar?", a: "Sí. La tienda está abierta para toda la comunidad, participes o no en la travesía." },
  { q: "¿Cómo funciona la entrega?", a: "Puedes recoger en uno de los tres puntos disponibles o elegir entrega inmediata. El costo del envío lo asume el comprador." },
];

export const orderStatuses = ["Pendiente", "Pagado", "En preparación", "Listo para entregar", "Entregado", "Cancelado", "Reembolsado"];

export const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
