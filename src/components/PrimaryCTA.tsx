import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { C } from '../theme';

interface PrimaryCTAProps {
  label?: string;
  subtext?: string;
  onClick?: () => void;
}

export function PrimaryCTA({ label = "Estoy en crisis ahora", subtext, onClick }: PrimaryCTAProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.965, y: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="w-full flex items-center justify-center gap-[10px] rounded-[16px] py-[16px]"
        style={{
          background: C.coralGrad,
          boxShadow: C.coralGlow,
        }}
      >
        <Heart size={20} fill={C.white} stroke="none" />
        <span className="font-sans font-[800] text-[17px] text-white tracking-[0.01em]">
          {label}
        </span>
      </motion.button>
      {subtext && (
        <span className="mt-[12px] font-sans font-[400] text-[12px]" style={{ color: C.w80 }}>
          {subtext}
        </span>
      )}
    </div>
  );
}
