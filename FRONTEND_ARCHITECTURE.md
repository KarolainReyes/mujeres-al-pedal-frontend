# Arquitectura frontend e integración con backend

## 1. Propósito del documento

Esta guía describe la arquitectura actual del frontend de **Mujeres al Pedal**, con énfasis en:

- La estructura y jerarquía visual aprobada.
- El sistema de estilos y comportamiento responsive.
- La organización de rutas, componentes, datos y estado.
- Los puntos donde deben conectarse los servicios del backend.
- Las decisiones que deben preservarse para no rediseñar la interfaz.

El frontend es una implementación en Next.js con datos mock. El agente responsable del backend debe reemplazar esos datos y acciones simuladas mediante adaptadores, servicios y proveedores de estado, sin modificar la composición visual ni los nombres de clase existentes salvo que sea indispensable.

## 2. Stack y modelo de ejecución

- Next.js 16 con App Router.
- React 19 y TypeScript estricto.
- Tailwind CSS 4 mediante PostCSS.
- CSS de producto concentrado en `src/app/globals.css`.
- Componentes base de shadcn/Base UI en `src/components/ui`.
- Iconos de `lucide-react`.
- Notificaciones mediante `sonner`.
- Estado local del carrito mediante un hook y `localStorage`.
- No hay backend, base de datos, autenticación ni pagos reales en esta versión.

El alias `@/*` apunta a `src/*`, según `tsconfig.json`.

## 3. Estructura de carpetas

```text
src/
  app/
    layout.tsx                   Metadatos, idioma y estilos globales
    globals.css                  Sistema visual completo
    page.tsx                     Home
    not-found.tsx                Página 404
    travesia/
      page.tsx                   Travesía vigente
      [slug]/page.tsx            Detalle de ruta
    travesias/
      page.tsx                   Histórico
      [slug]/page.tsx            Detalle de edición anterior
    inscripcion/page.tsx         Formulario de inscripción
    tienda/
      page.tsx                   Catálogo
      [slug]/page.tsx            Detalle de producto
    carrito/page.tsx
    checkout/page.tsx
    login/page.tsx
    registro/page.tsx
    recuperar-contrasena/page.tsx
    mi-cuenta/
      page.tsx
      pedidos/page.tsx
    patrocinadores/page.tsx
    nosotras/page.tsx

  components/
    site/site-client.tsx         Composición visual y lógica de pantallas
    ui/                          Primitivas reutilizables

  data/mock-data.ts              Fuente temporal de contenido y catálogo
  store/use-cart.ts              Estado del carrito
  types/cart.ts                  Tipos compartidos del carrito
  hooks/use-mobile.ts            Utilidad responsive
  lib/utils.ts                   Utilidades de clases
  vendor/                        CSS base de los componentes UI

public/
  images/                        Fotografías y productos del prototipo
  brand/                         Recursos de identidad
```

## 4. Arquitectura actual de renderizado

Cada archivo `page.tsx` de App Router monta el mismo componente `SiteClient`. Este componente consulta `usePathname()` y decide qué vista interna mostrar.

```text
App Router page.tsx
        |
        v
SiteClient
  |- Header
  |- Vista elegida por pathname
  |- Footer
  |- CartDrawer
  `- Toaster
```

Las pantallas de inscripción, checkout y autenticación son experiencias independientes y no muestran el `Header` ni el `Footer` globales.

Esta organización conserva fielmente el prototipo, pero concentra muchas responsabilidades en `src/components/site/site-client.tsx`. Para integrar el backend se recomienda extraer progresivamente las vistas a componentes de dominio, manteniendo el HTML, el orden de las secciones y las clases CSS.

Estructura objetivo sugerida:

```text
src/components/
  layout/          Header, Footer, SiteShell
  home/            Secciones de la página principal
  traversal/       Travesía, rutas e histórico
  registration/    Pasos y resumen de inscripción
  shop/            Catálogo y detalle de producto
  cart/            Drawer, lista y resumen
  checkout/        Pasos de compra y entrega
  auth/            Login, registro y recuperación
  account/         Perfil y pedidos
  sponsors/        Aliados y formulario
