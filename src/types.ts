export type AppScreen = "HOME" | "SYMPTOMS" | "PROCESSING" | "RECOMMENDATIONS";

export type SymptomCategory = "fisicos" | "emocionales" | "pensamientos";

export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
}

export interface TechniqueStep {
  text: string;
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
}

export interface RecommendationSession {
  id: string;
  date: string;
  symptomLabel: string;
  techniqueName: string;
  color: string;
}
