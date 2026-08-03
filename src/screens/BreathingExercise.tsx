import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { C } from '../theme';
import { Technique, BreathingPhase } from '../types';

interface BreathingExerciseProps {
  technique: Technique;
  phases: BreathingPhase[];
  onClose: () => void;
}

// Geometría del anillo. El viewBox es cuadrado y el trazo se dibuja desde arriba
// (de ahí el -rotate-90), igual que el recorrido del marcador.
const RING_SIZE = 280;
const RING_RADIUS = 124;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
// Separación visible entre los arcos de cada fase.
const ARC_GAP = 10;

// Escala del círculo en cada momento del ciclo: chico al empezar a inhalar,
// expandido durante la retención, y de vuelta al mínimo al terminar de exhalar.
const SCALE_MIN = 0.52;
const SCALE_MAX = 1;

// Ciclos completos que corre la guía. Con el ritmo 4-7-8 son 3 × 19 s = 57 s,
// que es lo que promete la etiqueta "60 seg" de la card (`data.ts`).
const BREATHING_CYCLES = 3;

// Duración del pulso que marca el cierre de un ciclo.
const CYCLE_PULSE_SECONDS = 0.8;

// Alto fijo del bloque "fase + instrucción". Durante la transición conviven el
// texto saliente y el entrante, ambos absolutos, así que el contenedor no puede
// depender de su contenido o el layout saltaría en cada cambio de fase. Cubre la
// instrucción más larga, que ocupa dos líneas (medido: 93 px en mobile).
const PHASE_TEXT_HEIGHT = 100;

