import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MEDIA } from '../../assets/media';
import { MagneticButton } from '../ui/MagneticButton';

export function FinalConversionBanner() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#171B17] text-[#F9F6F0]">
      <img
        src={MEDIA.kitchenJar}
        alt="Amber glass jar of golden turmeric on a warm sunlit Indian kitchen counter"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#171B17] via-[#171B17]/65 to-[#171B17]/80"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
        <span className="inline-block text-xs uppercase tracking-[0.22em] text-[#F2C56B]">
          Nature&apos;s Golden Gift
        </span>
        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.03]">
          Bring Pure, Unadulterated Gold to Your Table.
        </h2>
        <p className="text-base sm:text-lg text-[#E7D6B8]/85 max-w-2xl mx-auto leading-relaxed">
          Freshly prepared in small batches. Inspired by nature. Made for your everyday rituals.
        </p>
        <div className="pt-3">
          <MagneticButton href="#products" variant="gold">
            <span>Shop the Collection</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
