# 0011 — Respiración guiada: 3 ciclos con corte visible

_Fecha: 2026-07-29 · Estado: aceptada · Actualiza `0008` (solo el punto "Duración")_

## Contexto
`0008` dejó la guía en **1 ciclo (19 s)** por ser demo, mientras la card promete **"60 seg"** (`data.ts`, `t1.duration`). La contradicción quedó anotada como pendiente en `state/current.md`. Además, con más de un ciclo la persona necesita saber **en qué vuelta va y cuándo empieza la siguiente**: sin señal, el ciclo 2 es indistinguible del 1.

## Decisión
La guía corre **3 ciclos** y **marca cada corte**, sin interrumpir el ritmo.

- **`BREATHING_CYCLES = 3`** en `BreathingExercise.tsx`. `cycleSeconds` (suma de fases, 19 s) × 3 = **57 s**, que es lo que la card promete como "60 seg".
- **Ritmo continuo:** los ciclos se encadenan sin pausa. El temporizador sigue siendo un `setInterval` contra un timestamp (gotcha G7) y ubica la fase por módulo: `cycle = floor(elapsed / cycleSeconds)`, `inCycle = elapsed - cycle * cycleSeconds`.
- **Animaciones por ciclo, no estiradas:** marcador del anillo y escala del círculo duran `cycleSeconds` con `repeat: BREATHING_CYCLES - 1`. El loop de escala empalma sin salto porque el primer y el último keyframe son ambos `SCALE_MIN`.
- **Señal de corte, tres capas a la vez:** el marcador vuelve arriba, un anillo lavanda pulsa (opacidad 0.9 → 0 y escala 1 → 1.12 en 0,8 s, remontado con `key={cycleIndex}`) y el indicador avanza.
- **Indicador:** tres puntos (`aria-hidden`) + línea **"Respiración N de 3"**, que además es la que lleva el `aria-live="polite"`.
- **Reduced motion:** sin marcador, sin escalado y sin pulso; los puntos y el texto siguen avanzando, así que el corte de ciclo se comunica igual.

## Razón
- **57 s y no 60 s exactos:** se evaluó una micro-pausa de 1,5 s entre ciclos (3 × 19 + 2 × 1,5 = 60 s justos) y se descartó a pedido de la usuaria: cortar el 4-7-8 dos veces le quita continuidad al ejercicio justo con alguien en crisis, y "60 seg" en la card es una aproximación, no un cronómetro.
- **Puntos + texto y no solo puntos:** el texto es lo único que sobrevive a `prefers-reduced-motion` y a un lector de pantalla.
- **`aria-live` movido del párrafo de instrucción a la línea de ciclo:** dos regiones live anunciando en el mismo instante del corte se pisan; el ciclo cambia 1 vez por vuelta y la instrucción 3.
- **"Respiración N de 3" y no "Ciclo N de 3":** `contexto/reglas.md` pide tono sin jerga técnica.

## Consecuencias
- El pendiente "subir a 3 ciclos o ajustar la etiqueta" de `state/current.md` queda cerrado: la etiqueta "60 seg" ya no miente.
- Para volver a modo demo corto: `BREATHING_CYCLES = 1`. El indicador se degrada solo ("Respiración 1 de 1") y el pulso nunca se dispara, pero conviene revisar la etiqueta de la card si se hace.
- Si una técnica futura suma `breathingPhases` con otro ritmo, hereda los 3 ciclos. Si necesitara otra cantidad, `BREATHING_CYCLES` tendría que pasar a ser un dato de `Technique`.
- `t1.steps[3]` pasó a "Repite el ciclo 3 veces en total." (antes "3 veces más", que implicaba 4). Esos `steps` no se renderizan para `t1` desde `0008`, pero el dato quedaba contradiciendo a la guía.
