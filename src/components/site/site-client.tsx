"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Bike, CalendarDays, Check, ChevronRight, Clock3,
  Camera, Heart, LockKeyhole, Mail, MapPin, Menu, MessageCircle, Minus,
  Package, Play, Plus, Search, ShieldCheck, ShoppingBag, Sparkles,
  Store, Trash2, TrendingUp, User, X, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  currentEvent, faqs, formatCOP, history, pickupPoints, productCategories, products, routes,
  sponsors, statistics, testimonials,
} from "@/data/mock-data";
import { useCart } from "@/store/use-cart";
import type { CartItem, ProductSize as Size } from "@/types/cart";

const navItems = [
  ["Inicio", "/"], ["Nosotras", "/nosotras"], ["Travesía", "/travesia"],
  ["Travesías anteriores", "/travesias"], ["Tienda", "/tienda"],
  ["Patrocinadores", "/patrocinadores"],
];

function Brand() {
  return (
    <span className="brand-mark" aria-label="Mujeres al Pedal">
      <span className="brand-wheel"><Bike size={21} /></span>
      <span>MUJERES <b>AL PEDAL</b></span>
    </span>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => new Date(currentEvent.isoDate).getTime());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const difference = Math.max(0, new Date(currentEvent.isoDate).getTime() - now);
  const units = [
    [Math.floor(difference / 86400000), "días"],
    [Math.floor((difference / 3600000) % 24), "horas"],
    [Math.floor((difference / 60000) % 60), "min"],
    [Math.floor((difference / 1000) % 60), "seg"],
  ];
  return (
    <div className="countdown" aria-label="Cuenta regresiva para la travesía">
      {units.map(([value, label]) => (
        <div key={label as string}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>
      ))}
    </div>
  );
}

function SectionEyebrow({ children, green = false }: { children: React.ReactNode; green?: boolean }) {
  return <p className={green ? "eyebrow green" : "eyebrow"}><span />{children}</p>;
}