```

La extracción debe ser mecánica: mover JSX y tipos sin reinterpretar el diseño.

## 5. Sistema visual

### 5.1 Fuente de verdad

La fuente de verdad visual es `src/app/globals.css`. No se debe reemplazar por un tema genérico de Tailwind o shadcn.

Orden de estilos:

1. Fuentes de Google.
2. Tailwind CSS 4.
3. Animaciones de `tw-animate-css`.
4. CSS base de shadcn ubicado en `src/vendor`.
5. Tokens de marca y estilos propios del producto.

### 5.2 Tokens de marca

```css
--pink: #f0148c;
--green: #8cc63f;
--black: #0a0a0a;
--white: #ffffff;
```

Tokens semánticos principales:

| Token | Uso |
| --- | --- |
| `--background` | Fondo general negro |
| `--foreground` | Texto principal blanco |
| `--card` | Superficies oscuras secundarias |
| `--primary` | Acciones principales en rosa |
| `--accent` | Acentos y estados positivos en verde |
| `--muted-foreground` | Texto secundario gris |
| `--border` | Bordes blancos translúcidos |
| `--ring` | Foco y selección rosa |

La estética no utiliza radios suaves de producto SaaS. `--radius` está en `0` y los cortes diagonales se construyen con `clip-path`.

### 5.3 Tipografía

| Familia | Uso |
| --- | --- |
| Anton | Titulares, números de impacto y nombres de ruta |
| Barlow Condensed | Navegación, botones, etiquetas y metadatos |
| Inter | Texto corrido, campos y contenido descriptivo |

Los títulos son mayúsculos, compactos y de gran escala. Las palabras enfatizadas se renderizan con `<em>` en rosa. No sustituir Anton ni reducir la escala general de encabezados: son parte central de la identidad.

### 5.4 Espaciado y ancho

- `.section-pad` controla el espaciado vertical y los márgenes laterales de secciones.
- En escritorio usa `clamp(5rem, 9vw, 9rem)` verticalmente.
- El contenido se centra visualmente alrededor de un ancho máximo aproximado de `1440px`.
- `.inner-page` añade `78px` superiores para compensar el encabezado fijo.
- Las secciones no son tarjetas flotantes: se presentan como bandas de ancho completo.

### 5.5 Botones y acciones

- `.button`: acción principal rosa, mayúsculas y corte diagonal.
- `.button-outline`: acción secundaria transparente con borde.
- `.button-light`: acción blanca para fondos de color.
- `.button-dark`: acción negra usada en producto.
- `.button-glass`: acción transparente sobre fotografía.
- `.text-link`: enlace editorial con subrayado rosa.
- `.back-link`: navegación de retorno sin contenedor decorativo.

Los iconos deben seguir usando `lucide-react`. No reemplazar botones icónicos por texto redundante.

### 5.6 Fotografía y geometría

- La fotografía es protagonista y ocupa áreas amplias.
- Los héroes combinan imagen real con overlays oscuros para conservar legibilidad.
- Se utilizan recortes diagonales en botones, tarjetas de ruta y héroes secundarios.
- La cuadrícula sutil del hero es parte de la dirección urbana/editorial.
- `RouteProfile` es una visualización SVG funcional, no un recurso de marca ni un mapa real.

Las imágenes se referencian mediante rutas `/images/...`. El backend debe devolver URLs finales o claves que puedan adaptarse a esas rutas sin cambiar las proporciones de los contenedores.

## 6. Breakpoints y comportamiento responsive

El frontend es mobile-first en la experiencia de uso, aunque la hoja base describe primero escritorio.

| Breakpoint | Comportamiento |
| --- | --- |
| `1180px` | Oculta navegación de escritorio, habilita menú móvil, reduce rejillas |
| `820px` | Convierte diseños de dos columnas en una, activa carruseles horizontales y reorganiza checkout/formularios |
| `430px` | Ajusta títulos, controles, drawer y productos para móviles pequeños |

Reglas que deben preservarse:

- Header fijo de `78px`.
- Menú móvil desplegable debajo del header.
- CTA de inscripción visible en el primer viewport.
- Drawer del carrito de ancho completo en móviles pequeños.
- Tarjetas históricas y testimonios con scroll horizontal en móvil.
- Formularios de dos columnas pasan a una sola columna.
- Resumen de checkout se muestra antes del formulario en móvil.
- Se respeta `prefers-reduced-motion` y se desactivan animaciones/transiciones.

Al agregar estados de carga o error, reservar alturas similares al contenido final para evitar saltos de diseño.

## 7. Jerarquía visual global

### 7.1 Shell estándar

```text
Header fijo
  |- Marca
  |- Navegación principal
  |- Login
  |- Carrito con badge
  `- CTA de inscripción

Contenido de la ruta

Footer
  |- Marca y manifiesto corto
  |- Navegación
  |- Enlaces legales
  `- Redes sociales

