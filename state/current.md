# Estado actual — Mi Refugio

_Actualizado: 2026-08-02 · Sesión 06_

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
- **Git/remoto**: todo el trabajo está en `origin/main` (commit `1455fb0`, 2026-07-29: respiración a 3 ciclos). Queda **sin commitear a propósito** `.claude/settings.local.json` (solo un permiso local de la sesión). El repo auto-sincroniza a GitHub (`oriurquiola/mi-refugio-app`). `gh` NO está instalado → PRs vía API con la credencial del push. PR #1 creado y luego cerrado; cambio aplicado directo a `main` a pedido de la usuaria.
- **Sistema de memoria reforzado**: `contexto/` (`design.md`, `decisiones.md`, `reglas.md`) es fuente de verdad; se lee antes de cualquier cambio y se avisa si algo pedido la contradice. `reglas.md` creado (espejo de `AGENTS.md` §3).
- **Pantalla Perfil** (`src/screens/Profile.tsx`, `AppScreen "PROFILE"`): mockup visual, sin datos reales ni edición. Accesible tocando el avatar "MA" del Home. Secciones: estadísticas, bitácora (calendario del mes) e historial de técnicas — todas derivadas de `mockHistory`. Resuelve el pendiente de "mockHistory no se consume". Verificado en navegador (flujo Home → Perfil → back, consola limpia, `npm run lint` OK). Ver `decisions/0007`.

- **CTA "Hablar con un psicólogo" unificado**: extraído a `src/components/PsychologistCTA.tsx` (halo coral que respira, una vez al entrar, respeta `prefers-reduced-motion`). Se usa en Recommendations y al cierre de Profile. El flotante del Home sigue siendo `FloatingPsychologistButton`.
- **Eliminado botón "Guardar esta sesión"** de Recommendations (era visual, sin lógica).
- **Sombra recortada en los tabs de Síntomas** corregida: `overflow-x-auto` recortaba el `boxShadow` del tab activo; se resolvió con padding interno + márgenes negativos (`Symptoms.tsx`).
- **Respiración guiada a pantalla completa** (`src/screens/BreathingExercise.tsx`): la card de Respiración 4-7-8 ofrece "Respiremos juntos" → overlay con círculo que escala al ritmo 4-7-8, anillo de arcos proporcionales con marcador, instrucción y cuenta regresiva. Respeta `prefers-reduced-motion`. Verificado en navegador (fases, cierre, y el caso en que la respiración cae a "Otras técnicas"). Ver `decisions/0008`.
- **Respiración guiada a 3 ciclos (57 s), con corte de ciclo visible** (2026-07-29): `BREATHING_CYCLES = 3` en `BreathingExercise.tsx`; las animaciones duran un ciclo y se repiten (`repeat`), y el temporizador ubica la fase por módulo. En cada corte: el marcador vuelve arriba, pulsa un anillo lavanda (0,8 s) y avanza el indicador de **3 puntos + "Respiración N de 3"** (esa línea lleva el `aria-live`). Con reduced motion quedan los puntos y el texto. Medido en el navegador: corte exacto a 19,00 s, pulso 0.86 → 0 en ~0,75 s, escala sin salto en el empalme, fin a ~57 s. Cierra el pendiente de la etiqueta "60 seg". Ver `decisions/0011`.

- ~~**DEMO · técnica principal fija**~~ → **revertida el 2026-08-02** (ver sesión 06). `DEMO_PINNED_TECHNIQUE_ID` está en `null`; la constante sigue en `data.ts` como interruptor documentado para una demo futura. Ver `decisions/0009`.

- ~~**Presentación del Demo Day** (`/demo-day`)~~ → **retirada el 2026-08-02** (ver abajo). Se usó en el Demo Day y cumplió su función. Ver `decisions/0010`.
- **`vercel.json`**: rewrite SPA (`/(.*)` → `/index.html`). Se creó para `/demo-day`, pero **se mantiene** tras el retiro: es la config estándar de un SPA estático y evita 404 en cualquier ruta futura. Vercel resuelve el filesystem antes que los rewrites, así que `dist/assets/*` se sigue sirviendo directo.

### Sesión 06 (2026-08-02)
- **Presentación del Demo Day eliminada del producto**: se borró `src/demo-day/` (`DemoDay.tsx` + `slides.ts`) y la condición por pathname de `src/main.tsx`, que volvió a montar `<App />` y nada más. Era la salida ya prevista en `decisions/0010`; el código queda recuperable en git (commit `534cb77`). Sin residuos: la única referencia en código era `main.tsx`. Verificado: `npm run lint` OK, `npm run build` OK (**373 kB JS / 18,7 kB CSS**, antes 384/21), y en el navegador tanto `/` como `/demo-day` renderizan la app normal con consola limpia.
- **Recomendación real por síntomas restaurada**: `DEMO_PINNED_TECHNIQUE_ID = null` en `src/data.ts`. `decisions/0005` vuelve a regir; `0009` queda revertida. Verificado en el navegador con dos casos (workaround G7, `useState` inicial temporal en `App.tsx`, ya revertido):
  - `["s9"]` (Miedo intenso) → principal **Ancla de seguridad**, Respiración 4-7-8 baja a "Otras técnicas". Es el caso que `0009` rompía.
  - `["s1","s2","s4"]` (Taquicardia, Falta de aire, Mareos) → **Respiración 4-7-8** (2 coincidencias) antes que **Grounding** (1); Ancla en "Otras técnicas". Chips correctos en cada card.
  - `npm run lint` y `npm run build` OK.