function RouteProfile({ routeIndex = 1 }: { routeIndex?: number }) {
  const paths = [
    "M10 125 C65 110 70 65 122 92 S202 118 245 65 S320 42 390 78",
    "M10 132 C48 115 77 122 112 82 S180 103 220 48 S280 92 320 46 S365 50 390 24",
    "M10 135 C50 132 66 67 105 83 S155 111 190 53 S237 21 265 74 S312 114 340 43 S370 33 390 10",
  ];
  return (
    <svg className="route-profile" viewBox="0 0 400 150" role="img" aria-label="Perfil ilustrativo de elevación">
      <defs>
        <linearGradient id={`area-${routeIndex}`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor={routeIndex === 0 ? "#8CC63F" : "#F0148C"} stopOpacity=".45" />
          <stop offset="1" stopColor="#0A0A0A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${paths[routeIndex]} L390 150 L10 150 Z`} fill={`url(#area-${routeIndex})`} />
      <path d={paths[routeIndex]} fill="none" stroke={routeIndex === 0 ? "#8CC63F" : "#F0148C"} strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy={routeIndex === 0 ? 125 : routeIndex === 1 ? 132 : 135} r="6" fill="#fff" />
      <circle cx="390" cy={routeIndex === 0 ? 78 : routeIndex === 1 ? 24 : 10} r="6" fill="#fff" />
    </svg>
  );
}

function Header({ path, navigate, cartCount, openCart }: {
  path: string; navigate: (path: string) => void; cartCount: number; openCart: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (next: string) => { setMobileOpen(false); navigate(next); };
  return (
    <header className="site-header">
      <button className="brand-button" onClick={() => go("/")}><Brand /></button>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navItems.map(([label, href]) => (
          <button key={href} className={path === href ? "active" : ""} onClick={() => go(href)}>{label}</button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="login-link" onClick={() => go("/login")}><User size={17} /> Iniciar sesión</button>
        <button className="cart-button" onClick={openCart} aria-label={`Abrir carrito, ${cartCount} productos`}>
          <ShoppingBag size={20} /><span>{cartCount}</span>
        </button>
        <button className="button button-small desktop-cta" onClick={() => go("/inscripcion")}>INSCRÍBETE</button>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menú">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map(([label, href]) => <button key={href} onClick={() => go(href)}>{label}<ChevronRight /></button>)}
          <button onClick={() => go("/login")}>Iniciar sesión<ChevronRight /></button>
          <button className="button" onClick={() => go("/inscripcion")}>INSCRÍBETE GRATIS</button>
        </div>
      )}
    </header>
  );
}

function Footer({ navigate }: { navigate: (path: string) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div><Brand /><p>Deporte, montaña y comunidad.<br />Rodamos juntas desde 2021.</p></div>
        <div><h4>EXPLORA</h4>{navItems.slice(0, 5).map(([l, h]) => <button key={h} onClick={() => navigate(h)}>{l}</button>)}</div>
        <div><h4>INFO</h4><button>Política de privacidad</button><button>Términos y condiciones</button><button>Tratamiento de datos</button></div>
        <div><h4>SÍGUENOS</h4><div className="social-row"><button aria-label="Instagram"><Camera /></button><button aria-label="TikTok"><Zap /></button><button aria-label="Facebook"><MessageCircle /></button><button aria-label="WhatsApp"><Mail /></button></div><p>@mujeresalpedal</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Mujeres al Pedal</span><span>HECHO PARA MOVERSE</span></div>
    </footer>
  );
}

function RouteCard({ route, index, navigate }: { route: typeof routes[number]; index: number; navigate: (path: string) => void }) {
  return (
    <article className={`route-card route-${route.color}`}>
      <div className="route-number">0{index + 1}</div>
      <div className="route-card-image"><img src={route.image} alt={`Ciclistas en ${route.name}`} /></div>
      <div className="route-card-copy">
        <span>{route.label}</span><h3>{route.name}</h3>
        <div className="route-metrics"><b>{route.distance}<small>KM</small></b><b>{route.elevation}<small>M+</small></b><b>{route.difficulty}<small>NIVEL</small></b></div>
        <p>{route.description}</p>
        <div className="split-actions"><button className="text-link" onClick={() => navigate(`/travesia/${route.slug}`)}>VER RUTA <ArrowRight /></button><button className="button button-outline" onClick={() => navigate(`/inscripcion?route=${route.slug}`)}>INSCRIBIRME</button></div>
      </div>
    </article>
  );
}

function ProductCard({ product, navigate, addToCart }: {
  product: typeof products[number]; navigate: (path: string) => void; addToCart: (id: string, size: Size, qty?: number) => void;
}) {
  const firstSize = (Object.entries(product.stock).find(([, stock]) => stock > 0)?.[0] ?? "S") as Size;
  return (
    <article className="product-card">
      <button className="product-image" onClick={() => navigate(`/tienda/${product.slug}`)}>
        <img src={product.images[0]} alt={product.name} /><span className="product-badge">{product.badge}</span><span className="quick-view">VER PRODUCTO</span>
      </button>
      <div className="product-copy"><div><span>{product.category}</span><h3>{product.name}</h3></div><strong>{formatCOP(product.price)}</strong></div>
      <div className="sizes">{Object.entries(product.stock).map(([size, stock]) => <span className={stock === 0 ? "sold-out" : ""} key={size}>{size}</span>)}</div>
      <button className="button button-dark full" onClick={() => addToCart(product.id, firstSize)}>AGREGAR AL CARRITO <ShoppingBag size={18} /></button>
    </article>
  );
}

function HomePage({ navigate, addToCart }: { navigate: (path: string) => void; addToCart: (id: string, size: Size, qty?: number) => void }) {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,10,10,.92) 0%, rgba(10,10,10,.45) 48%, rgba(10,10,10,.08) 78%), url(${currentEvent.heroImage})` }}>
        <div className="hero-gridlines" />
        <div className="hero-content reveal">
          <SectionEyebrow>{currentEvent.edition} · 2026</SectionEyebrow>
          <h1>MUJERES<br /><em>AL PEDAL</em></h1>
          <p className="campaign">{currentEvent.campaign}</p>
          <div className="event-meta"><span><MapPin />{currentEvent.place}</span><span><CalendarDays />{currentEvent.date}</span></div>
          <div className="hero-actions"><button className="button" onClick={() => navigate("/inscripcion")}>INSCRÍBETE GRATIS <ArrowRight /></button><button className="button button-glass" onClick={() => navigate("/travesia#rutas")}>CONOCE LAS RUTAS</button></div>
          <Countdown />
        </div>
        <div className="hero-vertical">FUERZA · AVENTURA · COMUNIDAD ·</div>
      </section>

      <section className="manifesto section-pad">
        <div className="manifesto-image"><img src="/images/solo-cyclist.jpg" alt="Ciclista avanzando por una ruta de montaña" /><span>EL CAMINO ES NUESTRO</span></div>
        <div className="manifesto-copy"><SectionEyebrow green>NUESTRO MANIFIESTO</SectionEyebrow><h2>NO ES SOLO<br /><i>PEDALEAR.</i></h2><p>Es elegir la aventura. Es descubrir de qué estamos hechas en cada subida. Es cuidarnos, reírnos y llegar juntas.</p><p>La meta importa, pero la fuerza está en todo lo que vivimos para alcanzarla.</p><button className="text-link" onClick={() => navigate("/nosotras")}>CONOCE NUESTRA HISTORIA <ArrowRight /></button></div>
      </section>

      <section className="story-band"><div><p>UNA COMUNIDAD QUE SE MUEVE</p><h2>NACIMOS PARA ABRIR CAMINO.</h2></div><p>Mujeres al Pedal reúne ciclistas de diferentes niveles alrededor de una misma idea: la bicicleta puede transformar la manera en la que vivimos el territorio, enfrentamos nuestros retos y construimos comunidad.</p><button className="button button-light" onClick={() => navigate("/nosotras")}>CONÓCENOS</button></section>

      <section className="routes-section section-pad" id="rutas"><div className="section-heading"><div><SectionEyebrow>VI TRAVESÍA</SectionEyebrow><h2>ELIGE<br /><em>TU RETO</em></h2></div><p>Tres rutas. Tres formas de vivir la montaña. Elige la que conecte con tu nivel y tus ganas de superarte.</p></div><div className="route-list">{routes.map((route, i) => <RouteCard key={route.slug} route={route} index={i} navigate={navigate} />)}</div></section>

      <section className="stats-section section-pad"><div className="stats-intro"><SectionEyebrow green>DESDE 2021</SectionEyebrow><h2>AVANZAMOS<br />EN EQUIPO</h2><p>Cifras mock editables para mostrar el impacto acumulado de la comunidad.</p></div><div className="stats-grid">{statistics.map((stat, i) => <div key={stat.label}><span>0{i + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p></div>)}</div></section>

      <section className="experience section-pad"><div className="section-heading"><div><SectionEyebrow>MÁS QUE UNA RUTA</SectionEyebrow><h2>ASÍ SE VIVE<br /><em>LA AVENTURA</em></h2></div></div><div className="editorial-gallery"><div className="gallery-tall"><img src="/images/community-ride.jpg" alt="Grupo de mujeres en bicicleta" /><span>JUNTAS LLEGAMOS MÁS LEJOS</span></div><div className="gallery-wide"><img src="/images/mountain-route.jpg" alt="Ruta ciclística entre montañas" /></div><button className="gallery-video"><img src="/images/past-ride.jpg" alt="Momentos de una travesía anterior" /><span><Play fill="currentColor" /> VER VIDEO</span></button><div className="gallery-quote"><Zap /><p>“La montaña no se hace más pequeña. Nosotras nos hacemos más fuertes.”</p></div></div></section>

      <section className="history-preview section-pad"><div className="section-heading"><div><SectionEyebrow green>NUESTRA HUELLA</SectionEyebrow><h2>5 EDICIONES.<br />MILES DE HISTORIAS.</h2></div><button className="text-link" onClick={() => navigate("/travesias")}>VER TODAS <ArrowRight /></button></div><div className="history-strip">{history.slice(0, 3).map((item) => <article key={item.year}><img src={item.image} alt={item.name} /><span>{item.year}</span><h3>{item.name}</h3><p>{item.place}</p></article>)}</div></section>

      <section className="shop-preview section-pad"><div className="section-heading"><div><SectionEyebrow>EQUÍPATE</SectionEyebrow><h2>MERCH OFICIAL<br /><em>PARA RODAR</em></h2></div><button className="text-link" onClick={() => navigate("/tienda")}>IR A LA TIENDA <ArrowRight /></button></div><div className="product-grid">{products.slice(0, 3).map(product => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} />)}</div></section>

      <section className="testimonials section-pad"><SectionEyebrow green>VOCES EN LA RUTA</SectionEyebrow><div className="testimonial-grid">{testimonials.map((item, i) => <article key={item.name} className={i === 1 ? "featured-testimonial" : ""}><img src={item.image} alt={item.name} /><div><span>“</span><blockquote>{item.quote}</blockquote><b>{item.name}</b><small>{item.edition}</small></div></article>)}</div></section>

      <section className="sponsors-section section-pad"><div className="sponsor-copy"><SectionEyebrow>ALIADOS</SectionEyebrow><h2>ELLOS TAMBIÉN<br /><em>PEDALEan CON NOSOTRAS</em></h2><p>Marcas que creen en el deporte femenino y en el poder de mover comunidades.</p><button className="button button-light" onClick={() => navigate("/patrocinadores")}>CONVIÉRTETE EN PATROCINADOR</button></div><div className="logo-wall">{sponsors.map((s, i) => <div key={s}><span className={i % 2 ? "logo-green" : "logo-pink"}>{s.slice(0, 1)}</span>{s}</div>)}</div></section>

      <section className="instagram-section section-pad"><div className="section-heading"><div><SectionEyebrow green>@MUJERESALPEDAL</SectionEyebrow><h2>SÍGUENOS<br />EN LA RUTA</h2></div><Camera size={54} /></div><div className="insta-grid">{["solo-cyclist.jpg", "community-ride.jpg", "mountain-route.jpg", "past-ride.jpg"].map((img, i) => <div key={img}><img src={`/images/${img}`} alt={`Publicación de comunidad ${i + 1}`} /><span><Heart /> {132 + i * 47}</span></div>)}</div></section>

      <section className="faq-section section-pad"><div><SectionEyebrow>RESUELVE TUS DUDAS</SectionEyebrow><h2>PREGUNTAS<br /><em>FRECUENTES</em></h2><p>¿No encuentras lo que buscas? Escríbenos por WhatsApp.</p></div><Accordion type="single" collapsible className="faq-list">{faqs.map((faq, i) => <AccordionItem value={`faq-${i}`} key={faq.q}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>)}</Accordion></section>

      <section className="newsletter"><div><SectionEyebrow green>MANTENTE EN MOVIMIENTO</SectionEyebrow><h2>LAS NOVEDADES<br />LLEGAN PRIMERO AQUÍ.</h2></div><form onSubmit={(e) => { e.preventDefault(); toast.success("¡Ya estás en la ruta! Suscripción simulada."); }}><label><span>Tu correo electrónico</span><input type="email" placeholder="nombre@correo.com" required /></label><button className="button" type="submit">QUIERO ENTERARME <ArrowRight /></button></form></section>

      <section className="final-cta" style={{ backgroundImage: "linear-gradient(90deg,rgba(10,10,10,.9),rgba(10,10,10,.2)),url(/images/past-ride.jpg)" }}><SectionEyebrow>11 · 10 · 2026</SectionEyebrow><h2>¿LISTA PARA LA<br /><em>PRÓXIMA AVENTURA?</em></h2><button className="button" onClick={() => navigate("/inscripcion")}>QUIERO PARTICIPAR <ArrowRight /></button></section>
    </>
  );
}

function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return <main className="inner-page"><section className="inner-hero split-hero"><div><SectionEyebrow green>QUIÉNES SOMOS</SectionEyebrow><h1>UNA BICI.<br />MUCHAS MUJERES.<br /><em>UN MISMO IMPULSO.</em></h1><p>Nacimos para construir espacios donde cada mujer pueda encontrar su ruta, su ritmo y una comunidad que la acompañe.</p></div><img src="/images/community-ride.jpg" alt="Comunidad Mujeres al Pedal" /></section><section className="origin section-pad"><div><span className="giant-year">2021</span><h2>EL PRIMER KILÓMETRO</h2></div><div><p>Todo comenzó con un grupo de mujeres que quería pedalear sin presión y compartir el camino. La primera salida se convirtió en una cita. La cita, en una comunidad. Y la comunidad, en una travesía anual.</p><p>Hoy seguimos creciendo con la misma convicción: cuando una mujer se siente acompañada, se atreve a ir más lejos.</p></div></section><section className="values section-pad">{[["FUERZA", "Nos retamos sin compararnos."], ["COMUNIDAD", "Nadie rueda sola."], ["AVENTURA", "Cada camino puede transformarnos."], ["RESPETO", "Cuidamos el territorio y a quienes lo recorren."]].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</section><section className="about-photo"><img src="/images/mountain-route.jpg" alt="Ciclistas recorriendo la montaña" /><div><h2>NO BUSCAMOS LLEGAR PRIMERO.<br /><em>BUSCAMOS LLEGAR JUNTAS.</em></h2><button className="button" onClick={() => navigate("/inscripcion")}>ÚNETE A LA TRAVESÍA</button></div></section></main>;
}

function EventPage({ navigate }: { navigate: (path: string) => void }) {
  return <main className="inner-page"><section className="event-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.92),rgba(10,10,10,.18)),url(${currentEvent.heroImage})` }}><div><SectionEyebrow>{currentEvent.edition}</SectionEyebrow><h1>{currentEvent.campaign}</h1><p>{currentEvent.description}</p><button className="button" onClick={() => navigate("/inscripcion")}>INSCRÍBETE GRATIS <ArrowRight /></button></div><Countdown /></section><section className="event-facts section-pad">{[[<CalendarDays key="i" />, currentEvent.date], [<MapPin key="i" />, currentEvent.place], [<Clock3 key="i" />, currentEvent.startTime], [<Bike key="i" />, "3 rutas"]].map(([icon, text], i) => <div key={i}>{icon}<span>{i === 0 ? "FECHA" : i === 1 ? "LUGAR" : i === 2 ? "SALIDA" : "RETO"}</span><strong>{text}</strong></div>)}</section><section className="event-story section-pad"><div><SectionEyebrow green>LA EXPERIENCIA</SectionEyebrow><h2>UN DÍA PARA<br /><em>RECORDAR SIEMPRE.</em></h2><p>Nos encontramos antes del amanecer en el parque principal de Restrepo. Después de la bienvenida y el calentamiento, cada grupo toma su ruta con acompañamiento logístico y puntos de hidratación mock.</p><button className="text-link"><Play /> VER VIDEO DE LA EDICIÓN ANTERIOR</button></div><img src="/images/past-ride.jpg" alt="Salida de una travesía Mujeres al Pedal" /></section><section className="routes-section section-pad" id="rutas"><div className="section-heading"><div><SectionEyebrow>RUTAS 2026</SectionEyebrow><h2>ENCUENTRA<br /><em>TU NIVEL</em></h2></div></div><div className="route-list">{routes.map((route, i) => <RouteCard key={route.slug} route={route} index={i} navigate={navigate} />)}</div></section><section className="regulation section-pad"><div><ShieldCheck /><h2>REGLAMENTO</h2><p>Conoce las condiciones de participación, recomendaciones de seguridad y responsabilidades de cada participante.</p></div><button className="button button-light" onClick={() => toast.info("Descarga simulada del reglamento.")}>VER REGLAMENTO <ArrowRight /></button></section><section className="event-sponsors section-pad"><SectionEyebrow green>CON EL APOYO DE</SectionEyebrow><div className="logo-wall">{sponsors.map(s => <div key={s}>{s}</div>)}</div></section></main>;
}