Capas globales
  |- CartDrawer
  `- Toaster
```

### 7.2 Shell independiente

Usado en `/inscripcion`, `/checkout`, `/login`, `/registro` y `/recuperar-contrasena`.

```text
Panel de marca o encabezado compacto
Flujo principal
Progreso / navegación de pasos
Confirmación final
```

No insertar el header y footer estándar dentro de estos flujos.

## 8. Jerarquía por página y dependencia de datos

| Ruta | Jerarquía visual | Datos o acciones de backend |
| --- | --- | --- |
| `/` | Hero, manifiesto, historia, selector de rutas, estadísticas, galería, histórico, tienda, testimonios, patrocinadores, Instagram, FAQ, newsletter, CTA final | Evento vigente, rutas, métricas, histórico, productos destacados, testimonios, patrocinadores, FAQ, newsletter |
| `/travesia` | Hero del evento, datos clave, experiencia, rutas, reglamento, patrocinadores | Evento, rutas, reglamento, aliados |
| `/travesia/[slug]` | Imagen y descripción, métricas, perfil, recomendaciones, CTA | Detalle de ruta por `slug` |
| `/travesias` | Hero simple, ediciones alternadas, archivo de recorridos | Lista paginable de ediciones |
| `/travesias/[slug]` | Hero de edición, hechos, relato y fotografía | Detalle de edición por `slug` |
| `/tienda` | Hero claro, filtros, rejilla de productos, nota de entrega | Categorías, productos, inventario |
| `/tienda/[slug]` | Galería, información, talla, cantidad, agregar, relacionados | Producto, variantes, stock, relacionados |
| `/carrito` | Título, líneas de carrito, cantidades, resumen | Carrito local o remoto, validación de stock |
| `/checkout` | Pasos, datos, modalidad de entrega, pago, resumen | Cliente, puntos, costos, pedido y pago |
| `/inscripcion` | Panel visual, progreso de 7 pasos, resumen, confirmación | Validaciones, creación de inscripción, consentimiento |
| `/login` | Imagen editorial y formulario | Sesión real |
| `/registro` | Imagen editorial y formulario | Creación y verificación de cuenta |
| `/recuperar-contrasena` | Imagen editorial, correo y confirmación | Solicitud de recuperación |
| `/mi-cuenta/pedidos` | Encabezado de cuenta, navegación lateral, tarjetas de pedido | Usuario autenticado y pedidos |
| `/patrocinadores` | Hero, impacto, beneficios, aliados y formulario | Patrocinadores y solicitud comercial |
| `/nosotras` | Hero dividido, origen, valores, fotografía y CTA | Contenido editorial administrable |

## 9. Componentes visuales existentes

Componentes de producto definidos actualmente dentro de `site-client.tsx`:

