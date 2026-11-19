import React from 'react';
import { ArrowDown, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { FARM_TO_JAR_STEPS } from '../../data/ourStory';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { SectionHeading } from '../ui/SectionHeading';
import { StoryArtwork } from './StoryArtwork';

export function FarmToJarTimeline() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#171B17] py-20 text-[#F9F6F0] bg-editorial-grid-dark sm:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="03 / FROM FARM TO JAR"
          title="Four Steps, One Unhurried Journey."
          subtitle="A transparent view of the intended workflow. Each process detail below is illustrative and pending confirmation for the current batches."
          dark
        />

        <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#F2C56B]/50 to-transparent xl:block"
          />
          {FARM_TO_JAR_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[1.7rem] border border-[#F2C56B]/15 bg-[#262B22] p-3.5"
            >
              <StoryArtwork
                src={step.image}
                alt={step.imageAlt}
                label={`STEP ${step.number}`}
                className="aspect-[4/3] rounded-[1.3rem] shadow-none"
              />
              <div className="px-2 pb-3 pt-5">
                <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#F2C56B]/80">
                  <Sprout className="h-3.5 w-3.5" />
                  Process detail pending verification
                </p>
                <h3 className="mt-2 font-editorial text-2xl font-medium leading-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#E7D6B8]/80">
                  {step.description}
                </p>
              </div>
              {index < FARM_TO_JAR_STEPS.length - 1 && (
                <ArrowDown
                  aria-hidden="true"
                  className="absolute -bottom-5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 text-[#F2C56B] xl:hidden"
                />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
