import React, { useState } from 'react';
import { ArrowRight, MapPin, Sprout } from 'lucide-react';
import { ORIGIN_REGIONS } from '../../data/origin';
import { SectionHeading } from '../ui/SectionHeading';

export function FarmerOrigin() {
  const [activeId, setActiveId] = useState(ORIGIN_REGIONS[0].id);
  const activeRegion = ORIGIN_REGIONS.find((r) => r.id === activeId) || ORIGIN_REGIONS[0];

  return (
    <section id="origin" className="py-24 lg:py-32 bg-[#171B17] text-[#F9F6F0] bg-editorial-grid-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Origin & Heritage"
          title="Behind Every Golden Root, There's a Story."
          subtitle="Explore India's celebrated turmeric-growing belts. Regions and grower cards below are configurable sample profiles pending verified farm onboarding."
          dark
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-center">
          {/* Artistic Stylized India Origin Map */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[2rem] bg-[#262B22] border border-[#F2C56B]/20 p-6 sm:p-8 aspect-square max-w-lg mx-auto flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full opacity-90"
                aria-label="Stylized map of India showing candidate turmeric sourcing regions"
              >
                {/* Stylized geometric silhouette of India */}
                <path
                  d="M38,10 L48,8 L55,16 L60,22 L72,26 L86,32 L88,40 L78,44 L72,40 L66,48 L56,58 L52,72 L46,88 L42,92 L38,82 L32,68 L28,54 L20,46 L22,36 L30,28 L34,18 Z"
                  fill="#171B17"
                  stroke="#B8A67D"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                {/* Subtle latitude/longitude grid */}
                <line x1="10" y1="38" x2="90" y2="38" stroke="#F2C56B" strokeOpacity="0.12" strokeDasharray="2 2" />
                <line x1="10" y1="63" x2="90" y2="63" stroke="#F2C56B" strokeOpacity="0.12" strokeDasharray="2 2" />
                <line x1="44" y1="10" x2="44" y2="92" stroke="#F2C56B" strokeOpacity="0.12" strokeDasharray="2 2" />
              </svg>

              {ORIGIN_REGIONS.map((region) => {
                const isActive = region.id === activeRegion.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setActiveId(region.id)}
                    style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
                    aria-label={`Select sample region ${region.name}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#F2C56B] text-[#231F20] scale-110 shadow-[0_0_24px_rgba(242,197,107,0.65)] z-20'
                        : 'bg-[#171B17]/90 text-[#F9F6F0] border border-[#F2C56B]/40 hover:border-[#F2C56B] z-10'
                    }`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="whitespace-nowrap">{region.name.split(',')[0].split('(')[0].trim()}</span>
                  </button>
                );
              })}

              <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.16em] text-[#E7D6B8]/60">
                Sample Configurable Origin Map
              </span>
            </div>
          </div>

          {/* Region & Sample Farmer Card */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap gap-2">
              {ORIGIN_REGIONS.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(region.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] transition-all ${
                    region.id === activeRegion.id
                      ? 'bg-[#C86D1F] text-white'
                      : 'bg-[#262B22] text-[#E7D6B8]/75 hover:text-white'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            <div className="rounded-[2rem] bg-[#262B22] border border-[#F2C56B]/20 overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={activeRegion.image}
                  alt={activeRegion.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark text-[10px] uppercase tracking-[0.16em] text-[#F2C56B]">
                  {activeRegion.tag}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#F2C56B]">
                  <Sprout className="w-4 h-4" />
                  <span>{activeRegion.elevation}</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-medium">
                  {activeRegion.profileTitle}
                </h3>
                <p className="text-sm text-[#E7D6B8]/85 leading-relaxed">{activeRegion.story}</p>
                <div className="pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-3 text-xs text-[#E7D6B8]/75">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F2C56B]">
                      Farmer Partner
                    </span>
                    <span>{activeRegion.farmerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F2C56B]">
                      Processing Note
                    </span>
                    <span>{activeRegion.processingNote}</span>
                  </div>
                </div>
                <a
                  href="/our-story"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F2C56B]/45 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F2C56B] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B]"
                >
                  Read Our Full Farm Story <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