function RouteDetailPage({ route, navigate }: { route: typeof routes[number]; navigate: (path: string) => void }) {
  const index = routes.findIndex(r => r.slug === route.slug);
  return <main className="inner-page route-detail"><section className="route-detail-hero"><img src={route.image} alt={route.name} /><div><button className="back-link" onClick={() => navigate("/travesia#rutas")}><ArrowLeft /> VOLVER A RUTAS</button><SectionEyebrow green>VI TRAVESÍA · {route.label}</SectionEyebrow><h1>{route.name}</h1><p>{route.description}</p><button className="button" onClick={() => navigate(`/inscripcion?route=${route.slug}`)}>INSCRIBIRME EN ESTA RUTA</button></div></section><section className="route-facts section-pad"><div><span>DISTANCIA</span><strong>{route.distance}<small> KM</small></strong></div><div><span>DESNIVEL</span><strong>{route.elevation}<small> M+</small></strong></div><div><span>DIFICULTAD</span><strong>{route.difficulty}</strong></div><div><span>BICICLETA</span><strong>{route.bike}</strong></div><div><span>TIEMPO EST.</span><strong>{route.time}</strong></div></section><section className="route-map section-pad"><div><SectionEyebrow>PERFIL ILUSTRATIVO</SectionEyebrow><h2>ASÍ SE SIENTE<br /><em>EL RECORRIDO</em></h2><p>Representación visual mock. No corresponde a un archivo GPX ni debe usarse para navegación.</p></div><RouteProfile routeIndex={index} /></section><section className="recommendations section-pad"><div><SectionEyebrow green>ANTES DE SALIR</SectionEyebrow><h2>PREPÁRATE<br />PARA EL RETO</h2></div><div>{route.recommendations.map((item, i) => <p key={item}><span>0{i + 1}</span>{item}</p>)}</div></section><section className="route-bottom-cta"><h2>ESTA ES TU RUTA.<br /><em>HAZLA TUYA.</em></h2><button className="button" onClick={() => navigate(`/inscripcion?route=${route.slug}`)}>INSCRÍBETE GRATIS <ArrowRight /></button></section></main>;
}

