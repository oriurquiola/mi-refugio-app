# 0012 — Relevo animado de los textos de fase en la respiración guiada
_Fecha: 2026-08-02 · Estado: aceptada · Detalla `0008` y `0011`_

## Contexto
En la guía a pantalla completa (`0008`), la fase ("Inhala") y su instrucción cambiaban de golpe, sin transición, mientras todo lo demás de la pantalla se mueve con suavidad. Se pidió que entren y salgan animadas, con el mismo efecto que los textos de `Processing.tsx`.

`Processing` tiene **dos** animaciones de texto distintas: la etiqueta superior (fade + 5 px, 0,38 s) y los mensajes centrales (fade + 18 px + desenfoque de 5 px, 0,55 s). Se eligió la de los mensajes, por ser el efecto protagonista de esa pantalla.

## Decisión
`AnimatePresence` en `BreathingExercise.tsx` con la fase y la instrucción como un único bloque, keyeado por `phaseIndex`, con el efecto de los mensajes de `Processing`.

Tres precisiones que hacen a la decisión:

1. **Sin `mode="wait"`.** El texto entrante monta sin esperar a que termine la salida.
2. **Solo la fase y la instrucción.** Los puntos y "Respiración N de 3" quedan fuera de la animación.
3. **Alto fijo** (`PHASE_TEXT_HEIGHT = 100`) con los hijos en `absolute`, y `w-full` en la columna contenedora.

## Razón
- **Sin `mode="wait"` por robustez, no por estética.** Con `mode="wait"` la pantalla siguiente no monta hasta que termina la salida; si el navegador estrangula `requestAnimationFrame` (gotcha **G7** — le pasa justo a `Processing`, que se queda pegada en "Inhala…"), el bloque puede quedar **sin instrucción a la vista**. En una pantalla que alguien usa en crisis, ese es el peor modo de fallo posible. Medido: sobre 250 muestras, 19 frames con los dos textos conviviendo y **0 frames sin texto**.
- **Los puntos y el contador cambian por ciclo, no por fase.** Animarlos en cada fase los haría parpadear 9 veces sin que su contenido cambie, y "Respiración N de 3" tiene `aria-live="polite"`: remontarlo por fase haría que un lector de pantalla lo anunciara 9 veces en vez de 3.
- **El alto fijo es consecuencia directa de no usar `mode="wait"`**: los dos textos conviven un instante y, en el flujo normal, se apilarían empujando los puntos hacia abajo en cada cambio de fase.
- **`w-full` en la columna** porque al pasar la instrucción a `absolute` dejó de aportar ancho: sin eso la columna colapsa al ancho de los puntos, el texto se parte en 3 líneas y se monta sobre ellos (se vio en la primera pasada de verificación).
- **Reduced motion**: el relevo queda en fundido seco (0,2 s), sin desplazamiento ni desenfoque. Verificado forzando el flag: el título nunca se mueve de su posición.

## Consecuencias
- **La instrucción ocupa 2 líneas y así se queda.** Se evaluó llevarla a 1 línea: con la tipografía real a 15px, "Inhala por la nariz contando mentalmente hasta 4" mide **337 px** contra **335 px** de ancho útil a 375 px (el `px-[20px]` de la pantalla), o sea que no entra ni de borde a borde; "Exhala lentamente…" mide 327 px y quedaría pegada a los bordes. A 320 px de ancho el útil baja a 280 px y no entra ninguna de las dos. Las alternativas eran acortar el copy (perdiendo "lentamente", que es parte de la técnica 4-7-8) o bajar a 13px (ilegible en pánico, y a 320 px vuelve a partirse). Se decidió **dejar 2 líneas**.
- `PHASE_TEXT_HEIGHT` está calculado para 2 líneas: 93 px medidos, 100 px de contenedor. **Si se alarga el copy de una instrucción y pasa a 3 líneas, hay que subir esa constante**, o el texto se recorta.
- El efecto es solidario entre fase e instrucción: se relevan juntas. Si alguna vez se quisieran desfasar, hay que separarlas en dos `AnimatePresence` con el mismo `key`.
