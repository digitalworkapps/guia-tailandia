# Tailandia 2026 · Guía del viaje

Guía web (PWA) del viaje del grupo a Tailandia: **21 nov – 5 dic 2026**.

Itinerario día a día, con tipos de turismo (playa / templos / ciudad / naturaleza),
imágenes de cada destino, vídeos, clima, comida, alquiler de moto, qué llevar y
checklist de reservas. Precios en euros con el equivalente en bahts.

## Cómo se publica

Este repo está vinculado a **Vercel**. Cada vez que se sube un cambio a la rama
`main`, Vercel publica la nueva versión automáticamente.

## Archivos

- `index.html` — la guía completa (todo en un archivo).
- `manifest.webmanifest` — configuración de la PWA (instalable en el móvil).
- `sw.js` — service worker. Estrategia *network-first* para el HTML, así siempre
  se ve la última versión al abrir con conexión.
- `icon-192.png`, `icon-512.png` — iconos de la app.

## Editar

Basta con editar `index.html` y subir el cambio. Si tocas `sw.js`, sube el número
de versión de la constante `CACHE` (por ejemplo `-v2` → `-v3`) para forzar la
actualización en los móviles que ya la tengan instalada.