function HistoryPage({ navigate }: { navigate: (path: string) => void }) {
  return <main className="inner-page"><section className="simple-hero"><SectionEyebrow green>NUESTRA HISTORIA SOBRE RUEDAS</SectionEyebrow><h1>TRAVESÍAS<br /><em>ANTERIORES</em></h1><p>Cada edición deja kilómetros, aprendizajes y una comunidad más grande.</p></section><section className="history-page section-pad">{history.map((item, i) => <article key={item.year} className={i % 2 ? "reverse" : ""}><img src={item.image} alt={item.name} /><div><span>{item.year}</span><small>EDICIÓN {item.edition}</small><h2>{item.name}</h2><p><MapPin /> {item.place}</p><p><TrendingUp /> Rutas: {item.routes}</p><button className="text-link" onClick={() => navigate(`/travesias/${item.slug}`)}>VER EDICIÓN <ArrowRight /></button></div></article>)}</section><section className="route-archive section-pad"><SectionEyebrow>ARCHIVO DE RUTAS</SectionEyebrow><h2>LOS CAMINOS<br />QUE YA CONQUISTAMOS</h2><div>{history.map((item, i) => <article key={item.year}><span>{item.year}</span><RouteProfile routeIndex={i % 3} /><p>{item.routes}</p></article>)}</div></section></main>;
}

function HistoryDetailPage({ item, navigate }: { item: typeof history[number]; navigate: (path: string) => void }) {
  return <main className="inner-page route-detail"><section className="route-detail-hero"><img src={item.image} alt={item.name} /><div><button className="back-link" onClick={() => navigate("/travesias")}><ArrowLeft /> VOLVER AL HISTÓRICO</button><SectionEyebrow green>EDICIÓN {item.edition} · {item.year}</SectionEyebrow><h1>{item.name}</h1><p>Una edición que reunió a la comunidad para descubrir nuevos caminos, compartir la montaña y seguir creciendo juntas.</p></div></section><section className="event-facts section-pad"><div><CalendarDays /><span>AÑO</span><strong>{item.year}</strong></div><div><MapPin /><span>LUGAR</span><strong>{item.place}</strong></div><div><TrendingUp /><span>RUTAS</span><strong>{item.routes}</strong></div><div><Bike /><span>COMUNIDAD</span><strong>Mujeres al Pedal</strong></div></section><section className="event-story section-pad"><div><SectionEyebrow green>MEMORIAS DE LA RUTA</SectionEyebrow><h2>KILÓMETROS QUE<br /><em>NOS TRANSFORMAN.</em></h2><p>Esta página conserva la referencia visual para fotografías, resultados y relatos de cada edición. El contenido definitivo podrá reemplazarse desde los datos mock.</p><button className="button" onClick={() => navigate("/inscripcion")}>VIVE LA PRÓXIMA TRAVESÍA <ArrowRight /></button></div><img src="/images/community-ride.jpg" alt="Comunidad Mujeres al Pedal" /></section></main>;
}

function ShopPage({ navigate, addToCart }: { navigate: (path: string) => void; addToCart: (id: string, size: Size, qty?: number) => void }) {
  const [filter, setFilter] = useState("Todo");
  const filtered = filter === "Todo" ? products : products.filter(p => p.category === filter);
  return <main className="inner-page shop-page"><section className="shop-hero"><div><SectionEyebrow green>TIENDA OFICIAL</SectionEyebrow><h1>VISTE LA<br /><em>ENERGÍA</em></h1><p>Merch para llevar la fuerza de la comunidad dentro y fuera de la ruta.</p></div><img src="/images/jersey-pink.jpg" alt="Colección Mujeres al Pedal" /></section><section className="shop-controls section-pad"><div>{productCategories.map(c => <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>)}</div><span>{filtered.length} PRODUCTOS</span></section><section className="product-grid shop-grid">{filtered.map(product => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} />)}</section><section className="shop-note section-pad"><Package /><div><h3>ENTREGAS FLEXIBLES</h3><p>Recoge en uno de nuestros puntos o solicita entrega inmediata. El costo de envío es asumido por el comprador.</p></div></section></main>;
}

function ProductPage({ product, navigate, addToCart }: { product: typeof products[number]; navigate: (path: string) => void; addToCart: (id: string, size: Size, qty?: number) => void }) {
  const available = Object.entries(product.stock).find(([, stock]) => stock > 0)?.[0] as Size;
  const [size, setSize] = useState<Size>(available);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [zoomOpen, setZoomOpen] = useState(false);
  const related = products.filter(p => p.id !== product.id).slice(0, 3);
  return <main className="inner-page product-page"><button className="back-link product-back" onClick={() => navigate("/tienda")}><ArrowLeft /> VOLVER A LA TIENDA</button><section className="product-detail"><div className="product-gallery"><button className="main-product-image" onClick={() => setZoomOpen(true)}><img src={activeImage} alt={product.name} /><span><Search /> AMPLIAR</span></button><div>{product.images.map(image => <button key={image} className={activeImage === image ? "active" : ""} onClick={() => setActiveImage(image)}><img src={image} alt="Vista del producto" /></button>)}</div></div><div className="product-info"><span className="product-badge static">{product.badge}</span><small>{product.category}</small><h1>{product.name}</h1><strong className="product-price">{formatCOP(product.price)}</strong><p>{product.description}</p><hr /><label>SELECCIONA TU TALLA</label><div className="size-selector">{Object.entries(product.stock).map(([s, stock]) => <button key={s} disabled={stock === 0} className={size === s ? "active" : ""} onClick={() => setSize(s as Size)}>{s}<small>{stock === 0 ? "Agotado" : stock <= 2 ? `${stock} disp.` : ""}</small></button>)}</div><label>CANTIDAD</label><div className="qty-control"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus /></button><span>{qty}</span><button onClick={() => setQty(Math.min(product.stock[size], qty + 1))}><Plus /></button></div><button className="button full large" onClick={() => addToCart(product.id, size, qty)}>AGREGAR AL CARRITO <ShoppingBag /></button><div className="product-assurances"><p><Check /> Stock simulado por talla</p><p><Package /> Recogida o entrega inmediata</p><p><ShieldCheck /> Checkout visual con Wompi</p></div></div></section><section className="related section-pad"><div className="section-heading"><div><SectionEyebrow>COMPLETA TU KIT</SectionEyebrow><h2>TAMBIÉN TE<br /><em>PUEDE GUSTAR</em></h2></div></div><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />)}</div></section><Dialog open={zoomOpen} onOpenChange={setZoomOpen}><DialogContent className="zoom-dialog"><DialogHeader><DialogTitle>{product.name}</DialogTitle><DialogDescription>Vista ampliada del producto</DialogDescription></DialogHeader><img src={activeImage} alt={product.name} /></DialogContent></Dialog></main>;
}

