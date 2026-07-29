# 0009 — DEMO: Respiración 4-7-8 fija como técnica principal
_Fecha: 2026-07-29 · Estado: aceptada (temporal, solo demo) · Limita a `0005`_

## Contexto
`0005` estableció la recomendación real: las técnicas se puntúan por cuántos síntomas seleccionados abordan y las coincidentes suben a "Técnicas para ti". Con eso, la respiración guiada (`0008`) solo aparecía como principal si la persona marcaba síntomas físicos; con "Miedo intenso", por ejemplo, quedaba abajo en "Otras técnicas".

Para mostrar la demo, la usuaria pidió que la respiración sea **siempre** la técnica principal, sin importar los síntomas.

## Decisión
Constante `DEMO_PINNED_TECHNIQUE_ID = "t1"` en `data.ts`. Si está definida, `Recommendations.tsx` la muestra como única técnica principal y baja el resto a "Otras técnicas", **ordenadas por relevancia** para que los síntomas sigan influyendo en algo.

Ponerla en `null` restaura íntegra la lógica de `0005`, que se conserva en el código sin tocar.

## Razón
- Es una **decisión de demo, no de producto**: se aisló en una constante con nombre explícito (`DEMO_`) y un solo punto de reversión, en vez de borrar o reescribir el scoring de `0005`.
- Se dejó el orden por relevancia en las secundarias para no perder del todo la respuesta a los síntomas.
- Alternativa descartada: cambiar `matchesSymptomIds` de `t1` para que cubra los 18 síntomas. Habría dado el mismo resultado visual pero **falseando el modelo clínico** de qué técnica sirve para qué, que es justamente lo que `0005` fue a construir.

## Consecuencias
- **`0005` no está revertida, está suspendida.** Al salir de demo, poner la constante en `null` y verificar que la recomendación vuelve a responder a los síntomas.
- Si los síntomas marcados no coinciden con la respiración, su card aparece **sin chips** ("Para lo que sientes ahora"), porque no hay síntomas reales que mostrar. Se prefirió eso antes que mostrar chips de síntomas que la técnica no aborda.
- El subtítulo de la pantalla sigue diciendo "Basada en lo que sientes ahora", que con la técnica fija es parcialmente inexacto. Anotado como pendiente en `state/current.md`.
