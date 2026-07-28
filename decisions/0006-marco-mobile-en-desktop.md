# 0006 — Marco "mobile" centrado en desktop
_Fecha: 2026-07-22 · Estado: aceptada_

## Contexto
La app está diseñada como experiencia mobile, pero el enlace se abre también en desktop, donde antes se estiraba a todo el ancho (gotcha G5).

## Decisión
En `src/App.tsx`, envolver la app en un **marco de ancho de teléfono centrado**:
- Contenedor de página: `fixed inset-0 flex justify-center bg-[#0D0A28]` (el fondo se ve a los lados en desktop).
- Marco: `w-full max-w-[440px] h-[100dvh] overflow-hidden` + sombra. En mobile ocupa todo el ancho; en desktop queda como columna centrada.
- **Clave técnica:** el marco lleva `[transform:translateZ(0)]` para convertirse en el **bloque contenedor de los descendientes `position: fixed`** (fondos con gradiente `fixed inset-0`, `BottomTabBar`, `FloatingPsychologistButton`). Sin esto, esos elementos se posicionan contra el viewport completo y se van a los bordes del escritorio.

## Razón
Solución mínima y responsive: no toca las pantallas ni los componentes fijos; una sola envoltura resuelve el encuadre en desktop y no afecta mobile.

## Consecuencias
- Cualquier elemento `position: fixed` nuevo se posicionará respecto al marco (comportamiento deseado). Si en el futuro se quiere algo fijo a la ventana real, habría que sacarlo del marco.
- Ancho del "teléfono" configurable con `max-w-[440px]`.
- Verificado en desktop 1280px: marco de 440px centrado; tab bar y botón flotante contenidos dentro. Reemplaza el gotcha G5.
