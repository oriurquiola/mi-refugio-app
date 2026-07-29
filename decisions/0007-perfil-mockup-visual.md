# 0007 — Pantalla de Perfil como mockup visual (sin datos reales)
_Fecha: 2026-07-28 · Estado: aceptada_

## Contexto
Se pidió agregar una página de perfil de usuario. `reglas.md` (regla dura, `AGENTS.md` §3) prohíbe pedir datos personales, login o persistencia en v1. Una pantalla de "perfil" típica implica justamente eso.

## Decisión
El Perfil (`src/screens/Profile.tsx`) es un **mockup puramente visual**: avatar e identidad son estáticos ("MA" / "Invitado", no editables), y todo el contenido sale de `mockHistory` (`src/data.ts`), la misma fuente que ya usaba el Home. No hay formularios, inputs, login ni escritura a ningún storage. Estructura de una sola pantalla con scroll (sin tabs internas, para mantener consistencia con el resto de la app):
1. Header con avatar/nombre placeholder.
2. "Tus estadísticas" — tiles factuales (Registros, Técnica más usada, Último registro). Sin lenguaje de racha/logro.
3. "Tu bitácora" — calendario del mes con los días de `mockHistory` marcados. Framing neutro ("días en los que registraste una crisis"), no gamificado.
4. "Historial de técnicas recomendadas" — lista completa de `mockHistory`.

Se agregó `dateISO` a `RecommendationSession` (`types.ts`) y se amplió `mockHistory` a 5 entradas (julio 2026) para que calendario, stats e historial deriven todos del mismo array — nada de datasets mock desconectados.

Navegación: `AppScreen` suma `"PROFILE"`; se accede tocando el avatar "MA" del Home (`Home.tsx`); back vuelve a Home. Sin `BottomTabBar` ni `FloatingPsychologistButton` en esta pantalla, igual que Symptoms/Processing/Recommendations.

## Razón
Alternativas descartadas: (a) perfil editable con nombre/email — rompe la regla de datos personales directamente; (b) ampliar `reglas.md` para permitirlo — cambia una regla dura del producto sin justificación de producto real, solo por conveniencia de esta feature. Se optó por un placeholder honesto que demuestra cómo se vería en v2 con backend, sin violar ninguna regla vigente. Referencia visual: capturas de la app Calm aportadas por la usuaria, usadas solo para estructura (header, tiles, calendario) — no se copió su copy, paleta ni módulos de gamificación/venta ("gift", cita motivacional, "streak").

## Consecuencias
- Resuelve el pendiente de `state/current.md`: *"mockHistory está definido pero no se consume"*.
- Si en el futuro se decide backend real con perfil editable, esta decisión queda reemplazada por una nueva ADR — no editar este archivo, uno nuevo la referencia.
- Cualquier pantalla nueva que quiera mostrar historial debería leer de `mockHistory` en vez de crear otro dataset mock.
