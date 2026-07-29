# Estado actual — Mi Refugio

_Actualizado: 2026-07-29 · Sesión 04_

## ✅ Hecho
- App funcional: flujo HOME → SYMPTOMS → PROCESSING → RECOMMENDATIONS con transiciones `motion`. Ahora suma **PROFILE** como quinta pantalla (ver abajo).
- Datos mock completos en `src/data.ts` (18 síntomas, 3 técnicas, 5 sesiones de historial con `dateISO`).
- Sistema de diseño implementado en `src/theme.ts` y documentado en `design.md`.
- Ajustes julio 2026 aplicados (copy Home, iconos outline, padding síntomas, Processing 7 s). Ver `Contexto/decisiones.md`.
- Entorno local operativo: Node v24.18.0 + npm 11.16.0, `npm install` hecho, server Vite corriendo en `http://localhost:3000`.
- `diagrama-flujo.html` generado (referencia visual, fuera del build).
- Sistema de memoria (`AGENTS.md` + carpetas) creado.
- **Botón "Hablar con un psicólogo"** (flotante Home + CTA Recommendations): clic abre chat directo de Quédate (`src/config.ts`). Animación de entrada: **border beam** en el flotante (recorre el borde 1 vez, 2.8 s, fade in/out suave, `@property` + keyframes en `src/index.css`) y **halo coral que respira** en Recommendations. Verificado en navegador. Ver `decisions/0004`.
- **Recomendación real según síntomas**: `matchesSymptomIds` en `data.ts` + score/orden en `Recommendations.tsx` (coincidentes primero + "Otras técnicas" abajo, chips por técnica). Verificado en navegador. Ver `decisions/0005`.
- **Marco mobile en desktop**: `App.tsx` enmarca la app como columna centrada `max-w-[440px]` con `translateZ(0)` para contener los `position: fixed`. Verificado a 1280px. Ver `decisions/0006`.
- **Eliminado footer "Mi historial"** del Home (`Home.tsx`), no tenía acción.
- **Git/remoto**: todo el trabajo está en `origin/main` (commit `aef3b60`). El repo auto-sincroniza a GitHub (`oriurquiola/mi-refugio-app`). `gh` NO está instalado → PRs vía API con la credencial del push. PR #1 creado y luego cerrado; cambio aplicado directo a `main` a pedido de la usuaria.
- **Sistema de memoria reforzado**: `contexto/` (`design.md`, `decisiones.md`, `reglas.md`) es fuente de verdad; se lee antes de cualquier cambio y se avisa si algo pedido la contradice. `reglas.md` creado (espejo de `AGENTS.md` §3).
- **Pantalla Perfil** (`src/screens/Profile.tsx`, `AppScreen "PROFILE"`): mockup visual, sin datos reales ni edición. Accesible tocando el avatar "MA" del Home. Secciones: estadísticas, bitácora (calendario del mes) e historial de técnicas — todas derivadas de `mockHistory`. Resuelve el pendiente de "mockHistory no se consume". Verificado en navegador (flujo Home → Perfil → back, consola limpia, `npm run lint` OK). Ver `decisions/0007`.

- **CTA "Hablar con un psicólogo" unificado**: extraído a `src/components/PsychologistCTA.tsx` (halo coral que respira, una vez al entrar, respeta `prefers-reduced-motion`). Se usa en Recommendations y al cierre de Profile. El flotante del Home sigue siendo `FloatingPsychologistButton`.
- **Eliminado botón "Guardar esta sesión"** de Recommendations (era visual, sin lógica).
- **Sombra recortada en los tabs de Síntomas** corregida: `overflow-x-auto` recortaba el `boxShadow` del tab activo; se resolvió con padding interno + márgenes negativos (`Symptoms.tsx`).
- **Respiración guiada a pantalla completa** (`src/screens/BreathingExercise.tsx`): la card de Respiración 4-7-8 ofrece "Respiremos juntos" → overlay con círculo que escala al ritmo 4-7-8, anillo de arcos proporcionales con marcador, instrucción y cuenta regresiva. **1 ciclo (19 s)** por ser demo. Respeta `prefers-reduced-motion`. Verificado en navegador (fases, cierre, y el caso en que la respiración cae a "Otras técnicas"). Ver `decisions/0008`.

- **DEMO · técnica principal fija**: `DEMO_PINNED_TECHNIQUE_ID = "t1"` en `data.ts` hace que Respiración 4-7-8 sea siempre la principal y Grounding/Ancla siempre adicionales. Verificado con síntomas coincidentes y no coincidentes. Ver `decisions/0009`.

## ⏳ Pendiente
- **Duración de la respiración guiada:** corre 1 ciclo (19 s) pero la card sigue etiquetada "60 seg". Al salir de demo: subir a 3 ciclos (~57 s) o ajustar la etiqueta.
- **Salir del modo demo:** poner `DEMO_PINNED_TECHNIQUE_ID` en `null` para restaurar la recomendación real por síntomas (`decisions/0005`, hoy suspendida por `0009`).
- **Copy a revisar:** con la técnica fija, el subtítulo "Basada en lo que sientes ahora" es parcialmente inexacto. Y si los síntomas no coinciden con la respiración, su card queda sin chips.
- Chat psicólogo: definir fallback fuera de horario (línea *4141) y confirmar destino Quédate (RM Chile) según público objetivo. Ver `decisions/0004`.
- Persistencia: el estado se pierde al recargar (sin storage). Definir si v1 lo necesita.
- Verificar flujo completo end-to-end < 30 s (criterio de la Ficha 4D).
- Unificar (opcional) la animación del CTA de Recommendations con el border beam del flotante.

## 🚧 Blockers
- Ninguno activo.

## ▶️ Próximas acciones sugeridas
1. Afinar el mapeo `matchesSymptomIds` con criterio clínico si hace falta (ver `decisions/0005`).
2. Si se define backend en v2: reemplazar `decisions/0007` (Perfil mockup) por una versión con datos reales/edición.

## 🖥️ Entorno
- Node en `/usr/local/bin` (v24.18.0). `npm` idem.
- Server dev: `npm run dev` → puerto 3000 (config en `.claude/launch.json`).
- `GEMINI_API_KEY` NO requerida (genai no se usa). Ver `gotchas/README.md`.
