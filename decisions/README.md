# decisions/ — Registro de decisiones (ADR)

Decisiones técnicas y de alcance, con fecha y razonamiento. Una decisión = un archivo `NNNN-slug.md`.
No borres decisiones viejas; si cambian, añade una nueva que las reemplace y enlázala.

## Índice
- `0001-arquitectura-mvp.md` — Stack, SPA sin router, estado en App.tsx.
- `0002-datos-mock-sin-backend.md` — Datos fijos en data.ts, sin backend, sin mapeo síntoma→técnica.
- `0003-flujo-linear.md` — Flujo de 4 pantallas y paso de datos.
- `0004-cta-psicologo-chat.md` — Botón "Hablar con un psicólogo": halo + chat directo de Quédate.
- `0005-recomendacion-por-sintomas.md` — Recomendaciones reales según síntomas (reemplaza alcance MVP de `0002`).
- `0006-marco-mobile-en-desktop.md` — App enmarcada como columna mobile centrada en desktop.
- `0007-perfil-mockup-visual.md` — Perfil como mockup visual sin datos reales; usa `mockHistory` como fuente única (stats + bitácora + historial).
- `0008-respiracion-guiada-pantalla-completa.md` — Técnicas con `breathingPhases` ofrecen guía a pantalla completa (overlay) en vez de acordeón.
- `0009-demo-tecnica-principal-fija.md` — DEMO: `DEMO_PINNED_TECHNIQUE_ID` fija Respiración 4-7-8 como principal. **Suspende (no revierte) `0005`**; revertir poniéndola en `null`.
- `0010-presentacion-demo-day.md` — Presentación del Demo Day en `/demo-day`, ruteo por pathname en `main.tsx`.
- `0011-respiracion-tres-ciclos.md` — Guía de respiración a 3 ciclos (57 s) con corte de ciclo visible. **Actualiza el punto "Duración" de `0008`.**

## Plantilla (copiar para una decisión nueva)
```
# NNNN — Título corto
_Fecha: YYYY-MM-DD · Estado: aceptada|reemplazada por NNNN_

## Contexto
Qué problema/situación motiva la decisión.

## Decisión
Qué se decidió, en una frase clara.

## Razón
Por qué, alternativas descartadas.

## Consecuencias
Qué implica a futuro / qué tocar si se revierte.
```
