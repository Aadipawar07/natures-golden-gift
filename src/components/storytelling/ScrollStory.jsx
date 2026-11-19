import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { STORY_STAGES } from '../../data/story';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../ui/MagneticButton';

export function ScrollStory() {
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveStage = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollableDistance = track.offsetHeight - window.innerHeight;
        const progress = scrollableDistance > 0
          ? Math.max(0, Math.min(1, -track.getBoundingClientRect().top / scrollableDistance))
          : 0;
        const nextIndex = Math.min(
          Math.floor(progress * STORY_STAGES.length),
          STORY_STAGES.length - 1
        );
        setActiveIndex(nextIndex);
      });
    };

    window.addEventListener('scroll', updateActiveStage, { passive: true });
    window.addEventListener('resize', updateActiveStage);
    updateActiveStage();

    return () => {
      window.removeEventListener('scroll', updateActiveStage);
      window.removeEventListener('resize', updateActiveStage);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const activeStage = STORY_STAGES[activeIndex];

  const scrollToStage = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    const stageProgress = (index + 0.5) / STORY_STAGES.length;
    window.scrollTo({
      top: trackTop + scrollableDistance * stageProgress,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="story"
      ref={trackRef}
      style={{ height: `${STORY_STAGES.length * 100}vh` }}
      className={`relative bg-gradient-to-b ${activeStage.bgClass} text-[#F9F6F0]`}
    >
      <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
        <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pb-5 pt-28 sm:px-8 sm:pb-8">
          <div className="mb-5 flex shrink-0 flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#F2C56B] sm:text-xs">
                <span className="h-px w-6 bg-[#F2C56B]/60" />
                From Earth to Gold
              </span>
              <h2 className="mt-1 font-editorial text-2xl font-medium sm:mt-2 sm:text-4xl lg:text-5xl">
                The Scroll Story
              </h2>
            </div>

            <nav aria-label="Scroll story stages" className="flex items-center gap-2">
              {STORY_STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  aria-pressed={idx === activeIndex}
                  onClick={() => scrollToStage(idx)}
                  aria-label={`Jump to stage ${stage.number}: ${stage.label}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B] ${
                    idx === activeIndex
                      ? 'bg-[#F2C56B] text-[#231F20]'
                      : 'bg-white/10 text-[#E7D6B8]/70 hover:bg-white/20'
                  }`}
                >
                  {stage.number}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-14">
            <div className="relative col-span-1 grid min-h-0 items-center lg:col-span-5">
              {STORY_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div
                    key={stage.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 12,
                    }}
                    transition={{
                      duration: reduced ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-current={isActive ? 'step' : undefined}
                    aria-hidden={!isActive}
                    style={{ gridColumnStart: 1, gridRowStart: 1 }}
                    className={`flex min-w-0 flex-col justify-center ${
                      isActive
                        ? 'pointer-events-auto'
                        : 'pointer-events-none'
                    }`}
                  >
                    <div
                      className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 lg:hidden"
                      style={{
                        height: '26svh',
                        minHeight: '9rem',
                        maxHeight: '14rem',
                      }}
                    >
                      <img
                        src={stage.image}
                        alt={stage.alt}
                        loading={idx === activeIndex ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-t from-[#171B17]/80 to-transparent lg:hidden" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 lg:hidden">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#F2C56B]">
                            {stage.number} / {String(STORY_STAGES.length).padStart(2, '0')}
                          </span>
                          <p className="font-editorial text-lg text-[#F9F6F0]">
                            {stage.label}
                          </p>
                        </div>
                        <div className="mb-1 h-1 w-20 overflow-hidden rounded-full bg-white/20">
                          <div
                            className="h-full bg-[#F2C56B]"
                            style={{ width: `${((idx + 1) / STORY_STAGES.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F2C56B] sm:text-xs">
                      Stage {stage.number} — {stage.label}
                    </span>
                    <h3 className="mt-2 font-editorial text-2xl font-medium leading-[1.08] sm:text-3xl lg:mt-3 lg:text-4xl xl:text-5xl">
                      {stage.headline}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E7D6B8]/85 sm:mt-3 sm:text-base">
                      {stage.narrative}
                    </p>
                    <p className="mt-2 border-l-2 border-[#C86D1F] pl-3 text-[11px] leading-relaxed text-[#E7D6B8]/65 sm:mt-3 sm:text-xs">
                      {stage.detail}
                    </p>

                    {idx === STORY_STAGES.length - 1 && (
                      <div className="mt-4 sm:mt-6">
                        <MagneticButton
                          href="/our-story"
                          variant="gold"
                          tabIndex={isActive ? 0 : -1}
                        >
                          <span>Read Our Full Farm Story</span>
                          <ArrowRight className="h-4 w-4" />
                        </MagneticButton>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="relative col-span-1 hidden min-w-0 lg:col-span-7 lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[#F2C56B]/20 bg-[#171B17] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeStage.id}
                    src={activeStage.image}
                    alt={activeStage.alt}
                    initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#F2C56B]">
                      {activeStage.number} / {String(STORY_STAGES.length).padStart(2, '0')}
                    </span>
                    <p className="mt-1 font-editorial text-2xl text-[#F9F6F0]">
                      {activeStage.label}
                    </p>
                  </div>
                  <div
                    className="h-1.5 w-32 overflow-hidden rounded-full bg-white/15"
                    role="progressbar"
                    aria-label="Story progress"
                    aria-valuemin={1}
                    aria-valuemax={STORY_STAGES.length}
                    aria-valuenow={activeIndex + 1}
                  >
                    <div
                      className="h-full bg-[#F2C56B] transition-[width] duration-500"
                      style={{
                        width: `${((activeIndex + 1) / STORY_STAGES.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