function RegistrationPage({ navigate }: { navigate: (path: string) => void }) {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialRoute = params.get("route") ?? "ruta-media";
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<Record<string, string | boolean>>({ route: initialRoute, photos: true, data: false, responsibility: false });
  const update = (key: string, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));
  const age = form.birth ? Math.max(0, new Date(currentEvent.isoDate).getFullYear() - new Date(form.birth as string).getFullYear()) : "—";
  const titles = ["Datos personales", "Información deportiva", "Información médica", "Contacto de emergencia", "Información adicional", "Autorizaciones", "Revisa y confirma"];
  const next = () => {
    if (step === 6 && (!form.responsibility || !form.data)) { toast.error("Acepta las autorizaciones obligatorias para continuar."); return; }
    if (step < 7) setStep(step + 1); else setSuccess(true);
  };
  if (success) return <main className="registration-success"><div className="success-badge"><Check /></div><SectionEyebrow green>INSCRIPCIÓN COMPLETADA</SectionEyebrow><h1>¡NOS VEMOS<br /><em>EN LA RUTA!</em></h1><p>Tu inscripción visual quedó registrada. En el producto real recibirías la confirmación y los detalles del evento por correo.</p><div className="mock-qr"><div className="qr-grid">{Array.from({ length: 49 }).map((_, i) => <span key={i} className={(i * 7 + i % 5) % 3 ? "on" : ""} />)}</div><div><small>CÓDIGO MOCK</small><strong>MAP-2026-0834</strong></div></div><button className="button" onClick={() => navigate("/")}>VOLVER AL INICIO</button></main>;
  return <main className="registration-page"><aside><button className="brand-button" onClick={() => navigate("/")}><Brand /></button><div><SectionEyebrow green>INSCRIPCIÓN GRATUITA</SectionEyebrow><h2>VI TRAVESÍA<br />MUJERES AL PEDAL</h2><p>{currentEvent.date}<br />{currentEvent.place}</p></div><img src="/images/solo-cyclist.jpg" alt="Ciclista en la travesía" /></aside><section className="wizard"><button className="back-link" onClick={() => navigate("/travesia")}><X /> CERRAR</button><div className="wizard-progress"><span>PASO {step} DE 7</span><span>{Math.round((step / 7) * 100)}%</span></div><Progress value={(step / 7) * 100} className="pink-progress" /><div className="wizard-title"><small>{titles[step - 1]}</small><h1>{step < 7 ? `PASO ${String(step).padStart(2, "0")}` : "CASI LISTA"}</h1></div><div className="wizard-fields">
    {step === 1 && <><Field label="Nombre completo" name="fullName" value={form.fullName} update={update} placeholder="Escribe tu nombre y apellidos" /><div className="field-grid"><Field label="Número de identificación" name="idNumber" value={form.idNumber} update={update} placeholder="0000000000" /><Field label="Fecha de nacimiento" name="birth" value={form.birth} update={update} type="date" /></div><div className="age-display"><span>EDAD CALCULADA</span><strong>{age}</strong></div><div className="field-grid"><Field label="Ciudad" name="city" value={form.city} update={update} placeholder="Tu ciudad" /><Field label="Departamento" name="department" value={form.department} update={update} placeholder="Tu departamento" /></div></>}
    {step === 2 && <><label className="field"><span>¿Hace cuánto practicas ciclismo?</span><select value={(form.experience as string) ?? ""} onChange={e => update("experience", e.target.value)}><option value="">Selecciona una opción</option><option>Menos de 6 meses</option><option>Entre 6 meses y 1 año</option><option>Entre 1 y 3 años</option><option>Más de 3 años</option></select></label><label className="field"><span>¿Perteneces a un club o grupo?</span><RadioGroup value={(form.club as string) ?? "no"} onValueChange={v => update("club", v)} className="radio-cards"><label><RadioGroupItem value="si" /> Sí, ruedo con un grupo</label><label><RadioGroupItem value="no" /> No, ruedo por mi cuenta</label></RadioGroup></label>{form.club === "si" && <Field label="Nombre del club o grupo" name="clubName" value={form.clubName} update={update} placeholder="Nombre del grupo" />}<label className="field"><span>Ruta elegida</span><select value={form.route as string} onChange={e => update("route", e.target.value)}>{routes.map(r => <option value={r.slug} key={r.slug}>{r.name} · {r.distance} km</option>)}</select></label></>}
    {step === 3 && <><Field label="Condición médica" name="medical" value={form.medical} update={update} placeholder="Escribe 'Ninguna' si no aplica" /><Field label="Alergias" name="allergies" value={form.allergies} update={update} placeholder="Escribe 'Ninguna' si no aplica" /><Field label="Medicamentos permanentes" name="medications" value={form.medications} update={update} placeholder="Escribe 'Ninguno' si no aplica" /><div className="field-grid"><Field label="Tipo de sangre" name="blood" value={form.blood} update={update} placeholder="Ej. O+" /><Field label="EPS" name="eps" value={form.eps} update={update} placeholder="Nombre de tu EPS" /></div><p className="form-note"><ShieldCheck /> Esta información es sensible. En este prototipo no se almacena ni se envía.</p></>}
    {step === 4 && <><Field label="Nombre del contacto" name="emergencyName" value={form.emergencyName} update={update} placeholder="Nombre completo" /><div className="field-grid"><Field label="Parentesco" name="relationship" value={form.relationship} update={update} placeholder="Ej. Hermana" /><Field label="Número celular" name="emergencyPhone" value={form.emergencyPhone} update={update} placeholder="300 000 0000" type="tel" /></div></>}
    {step === 5 && <><div className="placeholder-step"><Sparkles /><h3>INFORMACIÓN ADICIONAL</h3><p>Este paso está reservado para preguntas que todavía están por definir. En la versión definitiva podrá incluir preferencias de kit, transporte u otra información operativa.</p><span>CONTENIDO MOCK EDITABLE</span></div><Field label="Comentario opcional" name="additional" value={form.additional} update={update} placeholder="¿Hay algo más que debamos saber?" /></>}
    {step === 6 && <div className="consent-list"><label><Checkbox checked={!!form.responsibility} onCheckedChange={v => update("responsibility", v === true)} /><span><b>Participación bajo responsabilidad *</b>Declaro que participo de manera voluntaria y conozco las exigencias físicas de la actividad.</span></label><label><Checkbox checked={!!form.photos} onCheckedChange={v => update("photos", v === true)} /><span><b>Uso de fotografías y video</b>Autorizo el uso de material audiovisual capturado durante el evento.</span></label><label><Checkbox checked={!!form.data} onCheckedChange={v => update("data", v === true)} /><span><b>Tratamiento de datos personales *</b>Autorizo el tratamiento de mis datos conforme a la política de privacidad.</span></label></div>}
    {step === 7 && <div className="summary-card"><div><span>PARTICIPANTE</span><strong>{(form.fullName as string) || "Nombre por completar"}</strong><small>{(form.city as string) || "Ciudad"}, {(form.department as string) || "Departamento"}</small></div><div><span>RUTA ELEGIDA</span><strong>{routes.find(r => r.slug === form.route)?.name}</strong><small>{routes.find(r => r.slug === form.route)?.distance} km · {routes.find(r => r.slug === form.route)?.difficulty}</small></div><div><span>EVENTO</span><strong>{currentEvent.date}</strong><small>{currentEvent.place}</small></div><p><Check /> La inscripción es gratuita y no requiere crear una cuenta.</p></div>}
  </div><div className="wizard-actions"><button className="button button-outline" disabled={step === 1} onClick={() => setStep(step - 1)}><ArrowLeft /> ATRÁS</button><button className="button" onClick={next}>{step === 7 ? "CONFIRMAR INSCRIPCIÓN" : "SIGUIENTE"}<ArrowRight /></button></div></section></main>;
}

