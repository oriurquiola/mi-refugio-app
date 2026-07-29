// Contenido de la presentación del Demo Day.
// Aislado del producto: estos datos no se usan en el flujo principal.
// Regla: el texto de las diapositivas es literal y no se genera ni se infiere.

import { C } from '../theme';

export const LIVE_URL = "https://mi-refugio-app.vercel.app/";

export interface SlideBullet {
  // Parte destacada de la línea (se pinta con el acento de la diapositiva).
  // El texto visible sigue siendo `label` + ": " + `text`.
  label?: string;
  text?: string;
  // Sub-viñetas (las que en el guion van con "·").
  items?: string[];
}

export interface SlideBlock {
  heading?: string;
  bullets: SlideBullet[];
}

export interface SlideDef {
  id: string;
  kind: "cover" | "content";
  // Nombre corto de la sección, para el índice y el aria-live.
  name: string;
  // Franja de tiempo del guion de los 5 minutos.
  timeframe?: string;
  title: string;
  lead?: string;
  accent: string;
  blocks?: SlideBlock[];
  // Cierre de la diapositiva (frase de contexto, no una viñeta más).
  note?: SlideBullet;
  // Diapositivas densas: dos columnas desde 1024px.
  twoColumns?: boolean;
  // Solo la diapositiva de demo muestra el botón grande al sitio en vivo.
  liveButton?: boolean;
}

export const SLIDES: SlideDef[] = [
  {
    id: "portada",
    kind: "cover",
    name: "Portada",
    title: "Mi Refugio App",
    lead: "Acompaña a personas en crisis de ansiedad sin ayuda inmediata",
    accent: C.lavender,
  },
  {
    id: "problema",
    kind: "content",
    name: "Problema",
    timeframe: "0:00–0:30",
    title: "Problema",
    accent: C.pink,
    blocks: [
      {
        bullets: [
          { text: "En plena crisis de pánico, difícil identificar qué está pasando" },
          { text: "Sin psicólogo ni persona cercana al alcance" },
          { text: "Hoy la gente improvisa sin una herramienta pensada para el momento" },
          { label: "Mi Refugio", text: "acompaña en esos 20 segundos críticos" },
        ],
      },
    ],
  },
  {
    id: "demo",
    kind: "content",
    name: "Demo en vivo",
    timeframe: "0:30–2:30",
    title: "Demo en vivo",
    accent: C.coral,
    liveButton: true,
    blocks: [
      {
        heading: "Pantallas reales que mostraré:",
        bullets: [
          { label: "Home", text: "Acceso al flujo principal con CTA “Estoy en crisis ahora”" },
          { label: "Registro de síntomas", text: "Seleccionar síntomas físicos, emocionales, mentales" },
          { label: "Análisis", text: "Pausa, ejercicio de respiración, transparencia de análisis" },
          { label: "Técnicas de contención", text: "Recomendaciones específicas según síntomas" },
        ],
      },
      {
        bullets: [
          {
            label: "No mostraré",
            text: "Pantallas de onboarding, historial, registro de usuario, ni ninguna pantalla sin QA",
          },
        ],
      },
    ],
    note: { text: "Todo esto ocurre en menos de 20 segundos" },
  },
  {
    id: "decisiones",
    kind: "content",
    name: "Decisiones",
    timeframe: "2:30–4:30",
    title: "Decisiones: Qué delegué y qué retuve",
    accent: C.teal,
    twoColumns: true,
    blocks: [
      {
        heading: "Delegué a la IA (modo aumentar):",
        bullets: [
          {
            items: [
              "Exploraciones de layout y propuestas de microcopy",
              "Animaciones, estados intermedios y de éxito",
              "Iconografía e ilustraciones (luego refinadas)",
            ],
          },
        ],
      },
      {
        heading: "Retuve (criterio humano no delegable):",
        bullets: [
          {
            items: [
              "Propuesta de valor y objetivo principal de la app",
              "Métrica de éxito: registro + recomendación en menos de 20 segundos",
              "Flujo principal exacto que debe seguir el usuario",
              "Tono de voz: cercano, empático, de apoyo",
              "Look & feel: calma, tranquilidad, sin urgencia",
            ],
          },
        ],
      },
    ],
    note: {
      label: "Por qué este modo",
      text: "La IA aumenta mis capacidades de creación y exploración, pero no reemplaza mi criterio sobre qué problema resuelvo y para quién.",
    },
  },
  {
    id: "verificacion",
    kind: "content",
    name: "Verificación y transparencia",
    timeframe: "2:30–4:30",
    title: "Verificación y transparencia",
    accent: C.amber,
    twoColumns: true,
    blocks: [
      {
        heading: "Herramientas usadas:",
        bullets: [
          { label: "Stitch", text: "Exploraciones de diseño, modo aumentar" },
          { label: "Google AI Studio", text: "Flujo funcional principal, modo aumentar" },
          { label: "Claude Code", text: "Construcción e iteraciones en código, modo aumentar" },
          { label: "Vercel", text: "Deploy y hosting, modo automatizar" },
        ],
      },
      {
        bullets: [
          {
            label: "Datos que entraron a las herramientas",
            text: "Brief, reglas de producto, design.md, flujo principal, referencias visuales",
          },
        ],
      },
      {
        heading: "Qué verifiqué antes de publicar:",
        bullets: [
          {
            items: [
              "Flujo end-to-end en mobile y desktop funciona",
              "Registro de síntomas + recomendación en menos de 20 segundos",
              "Tono empático y coherente con el look & feel definido",
              "Sin alucinaciones en recomendaciones de técnicas de contención",
              "Contenido correcto, interacciones suaves, URL pública accesible",
            ],
          },
        ],
      },
      {
        heading: "Qué no alcancé a verificar:",
        bullets: [
          {
            items: [
              "Pruebas con usuarios reales en crisis",
              "Contrastes de color en todos los dispositivos",
              "Resoluciones y contextos de uso variados",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cierre",
    kind: "content",
    name: "Cierre",
    timeframe: "4:30–5:00",
    title: "Cierre: Postmortem y Aprendizaje #1",
    accent: C.lavender,
    blocks: [
      {
        bullets: [
          { label: "Pensé que sería difícil", text: "Iterar en código, deploy continuo, GitHub" },
          { label: "Realmente fue difícil", text: "Iterar con IA para que el look & feel fuera exacto" },
          { label: "Si reiniciara", text: "Definiría style, tono y feel en design.md antes de crear prompts" },
        ],
      },
    ],
    note: {
      label: "Aprendizaje #1",
      text: "La IA aumenta capacidades, pero nunca reemplaza el criterio sobre qué construyo, para quién y por qué.",
    },
  },
];
