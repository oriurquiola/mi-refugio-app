import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { C } from '../theme';
import { AppScreen, Symptom, SymptomCategory } from '../types';
import { symptoms } from '../data';

interface SymptomsProps {
  onBack: () => void;
  onContinue: (selectedIds: string[]) => void;
}

const CATEGORIES: { id: SymptomCategory; label: string; color: string }[] = [
  { id: 'fisicos', label: 'Físicos', color: C.coral },
  { id: 'emocionales', label: 'Emocionales', color: C.pink },
  { id: 'pensamientos', label: 'Pensamientos', color: C.lavender },
];

export function Symptoms({ onBack, onContinue }: SymptomsProps) {
  const [activeCategory, setActiveCategory] = useState<SymptomCategory>('fisicos');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const activeColor = CATEGORIES.find(c => c.id === activeCategory)?.color || C.coral;
  const filteredSymptoms = symptoms.filter(s => s.category === activeCategory);

  const toggleSymptom = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="min-h-screen pt-[32px] px-[20px] pb-[160px] flex flex-col">
      <div 
        className="fixed inset-0 -z-10" 
        style={{ background: 'linear-gradient(180deg, #0D0A28 0%, #1A1240 30%, #231952 100%)' }}
      />

      {/* Header */}
      <header className="flex flex-col gap-[16px] mb-[24px]">
        <button 
          onClick={onBack}
          className="w-[44px] h-[44px] rounded-[16px] flex items-center justify-center backdrop-blur-[8px]"
          style={{ backgroundColor: C.glass, border: `1px solid ${C.glassBorder}` }}
        >
          <ArrowLeft size={24} color={C.white} />
        </button>
        <div>
          <h1 className="font-sans font-[800] text-[22px] text-white">¿Qué estás sintiendo?</h1>
          <p className="font-sans font-[500] text-[13px]" style={{ color: C.w60 }}>Marca todo lo que aplica ahora mismo.</p>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-[8px] mb-[24px] overflow-x-auto pb-[4px]">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-[16px] py-[8px] rounded-[16px] flex-shrink-0 transition-all duration-200"
              style={{
                backgroundColor: isActive ? cat.color : C.glass,
                border: `1px solid ${isActive ? cat.color : C.glassBorder}`,
                boxShadow: isActive ? `0 4px 16px ${cat.color}59` : 'none',
              }}
            >
              <span className={`font-sans text-[13px] ${isActive ? 'font-[700] text-white' : 'font-[500] text-[#FFFFFF99]'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Symptoms Grid */}
      <motion.div 
        key={activeCategory}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex flex-col gap-[12px] flex-1"
      >
        {filteredSymptoms.length === 0 && (
          <div className="text-center mt-10 font-sans text-[13px]" style={{ color: C.w40 }}>
            Toca los síntomas que sientes ahora 👆
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-[12px]">
          {filteredSymptoms.map(symptom => {
            const isSelected = selectedIds.has(symptom.id);
            const categoryColor = CATEGORIES.find(c => c.id === symptom.category)?.color || C.white;
            
            return (
              <motion.button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                whileTap={{ scale: 0.95 }}
                className="relative p-[16px] rounded-[16px] text-left min-h-[72px] flex items-center justify-between overflow-hidden"
                style={{
                  backgroundColor: isSelected ? `${categoryColor}2E` : C.glass,
                  border: `1.5px solid ${isSelected ? categoryColor : C.glassBorder}`,
                  boxShadow: isSelected ? `0 4px 20px ${categoryColor}4D` : 'none'
                }}
              >
                <span className={`font-sans text-[13px] pr-[20px] ${isSelected ? 'font-[700] text-white' : 'font-[500] text-[#FFFFFF99]'}`}>
                  {symptom.label}
                </span>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute right-[12px] w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: categoryColor }}
                    >
                      <Check size={11} strokeWidth={3} color={C.white} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-[20px] pb-[40px] z-50 flex flex-col items-center gap-[12px]"
            style={{
              background: `linear-gradient(to top, ${C.bg1} 70%, transparent)`
            }}
          >
            <motion.button
              onClick={() => onContinue(Array.from(selectedIds))}
              whileTap={{ scale: 0.965 }}
              className="w-full flex items-center justify-center gap-[10px] rounded-[16px] py-[16px] relative"
              style={{ background: C.coralGrad, boxShadow: C.coralGlow }}
            >
              <div className="absolute left-[16px] w-[24px] h-[24px] rounded-full bg-white/20 flex items-center justify-center font-sans font-[700] text-[12px] text-white">
                {selectedIds.size}
              </div>
              <span className="font-sans font-[800] text-[17px] text-white">
                Continuar
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
