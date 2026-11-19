import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { POLICY_SECTIONS } from '../../data/policies';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

function getSectionFromHash() {
  const sectionId = window.location.hash.slice(1);
  return POLICY_SECTIONS.some((section) => section.id === sectionId)
    ? sectionId
    : POLICY_SECTIONS[0].id;
}

function PolicyNavigation({ activeId, onSelect }) {
  return (
    <nav aria-label="Store policies" className="lg:sticky lg:top-28">
      <p className="mb-3 hidden text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F] lg:block">
        In this policy guide
      </p>
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="group" aria-label="Choose a store policy">
        {POLICY_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) => {
              event.preventDefault();
              onSelect(section.id);
            }}
            aria-current={activeId === section.id ? 'page' : undefined}
            className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.09em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F] lg:min-h-12 lg:justify-start lg:rounded-xl lg:px-4 ${
              activeId === section.id
                ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                : 'border-[#E7D6B8] bg-white/70 text-[#231F20]/70 hover:border-[#C86D1F] hover:text-[#C86D1F]'
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function PolicyArticle({ policy }) {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <motion.article
      key={policy.id}
      id={policy.id}
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={`${policy.id}-heading`}
      className="scroll-mt-28 rounded-[1.75rem] border border-[#E7D6B8] bg-white/85 p-5 shadow-[0_20px_60px_-40px_rgba(35,31,32,0.35)] sm:p-8 lg:p-10"
    >
      <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">
        <FileText className="h-4 w-4" aria-hidden="true" /> {policy.eyebrow}
      </span>
      <h2 id={`${policy.id}-heading`} className="mt-3 font-editorial text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
        {policy.title}
      </h2>
      <p className="mt-4 border-l-2 border-[#C86D1F]/50 pl-4 text-sm leading-relaxed text-[#231F20]/65">
        {policy.intro}
      </p>
      <div className="mt-7 space-y-7">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h3 className="font-editorial text-2xl font-semibold leading-tight">{section.heading}</h3>
            <div className="mt-2 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[#231F20]/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-[#E7D6B8] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-start gap-2 text-[10px] leading-relaxed text-[#8B4F28]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Draft policy preview. Confirm active business practices and have legal terms reviewed before publishing.
        </p>
        <a
          href="/faq-contact"
          className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8A5429] hover:text-[#C86D1F]"
        >
          Need help? Contact us <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export function PoliciesPage() {
  const [activeId, setActiveId] = useState(getSectionFromHash);
  const reducedMotion = usePrefersReducedMotion();
  const activePolicy = POLICY_SECTIONS.find((policy) => policy.id === activeId) || POLICY_SECTIONS[0];

  useEffect(() => {
    const syncFromLocation = () => setActiveId(getSectionFromHash());
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
    };
  }, []);

  const selectPolicy = (sectionId) => {
    setActiveId(sectionId);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `/policies#${sectionId}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F6F0] px-5 pb-16 pt-32 text-[#231F20] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#C86D1F]">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
            Clear, Considered, In One Place
          </span>
          <h1 className="mt-4 font-editorial text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Legal &amp; Store Policies
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#231F20]/75 sm:text-lg">
            A practical guide to delivery, returns, privacy, and using our store. Draft policy
            details below require business and legal review before they can be treated as active
            commitments.
          </p>
        </header>
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-9">
          <PolicyNavigation activeId={activeId} onSelect={selectPolicy} />
          <AnimatePresence mode="wait" initial={false}>
            <PolicyArticle key={activePolicy.id} policy={activePolicy} />
          </AnimatePresence>
        </div>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.12 }}
          role="note"
          className="mt-5 text-[10px] leading-relaxed text-[#231F20]/50"
        >
          These policy previews do not replace formal legal advice or a published privacy notice.
          Confirm the business entity, contact details, service terms, tax treatment, and applicable
          consumer-protection requirements before launch.
        </motion.p>
      </div>
    </main>
  );
}
