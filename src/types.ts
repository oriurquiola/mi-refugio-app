export type AppScreen = "HOME" | "SYMPTOMS" | "PROCESSING" | "RECOMMENDATIONS" | "PROFILE";

export type SymptomCategory = "fisicos" | "emocionales" | "pensamientos";

export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
}

export interface TechniqueStep {
  text: string;
}

// Fases de una técnica de respiración guiada. `kind` define cómo se comporta el
// círculo en pantalla: crece al inhalar, se sostiene al retener, decrece al exhalar.
export type BreathingPhaseKind = "inhale" | "hold" | "exhale";

export interface BreathingPhase {
  kind: BreathingPhaseKind;
  // Palabra corta bajo el círculo ("Inhala").
  label: string;
  // Instrucción completa que acompaña a la animación.
  instruction: string;
  seconds: number;
}

export interface Technique {
  id: string;
  name: string;
  color: string;
  duration: string;
  forSymptoms: string;
  // IDs de síntomas que esta técnica aborda. Se usa para recomendar según
  // lo que el usuario selecciona. `forSymptoms` queda solo para mostrar.
  matchesSymptomIds: string[];
  steps: TechniqueStep[];
  // Solo las técnicas de respiración con ritmo definido. Su presencia es lo que
  // hace que la card ofrezca la guía a pantalla completa en vez del acordeón.
  breathingPhases?: BreathingPhase[];
}

export interface RecommendationSession {
  id: string;
  date: string;
  // Fecha real ISO (YYYY-MM-DD) para ubicar el registro en el calendario del Perfil.
  dateISO: string;
  symptomLabel: string;
  techniqueName: string;
  color: string;
}