function Field({ label, name, value, update, placeholder = "", type = "text" }: { label: string; name: string; value: string | boolean | undefined; update: (name: string, value: string) => void; placeholder?: string; type?: string }) {
  const [draft, setDraft] = useState((value as string) ?? "");
  return <label className="field"><span>{label}</span><input type={type} value={draft} onChange={e => { setDraft(e.target.value); update(name, e.target.value); }} placeholder={placeholder} /></label>;
}

function CartPage({ cart, updateQty, removeItem, navigate }: { cart: CartItem[]; updateQty: (item: CartItem, quantity: number) => void; removeItem: (item: CartItem) => void; navigate: (path: string) => void }) {
  const subtotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item.productId)?.price ?? 0) * item.quantity, 0);
  return <main className="inner-page cart-page"><section className="simple-hero compact"><SectionEyebrow green>TU SELECCIÓN</SectionEyebrow><h1>CARRITO <em>({cart.reduce((s, i) => s + i.quantity, 0)})</em></h1></section>{cart.length === 0 ? <section className="empty-state"><ShoppingBag /><h2>TU CARRITO ESTÁ ESPERANDO</h2><p>Descubre la merch oficial y encuentra tu próxima prenda para rodar.</p><button className="button" onClick={() => navigate("/tienda")}>IR A LA TIENDA</button></section> : <section className="cart-layout section-pad"><div className="cart-items">{cart.map(item => { const product = products.find(p => p.id === item.productId)!; return <article key={`${item.productId}-${item.size}`}><img src={product.images[0]} alt={product.name} /><div><small>{product.category}</small><h3>{product.name}</h3><p>Talla: <b>{item.size}</b></p><button className="remove-link" onClick={() => removeItem(item)}><Trash2 /> Eliminar</button></div><div className="qty-control"><button onClick={() => updateQty(item, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateQty(item, item.quantity + 1)} disabled={item.quantity >= product.stock[item.size]}><Plus /></button></div><strong>{formatCOP(product.price * item.quantity)}</strong></article>})}</div><aside className="order-summary"><h2>RESUMEN</h2><p><span>Subtotal</span><b>{formatCOP(subtotal)}</b></p><p><span>Envío</span><b>Por calcular</b></p><hr /><p className="total"><span>TOTAL</span><b>{formatCOP(subtotal)}</b></p><button className="button full" onClick={() => navigate("/checkout")}>FINALIZAR COMPRA <ArrowRight /></button><button className="text-link centered" onClick={() => navigate("/tienda")}>SEGUIR COMPRANDO</button></aside></section>}</main>;
}

function CheckoutPage({ cart, navigate, clearCart }: { cart: CartItem[]; navigate: (path: string) => void; clearCart: () => void }) {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("pickup");
  const [point, setPoint] = useState("centro");
  const subtotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item.productId)?.price ?? 0) * item.quantity, 0);
  if (step === 5) return <main className="checkout-confirmation"><div className="success-badge"><Check /></div><SectionEyebrow green>COMPRA SIMULADA</SectionEyebrow><h1>¡PEDIDO<br /><em>CONFIRMADO!</em></h1><p>Este prototipo no procesó ningún pago. En el producto real recibirías la confirmación por correo.</p><div><span>PEDIDO</span><strong>#MAP-260834</strong><span>ESTADO</span><strong>Pagado</strong></div><button className="button" onClick={() => { clearCart(); navigate("/mi-cuenta/pedidos"); }}>VER MIS PEDIDOS</button></main>;
  return <main className="checkout-page"><header><button className="brand-button" onClick={() => navigate("/")}><Brand /></button><span>CHECKOUT SEGURO <LockKeyhole /></span></header><section className="checkout-shell"><div className="checkout-main"><button className="back-link" onClick={() => step > 1 ? setStep(step - 1) : navigate("/carrito")}><ArrowLeft /> VOLVER</button><div className="checkout-steps">{["Carrito", "Datos", "Entrega", "Pago", "Confirmación"].map((label, i) => <div className={i + 1 <= step ? "active" : ""} key={label}><span>{i + 1 < step ? <Check /> : i + 1}</span><b>{label}</b></div>)}</div>{step === 1 && <div className="checkout-panel"><h1>REVISA TU CARRITO</h1>{cart.length ? cart.map(item => { const p = products.find(product => product.id === item.productId)!; return <div className="mini-cart-item" key={`${item.productId}-${item.size}`}><img src={p.images[0]} alt={p.name} /><div><b>{p.name}</b><span>Talla {item.size} · Cant. {item.quantity}</span></div><strong>{formatCOP(p.price * item.quantity)}</strong></div>}) : <p>Tu carrito está vacío.</p>}</div>}{step === 2 && <div className="checkout-panel"><h1>TUS DATOS</h1><div className="field-grid"><Field label="Nombre" name="name" update={() => {}} value="" placeholder="Nombre completo" /><Field label="Correo" name="email" update={() => {}} value="" placeholder="correo@ejemplo.com" type="email" /></div><div className="field-grid"><Field label="Documento" name="doc" update={() => {}} value="" placeholder="Número de identificación" /><Field label="Teléfono" name="phone" update={() => {}} value="" placeholder="300 000 0000" type="tel" /></div><p className="form-note"><Mail /> Las comunicaciones son visuales; no se enviará ningún correo.</p></div>}{step === 3 && <div className="checkout-panel"><h1>¿CÓMO RECIBES TU PEDIDO?</h1><RadioGroup value={delivery} onValueChange={setDelivery} className="delivery-options"><label><RadioGroupItem value="pickup" /><Store /><span><b>RECOGER EN PUNTO</b>Sin costo adicional</span></label><label><RadioGroupItem value="immediate" /><Package /><span><b>ENTREGA INMEDIATA</b>Costo asumido por el comprador</span></label></RadioGroup>{delivery === "pickup" ? <div className="pickup-list">{pickupPoints.map(p => <button key={p.id} className={point === p.id ? "active" : ""} onClick={() => setPoint(p.id)}><MapPin /><span><b>{p.name}</b><small>{p.address}</small></span>{point === p.id && <Check />}</button>)}</div> : <div><div className="field-grid"><Field label="Dirección" name="address" update={() => {}} value="" placeholder="Calle, carrera y número" /><Field label="Ciudad" name="city" update={() => {}} value="" placeholder="Ciudad" /></div><div className="field-grid"><Field label="Departamento" name="department" update={() => {}} value="" placeholder="Departamento" /><Field label="Complemento" name="complement" update={() => {}} value="" placeholder="Apto, casa, referencia" /></div><Field label="Teléfono" name="deliveryPhone" update={() => {}} value="" placeholder="300 000 0000" /><p className="shipping-note">El costo de envío es asumido por el comprador. <b>Calculado posteriormente.</b></p></div>}</div>}{step === 4 && <div className="checkout-panel"><h1>PAGO</h1><div className="payment-card"><div><span>W</span><b>WOMPI</b></div><Check /><p>Método simulado. No se solicitarán datos bancarios ni se procesará un pago real.</p></div><label className="confirm-check"><Checkbox /> Confirmo que revisé mi pedido y la modalidad de entrega.</label></div>}<button className="button checkout-next" disabled={step === 1 && !cart.length} onClick={() => setStep(step + 1)}>{step === 4 ? "SIMULAR PAGO" : "CONTINUAR"} <ArrowRight /></button></div><aside className="checkout-summary"><h2>TU PEDIDO</h2><p><span>{cart.reduce((s, i) => s + i.quantity, 0)} productos</span><b>{formatCOP(subtotal)}</b></p><p><span>Entrega</span><b>{delivery === "pickup" ? "Recoger" : "Por calcular"}</b></p><hr /><p className="total"><span>TOTAL</span><b>{formatCOP(subtotal)}</b></p><small>Este checkout es una simulación visual.</small></aside></section></main>;
}

