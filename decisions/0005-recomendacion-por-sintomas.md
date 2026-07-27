# 0005 — Recomendación real según síntomas seleccionados
_Fecha: 2026-07-22 · Estado: aceptada (reemplaza el alcance MVP de `0002` en cuanto al mapeo)_

## Contexto
`0002` dejó como MVP que Recommendations mostraba **siempre** las 3 técnicas, sin relación con lo elegido. Se pidió que las recomendaciones sean acordes a los síntomas.

## Decisión
- **Modelo:** cada `Technique` tiene `matchesSymptomIds: string[]` (`types.ts`), poblado en `data.ts` cubriendo los 18 síntomas. Se conserva `forSymptoms` (texto) solo para mostrar.
- **Lógica (Recommendations.tsx):** score por técnica = nº de síntomas seleccionados que aborda. Coincidentes (score>0) ordenadas por relevancia en **"Técnicas para ti"**; el resto en **"Otras técnicas que pueden ayudar"**. Fallback: si nada coincide, la 1ª técnica como base (nunca vacío).
- **UI:** bajo cada técnica, chips "Para lo que sientes ahora:" con los síntomas del usuario que atiende (color por categoría). Tarjeta extraída a `renderTechniqueCard()` para reusar en ambas secciones.
- Mapeo actual: t1 Respiración → físicos (s1,s2,s3,s5,s6,s7,s8) + angustia (s10); t2 Grounding → mareos/desconexión/irritabilidad + pensamientos (s4,s11,s12,s15,s16,s17,s18); t3 Ancla → miedo/angustia/tristeza/desesperanza (s9,s10,s13,s14,s16).

## Razón
Selección nunca vacía (CTA de Síntomas exige ≥1). Cobertura total evita pantallas sin técnicas. "Coincidentes + resto abajo" da relevancia sin ocultar opciones (elección de la usuaria).

## Consecuencias
- Añadir/editar técnicas o síntomas obliga a mantener `matchesSymptomIds` (si un síntomo nuevo no se mapea, cae al fallback).
- Base lista para v2: pesos por categoría, límite de top‑N, o mapeo generado por IA.
- Verificado en navegador: físicos→Respiración 1º; físicos+miedo→Respiración>Ancla, Grounding en "otras". `npm run lint` limpio.
