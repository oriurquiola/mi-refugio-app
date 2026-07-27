import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { C } from '../theme';

interface ProcessingProps {
  onComplete: () => void;
}

const MESSAGES = [
  "Respira conmigo…",
  "Estamos procesando lo que sientes…",
  "Identificando el patrón…",
  "Casi listo. Vas muy bien."
];

export function Processing({ onComplete }: ProcessingProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // Message cycle: 1.7s each, total 6.8s. 
    const msgInterval = setInterval(() => {
      setMsgIndex(prev => {
        if (prev < MESSAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 1700);

    // End after 7.0s
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  useEffect(() => {
    // Breath cycle: Inhale(2s) -> Hold(0.8s) -> Exhale(2.2s) = 5s total
    // But screen finishes at 4.6s, so we just start the cycle.
    let timeout1: ReturnType<typeof setTimeout>, timeout2: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setBreathPhase('in');
      timeout1 = setTimeout(() => {
        setBreathPhase('hold');
        timeout2 = setTimeout(() => {
          setBreathPhase('out');
        }, 800);
      }, 2000);
    };

    cycle();

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const getBreathLabel = () => {
    if (breathPhase === 'in') return 'Inhala…';
    if (breathPhase === 'hold') return 'Mantén…';
    return 'Exhala…';
  };

  const getBreathScale = () => {
    if (breathPhase === 'in') return 1.22;
    if (breathPhase === 'hold') return 1.22;
    return 1.0;
  };

  const scale = getBreathScale();
  const transitionDuration = breathPhase === 'in' ? 2 : breathPhase === 'out' ? 2.2 : 0.8;
  const ease = breathPhase === 'hold' ? "linear" : "easeInOut";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div 
        className="fixed inset-0 -z-10" 
        style={{ background: 'linear-gradient(175deg, #0D0A28 0%, #2A1F72 40%, #3D2F90 70%, #6150B8 100%)' }}
      />
      
      {/* Animated Stars Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-[2px] h-[2px]"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
          />
        ))}
      </div>

      {/* Breathing Ring System */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center mb-[60px]">
        
        {/* Outer Rings */}
        <motion.div 
          className="absolute inset-0 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(184,160,238,0.55), rgba(80,55,160,0.90))', opacity: 0.18 }}
          animate={{ scale: scale + 0.3 }}
          transition={{ duration: transitionDuration, ease }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(184,160,238,0.55), rgba(80,55,160,0.90))', opacity: 0.26 }}
          animate={{ scale: scale + 0.15 }}
          transition={{ duration: transitionDuration, ease }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(184,160,238,0.55), rgba(80,55,160,0.90))', opacity: 0.34 }}
          animate={{ scale }}
          transition={{ duration: transitionDuration, ease }}
        />

        {/* Central Circle */}
        <motion.div 
          className="absolute inset-0 rounded-full flex items-center justify-center z-10"
          style={{ 
            background: 'radial-gradient(circle at 38% 32%, rgba(184,160,238,0.55), rgba(80,55,160,0.90))',
            boxShadow: '0 0 70px rgba(184,160,238,0.45), inset 0 2px 10px rgba(255,255,255,0.12)'
          }}
          animate={{ scale }}
          transition={{ duration: transitionDuration, ease }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={32} color={C.white} opacity={0.8} />
          </motion.div>
        </motion.div>
      </div>

      {/* Breath Label */}
      <div className="absolute top-[18%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={breathPhase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.38 }}
            className="font-sans font-[700] text-[15px]"
            style={{ color: "rgba(184,160,238,0.55)" }}
          >
            {getBreathLabel()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="mt-[40px] h-[30px] flex items-center justify-center relative w-full px-[20px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute text-center font-sans font-[800] text-[18px] text-white w-full"
          >
            {MESSAGES[msgIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-[80px] flex gap-[8px]">
        {[0, 1, 2, 3].map(idx => (
          <motion.div
            key={idx}
            className="h-[6px] rounded-full transition-all duration-350 ease-in-out"
            style={{
              width: msgIndex >= idx ? 26 : 6,
              background: msgIndex >= idx ? C.white : "rgba(255,255,255,0.20)"
            }}
          />
        ))}
      </div>
    </div>
  );
}