- `Brand`: marca tipográfica y rueda.
- `Header`: navegación desktop/mobile y acceso al carrito.
- `Footer`: navegación secundaria, legales y redes.
- `SectionEyebrow`: etiqueta editorial con línea rosa o verde.
- `Countdown`: cuenta regresiva del evento.
- `RouteProfile`: perfil ilustrativo de elevación.
- `RouteCard`: resumen visual de una ruta.
- `ProductCard`: producto, precio, tallas y acción rápida.
- `Field`: control de texto compartido por formularios.
- `CartDrawer`: resumen lateral persistente.

Primitivas UI actualmente utilizadas por el flujo principal:

- `Accordion` para FAQ.
- `Progress` para inscripción.
- `Checkbox` y `RadioGroup` para formularios y checkout.
- `Sheet` para el drawer del carrito.
- `Dialog` para ampliar imágenes de producto.
- `Toaster` para confirmaciones y errores.

El backend no debe importar ni modificar componentes de `src/components/ui`. Las respuestas de red deben transformarse antes de llegar a estas vistas.

## 10. Contratos mock que deben sustituirse

La fuente temporal es `src/data/mock-data.ts`.

### 10.1 Evento vigente

`currentEvent` contiene:

```ts
{
  edition: string;
  name: string;
  campaign: string;
  date: string;
  isoDate: string;
  place: string;
  startPoint: string;
  startTime: string;
  description: string;
  heroImage: string;
}
```

`isoDate` debe conservar zona horaria explícita para que `Countdown` sea consistente.

### 10.2 Rutas

```ts
{
  slug: string;
  name: string;
  label: string;
  distance: number;
  elevation: number;
  difficulty: string;
  bike: string;
  time: string;
  color: "green" | "pink" | "white";
  image: string;
  description: string;
  recommendations: string[];
}
```

El campo `color` controla variantes visuales; el backend debe entregar un valor válido o el adaptador debe asignarlo.

### 10.3 Productos

```ts
type ProductSize = "XS" | "S" | "M" | "L" | "XL";

{
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  badge: string;
  featured: boolean;
  description: string;
  images: string[];
  stock: Record<ProductSize, number>;
}
```

El precio se almacena como número entero en COP. `formatCOP` se aplica únicamente en presentación.

### 10.4 Otros dominios

- `history`: ediciones anteriores con `slug`, año, edición, nombre, lugar, rutas e imagen.
- `productCategories`: filtros visibles de tienda.
- `statistics`: valor y etiqueta.
- `testimonials`: nombre, edición, cita e imagen.
- `sponsors`: actualmente nombres simples; debe evolucionar a objetos con logo, URL y texto alternativo.
- `pickupPoints`: identificador, nombre y dirección.
- `faqs`: pregunta y respuesta.
- `orderStatuses`: catálogo de estados visibles.

## 11. Estado del carrito

El contrato compartido está en `src/types/cart.ts`:

```ts
type CartItem = {
  productId: string;
  size: ProductSize;
  quantity: number;
};
```

`useCart` expone:

```ts
{
  cart;
  cartCount;
  addItem(productId, size, quantity);
  updateQuantity(item, quantity);
  removeItem(item);
  clearCart();
}
```

Comportamiento actual:

- Persistencia en `localStorage` bajo la clave `map-cart`.
- Consolidación por `productId + size`.
- Límite de cantidad según stock.
- Eliminación automática al reducir la cantidad a cero.

Integración recomendada:

1. Mantener `localStorage` para visitantes.
2. Validar stock contra backend antes de mostrar checkout y antes de crear el pedido.
3. Para usuarios autenticados, sincronizar el carrito remoto después de iniciar sesión.
4. Resolver conflictos mediante un adaptador, sin cambiar la API pública de `useCart`.
5. Vaciar el carrito únicamente después de una confirmación real del pedido.

## 12. Formularios que requieren conexión

### 12.1 Inscripción

Campos actuales:

- `fullName`, `idNumber`, `birth`, `city`, `department`.
- `experience`, `club`, `clubName`, `route`.
- `medical`, `allergies`, `medications`, `blood`, `eps`.
- `emergencyName`, `relationship`, `emergencyPhone`.
- `additional`.
- `responsibility`, `photos`, `data`.

El formulario tiene siete pasos. No cambiar el orden. La confirmación y el QR son mock; deben depender de la respuesta de creación de inscripción.

### 12.2 Checkout

Campos y decisiones:

- Cliente: nombre, correo, documento y teléfono.
- Entrega: `pickup` o `immediate`.
- Recogida: identificador del punto seleccionado.
- Entrega inmediata: dirección, ciudad, departamento, complemento y teléfono.
- Confirmación del pedido y método de pago.

El costo de entrega debe venir del backend antes de confirmar el total. La pantalla actual no debe recopilar datos de tarjeta; la integración real debe redirigir o usar el componente oficial del proveedor de pagos.

### 12.3 Cuenta

- Login: correo y contraseña.
- Registro: nombre, correo, contraseña y confirmación.
- Recuperación: correo.

Las rutas privadas deben protegerse en servidor o middleware. No usar únicamente una condición visual en React.

### 12.4 Patrocinadores y newsletter

- Patrocinadores: empresa, contacto, correo, teléfono, tipo de interés y mensaje.
- Newsletter: correo electrónico.

Ambos flujos deben conservar el toast o panel de éxito, pero activarlo solo cuando el backend confirme la operación.

## 13. Capa de integración recomendada

No realizar solicitudes HTTP directamente desde componentes visuales. Agregar una capa como esta:

```text
src/
  services/
    api-client.ts
    auth.service.ts
    events.service.ts
    routes.service.ts
    products.service.ts
    cart.service.ts
    orders.service.ts
    registrations.service.ts
    sponsors.service.ts
  adapters/
    event.adapter.ts
    route.adapter.ts
    product.adapter.ts
    order.adapter.ts
  types/
    api.ts
    domain.ts
```

Responsabilidades:

- `services`: transporte HTTP, cabeceras, credenciales y errores.
- `adapters`: convertir DTO del backend al modelo que espera la interfaz.
- `types/api.ts`: contratos exactos del backend.
- `types/domain.ts`: modelos estables consumidos por los componentes.
- Componentes: presentación, interacción y estados visibles.

Ejemplo de frontera:

```ts
const dto = await productsService.getBySlug(slug);
const product = productAdapter.fromApi(dto);
```

El adaptador debe garantizar imágenes, tallas, precio, badge y stock válidos antes de renderizar.

## 14. Estrategia recomendada con App Router

Para contenido público y SEO:

- Obtener evento, rutas, histórico y productos desde componentes de servidor en cada `page.tsx`.
- Pasar modelos ya adaptados a componentes cliente únicamente cuando exista interacción.
- Usar `generateMetadata` en páginas de producto, ruta y travesía histórica.
- Resolver `slug` en el archivo de ruta dinámica y responder con `notFound()` cuando no exista.

Para interacciones:

- Mantener como componentes cliente el carrito, selectores, formularios, accordion, drawer, dialog y toasts.
- Usar Server Actions o endpoints del backend según el contrato ya implementado.
- No convertir todo el árbol a cliente por comodidad.

Migración segura:

1. Extraer una vista del `SiteClient` sin alterar su JSX.
2. Crear su modelo de dominio.
3. Crear servicio y adaptador.
4. Obtener datos en la ruta de App Router.
5. Añadir estados de carga, error y vacío con las mismas dimensiones.
6. Verificar desktop y móvil antes de continuar con otra vista.

## 15. Estados de red y errores

Cada integración debe contemplar:

- `loading`: skeleton o bloque reservado sin mover la página.
- `empty`: mensaje específico con una acción útil.
- `error`: explicación breve y opción de reintentar.
- `success`: toast o panel existente.
- `unauthorized`: redirección a `/login` preservando el destino.
- `out-of-stock`: deshabilitar talla o cantidad antes de agregar.
- `price-changed`: actualizar resumen y solicitar nueva confirmación.
- `payment-pending`: no mostrar pedido pagado hasta recibir confirmación fiable.

