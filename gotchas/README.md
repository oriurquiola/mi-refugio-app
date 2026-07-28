# gotchas/ — Problemas conocidos + solución

Cada entrada: síntoma → causa → solución. Añadir aquí cualquier trampa que cueste > 5 min re-descubrir.

## G1 · `npm: command not found`
- **Causa:** Node no instalado / no en PATH. (En esta máquina Node vive en `/usr/local/bin`.)
- **Solución:** instalar Node LTS desde nodejs.org (instalador `.pkg`) y reabrir terminal. Verificar: `/usr/local/bin/node -v`. Tras instalar en una shell ya abierta, correr `hash -r`.

## G2 · Vite/esbuild falla tras `npm install`
- **Causa:** npm (config del proyecto) **bloquea scripts de postinstall**; esbuild descarga su binario nativo en postinstall.
- **Chequeo:** `ls node_modules/@esbuild/*/bin/esbuild` — si existe, está OK (en esta máquina: `darwin-x64`).
- **Solución si falta:** `npm approve-scripts <pkg>` para `esbuild` (y re-instalar). Los paquetes con scripts: `@google/genai`, `esbuild`, `protobufjs`.

## G3 · `GEMINI_API_KEY` "requerida" pero no lo es
- **Causa:** el README y `.env.example` mencionan la key, pero `@google/genai` **no se importa en `src/`**. Verificado con grep.
- **Solución:** la app corre sin la key. Solo configurar `.env.local` si en el futuro se añade uso real de Gemini.

## G4 · Nombres de archivo con espacio inicial (RESUELTO)
- **Historia:** la Ficha 4D llegó como ` ficha4d.md` (espacio inicial), lo que rompía las rutas "obvias". Renombrado a `Contexto/ficha4d.md` el 2026-07-22.
- **Prevención:** al recibir archivos nuevos en `Contexto/`, verificar el nombre real con `ls -1` / `xxd` antes de referenciarlo; renombrar si trae espacios al inicio/fin.

## G5 · La UI se ve "estirada" en desktop (RESUELTO)
- **Historia:** la app se estiraba a todo el ancho en desktop.
- **Solución:** `App.tsx` ahora enmarca la app en una columna mobile centrada (`max-w-[440px]`) con `translateZ(0)` para contener los `position: fixed`. Ver `decisions/0006`. En mobile no cambia.
