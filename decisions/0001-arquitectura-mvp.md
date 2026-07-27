# 0001 — Arquitectura MVP: SPA React sin router
_Fecha: 2026-07-22 · Estado: aceptada_

## Contexto
Export de Google AI Studio. App mobile de 4 pantallas para uso en crisis; prioridad: simplicidad y velocidad de carga.

## Decisión
SPA con **React 19 + TypeScript + Vite 6 + Tailwind 4**. Animaciones con `motion`, íconos con `lucide-react`. Navegación por **estado local en `src/App.tsx`** (`useState<AppScreen>`), **sin react-router**.

## Razón
Solo 4 pantallas lineales; un router añade peso y complejidad sin beneficio. El estado centralizado en `App.tsx` mantiene todo el flujo en un lugar legible.

## Consecuencias
- El estado (pantalla actual + síntomas seleccionados) **se pierde al recargar**.
- Escalar a > 4 pantallas, deep-linking o URLs compartibles requeriría introducir un router y repensar el estado.
- Colores solo vía `src/theme.ts` (`C.*`); no hardcodear.
