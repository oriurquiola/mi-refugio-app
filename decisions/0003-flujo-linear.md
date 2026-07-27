# 0003 — Flujo lineal de 4 pantallas y paso de datos
_Fecha: 2026-07-22 · Estado: aceptada_

## Contexto
El objetivo es completar "registrar síntomas → recibir contención" en < 30 s, sin fricción ni decisiones innecesarias.

## Decisión
Flujo lineal con back:
`HOME → SYMPTOMS → PROCESSING → RECOMMENDATIONS`
- `SYMPTOMS.onContinue(ids)` guarda `selectedSymptoms` en `App.tsx` y navega.
- `RECOMMENDATIONS` recibe `selectedSymptoms` por props y los usa **solo** para mostrar las etiquetas detectadas.
- `PROCESSING` es puramente temporal (**7.0 s**, mensajes de 1.7 s); no procesa nada real, es contención/respiración.
- `BottomTabBar` y `FloatingPsychologistButton` se renderizan **solo en HOME**.

## Razón
Un camino único evita que el usuario en pánico tenga que decidir. La pantalla de "análisis" cumple función emocional (respirar), no de cómputo.

## Consecuencias
- Cambiar tiempos de Processing = editar constantes en `src/screens/Processing.tsx` (ver `Contexto/decisiones.md`).
- Si se agregan pantallas fuera de este eje (ej. Diario, Soporte de la tab bar), revisar `decisions/0001` (router).
