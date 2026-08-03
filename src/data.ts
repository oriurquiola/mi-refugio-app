import { Symptom, Technique, RecommendationSession } from "./types";
import { C } from "./theme";

// DEMO: fija una técnica como principal para cualquier combinación de síntomas.
// En `null` (estado normal) manda la recomendación real por síntomas
// (`decisions/0005`). Ponerla en un id de técnica solo para demos. Ver `decisions/0009`.
export const DEMO_PINNED_TECHNIQUE_ID: string | null = null;

export const symptoms: Symptom[] = [
  // Físicos
  { id: "s1", label: "Taquicardia", category: "fisicos" },
  { id: "s2", label: "Falta de aire", category: "fisicos" },
  { id: "s3", label: "Tensión muscular", category: "fisicos" },
  { id: "s4", label: "Mareos", category: "fisicos" },
  { id: "s5", label: "Sudoración", category: "fisicos" },
  { id: "s6", label: "Temblores", category: "fisicos" },
  { id: "s7", label: "Náuseas", category: "fisicos" },
  { id: "s8", label: "Opresión en el pecho", category: "fisicos" },
  
  // Emocionales
  { id: "s9", label: "Miedo intenso", category: "emocionales" },
  { id: "s10", label: "Angustia", category: "emocionales" },
  { id: "s11", label: "Desconexión", category: "emocionales" },
  { id: "s12", label: "Irritabilidad", category: "emocionales" },
  { id: "s13", label: "Tristeza profunda", category: "emocionales" },
  { id: "s14", label: "Desesperanza", category: "emocionales" },

  // Pensamientos
  { id: "s15", label: "Estoy perdiendo el control", category: "pensamientos" },
  { id: "s16", label: "Algo malo va a pasar", category: "pensamientos" },
  { id: "s17", label: "No puedo manejarlo", category: "pensamientos" },
  { id: "s18", label: "Quiero escapar", category: "pensamientos" },
];

export const techniques: Technique[] = [
  {
    id: "t1",
    name: "Respiración 4-7-8",
    color: C.lavender,
    duration: "60 seg",
    forSymptoms: "Taquicardia, falta de aire",
    // Activación física + angustia aguda: la respiración regula el cuerpo.
    matchesSymptomIds: ["s1", "s2", "s3", "s5", "s6", "s7", "s8", "s10"],
    steps: [
      { text: "Inhala por la nariz contando mentalmente hasta 4" },
      { text: "Mantén la respiración contando hasta 7" },
      { text: "Exhala lentamente por la boca contando hasta 8" },
      { text: "Repite el ciclo 3 veces en total" }
    ],
    // Ritmo 4-7-8. Los segundos alimentan tanto la animación como el contador.
    breathingPhases: [
      { kind: "inhale", label: "Inhala", instruction: "Inhala por la nariz contando mentalmente hasta 4", seconds: 4 },
      { kind: "hold", label: "Retén", instruction: "Mantén la respiración contando hasta 7", seconds: 7 },
      { kind: "exhale", label: "Exhala", instruction: "Exhala lentamente por la boca contando hasta 8", seconds: 8 }
    ]
  },
  {
    id: "t2",
    name: "Grounding 5-4-3-2-1",
    color: C.teal,
    duration: "2 min",
    forSymptoms: "Desconexión, mareos",
    // Desorientación y pensamientos acelerados: anclar en los sentidos.
    matchesSymptomIds: ["s4", "s11", "s12", "s15", "s16", "s17", "s18"],
    steps: [
      { text: "Encuentra 5 cosas que puedas ver a tu alrededor" },
      { text: "Busca 4 cosas que puedas tocar y siente su textura" },
      { text: "Escucha 3 cosas diferentes en tu entorno" },
      { text: "Identifica 2 olores a tu alrededor" },
      { text: "Encuentra 1 cosa que puedas saborear" }
    ]
  },
  {
    id: "t3",
    name: "Ancla de seguridad",
    color: C.amber,
    duration: "90 seg",
    forSymptoms: "Miedo, desesperanza",
    // Emociones intensas de miedo/desesperanza: dar firmeza y contención.
    matchesSymptomIds: ["s9", "s10", "s13", "s14", "s16"],
    steps: [
      { text: "Planta tus pies firmemente en el suelo" },
      { text: "Concéntrate en la sensación de la superficie bajo tus pies" },
      { text: "Imagina unas raíces fuertes conectándote con el centro de la tierra" },
      { text: "Siente cómo esa firmeza te sostiene" }
    ]
  }
];

export const mockHistory: RecommendationSession[] = [
  {
    id: "h1",
    date: "Hoy",
    dateISO: "2026-07-28",
    symptomLabel: "Falta de aire",
    techniqueName: "Respiración 4-7-8",
    color: C.lavender
  },
  {
    id: "h2",
    date: "Ayer",
    dateISO: "2026-07-27",
    symptomLabel: "Miedo intenso",
    techniqueName: "Ancla de seguridad",
    color: C.amber
  },
  {
    id: "h3",
    date: "24 jul",
    dateISO: "2026-07-24",
    symptomLabel: "Desconexión",
    techniqueName: "Grounding 5-4-3-2-1",
    color: C.teal
  },
  {
    id: "h4",
    date: "21 jul",
    dateISO: "2026-07-21",
    symptomLabel: "Taquicardia",
    techniqueName: "Respiración 4-7-8",
    color: C.lavender
  },
  {
    id: "h5",
    date: "15 jul",
    dateISO: "2026-07-15",
    symptomLabel: "Angustia",
    techniqueName: "Ancla de seguridad",
    color: C.amber
  }
];
