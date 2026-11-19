import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { RITUALS } from '../../data/rituals';
import { SectionHeading } from '../ui/SectionHeading';

function RitualLineIcon({ id }) {
  if (id === 'culinary') {
    return (
      <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#C86D1F]" fill="none" strokeWidth="1.5">
        <path d="M8 22h24c0 6.5-5.4 11-12 11S8 28.5 8 22Z" />
        <path d="M14 14c0-2 2-3 2-5M20 14c0-2 2-3 2-5M26 14c0-2 2-3 2-5" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'elixir') {
    return (
      <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#C86D1F]" fill="none" strokeWidth="1.5">
        <path d="M11 16h15v10a7.5 7.5 0 0 1-15 0V16Z" />
        <path d="M26 18h3.5a3.5 3.5 0 0 1 0 7H26" />
        <path d="M15 10c0-1.5 1.5-2.5 1.5-4M21 10c0-1.5 1.5-2.5 1.5-4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#C86D1F]" fill="none" strokeWidth="1.5">
      <path d="M20 8c6 6 9 11 9 16a9 9 0 1 1-18 0c0-5 3-10 9-16Z" />
      <path d="M20 16v14M16 22l4 3 4-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DailyRituals() {
  const [selectedRitual, setSelectedRitual] = useState(null);

  return (
    <section id="rituals" className="py-24 lg:py-32 bg-[#E7D6B8]/35">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Daily Rhythms"
          title="One Jar. Three Daily Rituals."
          subtitle="From morning tempering to candlelit mugs and Sunday botanical care—simple traditions elevated by pure ingredients."
          align="center"
        />

        <div className="mt-14 grid md:grid-cols-3 gap-7">
          {RITUALS.map((ritual) => (
            <article
              key={ritual.id}
              className="group rounded-[2rem] bg-[#F9F6F0] border border-[#E7D6B8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(35,31,32,0.18)]"
            >
              <div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={ritual.image}
                    alt={ritual.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-light text-xs font-semibold text-[#231F20]">
                    {ritual.number}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <RitualLineIcon id={ritual.id} />
                  <h3 className="font-editorial text-3xl font-medium text-[#231F20] mt-4">
                    {ritual.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#231F20]/75 leading-relaxed">
                    {ritual.description}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6">
                <button
                  type="button"
                  onClick={() => setSelectedRitual(ritual)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#C86D1F] hover:text-[#231F20] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-9 flex justify-center">
          <a
            href="/rituals"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F9F6F0] transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
          >
            Browse All Recipes &amp; Elixirs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {selectedRitual && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedRitual.title}
          className="fixed inset-0 z-50 bg-[#171B17]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedRitual(null)}
        >
          <div
            className="bg-[#F9F6F0] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E7D6B8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#C86D1F]">
                  Ritual {selectedRitual.number}
                </span>
                <h3 className="font-editorial text-3xl font-medium text-[#231F20] mt-1">
                  {selectedRitual.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRitual(null)}
                aria-label="Close ritual guide"
                className="p-2 rounded-full hover:bg-[#E7D6B8]/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-[#231F20]/80 leading-relaxed">
              {selectedRitual.description}
            </p>
            <div className="mt-5 p-4 rounded-2xl bg-[#E7D6B8]/45 border border-[#B8A67D]/40">
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[#66735A] mb-1">
                Preparation Note
              </p>
              <p className="text-sm text-[#231F20] leading-relaxed">{selectedRitual.tip}</p>
            </div>
            <p className="mt-4 text-xs text-[#231F20]/60">
              Suggested format: <strong>{selectedRitual.recommendedPack}</strong>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
