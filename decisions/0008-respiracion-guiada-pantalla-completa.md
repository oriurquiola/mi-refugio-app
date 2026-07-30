# 0008 — Respiración guiada a pantalla completa
_Fecha: 2026-07-29 · Estado: aceptada_

## Contexto
La card de "Respiración 4-7-8" era un acordeón con los pasos en texto: la persona tenía que leer y llevar el ritmo por su cuenta, justo cuando está en crisis. Referencia aportada por la usuaria: la pantalla de respiración de Calm (círculo que escala + anillo temporizador + etiqueta de fase).

## Decisión
Las técnicas con **ritmo de respiración definido** dejan de ser acordeón y ofrecen una guía a pantalla completa.

- **Datos:** `Technique.breathingPhases?: BreathingPhase[]` (`types.ts`). Solo `t1` lo tiene hoy. **Su presencia es lo que decide el comportamiento de la card**, no la posición ni un flag aparte: si una técnica futura suma fases, hereda la guía sin tocar `Recommendations.tsx`.
- **Card guiada** (`renderGuidedCard`): mantiene título, bajada y chips de síntomas, y reemplaza el acordeón por el botón **"Respiremos juntos"** (plural inclusivo, coherente con "Vamos a resolverlo juntos").
- **`BreathingExercise.tsx`:** overlay `fixed inset-0 z-[60]` (no una `AppScreen` nueva). Círculo con gradiente que escala 0.52 → 1 al inhalar, se sostiene en la retención y vuelve al mínimo al exhalar; anillo con **arcos proporcionales a 4/7/8** y marcador que da **una vuelta por ciclo a velocidad constante** — posible justamente porque los arcos son proporcionales al tiempo. Instrucción completa + segundos restantes en pantalla.
- **Duración:** **1 ciclo (19 s)** por ahora, decisión explícita de la usuaria por ser una demo. → **Actualizado por `0011`: 3 ciclos (57 s) con corte de ciclo visible.**
- **Reduced motion:** sin escalado ni giro; solo fase, instrucción y cuenta regresiva.

## Razón
- **Overlay y no pantalla nueva:** al cerrarse devuelve Recomendaciones intacta (scroll, acordeones, técnicas secundarias) sin pasar estado por `App.tsx`. Responde al pedido de que Grounding y Ancla "solo se muestren si aún no hizo clic": el overlay las tapa mientras dura y **reaparecen al volver**, elegido sobre ocultarlas de forma permanente para no quitarle alternativas a alguien que sigue en crisis.
- **Temporizador con `setInterval` contra un timestamp**, no `requestAnimationFrame`: no acumula deriva y sobrevive al estrangulamiento de rAF del preview (gotcha G7).
- **No se copió de la referencia** su marcador blanco puro (choca con "sin blancos duros"), ni su cronómetro/controles de reproducción.

## Consecuencias
- La etiqueta de la card sigue diciendo "60 seg" mientras la guía corre 19 s (1 ciclo). Queda como pendiente en `state/current.md`: al salir de demo, subir a 3 ciclos (~57 s) o ajustar la etiqueta.
- Grounding y Ancla conservan el acordeón; la pista "Toca cada una para ver los pasos" ahora solo aparece si hay alguna card desplegable.
- Los chips de síntomas se extrajeron a `renderSymptomChips` y los comparten ambos tipos de card.
