import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppScreen } from './types';
import { Home } from './screens/Home';
import { Symptoms } from './screens/Symptoms';
import { Processing } from './screens/Processing';
import { Recommendations } from './screens/Recommendations';
import { BottomTabBar } from './components/BottomTabBar';
import { FloatingPsychologistButton } from './components/FloatingPsychologistButton';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("HOME");
  const [direction, setDirection] = useState<number>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const navigate = (screen: AppScreen, dir: number) => {
    setDirection(dir);
    setCurrentScreen(screen);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#1A1240]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentScreen}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.32, 0, 0.22, 1] }}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        >
          {currentScreen === "HOME" && (
            <Home onNavigate={(s) => navigate(s, 1)} />
          )}
          {currentScreen === "SYMPTOMS" && (
            <Symptoms 
              onBack={() => navigate("HOME", -1)} 
              onContinue={(ids) => {
                setSelectedSymptoms(ids);
                navigate("PROCESSING", 1);
              }} 
            />
          )}
          {currentScreen === "PROCESSING" && (
            <Processing onComplete={() => navigate("RECOMMENDATIONS", 1)} />
          )}
          {currentScreen === "RECOMMENDATIONS" && (
            <Recommendations 
              onBack={() => navigate("SYMPTOMS", -1)}
              onHome={() => navigate("HOME", -1)}
              selectedSymptoms={selectedSymptoms}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {currentScreen === "HOME" && <BottomTabBar />}
      {currentScreen === "HOME" && <FloatingPsychologistButton />}
    </div>
  );
}
