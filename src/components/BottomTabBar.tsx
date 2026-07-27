import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Wind, BookOpen, HeartHandshake } from 'lucide-react';
import { C } from '../theme';

const TABS = [
  { id: 'refugio', label: 'REFUGIO', icon: Home },
  { id: 'respirar', label: 'RESPIRAR', icon: Wind },
  { id: 'diario', label: 'DIARIO', icon: BookOpen },
  { id: 'soporte', label: 'SOPORTE', icon: HeartHandshake },
];

export function BottomTabBar() {
  const [activeTab, setActiveTab] = useState('refugio');

  return (
    <div 
      className="fixed bottom-[16px] left-[16px] right-[16px] h-[72px] rounded-[32px] z-50 flex items-center justify-around px-[12px] backdrop-blur-[20px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 12px 40px rgba(0,0,0,0.45)"
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center justify-center w-[64px] h-[56px]"
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute w-[44px] h-[32px] rounded-full top-[2px]"
                style={{ backgroundColor: "rgba(224,92,53,0.15)" }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            )}
            
            <motion.div
              animate={{ scale: isActive ? 1 : 0.9 }}
              className="relative z-10 flex flex-col items-center gap-[4px]"
            >
              <Icon 
                size={isActive ? 24 : 22} 
                color={isActive ? C.coral : C.w40} 
              />
              <span 
                className="font-sans font-[600] text-[10px]"
                style={{ color: isActive ? C.coral : C.w40 }}
              >
                {tab.label}
              </span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}
