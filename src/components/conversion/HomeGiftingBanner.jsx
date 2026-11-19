import React from 'react';
import { ArrowRight, Gift, PackageCheck } from 'lucide-react';
import { MEDIA } from '../../assets/media';

export function HomeGiftingBanner() {
  return (
    <section className="bg-[#F9F6F0] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#E7D6B8] bg-[#F3ECE1] shadow-[0_24px_70px_-45px_rgba(35,31,32,0.38)] md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">
              <Gift className="h-4 w-4" aria-hidden="true" /> Thoughtful by nature
            </span>
            <h2 className="mt-3 font-editorial text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              A golden gift, made for sharing.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#231F20]/70 sm:text-base">
              Explore curated hampers, celebration favors, and bulk supply ideas for kitchens and
              gatherings.
            </p>
            <a
              href="/gifting"
              className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#C86D1F] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20]"
            >
              Gifting &amp; Bulk Supply <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="relative min-h-56 overflow-hidden bg-[#262B22] sm:min-h-72">
            <img
              src={MEDIA.jarPrimary}
              alt="Amber turmeric jar arranged in warm natural light"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/65 via-transparent to-[#171B17]/10" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#171B17]/65 px-4 py-2 text-[9px] uppercase tracking-[0.15em] text-[#F9F6F0] backdrop-blur-sm sm:bottom-6 sm:left-6">
              <PackageCheck className="h-3.5 w-3.5 text-[#F2C56B]" aria-hidden="true" />
              For celebrations &amp; conscious kitchens
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
