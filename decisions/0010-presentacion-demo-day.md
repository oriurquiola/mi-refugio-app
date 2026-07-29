# 0010 — Presentación del Demo Day en la ruta `/demo-day`
_Fecha: 2026-07-29 · Estado: aceptada · No afecta a `0003` (flujo lineal)_

## Contexto
Para el Demo Day hacen falta 6 diapositivas (portada, problema, demo, decisiones, verificación, cierre) que **acompañen** los 5 minutos de demo en vivo sobre `https://mi-refugio-app.vercel.app/`, sin reemplazarla. Requisitos: navegación por teclado, legible a ~3 m, responsive, WCAG AA, sin dependencias nuevas y sin tocar el producto.

## Decisión
Vista nueva en `src/demo-day/` (`DemoDay.tsx` + `slides.ts`), servida en el pathname `/demo-day`.

Como la app **no usa router** (`AGENTS.md` §5), el ruteo se resuelve con una sola condición en `src/main.tsx`: si el pathname es `/demo-day` monta `<DemoDay />`, si no monta `<App />` de siempre. Es el único archivo del producto que se tocó; `App.tsx` y `src/screens/*` quedaron intactos.

Reutiliza los tokens de `src/theme.ts`, las fuentes (`font-display` / `font-sans`) e íconos de `lucide-react`. No se agregaron dependencias ni tokens nuevos.

## Razón
- **Un `if` en el entry, no un router**: agregar `react-router` por una vista de presentación habría metido una dependencia y un patrón de navegación que el producto no usa.
- **Fuera del marco mobile de `0006`**: la presentación se proyecta y se lee de pie a ~3 m, así que ocupa el viewport completo. Por eso vive fuera de `App.tsx`, que sí impone la columna de 440px.
- **Escala tipográfica con `clamp(18px, 2.4vw, N)`**: el coeficiente `2.4vw` está elegido para que a 1025px el texto ya esté en ≥24px (mínimo pedido en desktop) y nunca baje de 18px en mobile.
- **Solo animación de entrada, sin `AnimatePresence`**: con `mode="wait"` (lo que usa `App.tsx`) la diapositiva siguiente no monta hasta que termina la salida; si el navegador estrangula `requestAnimationFrame` la presentación se congela en vivo (gotcha **G7**). Además solo se anima `x` y nunca la opacidad, para que una animación estancada deje el texto legible igual.
- **El botón a la demo es un `<a target="_blank">`, no un `<button>`**: es un enlace real, así se activa con Enter y el navegador lo trata como tal. No se reutilizó `PrimaryCTA` porque ese componente es un `<button>` con `onClick`.

## Consecuencias
- La presentación tiene **3 paradas de foco** (el enlace a la demo y los dos botones de navegación); los puntos de progreso son `aria-hidden`. Foco visible: anillo de 3px lavanda con offset de 4px.
- Los textos son **literales y cerrados** en `slides.ts`. No hay datos generados ni inferidos: si el guion cambia, se edita ese archivo.
- **Deploy:** en Vercel la ruta `/demo-day` va a dar 404 hasta que se agregue un rewrite SPA (`vercel.json`), porque el build es un SPA estático sin fallback. En local con Vite funciona.
- Al terminar el Demo Day la vista puede eliminarse borrando `src/demo-day/` y la condición de `main.tsx`, sin residuos en el producto.
