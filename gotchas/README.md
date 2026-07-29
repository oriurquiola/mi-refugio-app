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

## G6 · Git/PR de este repo
- **Auto-sync:** el repo se sincroniza solo a GitHub (`oriurquiola/mi-refugio-app`); cambios pueden aparecer ya en `origin/main` sin commit manual. Revisar `git diff HEAD` y `git log` antes de asumir qué falta subir.
- **`gh` NO instalado:** para crear PRs, usar la API con la credencial del push: `TOKEN=$(printf 'protocol=https\\nhost=github.com\\n\\n' | git credential fill | sed -n 's/^password=//p')` y `curl` a `/repos/.../pulls`. No imprimir el token.
- **No se puede aprobar el propio PR** en GitHub (autor solo ve Comment/Request changes). Para incorporar: merge directo o push a `main`.

## G7 · En el preview, las transiciones se congelan y las cards salen en blanco
- **Síntoma:** al navegar entre pantallas en la herramienta de preview, la pantalla saliente queda a medio deslizar y la siguiente nunca monta; las cards con `backdrop-blur` aparecen vacías en los screenshots. La pantalla Processing se queda pegada en "Inhala…".
- **Causa:** la pestaña del preview reporta `document.hidden === true` (`visibilityState: "hidden"`), así que el navegador **estrangula `requestAnimationFrame`**. `motion` no termina la animación de salida y, como `AnimatePresence` usa `mode="wait"` (`App.tsx`), la pantalla siguiente no se monta. **No es un bug de la app** — en un navegador real funciona.
- **Chequeo:** `document.visibilityState` en la consola del preview.
- **Solución para verificar:** tomar screenshots seguidos "bombea" frames y destraba la transición. Si hace falta llegar a una pantalla profunda (ej. Recommendations, detrás de los 7 s de Processing), cambiar temporalmente el `useState` inicial de `App.tsx` a esa pantalla (con `selectedSymptoms` de prueba), verificar, y **revertir**. Confirmar el contenido con `get_page_text`/DOM, que no depende del render.

## G5 · La UI se ve "estirada" en desktop (RESUELTO)
- **Historia:** la app se estiraba a todo el ancho en desktop.
- **Solución:** `App.tsx` ahora enmarca la app en una columna mobile centrada (`max-w-[440px]`) con `translateZ(0)` para contener los `position: fixed`. Ver `decisions/0006`. En mobile no cambia.
