# 0004 — CTA "Hablar con un psicólogo": resplandor + chat externo
_Fecha: 2026-07-22 · Estado: aceptada_

## Contexto
Los dos botones "Hablar con un psicólogo" (flotante en Home y CTA en Recommendations) no tenían acción. Se pidió resaltarlos al entrar y que lleven a chatear con un especialista.

## Decisión
- **Destino del chat:** `https://direct.lc.chat/19090748/` — URL de **chat directo de LiveChat** del Programa Quédate (Servicio de Salud Metropolitano Oriente, prevención del suicidio). Se centraliza en `src/config.ts` (`PSYCHOLOGIST_CHAT_URL` + `openPsychologistChat()`), que abre en **pestaña nueva** con `noopener,noreferrer`.
- **Animación:**
  - Flotante (Home): **destello de borde ("border beam")** — un punto de luz recorre solo la línea del borde una vez al entrar y se desvanece. Se logra con un `span` `absolute inset-0`, `conic-gradient(from var(--beam-angle), ...)` enmascarado al anillo del borde (`mask` content-box + `mask-composite: exclude`, padding 1.5px). Animación CSS: `border-beam-spin` (0→360°, propiedad registrada con `@property`) + `border-beam-fade`, 1 iteración, definidas en `src/index.css`. Botón con `overflow-hidden`. (Evolución: halo que respira → shimmer diagonal → border beam, a pedido de la usuaria, 2026-07-22.)
  - Recommendations: **halo coral que respira** — `boxShadow` que crece y se atenúa 2 veces al montar y queda en reposo.
  - Ambas respetan `prefers-reduced-motion` (sin animación, solo estado estático).
- Clic al chat aplicado a **ambos** botones.

## Razón
El sitio de Quédate abre su chat vía widget JS (`license_id 19090748`), sin URL navegable; `direct.lc.chat/{license_id}` es la vía directa y verificada al mismo chat. Pestaña nueva = no se pierde Mi Refugio. El halo llama la atención sin romper "urgencia serena".

## Consecuencias
- Si Quédate cambia de proveedor/licencia, actualizar SOLO `src/config.ts`.
- El chat tiene **horario** de atención; fuera de horario puede verse offline. Pendiente v2: fallback a la línea *4141.
- Confirmar con la usuaria que enlazar a Quédate (RM, Chile) es el destino deseado según el público objetivo.
- `useReducedMotion` de `motion/react` se usa ahora en `FloatingPsychologistButton.tsx` y `Recommendations.tsx`.