- **Copy de las técnicas sin punto final** (`data.ts`): tanto las `breathingPhases` de la respiración (lo que se lee en la pantalla animada) como los `steps` de las tres técnicas. Nota: los `steps` de Respiración 4-7-8 **no se muestran en ninguna parte** — si la técnica tiene `breathingPhases`, `renderTechniqueCard` deriva a `renderGuidedCard`, que solo ofrece "Respiremos juntos". Son datos muertos, con un paso ("Repite el ciclo 3 veces en total") desactualizado sin que se note.
- **Relevo animado de los textos de la respiración guiada**: fase e instrucción entran y salen con el efecto de los mensajes de `Processing` (fade + 18px + desenfoque, 0,55 s). Va **sin `mode="wait"`** a propósito, para que la instrucción nunca quede vacía si se estrangula rAF (G7): medido, 19 frames con los dos textos conviviendo y **0 frames sin texto**. Sin salto de layout (el contador clavado en y=621 en las tres fases) y con reduced motion queda en fundido seco. Ver `decisions/0012`.
- **Transición del ejercicio al cierre "¡Muy bien!"**: era un corte seco y ahora es un fundido (el ejercicio sale con escala 0,97 en 0,5 s; el cierre entra desde 0,94 en 0,7 s). Como el círculo del último exhale mide ~115px y el del cierre 120px, se lee como que el círculo se queda y se asienta. Medido: 10 frames conviviendo, 0 frames vacíos. **El botón inferior sigue cambiando de golpe** (vidrio → coral): quedó fuera porque los degradados no se interpolan. Ver `decisions/0012` sección B.
- **Pantalla de cierre de la respiración enriquecida** (2026-08-03): ícono `Check` de 44px en el círculo, botón secundario **"Repetir técnica"** que reinicia el ejercicio sin cerrar el overlay, y estrellas de fondo como las de `Processing`. Verificado midiendo: estrellas quietas (1 sola combinación de posiciones en 30 muestras) y titilando (69 opacidades entre 0,1 y 0,8); al repetir, el marcador rearranca en ~18° en vez de seguir desde 355°. Ver `decisions/0013`.
  - **Detalle que no es obvio:** repetir necesita un contador `runId` en las dependencias del `useEffect` del temporizador. `phases`, `cycleSeconds` y `totalSeconds` no cambian entre corridas, así que sin eso el efecto no se re-ejecuta y el ejercicio queda congelado.
  - **Salto de layout aceptado:** el CTA principal sube ~43px cuando aparece el secundario. Se prefirió eso antes que reservar el hueco durante los 57 s del ejercicio.
- **Token `w70` nuevo** en `src/theme.ts` + `design.md`: la escala de blancos saltaba de w80 a w60. Los dos secundarios de texto del producto (`Repetir técnica` y `Hacer un nuevo chequeo`) pasaron de 12px/`w60` a **13px/`w70`** por legibilidad. Eran los únicos dos con ese patrón: si se toca uno, tocar el otro.
- **Gotcha G10 (costó tres animaciones)**: `initial={false}` en un `AnimatePresence` se propaga por contexto y cancela la entrada de **todos** los `motion` descendientes. Al envolver el ejercicio se rompieron a la vez el marcador del anillo, el pulso de fin de ciclo y el círculo que respira (fijo en 115px, su último keyframe). Un círculo detenido se ve igual que uno pausado, así que no se detecta por screenshot: hay que medir. Ver `gotchas/README.md` G10.
- **La instrucción se queda en 2 líneas**, decidido con medición: la más larga mide 337px contra 335px de ancho útil a 375px, así que no entra en 1 línea sin acortar el copy o bajar a 13px. Detalle y alternativas descartadas en `decisions/0012`.
- **Cerrado el pendiente de copy**: con el pin en `null`, "Basada en lo que sientes ahora" vuelve a ser exacto. Y ninguna card principal puede quedar sin chips: el CTA "Continuar" de `Symptoms.tsx` solo aparece con ≥1 síntoma (`selectedIds.size > 0`) y entre las 3 técnicas cubren los 18 síntomas, así que toda selección posible produce al menos una coincidencia. El fallback `techniques.slice(0, 1)` de `Recommendations.tsx` queda como defensivo, inalcanzable en la práctica.

## ⏳ Pendiente
- Chat psicólogo: definir fallback fuera de horario (línea *4141) y confirmar destino Quédate (RM Chile) según público objetivo. Ver `decisions/0004`.
- Persistencia: el estado se pierde al recargar (sin storage). Definir si v1 lo necesita.
- Verificar flujo completo end-to-end < 30 s (criterio de la Ficha 4D).
- Unificar (opcional) la animación del CTA de Recommendations con el border beam del flotante.

## 🚧 Blockers
- Ninguno activo.

## ▶️ Próximas acciones sugeridas
1. Verificar el camino `prefers-reduced-motion` de la respiración guiada en un navegador real: quedó revisado en código (puntos + texto sobreviven), pero las herramientas de preview no exponen ese toggle.
2. Afinar el mapeo `matchesSymptomIds` con criterio clínico si hace falta (ver `decisions/0005`).
3. Si se define backend en v2: reemplazar `decisions/0007` (Perfil mockup) por una versión con datos reales/edición.

## 🖥️ Entorno
- Node en `/usr/local/bin` (v24.18.0). `npm` idem.
- Server dev: `npm run dev` → puerto 3000 (config en `.claude/launch.json`).
- `GEMINI_API_KEY` NO requerida (genai no se usa). Ver `gotchas/README.md`.
