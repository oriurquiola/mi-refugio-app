# Mi Refugio — Design System & Screen Specs
Julio 2026 · Tema oscuro (Dark Mode)

---

## 1. Concepto y principios
Mi Refugio es una herramienta de primeros auxilios emocionales para adultos de 25–45 años en crisis de ansiedad o pánico. El diseño responde a una premisa central: el usuario está solo, en pánico, y necesita ayuda ahora. Cada decisión visual sirve a ese estado.

### Principios de diseño
* **Claridad inmediata:** Jerarquía escaneable en < 3 segundos. CTA principal visible sin scroll.
* **Calma atmosférica:** Paleta noche profunda. Sin blancos duros. Gradientes suaves inspirados en cielos nocturnos.
* **Urgencia serena:** El coral del CTA comunica acción sin alarmar. El púrpura profundo contiene y envuelve.
* **Cero fricción:** Tipografía Nunito: redonda, legible, sin carga cognitiva. Sin jerga técnica.
* **Confianza táctil:** Feedback inmediato en todos los elementos interactivos (escala, brillo, sombra).

---

## 2. Paleta de color
Todas las pantallas comparten este sistema de tokens.

### Fondos y superficies
* **bg0:** `#0D0A28` - Fondo más profundo. Sección superior de gradientes.
* **bg1:** `#1A1240` - Fondo base de pantallas.
* **bg2:** `#231952` - Capa media. Gradiente de scroll.
* **bg3:** `#2D2270` - Superficie elevada.
* **glass:** `rgba(255,255,255,0.06)` - Cards y paneles flotantes.
* **glassBorder:** `rgba(255,255,255,0.10)` - Bordes de cards glass.
* **glassHover:** `rgba(255,255,255,0.10)` - Estado hover/pressed en glass.

### Colores de acción y marca
* **coral:** `#E05C35` - CTA principal. Color de urgencia serena.
* **coralGrad:** `linear-gradient(135deg, #E05C35, #F07848)`
* **coralGlow:** `0 8px 28px rgba(224,92,53,0.55)`
* **lavender:** `#B8A0EE` - Acento de marca. Wordmark, iconos activos, highlights.
* **lavDim:** `rgba(184,160,238,0.55)`
* **teal:** `#5EC4BA` - Técnica Grounding. Categoría salud.
* **amber:** `#F7A44A` - Técnica Ancla de seguridad.
* **pink:** `#E8829C` - Síntomas emocionales. Sesiones previas.

### Texto (opacidades sobre fondo oscuro)
* **w100 (white):** `#FFFFFF` - Títulos principales.
* **w80:** `rgba(255,255,255,0.80)` - Cuerpo de texto, labels activos.
* **w70:** `rgba(255,255,255,0.70)` - Acciones secundarias de texto (sin fondo), donde w60 quedaba corto de contraste.
* **w60:** `rgba(255,255,255,0.60)` - Subtítulos, labels inactivos.
* **w40:** `rgba(255,255,255,0.40)` - Metadata, fechas, texto de apoyo.
* **w20:** `rgba(255,255,255,0.20)` - Placeholders, hints.
* **w10:** `rgba(255,255,255,0.10)` - Divisores, bordes sutiles.

### Gradientes de fondo por pantalla
* **Home / Síntomas / Recomendaciones:** `linear-gradient(180deg, #0D0A28 0%, #1A1240 30%, #231952 100%)`
* **Pantalla Hero Card:** `linear-gradient(145deg, #4230A0 0%, #5A3FA8 45%, #7158C2 100%)`
* **Pantalla de Análisis (Processing):** `linear-gradient(175deg, #0D0A28 0%, #2A1F72 40%, #3D2F90 70%, #6150B8 100%)`

---

## 3. Tipografía
* **Dancing Script (700):** Wordmark "Mi Refugio" únicamente (32px, text-shadow lavanda).
* **Nunito:** Todo el resto de la interfaz (Títulos 800, Labels 700, Cuerpo 400-500). Line-height 1.25 para títulos, 1.55 para cuerpo.

---

## 4. Espaciado y radio
* **Espaciado base:** 4px (xs), 8px (sm), 12px (md), 16px (lg), 20px (xl padding lateral), 24px (2xl entre secciones mayores), 32px (3xl top safe area).
* **Border Radius:** 24px para cards grandes (hero); 16px para cards regulares, botones y modales; 999px para badges/botones flotantes. Círculo de respiración 50%.

---

## 5. Cambios y Ajustes Recientes (Update Julio 2026)

### Home Screen
* **Hero H2:** Cambiado de "¿Cómo te sientes ahora?" a **"Cuéntanos, ¿cómo te sientes?"**.
* **Sección "¿Cómo funciona Mi Refugio?":** 
  * Se eliminaron los subtítulos de las cards ("Sin términos técnicos", "En segundos", "Técnicas inmediatas") para un look más limpio.
  * Los iconos de las cards se actualizaron a **outline** (sin relleno sólido blanco).

### Síntomas Screen
* **Padding del Contenedor:** Se incrementó el padding inferior (pb-[160px]) para que el Sticky CTA no superponga ni oculte las últimas opciones de síntomas de la lista.
* **Sticky CTA:** Se eliminó el texto inferior que decía "Cada paso toma segundos" para simplificar la interfaz.

### Processing Screen (Análisis)
* **Tiempos de Animación:** 
  * La duración total de la pantalla se incrementó de 4.6 a **7.0 segundos**.
  * Cada mensaje en pantalla ahora dura **1.7 segundos** (vs 1.1s original) para dar tiempo suficiente a su lectura.
* **Posición del Texto de Respiración:** El label de respiración ("Inhala...", "Exhala...") se movió más arriba (`top-[18%]`) para evitar que se superponga con la animación de los círculos concéntricos de respiración.
