import React, { useId, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Droplets,
  Leaf,
  PackageCheck,
  ShieldCheck,
  ThermometerSun,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MEDIA } from '../../assets/media';
import {
  PURITY_GUARANTEE_DRAFT,
  PURITY_PILLARS,
  PURITY_PROMISE_NOTICE,
  SENSORY_CHECKLIST,
  WATER_TEST_STEPS,
} from '../../data/purityPromise';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../ui/MagneticButton';
import { SectionHeading } from '../ui/SectionHeading';
import { StoryArtwork } from '../storytelling/StoryArtwork';

const pillarIcons = {
  shield: ShieldCheck,
  leaf: Leaf,
  mill: ThermometerSun,
  package: PackageCheck,
};

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WaterGlassIllustration({ step, cloudy = false }) {
  const instanceId = useId().replace(/:/g, '');
  const glassId = `glass-${cloudy ? 'cloudy' : 'settled'}-${instanceId}`;
  const particles = Array.from({ length: 14 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const x = 78 + column * 20 + (row % 2) * 7;
    const y = cloudy
      ? 105 + row * 22
      : step === 0
        ? 76 + row * 19
        : step === 1
          ? 105 + row * 17
          : 184 + (index % 3) * 5;
    return { x, y, key: index };
  });

  return (
    <svg viewBox="0 0 240 270" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${glassId}-water`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={cloudy ? '#E6BF49' : '#F2C56B'} stopOpacity={cloudy ? '0.5' : '0.24'} />
          <stop offset="100%" stopColor={cloudy ? '#C86D1F' : '#C86D1F'} stopOpacity={cloudy ? '0.26' : '0.12'} />
        </linearGradient>
        <clipPath id={`${glassId}-clip`}>
          <path d="M66 54 H174 L162 220 Q120 239 78 220 Z" />
        </clipPath>
      </defs>
      <ellipse cx="120" cy="235" rx="66" ry="12" fill="#231F20" opacity="0.08" />
      <path d="M66 54 H174 L162 220 Q120 239 78 220 Z" fill="#FFFFFF" fillOpacity="0.18" stroke="#C89A57" strokeWidth="3" />
      <path d="M70 105 H170 L160 216 Q120 230 80 216 Z" fill={`url(#${glassId}-water)`} clipPath={`url(#${glassId}-clip)`} />
      <path d="M72 105 Q120 111 168 105" fill="none" stroke="#C89A57" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M79 70 L88 201" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
      {particles.map((particle) => (
        <motion.circle
          key={particle.key}
          cx={particle.x}
          r={cloudy ? 3.2 : 2.8}
          fill={cloudy ? '#C86D1F' : '#A95A1C'}
          initial={{ cy: 75, opacity: 0 }}
          animate={{ cy: particle.y, opacity: cloudy ? 0.55 : step === 2 ? 0.8 : 0.65 }}
          transition={{ duration: 0.6, delay: particle.key * 0.018, ease: 'easeOut' }}
        />
      ))}
      {!cloudy && step === 2 && (
        <g fill="#A95A1C" opacity="0.75">
          <ellipse cx="109" cy="216" rx="26" ry="5" />
          <ellipse cx="139" cy="215" rx="11" ry="3.5" />
        </g>
      )}
      <path d="M87 45 Q120 37 153 45" fill="none" stroke="#C89A57" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BrassSpoonIllustration() {
  return (
    <svg viewBox="0 0 180 100" className="absolute -right-2 top-1 h-20 w-36 text-[#B7873E] sm:h-24 sm:w-44" aria-hidden="true">
      <ellipse cx="35" cy="35" rx="23" ry="15" fill="#D9AE5E" stroke="currentColor" strokeWidth="3" />
      <path d="M55 43 L158 82" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 39 L157 77" fill="none" stroke="#F9F6F0" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41" cy="34" r="5" fill="#C86D1F" />
      <circle cx="52" cy="36" r="3" fill="#C86D1F" />
    </svg>
  );
}

function PurityHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#171B17] pb-16 pt-32 text-[#F9F6F0] sm:pb-20 lg:pb-24">
      <div className="absolute inset-0">
        <img src={MEDIA.kitchenJar} alt="" loading="eager" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171B17] via-[#171B17]/90 to-[#171B17]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/85 via-transparent to-[#171B17]/20" />
        <div className="bg-editorial-grid-dark absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_40%,rgba(242,197,107,0.2),transparent_38%)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.19em] text-[#F2C56B]">
            <Droplets className="h-3.5 w-3.5" />
            Our purity standard · zero adulteration*
          </span>
          <h1 className="mt-6 max-w-3xl font-editorial text-5xl font-medium leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Purity You Can See, Smell, and Test in Your Own Kitchen.
          </h1>
          <p className="mt-6 max-w-2xl font-editorial text-xl leading-snug text-[#E7D6B8] sm:text-2xl">
            Our stated standard excludes fillers and synthetic colours. Facility, licence, batch, and process details are still being verified; the water demonstration is for observation, not proof of purity.
          </p>
          <p role="note" className="mt-5 max-w-xl border-l-2 border-[#F2C56B]/70 pl-3 text-[10px] leading-relaxed text-[#F9F6F0]/65">
            Quality commitments on this page are targets until their supporting product and business records are confirmed.
          </p>
          <a href="#water-test" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#F2C56B] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2C56B]">
            Explore the kitchen demonstration <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: reduced ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl"
        >
          <StoryArtwork
            src={MEDIA.kitchenJar}
            alt="Warm kitchen scene with an amber turmeric jar"
            label="A kitchen demonstration · illustrative"
            className="aspect-[4/3] border-[#F2C56B]/30"
          >
            <div className="relative ml-auto h-52 w-44 sm:h-64 sm:w-52">
              <WaterGlassIllustration step={2} />
              <BrassSpoonIllustration />
            </div>
          </StoryArtwork>
          <div className="absolute -bottom-3 left-4 rounded-full border border-[#F2C56B]/35 bg-[#171B17]/85 px-4 py-2 text-[9px] uppercase tracking-[0.14em] text-[#F2C56B] backdrop-blur-sm sm:left-7">
            Notice what settles — not a purity verdict
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WaterTestGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const step = WATER_TEST_STEPS[activeStep];

  const goToStep = (nextStep) => {
    setActiveStep(Math.min(WATER_TEST_STEPS.length - 1, Math.max(0, nextStep)));
  };

  return (
    <section id="water-test" className="scroll-mt-24 bg-[#F2EEE6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A 60-Second Kitchen Demonstration"
          title="Watch the powder settle. Keep the conclusion modest."
          subtitle="Use this simple demonstration to observe tint and sediment. It is not a scientifically reliable way to verify purity or detect adulteration."
        />

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[2rem] border border-[#E7D6B8] bg-[#F9F6F0] p-5 shadow-[0_20px_60px_-36px_rgba(35,31,32,0.35)] sm:p-7">
            <div aria-label="Select a water demonstration step" className="space-y-2">
              {WATER_TEST_STEPS.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={activeStep === index}
                  onClick={() => goToStep(index)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F] sm:p-4 ${
                    activeStep === index
                      ? 'border-[#C86D1F]/45 bg-[#E7D6B8]/45'
                      : 'border-transparent hover:border-[#E7D6B8] hover:bg-white/70'
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-editorial text-lg ${
                    activeStep === index ? 'bg-[#C86D1F] text-white' : 'bg-[#E7D6B8]/60 text-[#231F20]'
                  }`}>
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-editorial text-xl leading-tight text-[#231F20]">{item.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#231F20]/65">{item.detail}</span>
                  </span>
                </button>
              ))}
            </div>

            <div
              id="water-step-panel"
              role="status"
              aria-live="polite"
              className="mt-5 rounded-2xl bg-white/70 p-4"
            >
              <p className="text-sm leading-relaxed text-[#231F20]/80">{step.note}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-[#231F20] transition-colors hover:bg-[#E7D6B8]/50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </button>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#231F20]/50">
                  {activeStep + 1} of {WATER_TEST_STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={() => goToStep(activeStep + 1)}
                  disabled={activeStep === WATER_TEST_STEPS.length - 1}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-[#C86D1F] transition-colors hover:bg-[#E7D6B8]/50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4 sm:grid-cols-2">
            {[false, true].map((cloudy) => (
              <div key={String(cloudy)} className="flex flex-col rounded-[2rem] border border-[#E7D6B8] bg-white/75 p-5 sm:p-6">
                <div className="mx-auto h-52 w-48 max-w-full sm:h-60">
                  <WaterGlassIllustration step={2} cloudy={cloudy} />
                </div>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">
                  Illustrative appearance
                </p>
                <h3 className="mt-2 font-editorial text-2xl text-[#231F20]">
                  {cloudy ? 'Cloudier water' : 'Settled pigment'}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#231F20]/70">
                  {cloudy
                    ? 'A cloudy appearance can have many causes and does not identify a specific ingredient.'
                    : 'Pigment tint and sediment can vary with the turmeric, grind, water, and settling time.'}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <div role="note" className="mt-6 flex items-start gap-3 rounded-2xl border border-[#C86D1F]/20 bg-[#F9F6F0] p-4 text-xs leading-relaxed text-[#231F20]/75 sm:p-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#C86D1F]" />
          <p>
            <strong className="text-[#231F20]">Important:</strong> Both visuals are conceptual illustrations. Settling, tint, or cloudiness cannot prove purity or reliably reveal adulteration. Do not use this demonstration as a safety check.
          </p>
        </div>
      </div>
    </section>
  );
}

function PurityPillars() {
  return (
    <section className="bg-[#F9F6F0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Standards We Aim to Meet"
          title="Four pillars behind a more thoughtful jar."
          subtitle={PURITY_PROMISE_NOTICE}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PURITY_PILLARS.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon];
            return (
              <Reveal key={pillar.number} delay={index % 2 ? 0.06 : 0}>
                <article className="h-full rounded-[1.75rem] border border-[#E7D6B8] bg-white/75 p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F3ECE1] text-[#C86D1F]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-[#F3ECE1] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8A5A2D]">
                      {pillar.status}
                    </span>
                  </div>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">{pillar.number} / Quality pillar</p>
                  <h3 className="mt-2 font-editorial text-2xl font-medium text-[#231F20] sm:text-3xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#231F20]/70">{pillar.body}</p>
                  <div className="mt-5 border-t border-[#E7D6B8]/70 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#231F20]/50">{pillar.detail}</p>
                    {pillar.icon === 'shield' && (
                      <p className="mt-1 font-mono text-xs tracking-[0.12em] text-[#231F20]/65">
                        XXXXXXXXXXXXXX
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SensoryChecklist() {
  return (
    <section className="bg-[#F2EEE6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A Sensory Checklist"
          title="Notice the details. Don’t mistake them for proof."
          subtitle="Your senses can help you assess a product experience, but none of these observations can authenticate turmeric on their own."
        />
        <div className="mt-9 overflow-hidden rounded-[1.75rem] border border-[#E7D6B8] bg-[#F9F6F0]">
          <div className="hidden grid-cols-[0.7fr_1.2fr_1.1fr] gap-4 border-b border-[#E7D6B8] bg-white/70 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#231F20]/60 sm:grid">
            <span>What to notice</span>
            <span>Possible observation</span>
            <span>What it cannot tell you</span>
          </div>
          <div className="divide-y divide-[#E7D6B8]/75">
            {SENSORY_CHECKLIST.map((item) => (
              <div key={item.sense} className="grid gap-2 px-5 py-5 sm:grid-cols-[0.7fr_1.2fr_1.1fr] sm:gap-4 sm:px-6">
                <h3 className="font-editorial text-xl font-semibold text-[#C86D1F]">{item.sense}</h3>
                <p className="text-sm leading-relaxed text-[#231F20]/75"><span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#231F20]/45 sm:hidden">Possible observation</span>{item.observe}</p>
                <p className="text-xs leading-relaxed text-[#231F20]/60"><span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#231F20]/45 sm:hidden">What it cannot tell you</span>{item.limit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PurityGuarantee() {
  return (
    <section id="guarantee" className="scroll-mt-24 bg-[#F9F6F0] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#C86D1F]/45 bg-[#F3ECE1] p-6 shadow-[0_24px_70px_-45px_rgba(35,31,32,0.45)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#C86D1F]/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full border border-[#C86D1F]/15" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-[#C86D1F]/30 bg-white/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A5A2D]">
              Draft customer policy — pending confirmation
            </span>
            <h2 className="mt-5 max-w-3xl font-editorial text-4xl font-medium leading-[1.04] text-[#231F20] sm:text-5xl">
              The 100% Kitchen Purity Promise
            </h2>
            <p className="mt-5 max-w-3xl font-editorial text-lg leading-relaxed text-[#231F20]/75 sm:text-xl">
              {PURITY_GUARANTEE_DRAFT}
            </p>
            <p className="mt-3 max-w-3xl text-[10px] leading-relaxed text-[#231F20]/55">
              The 7-day refund language above is a draft, not an active offer, until the business confirms its policy and terms. The water demonstration is not a purity test.
            </p>
            <div className="mt-7">
              <MagneticButton href="/shop" variant="primary">
                <span>Shop Pure Haldi</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function PurityPromisePage() {
  return (
    <div className="flex-1 bg-[#F9F6F0]">
      <PurityHero />
      <WaterTestGuide />
      <PurityPillars />
      <SensoryChecklist />
      <PurityGuarantee />
    </div>
  );
}
