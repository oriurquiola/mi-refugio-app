# AGENTS.md — Mi Refugio · Control central

> Léeme SIEMPRE primero. Soy el índice de la memoria del proyecto.
> No copies mi contenido al prompt: referénciame. Mantenerme < 300 líneas.

---

## 1. Identidad y propósito
- **Producto:** *Mi Refugio* — herramienta de primeros auxilios emocionales para adultos 25–45 en crisis de ansiedad/pánico.
- **Premisa de diseño:** el usuario está solo, en pánico y necesita ayuda AHORA.
- **Feature núcleo:** registro rápido de síntomas → recomendación de métodos de contención en **< 30 s** en mobile.
- **Contexto académico:** proyecto de Interface School (Wave Delta), estudiante Oriana Urquiola. Entregable = Ficha 4D. Ver `Contexto/ficha4d.md`.
- **Origen técnico:** export de Google AI Studio (React SPA).

## 2. Reglas de oro de contexto y memoria (INVARIANTES)
1. El context window es **caro y volátil**. La memoria real vive en **archivos**, no en el historial.
2. **Nunca** cargues todo el historial ni todos los archivos del proyecto.
3. Carga **solo lo estrictamente necesario** para la tarea actual (usa el orden de lectura §4).
4. **Prefiere referenciar** archivos (`ruta:línea`) antes que copiar contenido largo al prompt.
5. Convierte procedimientos repetitivos en **skills** (`skills/`).
6. Al cerrar una sesión importante: actualiza `state/current.md`, registra decisiones en `decisions/`, comprime lo valioso en `logs/`. Rutina: `skills/end-session.md`.
7. Mantén este archivo **conciso y denso**. Sin texto floreado.

## 3. Reglas duras del producto (NO violar sin decisión explícita)
- **Tono:** acompañar y calmar. Sin términos clínicos, sin señales de alerta/urgencia, sin jerga técnica.
- **Estética:** dark mode profundo, sin blancos duros. Coral = CTA ("urgencia serena"). Lavanda = marca.
- **Datos v1:** NO se piden datos personales, login ni datos sensibles. Sin backend, sin persistencia.
- **Copy en español**, cálido y en segunda persona.
- **Objetivo medible:** el flujo principal se completa en < 30 s sin dudas.
- Tokens de diseño canónicos: `src/theme.ts` (código) y `design.md` (spec). No hardcodear colores fuera de `theme.ts`.

## 4. Orden de lectura preferido (carga incremental)
Lee de arriba hacia abajo y **DETENTE cuando tengas lo necesario**:
1. `AGENTS.md` (este archivo) — siempre.
2. `state/current.md` — qué está hecho/pendiente/bloqueado AHORA.
3. Según la tarea:
   - Diseño / UI / copy → `design.md` + `Contexto/decisiones.md`.
   - Arquitectura / por qué algo es así → `decisions/`.
   - Correr / verificar la app → `skills/run-dev.md`.
   - Un error raro reaparece → `gotchas/README.md`.
   - Contexto del entregable académico → `Contexto/ficha4d.md`.
4. Solo entonces abre código concreto (`src/...`). Nunca leas `src/` entero de golpe.

## 5. Mapa mínimo del código (para no re-explorar)
- **Stack:** React 19 + TypeScript + Vite 6 + Tailwind 4 + `motion` + `lucide-react`.
- **Estado:** `src/App.tsx` — `useState` de `currentScreen` + `selectedSymptoms`. Sin router.
- **Flujo:** `HOME → SYMPTOMS → PROCESSING → RECOMMENDATIONS` (lineal, con back). Detalle en `decisions/0003-flujo-linear.md`.
- **Datos:** `src/data.ts` (mock: 18 síntomas, 3 técnicas, 2 sesiones). `src/types.ts` tipos. `src/theme.ts` colores.
- **Pantallas:** `src/screens/*.tsx`. **Componentes:** `src/components/*.tsx`.
- **Nota clave:** `@google/genai` está en deps pero **NO se usa** en `src/` → la app corre **sin** `GEMINI_API_KEY`.
- Estructura visual completa: abre `diagrama-flujo.html` en el navegador.

## 6. Routing de skills (qué skill/archivo usar según la tarea)
| Tarea | Ir a |
| --- | --- |
| Correr la app / levantar server / ver un cambio en vivo | `skills/run-dev.md` |
| Verificar un cambio en el navegador (screenshot, consola) | `skills/run-dev.md` §Verificación |
| Cerrar sesión: guardar estado, decisiones y log | `skills/end-session.md` |
| Registrar una decisión nueva | `decisions/README.md` (plantilla ADR) |
| Cambio de UI, color, copy, animación | `design.md` + `Contexto/decisiones.md` |
| Un error de entorno vuelve a aparecer | `gotchas/README.md` |

## 7. Definition of Done
Una tarea está TERMINADA solo si:
- [ ] El cambio corre sin errores (server levanta, consola limpia — `skills/run-dev.md`).
- [ ] Respeta las reglas duras del producto (§3): tono, estética, < 30 s, sin datos personales.
- [ ] `npm run lint` (tsc `--noEmit`) pasa si se tocó TypeScript.
- [ ] Verificado visualmente en el navegador si el cambio es observable en UI.
- [ ] `state/current.md` actualizado (hecho/pendiente/blockers).
- [ ] Si hubo decisión relevante → registrada en `decisions/`. Si fue sesión importante → resumen en `logs/`.

## 8. Comportamiento del agente con el contexto
- Empieza cada sesión leyendo §4 en orden; no adivines el estado, léelo en `state/current.md`.
- Antes de "explorar el repo", pregúntate si §5 ya lo responde.
- Al terminar algo relevante, **no esperes a que te lo pidan**: aplica la rutina de cierre (`skills/end-session.md`).
- Escribe en la memoria de forma **densa y fechada**. Un hecho por lugar. Sin duplicar.
- Fechas siempre absolutas (ej. `2026-07-22`), nunca "hoy/ayer".

## 9. Punteros a la memoria
- `decisions/` — decisiones técnicas/de alcance con fecha y razonamiento (formato ADR).
- `state/current.md` — estado vivo del proyecto.
- `skills/` — procedimientos reutilizables (correr, verificar, cerrar sesión).
- `gotchas/README.md` — problemas conocidos + solución.
- `logs/` — resúmenes comprimidos de sesiones importantes.
- `Contexto/` — insumos humanos: `design.md`↗ (spec), `Contexto/decisiones.md` (decisiones de diseño), `Contexto/ficha4d.md` (entregable).

---
_Última actualización: 2026-07-22. Al editar, mantén el orden y el límite de líneas._
