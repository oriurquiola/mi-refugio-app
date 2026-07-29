import React, { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { C } from '../theme';
import { LIVE_URL, SLIDES, SlideBullet, SlideDef } from './slides';

/**
 * Presentación del Demo Day. Vive en la ruta `/demo-day` y es una galería
 * lineal que ACOMPAÑA la demo en vivo; no la reemplaza ni toca el flujo
 * principal del producto (`src/App.tsx` y `src/screens/*`).
 *
 * Se lee de pie, a ~3 m de la pantalla: por eso la escala tipográfica usa
 * `clamp()` con mínimos de 18px (mobile) y ≥24px desde 1024px.
 */

// Escala tipográfica de la presentación. El coeficiente `vw` está elegido para
// que a partir de 1024px ningún texto baje de 24px.
const T = {
  chrome: "clamp(18px, 2.4vw, 24px)",
  bullet: "clamp(18px, 2.4vw, 30px)",
  // Diapositivas densas (Decisiones, Verificación): mismo mínimo, techo más bajo.
  bulletDense: "clamp(18px, 2.4vw, 26px)",
  blockHeading: "clamp(20px, 2.8vw, 34px)",
  title: "clamp(30px, 5.2vw, 60px)",
  coverTitle: "clamp(40px, 8vw, 92px)",
  lead: "clamp(20px, 3.2vw, 38px)",
};

// Anillo de foco visible (3px) en todo lo navegable con teclado.
// El color se aplica inline con el token de `theme.ts` (regla: no hardcodear color).
const FOCUS_RING =
  "focus-visible:[outline-style:solid] focus-visible:[outline-width:3px] focus-visible:[outline-offset:4px]";

interface BulletLineProps {
  bullet: SlideBullet;
  accent: string;
  size: string;
}

const BulletLine: React.FC<BulletLineProps> = ({ bullet, accent, size }) => {
  // Una viñeta puede ser una línea propia, una lista de sub-viñetas, o ambas.
  // Cuando solo trae sub-viñetas no lleva punto propio (evita el punto huérfano).
  const hasOwnLine = Boolean(bullet.label || bullet.text);

  return (
    <li className={hasOwnLine ? "flex gap-[14px]" : "block"}>
      {hasOwnLine && (
        <span
          aria-hidden="true"
          className="mt-[0.55em] w-[10px] h-[10px] rounded-full shrink-0"
          style={{ backgroundColor: accent }}
        />
      )}
      <div className="flex-1">
        {hasOwnLine && (
          <p
            className="font-sans font-[500] leading-[1.45]"
            style={{ fontSize: size, color: C.white }}
          >
            {bullet.label && (
              <span className="font-[800]" style={{ color: accent }}>
                {bullet.label}:{" "}
              </span>
            )}
            {bullet.text}
          </p>
        )}
        {bullet.items && (
          <ul className={`flex flex-col gap-[12px] ${hasOwnLine ? "mt-[10px]" : ""}`}>
            {bullet.items.map((item) => (
              <li key={item} className="flex gap-[14px]">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] w-[10px] h-[10px] rounded-full shrink-0"
                  style={{ backgroundColor: hasOwnLine ? C.lavender : accent }}
                />
                <span
                  className="font-sans font-[400] leading-[1.45]"
                  style={{ fontSize: size, color: hasOwnLine ? C.w80 : C.white }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

function LiveDemoLink() {
  return (
    <div className="flex flex-col gap-[10px]">
      <a
        href={LIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-[14px] rounded-[16px] px-[32px] py-[20px] w-full sm:w-auto sm:self-start ${FOCUS_RING}`}
        style={{
          background: C.coralGrad,
          boxShadow: C.coralGlow,
          outlineColor: C.lavender,
        }}
      >
        <ExternalLink size={28} color={C.white} aria-hidden="true" />
        <span
          className="font-sans font-[800] text-white"
          style={{ fontSize: T.blockHeading }}
        >
          Ir a la demo en vivo
        </span>
      </a>
      <span
        className="font-sans font-[400]"
        style={{ fontSize: T.chrome, color: C.w60 }}
      >
        {LIVE_URL} · se abre en una pestaña nueva
      </span>
    </div>
  );
}

const Slide: React.FC<{ slide: SlideDef }> = ({ slide }) => {
  if (slide.kind === "cover") {
    return (
      <div className="flex flex-col gap-[28px] max-w-[1100px]">
        <h1
          className="font-display text-white leading-[1.05]"
          style={{ fontSize: T.coverTitle, textShadow: "0 2px 40px rgba(184,160,238,0.6)" }}
        >
          {slide.title}
        </h1>
        <p
          className="font-sans font-[500] leading-[1.35]"
          style={{ fontSize: T.lead, color: C.white }}
        >
          {slide.lead}
        </p>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-sans font-[700] underline underline-offset-[6px] self-start rounded-[8px] ${FOCUS_RING}`}
          style={{ fontSize: T.chrome, color: C.lavender, outlineColor: C.lavender }}
        >
          {LIVE_URL}
        </a>
      </div>
    );
  }

  // Las diapositivas densas fluyen en dos columnas desde 1024px. Se usa
  // multi-columna (no grid) porque equilibra el alto de las dos columnas sola.
  const bulletSize = slide.twoColumns ? T.bulletDense : T.bullet;

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[1240px]">
      <h2
        className="font-sans font-[800] text-white leading-[1.15]"
        style={{ fontSize: T.title }}
      >
        {slide.title}
      </h2>

      {slide.liveButton && <LiveDemoLink />}

      <div
        className={
          slide.twoColumns
            ? "lg:columns-2 lg:gap-x-[48px]"
            : "flex flex-col gap-[24px]"
        }
      >
        {slide.blocks?.map((block, i) => (
          <section
            key={block.heading ?? `bloque-${i}`}
            className={`flex flex-col gap-[14px] ${
              slide.twoColumns ? "break-inside-avoid mb-[24px]" : ""
            }`}
          >
            {block.heading && (
              <h3
                className="font-sans font-[800]"
                style={{ fontSize: T.blockHeading, color: slide.accent }}
              >
                {block.heading}
              </h3>
            )}
            <ul className="flex flex-col gap-[14px]">
              {block.bullets.map((bullet, j) => (
                <BulletLine
                  key={bullet.label ?? bullet.text ?? `v-${j}`}
                  bullet={bullet}
                  accent={slide.accent}
                  size={bulletSize}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {slide.note && (
        <p
          className="font-sans font-[500] leading-[1.45] rounded-[16px] px-[20px] py-[16px] backdrop-blur-[8px]"
          style={{
            fontSize: bulletSize,
            color: C.white,
            backgroundColor: C.glass,
            border: `1px solid ${C.glassBorder}`,
            borderLeft: `4px solid ${slide.accent}`,
          }}
        >
          {slide.note.label && (
            <span className="font-[800]" style={{ color: slide.accent }}>
              {slide.note.label}:{" "}
            </span>
          )}
          {slide.note.text}
        </p>
      )}
    </div>
  );
};

export function DemoDay() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = SLIDES.length;
  const slide = SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const go = useCallback(
    (step: number) => {
      setIndex((current) => {
        const next = Math.min(Math.max(current + step, 0), total - 1);
        if (next !== current) setDirection(step > 0 ? 1 : -1);
        return next;
      });
    },
    [total]
  );

  // Navegación por teclado. Se incluyen RePág/AvPág y Inicio/Fin porque los
  // presentadores remotos envían esas teclas. Enter y Espacio quedan libres
  // para activar el enlace o el botón que tenga el foco (comportamiento nativo).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          setDirection(-1);
          setIndex(0);
          break;
        case "End":
          e.preventDefault();
          setDirection(1);
          setIndex(total - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, total]);

  const offset = reduceMotion ? 0 : direction * 40;

  const navButton = `w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 backdrop-blur-[8px] transition-opacity ${FOCUS_RING}`;

  return (
    <div
      lang="es"
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${C.bg0} 0%, ${C.bg1} 35%, ${C.bg2} 100%)`,
      }}
    >
      {/* Encabezado: marca + ubicación en el guion */}
      <header className="shrink-0 flex items-center justify-between gap-[16px] px-[24px] sm:px-[48px] pt-[24px]">
        <span
          className="font-display text-white text-[clamp(24px,3vw,34px)]"
          style={{ textShadow: "0 2px 20px rgba(184,160,238,0.6)" }}
        >
          Mi Refugio
        </span>
        <span
          className="font-sans font-[700] text-right"
          style={{ fontSize: T.chrome, color: C.w60 }}
        >
          {slide.name}
          {slide.timeframe && ` · ${slide.timeframe}`}
        </span>
      </header>

      {/* Diapositiva actual */}
      {/*
        Solo animación de ENTRADA, sin `AnimatePresence` ni `mode="wait"`: en una
        presentación en vivo el contenido nunca debe depender de que termine una
        animación de salida (si el navegador estrangula `requestAnimationFrame`
        la diapositiva quedaría congelada — ver `gotchas/README.md` G7).
        La `key` remonta la sección en cada cambio y dispara el desplazamiento.
        Por la misma razón solo se anima `x` y nunca la opacidad: si la animación
        se estranca, el texto sigue siendo legible.
      */}
      {/* El wrapper con `min-h-full` centra la diapositiva cuando cabe y crece
          cuando no cabe (en mobile), de modo que se pueda scrollear entera:
          centrar con `items-center` directo en el contenedor con scroll
          recortaría la parte de arriba sin forma de llegar a ella. */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center px-[24px] sm:px-[48px] py-[24px]">
          <motion.section
            key={slide.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`Diapositiva ${index + 1} de ${total}: ${slide.name}`}
            initial={{ x: offset }}
            animate={{ x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.32, 0, 0.22, 1] }}
            className="w-full flex justify-center"
          >
            <Slide slide={slide} />
          </motion.section>
        </div>
      </main>

      {/* Anuncio del cambio de diapositiva para lectores de pantalla */}
      <p aria-live="polite" className="sr-only">
        {`Diapositiva ${index + 1} de ${total}: ${slide.title}`}
      </p>

      {/* Controles */}
      <footer className="shrink-0 flex items-center justify-between gap-[16px] px-[24px] sm:px-[48px] pb-[24px] pt-[12px]">
        <span
          className="font-sans font-[400] hidden sm:block"
          style={{ fontSize: T.chrome, color: C.w60 }}
        >
          Usa ← y → para navegar
        </span>

        <div className="flex items-center gap-[16px] ml-auto">
          <span
            className="font-sans font-[800] tabular-nums"
            style={{ fontSize: T.chrome, color: C.w80 }}
          >
            {index + 1} / {total}
          </span>

          <div className="flex items-center gap-[10px]" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <span
                key={s.id}
                className="h-[8px] rounded-full transition-all"
                style={{
                  width: i === index ? 28 : 8,
                  backgroundColor: i === index ? slide.accent : C.w20,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-disabled={isFirst}
            aria-label="Diapositiva anterior"
            className={navButton}
            style={{
              backgroundColor: C.glass,
              border: `1px solid ${C.glassBorder}`,
              outlineColor: C.lavender,
              opacity: isFirst ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={28} color={C.white} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-disabled={isLast}
            aria-label="Diapositiva siguiente"
            className={navButton}
            style={{
              backgroundColor: C.glass,
              border: `1px solid ${C.glassBorder}`,
              outlineColor: C.lavender,
              opacity: isLast ? 0.4 : 1,
            }}
          >
            <ChevronRight size={28} color={C.white} aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}
