import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Info, SlidersHorizontal, FileCheck2 } from 'lucide-react';
import { MEDIA } from '../../assets/media';
import { SectionHeading } from '../ui/SectionHeading';

export function PurityTransparency() {
  const [sliderPos, setSliderPos] = useState(52);

  return (
    <section id="purity" className="py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Transparency First"
          title="Goodness You Can See. Trust You Can Feel."
          subtitle="Honest botanical sourcing starts with showing what is verified today and clearly marking what is pending formal certification."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-start">
          {/* Interactive Before / After Visual Comparison Slider */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-[#E7D6B8] shadow-lg select-none">
              <img
                src={MEDIA.powderMortar}
                alt="Finely milled deep golden turmeric powder beside a stone mortar"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={MEDIA.rootsMacro}
                  alt="Whole dried and freshly sliced natural turmeric rhizomes"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Divider Line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#F9F6F0] shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C86D1F] text-white flex items-center justify-center shadow-lg border-2 border-[#F9F6F0]">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark text-[11px] uppercase tracking-[0.14em] text-[#F9F6F0]">
                Whole Rhizome
              </span>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass-dark text-[11px] uppercase tracking-[0.14em] text-[#F2C56B]">
                Milled Powder
              </span>
            </div>

            <div className="flex items-center gap-4 px-2">
              <label
                htmlFor="purity-slider"
                className="text-xs uppercase tracking-[0.14em] text-[#231F20]/70 shrink-0"
              >
                Compare View
              </label>
              <input
                id="purity-slider"
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Slide to compare whole turmeric rhizome and milled turmeric powder"
                className="w-full accent-[#C86D1F] cursor-pointer"
              />
            </div>
          </div>

          {/* Traceability, Credential Placeholders & Water Test Caveat */}
          <div className="lg:col-span-5 space-y-5">
            {/* Credential & Batch Placeholders */}
            <div className="rounded-3xl bg-white border border-[#E7D6B8] p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-editorial text-2xl font-medium text-[#231F20]">
                  Batch &amp; Credential Placeholders
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-[#E7D6B8]/60 text-[10px] uppercase tracking-[0.14em] font-semibold text-[#231F20]">
                  Pending Verification
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E7D6B8]/70">
                  <span className="flex items-center gap-1.5 text-[#66735A] font-semibold">
                    <FileCheck2 className="w-3.5 h-3.5" /> FSSAI Lic. No.
                  </span>
                  <p className="mt-1 text-[#231F20]/70">Placeholder — To be added upon registration</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E7D6B8]/70">
                  <span className="flex items-center gap-1.5 text-[#66735A] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Organic Status
                  </span>
                  <p className="mt-1 text-[#231F20]/70">Placeholder — Pending accredited certificate</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E7D6B8]/70 text-xs">
                <span className="font-semibold text-[#231F20] block">
                  Sample Batch Traceability ID: NGG-2026-SAMPLE
                </span>
                <p className="text-[#231F20]/70 mt-1">
                  Reserved for verified harvest date, origin region, and independent lab test links once published.
                </p>
              </div>
            </div>

            {/* Understanding Turmeric Quality + Honest Water Test Caveat */}
            <div className="rounded-3xl bg-[#262B22] text-[#F9F6F0] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#F2C56B]">
                <Info className="w-4 h-4 shrink-0" />
                <h3 className="font-editorial text-2xl font-medium">
                  Understanding Turmeric Quality
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#E7D6B8]/85 leading-relaxed">
                Many households try the traditional <strong>at-home warm water test</strong> (stirring a pinch of turmeric into a glass of water to observe settling and subtle golden tint).
              </p>
              <div className="p-3.5 rounded-2xl bg-[#171B17]/75 border border-[#F2C56B]/25 text-xs text-[#E7D6B8]/90 leading-relaxed">
                <strong className="text-[#F2C56B] block mb-1">Important Scientific Caveat:</strong>
                A simple water test is <strong>not</strong> a scientifically reliable method to establish purity or detect modern adulterants (such as metanil yellow or lead chromate). Verified laboratory testing is always required for definitive quality assurance.
              </div>
              <a
                href="/purity-promise"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F2C56B]/45 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F2C56B] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B]"
              >
                Explore Our Purity Promise <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