function AuthPage({ mode, navigate }: { mode: "login" | "register"; navigate: (path: string) => void }) {
  return <main className="auth-page"><div className="auth-image" style={{ backgroundImage: "linear-gradient(rgba(10,10,10,.3),rgba(10,10,10,.7)),url(/images/community-ride.jpg)" }}><button className="brand-button" onClick={() => navigate("/")}><Brand /></button><blockquote>“Cada kilómetro cuenta una historia.”</blockquote></div><section className="auth-form"><button className="back-link" onClick={() => navigate("/")}><X /> CERRAR</button><SectionEyebrow green>MI CUENTA</SectionEyebrow><h1>{mode === "login" ? "VUELVE A LA RUTA" : "CREA TU CUENTA"}</h1><p>{mode === "login" ? "Consulta tus pedidos y gestiona tus compras." : "Tu cuenta es solo para compras. No la necesitas para inscribirte en la travesía."}</p><button className="google-button" onClick={() => toast.info("Inicio con Google simulado.")}><span>G</span> CONTINUAR CON GOOGLE</button><div className="or"><span />O CONTINÚA CON CORREO<span /></div>{mode === "register" && <Field label="Nombre completo" name="name" value="" update={() => {}} placeholder="Tu nombre" />}<Field label="Correo electrónico" name="email" value="" update={() => {}} placeholder="nombre@correo.com" type="email" /><Field label="Contraseña" name="password" value="" update={() => {}} placeholder="••••••••" type="password" />{mode === "register" && <Field label="Confirmar contraseña" name="confirm" value="" update={() => {}} placeholder="••••••••" type="password" />}<button className="button full" onClick={() => mode === "login" ? navigate("/mi-cuenta/pedidos") : toast.success("Registro y verificación de correo simulados.")}>{mode === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA"} <ArrowRight /></button>{mode === "login" && <button className="forgot" onClick={() => navigate("/recuperar-contrasena")}>¿Olvidaste tu contraseña?</button>}<p className="auth-switch">{mode === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"} <button onClick={() => navigate(mode === "login" ? "/registro" : "/login")}>{mode === "login" ? "Regístrate" : "Inicia sesión"}</button></p></section></main>;
}

function RecoverPasswordPage({ navigate }: { navigate: (path: string) => void }) {
  const [sent, setSent] = useState(false);
  return <main className="auth-page"><div className="auth-image" style={{ backgroundImage: "linear-gradient(rgba(10,10,10,.3),rgba(10,10,10,.7)),url(/images/community-ride.jpg)" }}><button className="brand-button" onClick={() => navigate("/")}><Brand /></button><blockquote>“Siempre hay una ruta para volver.”</blockquote></div><section className="auth-form"><button className="back-link" onClick={() => navigate("/login")}><ArrowLeft /> VOLVER</button><SectionEyebrow green>MI CUENTA</SectionEyebrow><h1>RECUPERA TU ACCESO</h1><p>Ingresa el correo asociado a tu cuenta. El envío es una simulación visual.</p>{sent ? <div className="form-success"><Check /><h3>REVISA TU CORREO</h3><p>Mostramos la confirmación, pero no enviamos ningún mensaje real.</p><button className="button full" onClick={() => navigate("/login")}>VOLVER A INICIAR SESIÓN</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><Field label="Correo electrónico" name="email" value="" update={() => {}} placeholder="nombre@correo.com" type="email" /><button className="button full" type="submit">ENVIAR ENLACE <ArrowRight /></button></form>}</section></main>;
}

function AccountPage({ navigate }: { navigate: (path: string) => void }) {
  return <main className="inner-page account-page"><section className="account-header"><div className="avatar">KR</div><div><SectionEyebrow green>MI CUENTA</SectionEyebrow><h1>HOLA, KAROLAIN</h1><p>Consulta el estado de tus pedidos y la información de entrega.</p></div><button className="button button-outline" onClick={() => navigate("/")}>CERRAR SESIÓN</button></section><section className="account-layout section-pad"><aside><button className="active"><Package /> Mis pedidos</button><button><User /> Mis datos</button><button><MapPin /> Direcciones</button><button><LockKeyhole /> Seguridad</button></aside><div className="orders"><div className="orders-heading"><h2>MIS PEDIDOS</h2><span>2 PEDIDOS MOCK</span></div><article><header><div><small>PEDIDO</small><strong>#MAP-260731</strong></div><div><small>FECHA</small><strong>20 AGO 2026</strong></div><span className="status preparing">En preparación</span></header><div className="order-product"><img src={products[0].images[0]} alt={products[0].name} /><div><b>{products[0].name}</b><span>Talla M · Cantidad 1</span></div><strong>{formatCOP(products[0].price)}</strong></div><footer><span><Store /> Punto Centro</span><button className="text-link">VER DETALLE <ArrowRight /></button></footer></article><article><header><div><small>PEDIDO</small><strong>#MAP-260524</strong></div><div><small>FECHA</small><strong>12 JUN 2026</strong></div><span className="status delivered">Entregado</span></header><div className="order-product"><img src={products[2].images[0]} alt={products[2].name} /><div><b>{products[2].name}</b><span>Talla S · Cantidad 1</span></div><strong>{formatCOP(products[2].price)}</strong></div><footer><span><Package /> Entrega inmediata</span><button className="text-link">VER DETALLE <ArrowRight /></button></footer></article></div></section></main>;
}

