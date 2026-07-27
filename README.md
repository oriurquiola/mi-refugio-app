<div align="center">

# 🫧 Mi Refugio

**Primeros auxilios emocionales para crisis de ansiedad y pánico.**

Cuando estás solo, en pánico y necesitas ayuda *ahora*: registra lo que sientes
y recibe métodos de contención en menos de 30 segundos.

React 19 · TypeScript · Vite 6 · Tailwind 4 · Motion

</div>

---

## ¿Qué es?

**Mi Refugio** es una herramienta pensada para adultos de 25 a 45 años que atraviesan
una crisis de ansiedad o pánico. La premisa de diseño es simple y estricta: **el usuario
está solo, angustiado y necesita ayuda de inmediato**.

El flujo principal permite registrar síntomas y obtener, en menos de 30 segundos y desde
el móvil, recomendaciones de técnicas de contención adaptadas a lo que la persona siente,
además de acceso directo al chat con un especialista.

> **Contexto:** proyecto académico de Interface School (Wave Delta), de Oriana Urquiola.
> Entregable: Ficha 4D.

## Características

- 🎯 **Flujo guiado en 4 pasos:** `Inicio → Síntomas → Procesando → Recomendaciones`, lineal y con navegación hacia atrás.
- 🧠 **Recomendaciones según síntomas:** las técnicas coincidentes se priorizan; el resto aparece como "otras técnicas".
- 💬 **Chat con un psicólogo:** botón flotante y CTA que abren el chat directo del [Programa Quédate](https://direct.lc.chat/19090748/) (prevención del suicidio, SSMO).
- 🌙 **Diseño calmo:** dark mode profundo, sin blancos duros, con animaciones suaves (`motion`) y copy cálido en segunda persona.
- 🔒 **Sin datos personales:** no hay login, backend ni persistencia. Nada de lo que sientes sale del dispositivo.

## Stack

| Área        | Tecnología                          |
|-------------|-------------------------------------|
| UI          | React 19 + TypeScript               |
| Build       | Vite 6                              |
| Estilos     | Tailwind CSS 4 + tokens en `src/theme.ts` |
| Animación   | `motion`                            |
| Iconos      | `lucide-react`                      |

## Empezar

**Requisitos:** [Node.js](https://nodejs.org/) 18 o superior (desarrollado con Node 24).

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el entorno de desarrollo
npm run dev
```

La app queda disponible en **http://localhost:3000**.

> **Nota:** aunque `@google/genai` figura en las dependencias, la app **no lo usa** y
> **no requiere ninguna API key** para funcionar.

## Scripts

| Comando           | Descripción                                    |
|-------------------|------------------------------------------------|
| `npm run dev`     | Servidor de desarrollo (Vite) en el puerto 3000 |
| `npm run build`   | Build de producción en `dist/`                 |
| `npm run preview` | Sirve el build de producción localmente        |
| `npm run lint`    | Chequeo de tipos con TypeScript (`tsc --noEmit`) |
| `npm run clean`   | Elimina `dist/` y `server.js`                  |

## Estructura del proyecto

```
src/
├── App.tsx            # Estado y orquestación del flujo (useState, sin router)
├── main.tsx           # Punto de entrada
├── data.ts            # Datos mock: síntomas, técnicas y mapeo síntoma → técnica
├── types.ts           # Tipos compartidos
├── theme.ts           # Tokens de diseño (colores, etc.) — no hardcodear colores fuera de aquí
├── config.ts          # Enlaces externos (chat del psicólogo)
├── index.css          # Estilos globales y keyframes
├── screens/           # Home, Symptoms, Processing, Recommendations
└── components/        # BottomTabBar, FloatingPsychologistButton, GlassCard, PrimaryCTA
```

## Principios de diseño

- **Tono:** acompañar y calmar. Sin términos clínicos, sin señales de urgencia, sin jerga técnica.
- **Estética:** dark mode profundo. Coral = CTA ("urgencia serena"). Lavanda = marca.
- **Copy:** en español, cálido y en segunda persona.
- **Objetivo medible:** completar el flujo principal en menos de 30 segundos, sin dudas.

## Documentación interna

Este repositorio mantiene un sistema de memoria para el desarrollo asistido:

- **[`AGENTS.md`](AGENTS.md)** — índice y reglas del proyecto (leer primero).
- **[`state/current.md`](state/current.md)** — estado actual: hecho, pendiente y bloqueado.
- **[`design.md`](design.md)** — especificación del sistema de diseño.
- **[`decisions/`](decisions/)** — registro de decisiones de arquitectura y producto.

---

<div align="center">
<sub>Hecho con cuidado para acompañar a quien lo necesita. 🫂</sub>
</div>
