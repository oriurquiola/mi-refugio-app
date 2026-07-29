import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { C } from '../theme';
import { openPsychologistChat } from '../config';

// Halo coral que respira: llama la atención sin alarmar ("urgencia serena").
// Se reproduce una vez al entrar, no en loop.
const CORAL_REST_GLOW = C.coralGlow;
const CORAL_PEAK_GLOW =
  "0 0 0 5px rgba(224,92,53,0.14), 0 8px 34px rgba(224,92,53,0.65), 0 0 46px rgba(224,92,53,0.45)";

// CTA "Hablar con un psicólogo" en ancho completo. Se usa al cierre de las
// pantallas donde la persona ya vio contenido y puede querer hablar con alguien
// (Recomendaciones, Perfil). La versión flotante del Home es otro componente.
export function PsychologistCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={openPsychologistChat}
      aria-label="Hablar con un psicólogo: abre un chat con un especialista"
      initial={{ scale: 1, boxShadow: CORAL_REST_GLOW }}
      animate={
        reduceMotion
          ? { boxShadow: CORAL_REST_GLOW, scale: 1 }
          : {
              boxShadow: [CORAL_REST_GLOW, CORAL_PEAK_GLOW, CORAL_REST_GLOW, CORAL_PEAK_GLOW, CORAL_REST_GLOW],
              scale: [1, 1.02, 1, 1.015, 1],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : { duration: 3.6, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut", delay: 0.6 }
      }
      whileTap={{ scale: 0.98 }}
      className="w-full py-[14px] rounded-[16px] font-sans font-[700] text-[14px] flex items-center justify-center gap-[8px]"
      style={{ background: C.coralGrad, color: C.white }}
    >
      Hablar con un psicólogo
    </motion.button>
  );
}
