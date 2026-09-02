# Mujeres al Pedal - frontend

Implementacion local del prototipo visual aprobado **Mujeres al Pedal - Prototipo v2**. El proyecto conserva la direccion grafica deportiva y editorial del prototipo y funciona exclusivamente con datos simulados en el navegador.

La guía para conectar este frontend con un backend existente está en [`FRONTEND_ARCHITECTURE.md`](./FRONTEND_ARCHITECTURE.md).

## Stack

- Next.js con App Router
- React y TypeScript
- Tailwind CSS 4
- Componentes reutilizables basados en shadcn/Base UI
- Sonner para notificaciones
- `localStorage` para persistir el carrito

## Instalacion y ejecucion

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Para validar el proyecto:

```bash
npm run lint
npm run typecheck
npm run build
```

## Estructura

- `src/app`: rutas del App Router, layout global y estilos.
- `src/components/site`: experiencia completa del sitio y sus pantallas.
- `src/components/ui`: controles reutilizables del sistema visual.
- `src/data/mock-data.ts`: travesia, rutas, productos, categorias, testimonios, estadisticas, patrocinadores, FAQ y puntos de recogida.
- `src/store/use-cart.ts`: estado y persistencia local del carrito.
- `src/types`: tipos compartidos.
- `src/hooks`: hooks reutilizables.
- `src/lib`: utilidades generales.
- `public/images`: fotografias y productos recuperados del prototipo.
- `public/brand`: recursos de identidad disponibles.

## Rutas incluidas

`/`, `/travesia`, `/travesia/ruta-baja`, `/travesia/ruta-media`, `/travesia/ruta-alta`, `/inscripcion`, `/travesias`, `/travesias/[slug]`, `/tienda`, `/tienda/[slug]`, `/carrito`, `/checkout`, `/login`, `/registro`, `/recuperar-contrasena`, `/mi-cuenta`, `/mi-cuenta/pedidos`, `/patrocinadores` y `/nosotras`.

## Funcionalidades simuladas

La inscripcion, el codigo QR, el inicio de sesion, el registro, la recuperacion de contrasena, los pedidos, el inventario, el pago con Wompi, los formularios, el reglamento y los envios de correo son demostraciones visuales. No existe backend, base de datos ni conexion con servicios externos.

El carrito si funciona en el navegador: permite elegir talla y cantidad, agregar o eliminar productos y conserva su contenido con `localStorage`.

## Recursos por reemplazar

Las imagenes actuales de `public/images` provienen del prototipo y pueden sustituirse por fotografias finales manteniendo los mismos nombres o actualizando `src/data/mock-data.ts`. Los nombres de patrocinadores se muestran como marcas tipograficas provisionales; los logotipos oficiales deben agregarse a `public/brand` cuando esten disponibles. Los perfiles de elevacion y datos de recorrido son ilustrativos, no archivos GPX reales.

## Trabajo posterior de backend

Para una version productiva sera necesario conectar persistencia de inscripciones, autenticacion, cuentas, pedidos, inventario, pagos, calculo de envios, correos, formularios de contacto y administracion de contenidos. Estas integraciones quedaron fuera del alcance de este frontend.