export function BreathingExercise({ technique, phases, onClose }: BreathingExerciseProps) {
  const reduceMotion = useReducedMotion();

  // Un ciclo = la suma de las fases. La guía repite ese mismo ciclo.
  const cycleSeconds = useMemo(
    () => phases.reduce((sum, p) => sum + p.seconds, 0),
    [phases]
  );
  const totalSeconds = cycleSeconds * BREATHING_CYCLES;

  const [cycleIndex, setCycleIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds);
  const [isFinished, setIsFinished] = useState(false);

  // Un solo intervalo contra un timestamp inicial: no acumula deriva y no
  // depende de requestAnimationFrame (que el navegador estrangula si la
  // pestaña no está visible — ver gotcha G7).
  useEffect(() => {
    const startedAt = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;

      if (elapsed >= totalSeconds) {
        setIsFinished(true);
        clearInterval(id);
        return;
      }

      // En qué ciclo vamos y cuánto llevamos dentro de ese ciclo. El `min`
      // protege del último tick antes del corte, que podría caer fuera de rango.
      const cycle = Math.min(Math.floor(elapsed / cycleSeconds), BREATHING_CYCLES - 1);
      const inCycle = elapsed - cycle * cycleSeconds;
      setCycleIndex(cycle);

      let boundary = 0;
      for (let i = 0; i < phases.length; i++) {
        boundary += phases[i].seconds;
        if (inCycle < boundary) {
          setPhaseIndex(i);
          setSecondsLeft(Math.ceil(boundary - inCycle));
          break;
        }
      }
    }, 100);

    return () => clearInterval(id);
  }, [phases, cycleSeconds, totalSeconds]);

  // Arcos proporcionales a la duración de cada fase. Como los segmentos son
  // proporcionales al tiempo, el marcador puede girar a velocidad constante y
  // aun así coincidir con el cambio de fase.
  const arcs = useMemo(() => {
    let offsetSeconds = 0;
    return phases.map(phase => {
      const length = (phase.seconds / cycleSeconds) * RING_CIRCUMFERENCE;
      const start = (offsetSeconds / cycleSeconds) * RING_CIRCUMFERENCE;
      offsetSeconds += phase.seconds;
      return { key: phase.kind, length, start };
    });
  }, [phases, cycleSeconds]);

  // Keyframes de escala alineados a los límites de fase.
  const { scaleKeyframes, scaleTimes } = useMemo(() => {
    const keyframes: number[] = [];
    const times: number[] = [];
    let elapsed = 0;

    keyframes.push(phases[0].kind === 'exhale' ? SCALE_MAX : SCALE_MIN);
    times.push(0);

    for (const phase of phases) {
      elapsed += phase.seconds;
      const target =
        phase.kind === 'inhale' ? SCALE_MAX : phase.kind === 'exhale' ? SCALE_MIN : keyframes[keyframes.length - 1];
      keyframes.push(target);
      times.push(elapsed / cycleSeconds);
    }

    return { scaleKeyframes: keyframes, scaleTimes: times };
  }, [phases, cycleSeconds]);

  const currentPhase = phases[phaseIndex];
  const color = technique.color;

  // Entrada/salida de los textos de fase: el mismo efecto que los mensajes de
  // `Processing.tsx` (desplazamiento + desenfoque). Con reduced motion el
  // relevo es un fundido seco, sin movimiento ni blur.
  const phaseTextMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, y: 18, filter: 'blur(5px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -14, filter: 'blur(5px)' },
        transition: { duration: 0.55, ease: 'easeOut' as const },
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex flex-col items-center px-[20px] pt-[32px] pb-[40px]"
      style={{ background: 'linear-gradient(175deg, #0D0A28 0%, #2A1F72 40%, #3D2F90 70%, #6150B8 100%)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Guía de ${technique.name}`}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-[8px]">
        <button
          onClick={onClose}
          aria-label="Salir de la técnica"
          className="w-[44px] h-[44px] rounded-[16px] flex items-center justify-center backdrop-blur-[8px]"
          style={{ backgroundColor: C.glass, border: `1px solid ${C.glassBorder}` }}
        >
          <X size={22} color={C.white} />
        </button>
        <span className="font-sans font-[700] text-[13px]" style={{ color: C.w60 }}>
          {technique.name}
        </span>
        {/* Contrapeso del botón para que el título quede centrado. */}
        <div className="w-[44px]" aria-hidden="true" />
      </div>

      {!isFinished ? (
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-[40px]">
          {/* Círculo + anillo */}
          <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
            <svg
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              className="absolute inset-0 -rotate-90"
              aria-hidden="true"
            >
              {arcs.map(arc => (
                <circle
                  key={arc.key}
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  fill="none"
                  stroke={C.w20}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={`${Math.max(arc.length - ARC_GAP, 0)} ${RING_CIRCUMFERENCE}`}
                  strokeDashoffset={-arc.start}
                />
              ))}
            </svg>

            {/* Pulso que marca el cierre de un ciclo. El `key` lo remonta en
                cada corte para que vuelva a dispararse. */}
            {!reduceMotion && cycleIndex > 0 && (
              <motion.div
                key={cycleIndex}
                // `inset` alineado al radio del anillo (r=124 en un box de 280).
                className="absolute inset-[15px] rounded-full"
                style={{ border: `2px solid ${color}` }}
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{ opacity: 0, scale: 1.12 }}
                transition={{ duration: CYCLE_PULSE_SECONDS, ease: 'easeOut' }}
                aria-hidden="true"
              />
            )}

            {/* Marcador que recorre el anillo una vez por ciclo: vuelve arriba
                en cada corte, y eso también marca el cambio de ciclo. */}
            {!reduceMotion && (
              <motion.div
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: cycleSeconds, ease: 'linear', repeat: BREATHING_CYCLES - 1 }}
                aria-hidden="true"
              >
                <div
                  className="absolute left-1/2 top-0 w-[14px] h-[14px] rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: color,
                    boxShadow: `0 0 14px ${color}`,
                  }}
                />
              </motion.div>
            )}

            {/* Círculo que respira. */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="rounded-full"
                style={{
                  width: RING_RADIUS * 2 - 26,
                  height: RING_RADIUS * 2 - 26,
                  background: `radial-gradient(circle at 32% 28%, ${color}, ${color}66 70%, ${color}33 100%)`,
                  boxShadow: `0 0 60px ${color}59`,
                }}
                initial={{ scale: reduceMotion ? 0.8 : scaleKeyframes[0] }}
                animate={reduceMotion ? { scale: 0.8 } : { scale: scaleKeyframes }}
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : {
                        duration: cycleSeconds,
                        times: scaleTimes,
                        ease: 'easeInOut',
                        repeat: BREATHING_CYCLES - 1,
                      }
                }
              />
            </div>

            {/* Segundos restantes de la fase, al centro. */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-sans font-[800] text-[44px] text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}>
                {secondsLeft}
              </span>
            </div>
          </div>

          {/* Fase + instrucción + en qué respiración vamos */}
          {/* `w-full` es necesario: la fase y la instrucción salieron del flujo
              (son hijos absolutos), así que ya no aportan ancho al contenedor y
              sin esto la columna colapsaría al ancho de los puntos. */}
          <div className="w-full flex flex-col items-center gap-[10px] text-center min-h-[150px]">
            {/* La fase y su instrucción se relevan juntas en cada cambio de
                fase. `AnimatePresence` va sin `mode="wait"` a propósito: el
                texto entrante monta sin esperar a que termine la salida, así
                la instrucción nunca queda vacía si el navegador estrangula
                requestAnimationFrame (gotcha G7). El precio es que ambos
                conviven un instante, de ahí el alto fijo y los hijos absolutos. */}
            <div className="relative w-full" style={{ height: PHASE_TEXT_HEIGHT }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={phaseIndex}
                  className="absolute inset-0 flex flex-col items-center gap-[10px]"
                  {...phaseTextMotion}
                >
                  <span className="font-sans font-[800] text-[24px] text-white">
                    {currentPhase.label}
                  </span>
                  <p
                    className="font-sans font-[500] text-[15px] max-w-[300px] mx-auto"
                    style={{ color: C.w80, lineHeight: 1.55 }}
                  >
                    {currentPhase.instruction}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Un punto por ciclo: el actual encendido, los ya hechos atenuados.
                El texto de abajo es la versión accesible de lo mismo. */}
            <div className="flex items-center gap-[8px] mt-[6px]" aria-hidden="true">
              {Array.from({ length: BREATHING_CYCLES }).map((_, i) => (
                <div
                  key={i}
                  className="w-[8px] h-[8px] rounded-full"
                  style={{
                    backgroundColor: i > cycleIndex ? C.w20 : color,
                    opacity: i < cycleIndex ? 0.45 : 1,
                    boxShadow: i === cycleIndex ? `0 0 8px ${color}` : 'none',
                  }}
                />
              ))}
            </div>
            <span className="font-sans font-[500] text-[12px]" style={{ color: C.w60 }} aria-live="polite">
              Respiración {cycleIndex + 1} de {BREATHING_CYCLES}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-[24px] text-center">
          <div
            className="w-[120px] h-[120px] rounded-full"
            style={{
              background: `radial-gradient(circle at 32% 28%, ${color}, ${color}55 75%)`,
              boxShadow: `0 0 60px ${color}4D`,
            }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-[8px]">
            <h2 className="font-sans font-[800] text-[22px] text-white">¡Muy bien!</h2>
            <p className="font-sans font-[500] text-[15px] max-w-[280px]" style={{ color: C.w80, lineHeight: 1.55 }}>
              Tómate unos segundos con esa calma. Puedes repetirlo las veces que necesites.
            </p>
          </div>
        </div>
      )}

      {/* Acción de cierre */}
      <button
        onClick={onClose}
        className="w-full py-[14px] rounded-[16px] font-sans font-[700] text-[14px]"
        style={
          isFinished
            ? { background: C.coralGrad, color: C.white, boxShadow: C.coralGlow }
            : { backgroundColor: C.glass, border: `1px solid ${C.glassBorder}`, color: C.w80 }
        }
      >
        {isFinished ? 'Volver a mis técnicas' : 'Terminar'}
      </button>
    </motion.div>
  );
}
