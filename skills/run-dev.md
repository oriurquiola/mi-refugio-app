# Skill: Levantar y verificar la app

## Requisitos
- Node en `/usr/local/bin` (v24.18.0). Si `npm` da "command not found", ver `gotchas/README.md`.

## Levantar el server
1. Primera vez o si falta `node_modules`: `npm install` en la raíz.
   - Si Vite falla por esbuild, ver `gotchas/README.md` (scripts de postinstall bloqueados).
2. Levantar dev server: usar la herramienta de preview con la config `.claude/launch.json` (nombre `mi-refugio-dev`), o `npm run dev`.
3. URL: `http://localhost:3000`. Es una app **mobile**: se ve mejor en viewport angosto.

## Verificación (cuando el cambio es observable en UI)
1. Revisar logs del server (nivel error) y consola del navegador → deben estar limpios.
2. `read_page` para confirmar contenido/estructura; `screenshot` para prueba visual.
3. Probar interacción real si tocaste flujo (click CTA → síntomas → continuar → esperar Processing 7 s → recomendaciones).
4. Si tocaste TypeScript: `npm run lint` (corre `tsc --noEmit`) debe pasar.

## Notas
- HMR se controla con `DISABLE_HMR` (ver `vite.config.ts`). En local normal, HMR activo.
- No usar Bash para correr el server; usar la herramienta de preview.
