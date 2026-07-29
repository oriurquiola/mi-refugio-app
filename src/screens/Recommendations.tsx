import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, Check, ShieldAlert } from 'lucide-react';
import { C } from '../theme';
import { Technique } from '../types';
import { symptoms, techniques, DEMO_PINNED_TECHNIQUE_ID } from '../data';
import { GlassCard } from '../components/GlassCard';
import { PsychologistCTA } from '../components/PsychologistCTA';
import { BreathingExercise } from './BreathingExercise';

interface RecommendationsProps {
  onBack: () => void;
  onHome: () => void;
  selectedSymptoms: string[];
}

export function Recommendations({ onBack, onHome, selectedSymptoms }: RecommendationsProps) {
  const matchedSymptoms = symptoms.filter(s => selectedSymptoms.includes(s.id));

  // Recomendación real: puntúa cada técnica por cuántos síntomas seleccionados
  // aborda. Las coincidentes van primero (por relevancia); el resto baja a
  // "Otras técnicas". Fallback: si nada coincide, la primera técnica como base.
  const scored = techniques.map(t => ({
    technique: t,
    score: t.matchesSymptomIds.filter(id => selectedSymptoms.includes(id)).length,
  }));
  const matched = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.technique);
  const others = scored.filter(s => s.score === 0).map(s => s.technique);

  // DEMO: si hay una técnica fijada, va siempre como principal y el resto baja a
  // "Otras técnicas" (ordenadas por relevancia, para que los síntomas sigan
  // influyendo en algo). Sin fijar, manda la recomendación real de arriba.
  const pinnedTechnique = DEMO_PINNED_TECHNIQUE_ID
    ? techniques.find(t => t.id === DEMO_PINNED_TECHNIQUE_ID)
    : undefined;

  const primaryTechniques = pinnedTechnique
    ? [pinnedTechnique]
    : matched.length > 0
      ? matched
      : techniques.slice(0, 1);

  const secondaryTechniques = pinnedTechnique
    ? scored
        .filter(s => s.technique.id !== pinnedTechnique.id)
        .sort((a, b) => b.score - a.score)
        .map(s => s.technique)
    : matched.length > 0
      ? others
      : techniques.slice(1);

  const [expandedId, setExpandedId] = useState<string | null>(primaryTechniques[0]?.id || null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number>>({});
  // Técnica que se está guiando a pantalla completa (null = ninguna).
  const [guidedTechnique, setGuidedTechnique] = useState<Technique | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const advanceStep = (techId: string, totalSteps: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps(prev => {
      const current = prev[techId] || 0;
      if (current < totalSteps) {
        return { ...prev, [techId]: current + 1 };
      }
      return prev;
    });
  };

  // Síntomas del usuario que una técnica aborda (para los chips).
  const symptomsFor = (tech: Technique) =>
    matchedSymptoms.filter(s => tech.matchesSymptomIds.includes(s.id));

  const renderSymptomChips = (tech: Technique) => {
    const techSymptoms = symptomsFor(tech);
    if (techSymptoms.length === 0) return null;

    return (
      <div className="px-[16px] pb-[12px] -mt-[4px] flex flex-wrap items-center gap-[6px]">
        <span className="font-sans font-[600] text-[10px] w-full mb-[2px]" style={{ color: C.w40 }}>
          Para lo que sientes ahora:
        </span>
        {techSymptoms.map(s => {
          const catColor = s.category === 'fisicos' ? C.coral : s.category === 'emocionales' ? C.pink : C.lavender;
          return (
            <span
              key={s.id}
              className="px-[10px] py-[3px] rounded-[999px] font-sans font-[700] text-[10px]"
              style={{ backgroundColor: `${catColor}26`, color: catColor, border: `1px solid ${catColor}40` }}
            >
              {s.label}
            </span>
          );
        })}
      </div>
    );
  };

  // Card de una técnica con guía a pantalla completa: no se despliega, ofrece
  // directamente el ejercicio guiado.
  const renderGuidedCard = (tech: Technique) => (
    <div
      key={tech.id}
      className="rounded-[16px] overflow-hidden"
      style={{
        backgroundColor: `${tech.color}1F`,
        border: `1px solid ${tech.color}59`,
        boxShadow: `0 8px 32px ${tech.color}33`,
      }}
    >
      <div className="p-[16px] flex items-center gap-[12px]">
        <div
          className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, ${tech.color}, ${tech.color}99)`, boxShadow: `0 4px 12px ${tech.color}66` }}
        >
          <ShieldAlert size={24} color={C.white} />
        </div>
        <div className="text-left">
          <div className="font-sans font-[800] text-[15px] text-white">{tech.name}</div>
          <div className="font-sans font-[400] text-[12px]" style={{ color: C.w40 }}>
            {tech.duration} · Para {tech.forSymptoms}
          </div>
        </div>
      </div>

      {renderSymptomChips(tech)}

      <div className="px-[16px] pb-[16px]">
        <motion.button
          onClick={() => setGuidedTechnique(tech)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-[12px] rounded-[12px] font-sans font-[700] text-[13px] text-white"
          style={{ background: `linear-gradient(135deg, ${tech.color}, ${tech.color}CC)` }}
        >
          Respiremos juntos
        </motion.button>
      </div>
    </div>
  );

  const renderTechniqueCard = (tech: Technique) => {
    if (tech.breathingPhases) return renderGuidedCard(tech);

    const isExpanded = expandedId === tech.id;
    const currentStep = completedSteps[tech.id] || 0;
    const totalSteps = tech.steps.length;
    const isFinished = currentStep >= totalSteps;

    return (
      <div
        key={tech.id}
        className="rounded-[16px] overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: isExpanded ? `${tech.color}1F` : C.glass,
          border: `1px solid ${isExpanded ? `${tech.color}59` : C.glassBorder}`,
          boxShadow: isExpanded ? `0 8px 32px ${tech.color}33` : 'none'
        }}
      >
        {/* Header Accordion */}
        <button
          onClick={() => toggleExpand(tech.id)}
          className="w-full p-[16px] flex items-center justify-between"
        >
          <div className="flex items-center gap-[12px]">
            <div
              className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tech.color}, ${tech.color}99)`, boxShadow: `0 4px 12px ${tech.color}66` }}
            >
              <ShieldAlert size={24} color={C.white} />
            </div>
            <div className="text-left">
              <div className="font-sans font-[800] text-[15px] text-white">{tech.name}</div>
              <div className="font-sans font-[400] text-[12px]" style={{ color: C.w40 }}>{tech.duration} · Para {tech.forSymptoms}</div>
            </div>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={20} color={C.w60} />
          </motion.div>
        </button>

        {/* Chips: síntomas del usuario que esta técnica aborda */}
        {renderSymptomChips(tech)}

        {/* Body Accordion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-[16px] pb-[16px] flex flex-col gap-[8px]"
            >
              {tech.steps.map((step, idx) => {
                const isStepActive = idx === currentStep;
                const isStepCompleted = idx < currentStep;
                const isPending = idx > currentStep;

                let stepBg = C.glass;
                let stepBorder = 'transparent';
                if (isStepActive || isStepCompleted) {
                  stepBg = `${tech.color}33`;
                  stepBorder = `1.5px solid ${tech.color}80`;
                }

                return (
                  <div
                    key={idx}
                    className="p-[12px] rounded-[12px] flex gap-[12px] items-start transition-colors duration-300"
                    style={{ backgroundColor: stepBg, border: stepBorder }}
                  >
                    <div
                      className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                      style={{
                        backgroundColor: (isStepActive || isStepCompleted) ? tech.color : "rgba(255,255,255,0.25)"
                      }}
                    >
                      {isStepCompleted ? (
                        <Check size={14} color={C.white} strokeWidth={3} />
                      ) : (
                        <span className="font-sans font-[700] text-[10px] text-white">{idx + 1}</span>
                      )}
                    </div>
                    <span className={`font-sans text-[13px] ${isPending ? 'font-[400] text-[#FFFFFF66]' : 'font-[600] text-white'}`}>
                      {step.text}
                    </span>
                  </div>
                );
              })}

              <div className="mt-[8px]">
                {!isFinished ? (
                  <button
                    onClick={(e) => advanceStep(tech.id, totalSteps, e)}
                    className="w-full py-[10px] rounded-[12px] font-sans font-[700] text-[13px] text-white"
                    style={{ background: `linear-gradient(135deg, ${tech.color}, ${tech.color}CC)` }}
                  >
                    Siguiente paso
                  </button>
                ) : (
                  <div
                    className="w-full py-[10px] rounded-[12px] flex items-center justify-center gap-[8px]"
                    style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)' }}
                  >
                    <Check size={14} color={C.white} />
                    <span className="font-sans font-[700] text-[13px] text-white">¡Muy bien! Técnica completada</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-[32px] px-[20px] pb-[100px] flex flex-col gap-[24px]">
      <div 
        className="fixed inset-0 -z-10" 
        style={{ background: 'linear-gradient(180deg, #0D0A28 0%, #1A1240 30%, #231952 100%)' }}
      />

      {/* Header */}
      <header className="flex flex-col gap-[16px]">
        <button 
          onClick={onBack}
          className="w-[44px] h-[44px] rounded-[16px] flex items-center justify-center backdrop-blur-[8px]"
          style={{ backgroundColor: C.glass, border: `1px solid ${C.glassBorder}` }}
        >
          <ArrowLeft size={24} color={C.white} />
        </button>
        <div>
          <h1 className="font-sans font-[800] text-[22px] text-white">Tu contención</h1>
          <p className="font-sans font-[500] text-[13px]" style={{ color: C.w60 }}>Basada en lo que sientes ahora</p>
        </div>
      </header>

      {/* Detection Card */}
      <GlassCard 
        radius="16" 
        padding="lg"
        style={{ background: 'linear-gradient(145deg, rgba(66,48,160,0.5) 0%, rgba(113,88,194,0.5) 100%)' }}
      >
        <h3 className="font-sans font-[800] text-[14px] text-white mb-[12px]">
          Te escuchamos. Vamos a resolverlo juntos.
        </h3>
        <div className="flex flex-wrap gap-[8px]">
          {matchedSymptoms.map(s => {
            const catColor = s.category === 'fisicos' ? C.coral : s.category === 'emocionales' ? C.pink : C.lavender;
            return (
              <div 
                key={s.id}
                className="px-[12px] py-[6px] rounded-[16px] font-sans font-[700] text-[10px]"
                style={{ backgroundColor: `${catColor}33`, color: catColor, border: `1px solid ${catColor}4D` }}
              >
                {s.label}
              </div>
            );
          })}
        </div>
      </GlassCard>

      <section className="flex flex-col gap-[12px]">
        <div className="flex justify-between items-end">
          <h2 className="font-sans font-[700] text-[15px] text-white">Técnicas para ti 🌿</h2>
          {/* La pista solo aplica a las cards que se despliegan. */}
          {primaryTechniques.some(t => !t.breathingPhases) && (
            <span className="font-sans font-[400] text-[10px]" style={{ color: C.w40 }}>Toca cada una para ver los pasos.</span>
          )}
        </div>

        <div className="flex flex-col gap-[12px]">
          {primaryTechniques.map(renderTechniqueCard)}
        </div>
      </section>

      {secondaryTechniques.length > 0 && (
        <section className="flex flex-col gap-[12px]">
          <h2 className="font-sans font-[700] text-[15px] text-white">Otras técnicas que pueden ayudar</h2>
          <div className="flex flex-col gap-[12px]">
            {secondaryTechniques.map(renderTechniqueCard)}
          </div>
        </section>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-col gap-[12px] mt-[16px]">
        <PsychologistCTA />
        <button
          onClick={onHome}
          className="w-full py-[14px] font-sans font-[600] text-[12px] text-center"
          style={{ color: C.w60 }}
        >
          Hacer un nuevo chequeo
        </button>
      </div>

      {/*
        Guía a pantalla completa. Va como overlay (no como pantalla nueva): tapa
        las otras técnicas mientras dura y las devuelve intactas al salir, sin
        perder el estado de esta pantalla.
      */}
      <AnimatePresence>
        {guidedTechnique?.breathingPhases && (
          <BreathingExercise
            technique={guidedTechnique}
            phases={guidedTechnique.breathingPhases}
            onClose={() => setGuidedTechnique(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
