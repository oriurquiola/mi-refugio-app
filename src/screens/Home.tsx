import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Brain, Zap } from 'lucide-react';
import { C } from '../theme';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { GlassCard } from '../components/GlassCard';
import { AppScreen } from '../types';
import { mockHistory } from '../data';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
}

const HOW_IT_WORKS = [
  { num: '01', icon: MessageCircle, color: C.coral, title: "Cuéntanos qué sientes" },
  { num: '02', icon: Brain, color: C.teal, title: "Identificamos el patrón" },
  { num: '03', icon: Zap, color: C.amber, title: "Te damos contención ya" },
];

export function Home({ onNavigate }: HomeProps) {
  // Simulating has history state for the MVP
  const hasHistory = mockHistory.length > 0;

  return (
    <div className="min-h-screen pb-[120px] pt-[32px] px-[20px] flex flex-col gap-[24px]">
      
      {/* Background Gradient */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{ background: 'linear-gradient(180deg, #0D0A28 0%, #1A1240 30%, #231952 100%)' }}
      />
      
      {/* Animated Stars Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-[2px] h-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="flex flex-col gap-[12px]">
        <div className="flex justify-between items-center">
          <h1 
            className="font-display text-[32px] text-white"
            style={{ textShadow: "0 2px 20px rgba(184,160,238,0.6)" }}
          >
            Mi Refugio
          </h1>
          <div className="w-[32px] h-[32px] rounded-full bg-[#352e5d] flex items-center justify-center font-sans font-[700] text-[12px]">
            MA
          </div>
        </div>
        <h2 className="font-sans font-[800] text-[22px] text-white">
          Hola 👋 ¿Cómo estás hoy?
        </h2>
      </header>

      {/* Hero Card */}
      <GlassCard 
        radius="24" 
        padding="xl"
        style={{ 
          background: 'linear-gradient(145deg, #4230A0 0%, #5A3FA8 45%, #7158C2 100%)',
          position: 'relative'
        }}
      >
        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(184,160,238,0.3) 0%, rgba(0,0,0,0) 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,130,156,0.2) 0%, rgba(0,0,0,0) 70%)', transform: 'translate(-40%, 40%)' }} />

        <div className="relative z-10 flex flex-col gap-[16px]">
          <span className="font-sans font-[700] text-[15px] uppercase tracking-wider" style={{ color: C.w80 }}>
            Respira. Estamos acá.
          </span>
          <h2 className="font-sans font-[800] text-[18px] text-white mb-[8px]">
            Cuéntanos, ¿cómo te sientes?
          </h2>
          <PrimaryCTA 
            label="Estoy en crisis ahora" 
            subtext="Identificamos qué sientes en 20 segundos."
            onClick={() => onNavigate("SYMPTOMS")}
          />
        </div>
      </GlassCard>

      {/* Últimas recomendaciones */}
      <section className="flex flex-col gap-[12px]">
        <h3 className="font-sans font-[700] text-[15px] text-white">
          Últimas recomendaciones
        </h3>
        
        {!hasHistory ? (
          <div 
            className="w-full rounded-[16px] border border-dashed py-[32px] px-[20px] flex items-center justify-center text-center"
            style={{ borderColor: C.w20 }}
          >
            <span className="font-sans font-[400] text-[13px]" style={{ color: C.w40 }}>
              Aquí aparecerán tus recomendaciones recientes.
            </span>
          </div>
        ) : (
          <div className="flex gap-[12px] overflow-x-auto pb-[8px] snap-x">
            {mockHistory.map((item) => (
              <GlassCard 
                key={item.id} 
                className="w-[208px] flex-shrink-0 snap-start"
                style={{ borderColor: `${item.color}40` }} // Using hex with alpha logic rough
              >
                <div className="flex flex-col gap-[12px]">
                  <div className="flex justify-between items-center">
                    <div 
                      className="w-[36px] h-[36px] rounded-[12px] flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}33` }} // roughly 20% opacity
                    >
                      <Zap size={18} color={item.color} />
                    </div>
                    <div className="px-[8px] py-[2px] rounded-full text-[10px] font-bold" style={{ backgroundColor: `${item.color}2E`, color: item.color }}>
                      {item.date}
                    </div>
                  </div>
                  <div>
                    <div className="font-sans font-[700] text-[13px] text-white">{item.techniqueName}</div>
                    <div className="font-sans font-[400] text-[12px]" style={{ color: C.w40 }}>{item.symptomLabel}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* ¿Cómo funciona? */}
      <section className="flex flex-col gap-[12px]">
        <h3 className="font-sans font-[700] text-[15px] text-white">
          ¿Cómo funciona Mi Refugio?
        </h3>
        <div className="flex gap-[16px] overflow-x-auto pb-[8px] snap-x">
          {HOW_IT_WORKS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="w-[280px] flex-shrink-0 snap-start rounded-[24px] p-[20px] flex items-center gap-[16px] backdrop-blur-[8px]"
                style={{ backgroundColor: C.glass, border: `1px solid ${C.glassBorder}` }}
              >
                <div 
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${step.color}33` }}
                >
                  <Icon size={24} color={step.color} />
                </div>
                <div className="flex-1">
                  <div className="font-sans font-[800] text-[15px] text-white">{step.title}</div>
                </div>
                <div className="font-sans font-[800] text-[32px] shrink-0" style={{ color: "rgba(255,255,255,0.08)" }}>
                  {step.num}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center mt-[16px]">
        <span className="font-sans font-[600] text-[12px]" style={{ color: C.w40 }}>
          Mi historial
        </span>
      </div>

    </div>
  );
}
