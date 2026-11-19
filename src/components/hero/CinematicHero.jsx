import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Leaf, PackageCheck, ShoppingBag } from 'lucide-react';
import { MEDIA } from '../../assets/media';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { AmbientParticles } from './AmbientParticles';
import { formatINR } from '../../utils/format';
import { MagneticButton } from '../ui/MagneticButton';

export function CinematicHero() {
  const { addItem } = useCart();
  const reduced = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const flagship = PRODUCTS[0];
  const popularVariant = flagship.variants[1]; // 250g Everyday Pack

  const handleMouseMove = (e) => {
    if (reduced || window.innerWidth < 1024) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    setMouse({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#171B17] text-[#F9F6F0] flex flex-col justify-between pt-28 pb-10"
    >
      {/* Layered Anime Golden-Hour Landscape with Desktop Mouse Parallax */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={
          reduced
            ? undefined
            : {
                transform: `scale(1.06) translate3d(${-mouse.x}px, ${-mouse.y}px, 0)`,
              }
        }
      >
        <img
          src={MEDIA.heroLandscape}
          alt="Golden hour sunrise over terraced green turmeric hills in the Indian countryside"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Atmospheric Gradients & Subtle Grid */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#171B17]/88 via-[#171B17]/55 to-[#171B17]/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#171B17] via-transparent to-[#171B17]/40"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-editorial-grid-dark opacity-40" aria-hidden="true" />

      {/* Ambient Golden Light & Floating Turmeric Particles */}
      <AmbientParticles reduced={reduced} />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 my-auto grid lg:grid-cols-12 gap-10 items-end py-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-dark text-[11px] uppercase tracking-[0.2em] text-[#F2C56B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nature&apos;s Purest Gold, From Farm to Kitchen</span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[5.5rem] font-medium leading-[0.96] tracking-[-0.02em] text-[#F9F6F0]">
            Nature&apos;s <br />
            <span className="italic text-[#F2C56B]">Golden</span> Gift.
          </h1>

          <p className="font-editorial text-2xl sm:text-3xl text-[#E7D6B8] max-w-xl leading-snug">
            From the heart of the earth to the warmth of your kitchen.
          </p>

          <p className="text-sm sm:text-base text-[#F9F6F0]/80 max-w-lg leading-relaxed">
            Discover the richness of carefully sourced turmeric, rooted in nature and made for the
            rituals that bring us together.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton href="#products" variant="primary">
              Explore the Gold
            </MagneticButton>
            <MagneticButton href="/our-story" variant="secondary">
              Discover Our Story
            </MagneticButton>
          </div>

          {/* Transparent Brand Values Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#E7D6B8]/80">
            <span className="inline-flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#F2C56B]" /> Rooted in Nature
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-[#F2C56B]" /> Small-Batch Promise
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F2C56B]" /> No Added Colours
            </span>
          </div>
        </motion.div>

        {/* Floating Translucent Storytelling Cards & Product Preview */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-4 items-stretch sm:items-end"
        >
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-md">
            {[
              { title: 'Rooted in Nature', sub: 'Single-origin focus' },
              { title: 'Small-Batch', sub: 'Freshly milled' },
              { title: 'Farm to Kitchen', sub: 'UV-amber glass' },
            ].map((card) => (
              <div
                key={card.title}
                className="glass-dark rounded-2xl p-3 text-left transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-[11px] font-semibold text-[#F2C56B] leading-tight">
                  {card.title}
                </p>
                <p className="text-[10px] text-[#E7D6B8]/75 mt-1">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Floating Product Preview Card */}
          <div className="glass-dark rounded-3xl p-4 w-full max-w-md flex items-center gap-4 shadow-2xl">
            <img
              src={MEDIA.jarPrimary}
              alt="Nature's Golden Gift 250g amber glass turmeric jar"
              className="w-20 h-24 rounded-2xl object-cover shrink-0 border border-[#F2C56B]/20"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#F2C56B]">
                Everyday Essential
              </span>
              <h2 className="font-editorial text-xl text-[#F9F6F0] truncate">
                250g Everyday Jar
              </h2>
              <p className="text-xs text-[#E7D6B8]/80 mt-0.5">
                {formatINR(popularVariant.price)}{' '}
                <span className="text-[10px] opacity-70">(Demo Price)</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => addItem(flagship, popularVariant, 'one-time', 1)}
              aria-label="Quick add 250g Everyday Jar to bag"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F2C56B] text-[#231F20] text-xs font-semibold hover:bg-[#eab851] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 flex items-center justify-between text-xs text-[#E7D6B8]/70">
        <a
          href="#story"
          className="inline-flex items-center gap-2 uppercase tracking-[0.18em] hover:text-[#F2C56B] transition-colors"
        >
          <span>Scroll to Begin Journey</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
        <span className="hidden sm:inline tracking-[0.14em] uppercase">
          Botanical Apothecary • India
        </span>
      </div>
    </section>
  );
}
