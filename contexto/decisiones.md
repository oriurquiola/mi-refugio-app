# Decisiones de diseño — Mi Refugio

Decisiones de diseño con su **por qué**. La especificación completa (tokens, medidas) vive en `design.md`; aquí NO se duplica, se explica el razonamiento y se registran cambios. Insumo académico: `Contexto/ficha4d.md`.

_Fuente: `design.md`, `src/theme.ts`, `Contexto/ficha4d.md`. Actualizado: 2026-07-22._

## Principios (por qué, no solo qué)
- **Claridad inmediata:** el usuario en pánico debe escanear en < 3 s; CTA principal sin scroll. → jerarquía agresiva, un solo camino.
- **Calma atmosférica:** dark mode profundo, sin blancos duros, gradientes de cielo nocturno. → contener, no estimular.
- **Urgencia serena:** coral (`#E05C35`) comunica acción sin alarmar; púrpura/lavanda envuelve. → nunca rojo de alerta.
- **Cero fricción:** tipografía Nunito redonda, sin jerga técnica ni términos clínicos.
- **Confianza táctil:** feedback inmediato (escala/brillo/sombra) en todo lo interactivo.

## Decisiones de identidad
- **Color:** sistema de tokens único en `src/theme.ts` (`C.*`), reflejado en `design.md §2`. Coral = CTA; lavanda = marca; teal/amber/pink = categorías de técnicas/síntomas. Regla: no hardcodear color fuera de `theme.ts`.
- **Tipografía:** `Dancing Script 700` **solo** para el wordmark "Mi Refugio"; `Nunito` para todo lo demás (`design.md §3`).
- **Forma:** radios 24/16/999 px; círculo de respiración 50% (`design.md §4`).

## Decisiones de producto/tono (de la Ficha 4D)
- **No pedir datos personales** en v1 (sin login, sin sensibles). Ver `decisions/0002`.
- **Meta de flujo:** registro + recomendación en **< 30 s** en mobile.
- **Voz:** acompañar a la persona; sin alertas, sin urgencia, sin clínica. Segunda persona, cálido.
- **Delegación IA (D1):** modo *aumentar* — la IA propone layouts/microcopy/animaciones/estados; NO se delega arquitectura de información, jerarquía, estilo visual ni tono.

## Cambios registrados — Update julio 2026
(Espejo del `design.md §5`, para trazabilidad de decisiones.)
- **Home:** H2 → "Cuéntanos, ¿cómo te sientes?"; se quitaron subtítulos de las cards de "¿Cómo funciona?"; íconos a **outline** (sin relleno sólido).
- **Síntomas:** `pb-[160px]` para que el Sticky CTA no tape las últimas opciones; se eliminó el texto "Cada paso toma segundos".
- **Processing:** duración total 4.6 s → **7.0 s**; cada mensaje 1.1 s → **1.7 s** (tiempo de lectura); label de respiración a `top-[18%]` para no solapar los círculos. Constantes en `src/screens/Processing.tsx`.

## CTA "Hablar con un psicólogo" (2026-07-22)
- Micro-animación de entrada tipo **border beam** (luz que recorre el borde 1 vez, suave y lenta) en el botón flotante; **halo coral** en el de Recomendaciones. Objetivo: resaltar sin alarmar (coherente con "urgencia serena"). Clic → chat con especialista de Quédate. Detalle y razón en `decisions/0004`.

## Perfil como mockup visual (2026-07-28)
- Pantalla nueva `Profile.tsx`, accesible tocando el avatar "MA" del Home. Sin datos reales ni edición (regla de `reglas.md`: sin datos personales/login/persistencia en v1). Secciones: estadísticas, bitácora (calendario) e historial de técnicas, todas derivadas de `mockHistory` (`data.ts`). Lenguaje neutro/factual, sin gamificación ("racha"/logros). Detalle y razón en `decisions/0007`.

## Respiración guiada a pantalla completa (2026-07-29)
- La card de "Respiración 4-7-8" deja de ser acordeón: mantiene título, bajada y chips, y ofrece el botón **"Respiremos juntos"** (plural inclusivo, como "Vamos a resolverlo juntos"). Abre un overlay a pantalla completa con círculo que respira al ritmo 4-7-8, anillo de arcos proporcionales, instrucción y cuenta regresiva. Referencia visual: pantalla de respiración de Calm, adaptada a nuestros tokens (marcador lavanda, no blanco puro). Grounding y Ancla conservan su acordeón. Detalle y razón en `decisions/0008`.

## DEMO · Técnica principal fija (2026-07-29)
- Solo para la demo: **Respiración 4-7-8 se muestra siempre como técnica principal**, sin importar los síntomas; Grounding y Ancla quedan siempre como adicionales (ordenadas por relevancia). **Suspende temporalmente** la recomendación real por síntomas descrita arriba y en `decisions/0005`. Se controla con `DEMO_PINNED_TECHNIQUE_ID` en `data.ts`; poniéndola en `null` vuelve el comportamiento real. Ver `decisions/0009`.

## Respiración guiada: 3 ciclos y corte visible (2026-07-29)
- La guía pasa de 1 a **3 ciclos (57 s)**, que es lo que promete la etiqueta "60 seg" de la card. Se descartó una micro-pausa de 1,5 s entre ciclos (habría dado 60 s exactos) para **no cortar el ritmo 4-7-8** a alguien en crisis: la continuidad pesa más que cuadrar el número.
- El fin de ciclo se marca con **tres señales a la vez**: el marcador vuelve arriba, pulsa un anillo lavanda (0,8 s, escala 1 → 1.12, se despega del anillo de arcos) y avanza un indicador de **3 puntos + "Respiración N de 3"**.
- Copy **"Respiración"**, no "Ciclo": menos técnico, regla de tono de `reglas.md`. Y **"N de 3"** en vez de solo puntos porque es lo único que sobrevive a `prefers-reduced-motion` y a un lector de pantalla.
- Detalle y razón en `decisions/0011`.

## Abierto / a decidir (impacto de diseño)
- Mapeo real síntoma → técnica (hoy se muestran las 3). Ver `decisions/0002` y `state/current.md`.
