# Estado actual — Mi Refugio

_Actualizado: 2026-07-22 · Sesión 02_

## ✅ Hecho
- App funcional: flujo HOME → SYMPTOMS → PROCESSING → RECOMMENDATIONS con transiciones `motion`.
- Datos mock completos en `src/data.ts` (18 síntomas, 3 técnicas, 2 sesiones de historial).
- Sistema de diseño implementado en `src/theme.ts` y documentado en `design.md`.
- Ajustes julio 2026 aplicados (copy Home, iconos outline, padding síntomas, Processing 7 s). Ver `Contexto/decisiones.md`.
- Entorno local operativo: Node v24.18.0 + npm 11.16.0, `npm install` hecho, server Vite corriendo en `http://localhost:3000`.
- `diagrama-flujo.html` generado (referencia visual, fuera del build).
- Sistema de memoria (`AGENTS.md` + carpetas) creado.
- **Botón "Hablar con un psicólogo"** (flotante Home + CTA Recommendations): clic abre chat directo de Quédate (`src/config.ts`). Animación de entrada: **border beam** en el flotante (recorre el borde 1 vez, 2.8 s, fade in/out suave, `@property` + keyframes en `src/index.css`) y **halo coral que respira** en Recommendations. Verificado en navegador. Ver `decisions/0004`.
- **Recomendación real según síntomas**: `matchesSymptomIds` en `data.ts` + score/orden en `Recommendations.tsx` (coincidentes primero + "Otras técnicas" abajo, chips por técnica). Verificado en navegador. Ver `decisions/0005`.

## ⏳ Pendiente
- `mockHistory` está definido pero **no se consume** en ninguna pantalla → decidir si Home debe leerlo desde `data.ts`.
- Botón "Guardar esta sesión" (Recommendations) es visual, sin lógica.
- Chat psicólogo: definir fallback fuera de horario (línea *4141) y confirmar destino Quédate (RM Chile) según público objetivo. Ver `decisions/0004`.
- Persistencia: el estado se pierde al recargar (sin storage). Definir si v1 lo necesita.
- Verificar flujo completo end-to-end < 30 s (criterio de la Ficha 4D).
- Unificar (opcional) la animación del CTA de Recommendations con el border beam del flotante.

## 🔄 En progreso (sesión aparte)
- Fix de 3 errores `tsc` de `Home.tsx`/`Processing.tsx`: `npm run lint` ahora pasa **limpio (0 errores)** en este dir → aparentemente resuelto. Confirmar cierre del chip antes de dar por cerrada la tarea.

## 🚧 Blockers
- Ninguno activo.

## ▶️ Próximas acciones sugeridas
1. Decidir si conectar `mockHistory` a la sección "Últimas recomendaciones" de Home.
2. Afinar el mapeo `matchesSymptomIds` con criterio clínico si hace falta (ver `decisions/0005`).

## 🖥️ Entorno
- Node en `/usr/local/bin` (v24.18.0). `npm` idem.
- Server dev: `npm run dev` → puerto 3000 (config en `.claude/launch.json`).
- `GEMINI_API_KEY` NO requerida (genai no se usa). Ver `gotchas/README.md`.
