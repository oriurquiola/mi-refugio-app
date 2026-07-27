# 0002 — Datos mock, sin backend, sin mapeo síntoma→técnica
_Fecha: 2026-07-22 · Estado: aceptada (MVP)_

## Contexto
v1 debe demostrar el flujo completo sin infraestructura. La Ficha 4D define no pedir datos personales en v1.

## Decisión
- Todo el contenido vive fijo en `src/data.ts`: 18 síntomas (3 categorías), 3 técnicas con pasos, 2 sesiones `mockHistory`.
- **Sin backend, sin persistencia, sin llamadas de red.**
- `Recommendations.tsx` muestra **todas** las técnicas; **no** hay lógica que filtre técnicas según los síntomas elegidos (ver comentario en `Recommendations.tsx:16`).
- `@google/genai` figura en `package.json` pero **no se importa en `src/`** → `GEMINI_API_KEY` no es necesaria para correr.

## Razón
Reducir superficie y riesgo para el MVP/demo. El mapeo real y la IA se pueden añadir después sin bloquear la entrega.

## Consecuencias
- Para implementar **mapeo síntoma→técnica**: tocar `Recommendations.tsx` (y posiblemente extender `Technique`/`data.ts` con relación síntoma↔técnica).
- `mockHistory` existe pero **no se consume**; conectarlo a Home es una tarea abierta (ver `state/current.md`).
- Si se decide usar Gemini, recién ahí configurar `.env.local` con `GEMINI_API_KEY` (ver `.env.example`).
