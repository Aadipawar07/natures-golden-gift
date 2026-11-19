import React, { useState } from 'react';
import { ArrowRight, BadgeInfo, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { MEDIA } from '../../assets/media';
import {
  FARMER_STORY,
  OUR_STORY_HERO,
  STORY_CLOSING,
  STORY_VERIFICATION_NOTICE,
  TERROIR_STORY,
} from '../../data/ourStory';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../ui/MagneticButton';
import { FarmToJarTimeline } from './FarmToJarTimeline';
import { StoryArtwork } from './StoryArtwork';
import { ValueComparison } from './ValueComparison';

function VerificationNote({ className = '' }) {
  return (
    <p
      role="note"
      className={`flex items-start gap-2 border-l-2 border-[#C86D1F] pl-3 text-[10px] leading-relaxed text-[#231F20]/60 ${className}`}
    >
      <BadgeInfo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C86D1F]" />
      {STORY_VERIFICATION_NOTICE}
    </p>
  );
}

function StoryHero() {
  const reduced = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    if (reduced || window.innerWidth < 1024) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    setMouse({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[82vh] w-full flex-col justify-center overflow-hidden bg-[#171B17] pb-16 pt-32 text-[#F9F6F0] sm:min-h-[88vh] sm:pb-20"
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={
          reduced
            ? undefined
            : { transform: `scale(1.06) translate3d(${-mouse.x}px, ${-mouse.y}px, 0)` }
        }
      >
        <img
          src={OUR_STORY_HERO.image}
          alt=""
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#171B17]/88 via-[#171B17]/55 to-[#171B17]/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#171B17] via-transparent to-[#171B17]/40"
        aria-hidden="true"
      />
      <div className="bg-editorial-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_30%,rgba(242,197,107,0.22),transparent_38%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F2C56B] sm:text-[11px]">
            <Sprout className="h-3.5 w-3.5" />
            {OUR_STORY_HERO.eyebrow}
          </div>
          <h1 className="mt-6 font-editorial text-5xl font-medium leading-[0.96] tracking-[-0.02em] text-[#F9F6F0] sm:text-7xl lg:text-[5.5rem]">
            Nine Months in the Soil.
            <br />
            <span className="italic text-[#F2C56B]">Zero Shortcuts</span> to Your Jar.*
          </h1>
          <p className="mt-6 max-w-2xl font-editorial text-xl leading-snug text-[#E7D6B8] sm:text-3xl">
            {OUR_STORY_HERO.subtitle}
          </p>
          <VerificationNote className="mt-7 max-w-2xl border-[#F2C56B]/70 text-[#F9F6F0]/70" />
          <div className="mt-8">
            <MagneticButton href="#terroir" variant="gold">
              <span>Follow the Journey</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
          <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-[#E7D6B8]/55">
            *Crop cycle and process details are draft claims pending verification.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StorySplit({ story, reverse = false, id }) {
  const reduced = usePrefersReducedMotion();
  const copy = (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center"
    >
      <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86D1F]">
        <span className="h-px w-6 bg-[#C86D1F]/60" />
        {story.eyebrow}
      </span>
      <h2 className="mt-4 font-editorial text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-[#231F20] sm:text-5xl">
        {story.title}
      </h2>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm leading-relaxed text-[#231F20]/75 sm:text-base">
          {paragraph}
        </p>
      ))}
      {story.metrics && (
        <>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {story.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-[#E7D6B8] bg-white/75 p-3 text-center sm:p-4"
              >
                <p className="font-editorial text-2xl font-semibold text-[#C86D1F] sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-[9px] leading-snug text-[#231F20]/65 sm:text-[10px]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] leading-relaxed text-[#231F20]/50">
            *Illustrative targets only; verify with farm, formulation, and batch records.
          </p>
        </>
      )}
      {story.quote && (
        <blockquote className="mt-6 rounded-2xl border border-[#C86D1F]/20 bg-[#E7D6B8]/35 p-5 sm:p-6">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C86D1F]">
            {story.quoteAttribution}
          </span>
          <p className="mt-2 font-editorial text-xl italic leading-relaxed text-[#231F20] sm:text-2xl">
            {story.quote}
          </p>
        </blockquote>
      )}
    </motion.div>
  );

  const art = (
    <StoryArtwork
      src={story.image}
      alt={story.imageAlt}
      label={story.imageLabel}
      rootDetails={story.details}
      className="aspect-[4/3] lg:aspect-[5/4]"
    />
  );

  return (
    <section
      id={id}
      className={`py-14 sm:py-20 lg:py-24 ${id === 'terroir' ? 'bg-[#F9F6F0]' : 'bg-[#F2EEE6]'}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        {reverse ? (
          <>
            <div className="order-1">{copy}</div>
            <div className="order-2">{art}</div>
          </>
        ) : (
          <>
            <div>{art}</div>
            {copy}
          </>
        )}

      </div>
    </section>
  );
}

function StoryClosing() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#171B17] py-20 text-[#F9F6F0] sm:py-24 lg:py-28">
      <img
        src={STORY_CLOSING.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171B17]/95 via-[#171B17]/75 to-[#171B17]/45"
        aria-hidden="true"
      />
      <div className="bg-editorial-grid-dark absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2C56B]">
            FROM ROOT TO RITUAL
          </span>
          <h2 className="mt-4 font-editorial text-4xl font-medium leading-[1.03] sm:text-6xl">
            {STORY_CLOSING.title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#E7D6B8]/85 sm:text-base">
            {STORY_CLOSING.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-[10px] leading-relaxed text-[#E7D6B8]/65">
            Harvest, origin, and process information remains pending confirmation for the products currently shown.
          </p>
          <div className="mt-8">
            <MagneticButton href="/shop" variant="gold">
              <span>Shop the Fresh Harvest</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-xl">
          <StoryArtwork
            src={MEDIA.jarPrimary}
            alt={STORY_CLOSING.imageAlt}
            label="A golden ritual · concept art"
            className="aspect-[4/3] shadow-[0_35px_90px_-25px_rgba(0,0,0,0.6)]"
          />
          <img
            src={MEDIA.rootsMacro}
            alt=""
            loading="lazy"
            className="absolute -bottom-5 -left-3 h-24 w-28 rounded-2xl border-2 border-[#F9F6F0]/80 object-cover shadow-xl sm:-left-5 sm:h-32 sm:w-36"
          />
          <svg
            viewBox="0 0 160 60"
            className="absolute -bottom-4 right-0 h-16 w-40 text-[#F2C56B] drop-shadow-lg sm:-right-4 sm:h-20 sm:w-48"
            aria-label="Decorative brass spoon illustration"
            role="img"
          >
            <ellipse cx="35" cy="27" rx="21" ry="15" fill="rgba(200,109,31,0.55)" stroke="currentColor" strokeWidth="2" />
            <path d="M53 34 L143 51" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path d="M56 31 L145 48" fill="none" stroke="#F9F6F0" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function OurStoryPage() {
  return (
    <div className="flex-1 bg-[#F9F6F0]">
      <StoryHero />
      <StorySplit id="terroir" story={TERROIR_STORY} />
      <StorySplit story={FARMER_STORY} reverse />
      <FarmToJarTimeline />
      <ValueComparison />
      <StoryClosing />
    </div>
  );
}