function SponsorsPage() {
  const [sent, setSent] = useState(false);
  return <main className="inner-page sponsor-page"><section className="sponsor-hero"><div><SectionEyebrow green>RODEMOS EN EQUIPO</SectionEyebrow><h1>TU MARCA PUEDE<br /><em>MOVER MONTAÑAS.</em></h1><p>Conecta con una comunidad activa y acompaña una experiencia que impulsa el deporte femenino y el territorio.</p><button className="button" onClick={() => document.getElementById("sponsor-form")?.scrollIntoView({ behavior: "smooth" })}>QUIERO SER ALIADO <ArrowRight /></button></div><img src="/images/past-ride.jpg" alt="Travesía Mujeres al Pedal" /></section><section className="sponsor-impact section-pad"><div><SectionEyebrow>IMPACTO MOCK</SectionEyebrow><h2>UNA COMUNIDAD<br />QUE SE HACE VER</h2></div><div className="stats-grid">{statistics.slice(0, 3).map(s => <div key={s.label}><strong>{s.value}</strong><p>{s.label}</p></div>)}</div></section><section className="benefits section-pad">{[["VISIBILIDAD", "Presencia de marca en piezas, rutas y momentos clave."], ["CONEXIÓN", "Una relación auténtica con mujeres activas y sus comunidades."], ["IMPACTO", "Apoyo visible al deporte femenino y al desarrollo territorial."]].map(([t, p], i) => <article key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{p}</p></article>)}</section><section className="current-sponsors section-pad"><SectionEyebrow green>YA RUEDAN CON NOSOTRAS</SectionEyebrow><div className="logo-wall">{sponsors.map(s => <div key={s}>{s}</div>)}</div></section><section className="sponsor-form-section section-pad" id="sponsor-form"><div><SectionEyebrow>HABLEMOS</SectionEyebrow><h2>HAZ PARTE<br /><em>DE LA RUTA</em></h2><p>Cuéntanos cómo quieres participar. Este formulario solo simula el envío.</p></div>{sent ? <div className="form-success"><Check /><h3>MENSAJE ENVIADO</h3><p>Gracias por querer pedalear con nosotras. La confirmación es una simulación visual.</p></div> : <form onSubmit={e => { e.preventDefault(); setSent(true); }}><div className="field-grid"><Field label="Empresa" name="company" value="" update={() => {}} placeholder="Nombre de la empresa" /><Field label="Persona de contacto" name="contact" value="" update={() => {}} placeholder="Nombre completo" /></div><div className="field-grid"><Field label="Correo" name="email" value="" update={() => {}} placeholder="correo@empresa.com" type="email" /><Field label="Teléfono" name="phone" value="" update={() => {}} placeholder="300 000 0000" /></div><label className="field"><span>Tipo de interés</span><select><option>Patrocinio de la travesía</option><option>Alianza de marca</option><option>Apoyo logístico</option><option>Otro</option></select></label><label className="field"><span>Mensaje</span><textarea placeholder="Cuéntanos tu idea" rows={4} /></label><button className="button" type="submit">ENVIAR SOLICITUD <ArrowRight /></button></form>}</section></main>;
}

function NotFound({ navigate }: { navigate: (path: string) => void }) {
  return <main className="not-found"><div className="big-404">4<span><Bike /></span>4</div><SectionEyebrow green>RUTA NO ENCONTRADA</SectionEyebrow><h1>ESTE CAMINO<br /><em>NO ESTÁ MARCADO.</em></h1><p>Vuelve al inicio y elige una ruta conocida.</p><button className="button" onClick={() => navigate("/")}>VOLVER AL INICIO <ArrowRight /></button></main>;
}

function CartDrawer({ open, setOpen, cart, updateQty, removeItem, navigate }: { open: boolean; setOpen: (v: boolean) => void; cart: CartItem[]; updateQty: (item: CartItem, qty: number) => void; removeItem: (item: CartItem) => void; navigate: (path: string) => void }) {
  const subtotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item.productId)?.price ?? 0) * item.quantity, 0);
  const go = (path: string) => { setOpen(false); navigate(path); };
  return <Sheet open={open} onOpenChange={setOpen}><SheetContent className="cart-drawer"><SheetHeader><SheetTitle>TU CARRITO <span>({cart.reduce((s, i) => s + i.quantity, 0)})</span></SheetTitle><SheetDescription>Stock y persistencia simulados en este dispositivo.</SheetDescription></SheetHeader><div className="drawer-items">{cart.length === 0 ? <div className="drawer-empty"><ShoppingBag /><h3>Tu carrito está vacío</h3><button className="button" onClick={() => go("/tienda")}>EXPLORAR TIENDA</button></div> : cart.map(item => { const product = products.find(p => p.id === item.productId)!; return <article key={`${item.productId}-${item.size}`}><img src={product.images[0]} alt={product.name} /><div><h3>{product.name}</h3><span>Talla {item.size}</span><div className="mini-qty"><button onClick={() => updateQty(item, item.quantity - 1)}><Minus /></button><b>{item.quantity}</b><button onClick={() => updateQty(item, item.quantity + 1)} disabled={item.quantity >= product.stock[item.size]}><Plus /></button></div></div><div><strong>{formatCOP(product.price * item.quantity)}</strong><button onClick={() => removeItem(item)} aria-label="Eliminar producto"><Trash2 /></button></div></article>})}</div>{cart.length > 0 && <SheetFooter><div className="drawer-subtotal"><span>SUBTOTAL</span><strong>{formatCOP(subtotal)}</strong></div><button className="button full" onClick={() => go("/checkout")}>FINALIZAR COMPRA <ArrowRight /></button><button className="button button-outline full" onClick={() => go("/carrito")}>VER CARRITO</button></SheetFooter>}</SheetContent></Sheet>;
}

export default function SiteClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, cartCount, addItem, updateQuantity, removeItem, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = (next: string) => {
    router.push(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const addToCart = (productId: string, size: Size, quantity = 1) => {
    addItem(productId, size, quantity);
    toast.success("Producto agregado al carrito", { description: `Talla ${size}` }); setCartOpen(true);
  };
  const route = pathname.startsWith("/travesia/") ? routes.find(r => r.slug === pathname.split("/").pop()) : undefined;
  const product = pathname.startsWith("/tienda/") ? products.find(p => p.slug === pathname.split("/").pop()) : undefined;
  const pastEvent = pathname.startsWith("/travesias/") ? history.find(item => item.slug === pathname.split("/").pop()) : undefined;
  const standalone = pathname === "/inscripcion" || pathname === "/checkout" || pathname === "/login" || pathname === "/registro" || pathname === "/recuperar-contrasena";
  const page = useMemo(() => {
    if (pathname === "/") return <HomePage navigate={navigate} addToCart={addToCart} />;
    if (pathname === "/nosotras") return <AboutPage navigate={navigate} />;
    if (pathname === "/travesia") return <EventPage navigate={navigate} />;
    if (pathname === "/travesias") return <HistoryPage navigate={navigate} />;
    if (pastEvent) return <HistoryDetailPage item={pastEvent} navigate={navigate} />;
    if (pathname === "/tienda") return <ShopPage navigate={navigate} addToCart={addToCart} />;
    if (route) return <RouteDetailPage route={route} navigate={navigate} />;
    if (product) return <ProductPage product={product} navigate={navigate} addToCart={addToCart} />;
    if (pathname === "/inscripcion") return <RegistrationPage navigate={navigate} />;
    if (pathname === "/carrito") return <CartPage cart={cart} updateQty={updateQuantity} removeItem={removeItem} navigate={navigate} />;
    if (pathname === "/checkout") return <CheckoutPage cart={cart} navigate={navigate} clearCart={clearCart} />;
    if (pathname === "/login") return <AuthPage mode="login" navigate={navigate} />;
    if (pathname === "/registro") return <AuthPage mode="register" navigate={navigate} />;
    if (pathname === "/recuperar-contrasena") return <RecoverPasswordPage navigate={navigate} />;
    if (pathname === "/mi-cuenta" || pathname === "/mi-cuenta/pedidos") return <AccountPage navigate={navigate} />;
    if (pathname === "/patrocinadores") return <SponsorsPage />;
    return <NotFound navigate={navigate} />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, cart, route, product, pastEvent]);
  return <div className="site-app">{!standalone && <Header path={pathname} navigate={navigate} cartCount={cartCount} openCart={() => setCartOpen(true)} />}{page}{!standalone && <Footer navigate={navigate} />}<CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} updateQty={updateQuantity} removeItem={removeItem} navigate={navigate} /><Toaster position="top-center" richColors /></div>;
}
