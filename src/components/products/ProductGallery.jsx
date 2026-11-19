import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MEDIA } from '../../assets/media';

const FALLBACK_IMAGES = [MEDIA.jarPrimary, MEDIA.powderMortar, MEDIA.rootsMacro, MEDIA.ritualElixir];

export function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [...(product.gallery || []), ...FALLBACK_IMAGES]
    .filter((image, index, gallery) => gallery.indexOf(image) === index)
    .slice(0, 4);
  const activeImage = images[activeIndex] || product.image;

  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#E7D6B8] bg-[#E7D6B8]/30">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${product.name} product view ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>
        <span className="absolute bottom-4 left-4 rounded-full bg-[#F9F6F0]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#231F20]">
          {product.badge || 'Small Batch'}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View product image ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`aspect-square overflow-hidden rounded-xl border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F] ${
              index === activeIndex ? 'border-[#C86D1F]' : 'border-transparent hover:border-[#B8A67D]'
            }`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
