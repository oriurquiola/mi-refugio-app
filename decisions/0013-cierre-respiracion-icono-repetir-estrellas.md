# 0013 — Pantalla de cierre de la respiración: ícono, repetir y estrellas
_Fecha: 2026-08-03 · Estado: aceptada · Detalla `0008`; el relevo de entrada está en `0012` sección B_

## Contexto
La pantalla de cierre ("¡Muy bien!") era un círculo liso, dos líneas de texto y un único CTA que sacaba de la técnica. No comunicaba visualmente que algo se había completado, no ofrecía repetir sin salir y reentrar, y era la única pantalla del overlay sin tratamiento de fondo.

## Decisión
Tres agregados al bloque `key="cierre"` de `BreathingExercise.tsx`, más un ajuste de legibilidad que sale de esa pantalla.

1. **Ícono `Check` de 44 px** centrado en el círculo de 120 px. El círculo sigue siendo `aria-hidden`: el texto "¡Muy bien!" ya comunica el estado.
2. **Botón secundario "Repetir técnica"** debajo del CTA principal, que **reinicia el ejercicio en el lugar** sin cerrar el overlay.
3. **Estrellas de fondo**, el mismo efecto que `Processing.tsx`, dentro del bloque de cierre.
4. **Los secundarios de texto suben a 13 px y `w70`** (antes 12 px / `w60`), en esta pantalla y en "Hacer un nuevo chequeo" de `Recommendations.tsx`.

## Razón
- **`Check` y no el ícono de la técnica.** La app ya usa `Check` para "completado": en `Recommendations.tsx`, al terminar los pasos aparece junto a "¡Muy bien! Técnica completada". Reutilizarlo hace que el cierre se lea igual en las dos pantallas. Alternativas descartadas: `Wind` (identidad de la técnica, pero solo serviría para 4-7-8) y `Sparkles` (celebratorio, dice menos "terminaste").
- **Repetir necesita un `runId`, no alcanza con resetear el estado.** El temporizador vive en un `useEffect` con dependencias `[phases, cycleSeconds, totalSeconds]`, y **ninguna cambia entre una corrida y la siguiente**: sin una dependencia nueva el efecto no se vuelve a ejecutar y el ejercicio queda congelado. Por eso se agregó un contador de arranques a las dependencias. Las animaciones (marcador, círculo, pulso) se reinician solas porque el bloque del ejercicio se desmonta al terminar y se vuelve a montar al repetir — verificado: el marcador rearranca en ~18° en vez de continuar desde 355°.
- **Las posiciones de las estrellas van en `useMemo`.** En `Processing.tsx` salen de `Math.random()` en el cuerpo del render, así que **se reubican en cada re-render**; allá dura 7 s y no se nota, pero la pantalla de cierre se queda y unas estrellas que saltan delatarían el truco. Se dejó `Processing.tsx` como estaba: es cosmético y ajeno a este cambio.
- **Reduced motion:** las estrellas quedan fijas en opacidad 0,35 en vez de titilar en bucle, coherente con el resto de la pantalla.
- **`w70` es un token nuevo en `theme.ts`, no un `rgba` suelto.** La escala de blancos saltaba de `w80` a `w60`, y la regla dura de `AGENTS.md` §3 prohíbe hardcodear colores fuera de `theme.ts`. Se agregó también a `design.md` para que spec y código no se despeguen. Alternativa: subir a `w80`, que ya existía, pero pisaba el peso visual del CTA principal.

## Consecuencias
- **Salto de layout aceptado a conciencia:** al aparecer el secundario, el CTA principal sube ~43 px en el mismo instante del fundido. Evitarlo pedía reservar ese hueco durante los 57 s del ejercicio, dejando el fondo de la pantalla desbalanceado todo ese tiempo. Se prefirió el salto de medio segundo.
- Los dos secundarios de texto (`Repetir técnica` y `Hacer un nuevo chequeo`) **deben mantenerse iguales**: comparten estilo exacto y eran los únicos dos del producto con ese patrón. Si se toca uno, tocar el otro.
- Sigue pendiente de `0012` sección B: el CTA principal **cambia de golpe** de vidrio a coral en el mismo instante de la transición, porque los degradados no se interpolan.
- El overlay ya no se cierra solo al terminar: ahora hay dos salidas (volver o repetir). Si en el futuro se agrega cierre automático, hay que contemplar que el secundario dejaría de ser alcanzable.
