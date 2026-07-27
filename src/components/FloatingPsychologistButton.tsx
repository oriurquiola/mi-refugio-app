import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Headset } from 'lucide-react';
import { openPsychologistChat } from '../config';

// Resplandor lavanda en reposo, sutil y estático.
const REST_GLOW = "0 4px 20px rgba(184,160,238,0.28)";

export function FloatingPsychologistButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={openPsychologistChat}
      aria-label="Hablar con un psicólogo: abre un chat con un especialista"
      whileTap={{ scale: 0.97, backgroundColor: "rgba(255,255,255,0.10)" }}
      className="fixed bottom-[96px] right-[16px] z-40 flex items-center gap-[8px] overflow-hidden rounded-full py-[12px] px-[18px] backdrop-blur-[8px]"
      style={{
        backgroundColor: "rgba(184,160,238,0.14)",
        border: "1.5px solid rgba(184,160,238,0.45)",
        boxShadow: REST_GLOW,
      }}
    >
      {/* Destello de borde: un punto de luz recorre la línea del borde una vez al entrar.
          El anillo se logra pintando un conic-gradient y enmascarándolo solo al área del borde. */}
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            padding: "1.5px", // grosor del borde iluminado (= borde del botón)
            background:
              "conic-gradient(from var(--beam-angle), transparent 0deg 280deg, rgba(200,182,255,0.85) 335deg, #ffffff 353deg, transparent 360deg)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            filter: "drop-shadow(0 0 4px rgba(200,182,255,0.7))",
            animation:
              "border-beam-spin 2.8s ease-in-out 0.6s 1 both, border-beam-fade 2.8s ease-in-out 0.6s 1 both",
          }}
        />
      )}

      <Headset size={16} color="#C9B6FF" className="relative z-10" />
      <span className="relative z-10 font-sans font-[700] text-[13px] text-[#C9B6FF]">
        Hablar con un psicólogo
      </span>
    </motion.button>
  );
}
