# Skill: Cierre de sesión (actualizar memoria)

Ejecutar al terminar una sesión importante, ANTES de que se pierda el contexto.

## Pasos
1. **Estado** → actualizar `state/current.md`: mover ítems Hecho/Pendiente, actualizar Blockers y "Próximas acciones". Cambiar la fecha y nº de sesión.
2. **Decisiones** → si se tomó alguna decisión técnica o de alcance, crear `decisions/NNNN-slug.md` con la plantilla (`decisions/README.md`). Enlazar si reemplaza a otra.
3. **Diseño** → si cambió algo de UI/copy/estética, anotarlo denso en `Contexto/decisiones.md`.
4. **Gotchas** → si apareció un problema no trivial + su solución, añadir a `gotchas/README.md`.
5. **Log** → crear `logs/YYYY-MM-DD-sesion-NN.md`: resumen COMPRIMIDO (qué se hizo, decisiones, estado final, próximo paso). No pegar diffs largos; referenciar archivos.
6. **AGENTS.md** → tocar solo si cambió una regla dura, el routing o el mapa del código. Mantenerlo < 300 líneas.

## Principio
Densidad > completitud. Un hecho, un lugar. Fechas absolutas. Referencia, no copies.