No mostrar errores técnicos del backend directamente al usuario.

## 16. Autenticación y seguridad

- La autenticación actual es completamente visual.
- La sesión real debe gestionarse con cookies seguras o el mecanismo ya definido por el backend.
- No almacenar tokens sensibles en `localStorage`.
- No confiar en precio, stock, total, estado de pedido ni costo de entrega enviados por el cliente.
- Los datos médicos de inscripción requieren tratamiento especial y no deben persistirse en logs del navegador.
- Los consentimientos obligatorios deben validarse nuevamente en backend.

## 17. Recursos visuales y contenido administrable

Recursos actuales:

- Fotografías en `public/images`.
- Favicon y futuros logos en `public/brand`.
- Logos de patrocinadores todavía representados como texto.
- Perfiles de ruta ilustrativos, no GPX.

Al conectar un CMS o almacenamiento:

- Conservar `object-fit: cover` y las alturas definidas.
- Exigir texto alternativo para todas las imágenes.
- Usar una imagen principal y una galería ordenada para productos.
- Evitar URLs temporales que expiren durante el renderizado.
- Mantener fallback visual cuando falte una imagen.

## 18. Reglas para preservar el diseño aprobado

1. No cambiar el orden de las secciones.
2. No sustituir los colores de marca ni las tipografías.
3. No convertir las secciones en tarjetas redondeadas.
4. No retirar los recortes diagonales, overlays o jerarquía tipográfica.
5. No modificar los breakpoints sin validación visual en 360px, 390px, tablet y escritorio.
6. No reemplazar imágenes protagonistas por fondos genéricos.
7. No cambiar nombres de clases CSS mientras se extraen componentes.
8. No mezclar DTO del backend directamente con JSX.
9. No mostrar una confirmación antes de recibir respuesta exitosa del backend.
10. No eliminar los estados simulados hasta que exista un reemplazo funcional.

## 19. Orden sugerido de vinculación

### Fase 1: contenido de lectura

- Evento vigente.
- Rutas y detalles.
- Histórico.
- Productos, categorías y stock.
- Testimonios, FAQ y patrocinadores.

### Fase 2: identidad y cuenta

- Login, registro y recuperación.
- Protección de `/mi-cuenta`.
- Consulta de pedidos.

### Fase 3: operaciones

- Inscripción.
- Carrito sincronizado.
- Puntos y cálculo de entrega.
- Creación de pedido.

### Fase 4: pago y comunicaciones

- Integración real con Wompi.
- Confirmación de pago desde backend.
- Correos transaccionales.
- Newsletter y solicitudes de patrocinio.

## 20. Validación mínima después de integrar

Ejecutar:

```bash
npm run lint
npm run typecheck
npm run build
```

Verificar además:

- Todas las rutas cargan directamente desde URL.
- No hay errores de hidratación.
- Los datos del backend respetan los modelos visuales.
- El menú móvil funciona desde 360px.
- El carrito persiste y valida stock.
- El checkout recalcula precio y entrega.
- Los formularios conservan datos al cambiar de paso.
- Los errores de red no rompen la composición.
- Las confirmaciones reflejan operaciones reales.
- Las imágenes no deforman ni desplazan el contenido.

## 21. Archivos de referencia principal

- `src/app/globals.css`: identidad, layout y responsive.
- `src/components/site/site-client.tsx`: jerarquía actual de todas las pantallas.
- `src/data/mock-data.ts`: contratos temporales que debe reemplazar el backend.
- `src/store/use-cart.ts`: comportamiento actual del carrito.
- `src/types/cart.ts`: contrato mínimo del carrito.
- `src/app/**/page.tsx`: mapa real de rutas.

Antes de modificar cualquier integración visual, comparar el resultado con el prototipo aprobado y validar tanto escritorio como móvil.
