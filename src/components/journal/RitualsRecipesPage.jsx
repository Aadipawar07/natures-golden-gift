import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Leaf,
  Mail,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { MEDIA } from '../../assets/media';
import {
  ABSORPTION_SPOTLIGHT,
  RECIPES,
  RECIPE_CATEGORIES,
} from '../../data/recipesData';
import { useCart } from '../../hooks/useCart';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { formatINR } from '../../utils/format';
import { COLLECTION_PRODUCTS, CROSS_SELL_PRODUCTS } from '../../data/products';
import { MagneticButton } from '../ui/MagneticButton';
import { SectionHeading } from '../ui/SectionHeading';
import { StoryArtwork } from '../storytelling/StoryArtwork';

const HALDI_PRODUCT = COLLECTION_PRODUCTS.find(
  (product) => product.id === 'collection-heirloom-powder'
);
const HALDI_VARIANT = HALDI_PRODUCT?.variants.find((variant) => variant.id === '250g');
const PEPPER_PRODUCT = CROSS_SELL_PRODUCTS.find(
  (product) => product.id === 'sample-crushed-black-pepper'
);
const PEPPER_VARIANT = PEPPER_PRODUCT?.variants[0];

if (!HALDI_PRODUCT || !HALDI_VARIANT || !PEPPER_PRODUCT || !PEPPER_VARIANT) {
  throw new Error('Ritual recipe products are missing their required cart variants.');
}

function JournalHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative flex min-h-[68vh] overflow-hidden bg-[#171B17] pb-16 pt-32 text-[#F9F6F0] sm:min-h-[74vh] sm:pb-20">
      <img
        src={MEDIA.heroLandscape}
        alt=""
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171B17]/90 via-[#171B17]/60 to-[#171B17]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/75 via-transparent to-[#171B17]/25" />
      <div className="bg-editorial-grid-dark absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgba(242,197,107,0.2),transparent_38%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-5 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.19em] text-[#F2C56B]">
            <BookOpen className="h-3.5 w-3.5" />
            The Golden Journal · Daily Rituals &amp; Recipes
          </span>
          <h1 className="mt-6 font-editorial text-5xl font-medium leading-[0.97] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Ancient Kitchen Wisdom,
            <br />
            <span className="italic text-[#F2C56B]">Crafted for Everyday Rituals.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-editorial text-xl leading-snug text-[#E7D6B8] sm:text-2xl">
            Simple, nourishing ways to bring haldi into your morning cup, evening table, and weekly skincare routine.
          </p>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#F9F6F0]/65">
            Recipes are for culinary inspiration, not medical advice. DIY skincare is cosmetic use only; patch-test first. Origin and processing descriptors depend on confirmed product and batch details.
          </p>
          <div className="mt-8">
            <MagneticButton href="#recipes" variant="gold">
              <span>Find Your Ritual</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IngredientIllustration({ type }) {
  if (type === 'haldi') {
    return (
      <svg viewBox="0 0 120 90" className="h-16 w-24 text-[#C86D1F]" aria-hidden="true">
        <path d="M56 59 C42 52 38 40 44 31 C49 23 62 25 65 34 C74 27 87 34 85 43 C83 53 73 58 56 59Z" fill="#D98A32" stroke="currentColor" strokeWidth="2" />
        <path d="M56 58 C54 68 45 72 39 68 M62 57 C66 66 75 69 82 64 M50 38 C54 35 58 36 61 39 M70 43 C74 40 79 41 82 44" fill="none" stroke="#F2C56B" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 23 C51 16 53 11 58 8 M68 25 C68 17 73 13 78 12" fill="none" stroke="#66735A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'pepper') {
    return (
      <svg viewBox="0 0 120 90" className="h-16 w-24 text-[#66735A]" aria-hidden="true">
        <path d="M34 59 C40 38 56 25 78 24 C73 45 59 59 34 59Z" fill="#B8A67D" stroke="currentColor" strokeWidth="2" />
        <path d="M35 59 C49 50 61 40 76 27" fill="none" stroke="#F9F6F0" strokeWidth="2" />
        <g fill="#231F20">
          <circle cx="41" cy="33" r="6" /><circle cx="58" cy="25" r="5" />
          <circle cx="75" cy="35" r="6" /><circle cx="51" cy="49" r="5" />
          <circle cx="71" cy="55" r="5" /><circle cx="88" cy="45" r="4" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 90" className="h-16 w-24 text-[#C89A57]" aria-hidden="true">
      <path d="M60 12 C54 24 34 42 34 57 A26 22 0 0 0 86 57 C86 42 66 24 60 12Z" fill="#F2C56B" fillOpacity="0.62" stroke="currentColor" strokeWidth="2.5" />
      <path d="M47 61 C51 69 59 72 67 69" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 45 C63 39 69 36 75 38" fill="none" stroke="#C86D1F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AbsorptionSpotlight({ onAddDuo }) {
  return (
    <section className="bg-[#F9F6F0] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#E7D6B8] bg-[#F3ECE1] shadow-[0_24px_70px_-45px_rgba(35,31,32,0.35)]">
        <div className="grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-12">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C86D1F]">
              <Sparkles className="h-3.5 w-3.5" /> Ingredient spotlight
            </span>
            <h2 className="mt-4 font-editorial text-4xl font-medium leading-[1.03] text-[#231F20] sm:text-5xl">
              {ABSORPTION_SPOTLIGHT.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#231F20]/75 sm:text-base">
              {ABSORPTION_SPOTLIGHT.intro}
            </p>
            <p className="mt-3 border-l-2 border-[#C86D1F]/60 pl-3 text-xs leading-relaxed text-[#231F20]/60">
              Pair these ingredients for flavour and tradition—not as a promised absorption boost, treatment, or substitute for professional advice.
            </p>
            <button
              type="button"
              onClick={onAddDuo}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a95416] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20] sm:text-xs"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop the Golden Duo (Haldi + Crushed Black Pepper)
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="relative rounded-[1.6rem] border border-[#C89A57]/25 bg-[#F9F6F0]/80 p-4 sm:p-6">
            <div className="absolute left-[16%] right-[16%] top-[4.25rem] hidden h-px bg-[#C89A57]/60 sm:block" aria-hidden="true" />
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-2">
              {ABSORPTION_SPOTLIGHT.ingredients.map((ingredient, index) => (
                <React.Fragment key={ingredient.name}>
                  <div className="relative flex flex-col items-center rounded-2xl bg-white/70 px-4 py-4 text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full border border-[#E7D6B8] bg-[#F3ECE1]">
                      <IngredientIllustration type={ingredient.icon} />
                    </span>
                    <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">
                      {index === 0 ? '01' : index === 1 ? '02' : '03'} / Ritual ingredient
                    </span>
                    <h3 className="mt-1 font-editorial text-2xl text-[#231F20]">{ingredient.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#231F20]/65">{ingredient.detail}</p>
                  </div>
                  {index < ABSORPTION_SPOTLIGHT.ingredients.length - 1 && (
                    <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#C86D1F] font-editorial text-xl text-white sm:hidden" aria-hidden="true">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#231F20]/50">
              <Leaf className="h-3.5 w-3.5 text-[#66735A]" />
              A flavour pairing, not a medical promise
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecipeCard({ recipe, onRead, onQuickAdd }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: 10 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#E7D6B8] bg-[#F9F6F0] shadow-[0_12px_42px_-32px_rgba(35,31,32,0.4)] transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(35,31,32,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E7D6B8]">
        <img
          src={recipe.image}
          alt={recipe.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/55 via-transparent to-[#171B17]/10" aria-hidden="true" />
        <div className="bg-editorial-grid-dark absolute inset-0 opacity-20" aria-hidden="true" />
        <span className="glass-dark absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.13em] text-[#F2C56B]">
          {recipe.categoryLabel}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#F9F6F0]/90 px-3 py-1.5 text-[10px] font-medium text-[#231F20]">
          <Clock3 className="h-3.5 w-3.5 text-[#C86D1F]" /> {recipe.time}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#231F20]/55">
          <span>{recipe.difficulty}</span>
          <span className="h-1 w-1 rounded-full bg-[#C86D1F]" aria-hidden="true" />
          <span>{recipe.servings}</span>
        </div>
        <h3 className="mt-3 font-editorial text-2xl font-medium leading-snug text-[#231F20] sm:text-[1.7rem]">
          {recipe.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#231F20]/70">
          {recipe.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7D6B8] pt-4">
          <button
            type="button"
            onClick={() => onRead(recipe)}
            className="inline-flex items-center gap-1.5 rounded-full py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#231F20] transition-colors hover:text-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
          >
            Read Full Recipe <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onQuickAdd}
            aria-label={`Quick add haldi for ${recipe.title}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C86D1F]/40 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#C86D1F] transition-colors hover:bg-[#C86D1F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Quick Add Haldi
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function RecipeReader({ recipe, onClose, onAddHaldi }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  const toggleIngredient = (index) => {
    setChecked((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex justify-end bg-[#171B17]/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`recipe-title-${recipe.id}`}
        initial={reduced ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={reduced ? undefined : { x: '100%' }}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-[#F9F6F0] shadow-2xl"
      >
        <div className="absolute right-4 top-4 z-10">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close recipe"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#171B17]/75 text-white transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative aspect-[16/8] min-h-52 overflow-hidden bg-[#171B17]">
            <img src={recipe.image} alt={recipe.imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/80 via-[#171B17]/10 to-[#171B17]/10" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 right-5 text-[#F9F6F0] sm:bottom-7 sm:left-8 sm:right-8">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F2C56B]">
                {recipe.categoryLabel} · {recipe.time} · {recipe.difficulty}
              </span>
              <h2 id={`recipe-title-${recipe.id}`} className="mt-2 max-w-xl font-editorial text-3xl font-medium leading-tight sm:text-4xl">
                {recipe.title}
              </h2>
            </div>
          </div>

          <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E7D6B8] bg-white/65 px-3.5 py-2">
                <Clock3 className="h-4 w-4 text-[#C86D1F]" /> {recipe.time}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E7D6B8] bg-white/65 px-3.5 py-2">
                <Utensils className="h-4 w-4 text-[#C86D1F]" /> Makes {recipe.servings}
              </span>
            </div>

            <section className="rounded-2xl border border-[#E7D6B8] bg-[#F3ECE1] p-5">
              <h3 className="font-editorial text-2xl font-medium text-[#231F20]">Why It Works</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#231F20]/75">{recipe.whyItWorks}</p>
            </section>

            <section>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">Before you begin</span>
                  <h3 className="mt-1 font-editorial text-3xl font-medium text-[#231F20]">Ingredients</h3>
                </div>
                <span className="text-[10px] text-[#231F20]/50">Tick what you have</span>
              </div>
              <ul className="mt-4 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={`${ingredient.name}-${index}`}>
                    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-[#C86D1F] ${
                      checked[index] ? 'border-[#C86D1F]/35 bg-[#F3ECE1]/70' : 'border-[#E7D6B8] bg-white/65 hover:bg-white'
                    }`}>
                      <input
                        type="checkbox"
                        checked={Boolean(checked[index])}
                        onChange={() => toggleIngredient(index)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#C86D1F]"
                      />
                      <span className={`flex-1 text-sm leading-relaxed ${checked[index] ? 'text-[#231F20]/50 line-through' : 'text-[#231F20]'}`}>
                        {ingredient.name}
                      </span>
                      <span className="text-xs font-medium text-[#C86D1F]">{ingredient.amount}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">At the stove</span>
              <h3 className="mt-1 font-editorial text-3xl font-medium text-[#231F20]">Method</h3>
              <ol className="mt-4 space-y-4">
                {recipe.steps.map((instruction, index) => (
                  <li key={instruction} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C86D1F] font-editorial text-lg text-white">{index + 1}</span>
                    <p className="pt-1 text-sm leading-relaxed text-[#231F20]/80">{instruction}</p>
                  </li>
                ))}
              </ol>
              {recipe.safetyNote && (
                <p role="note" className="mt-5 rounded-xl border border-[#C86D1F]/20 bg-[#F3ECE1] p-4 text-xs leading-relaxed text-[#231F20]/75">
                  <strong className="text-[#231F20]">A gentle safety note:</strong> {recipe.safetyNote}
                </p>
              )}
            </section>

            <section className="rounded-[1.5rem] border border-[#E7D6B8] bg-white/75 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C86D1F]">
                <ShoppingBag className="h-3.5 w-3.5" /> Complete the ritual
              </div>
              <div className="mt-4 flex items-center gap-4">
                <img src={HALDI_PRODUCT.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-editorial text-xl font-medium text-[#231F20]">{HALDI_PRODUCT.name}</h3>
                  <p className="mt-1 text-xs text-[#231F20]/60">{HALDI_VARIANT.label}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onAddHaldi}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a95416] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart — {formatINR(HALDI_VARIANT.price)}
              </button>
            </section>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function WeeklyNewsletter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <section className="bg-[#262B22] px-5 py-14 text-[#F9F6F0] sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2C56B]">
            <Mail className="h-3.5 w-3.5" /> The Sunday Ritual Letter
          </span>
          <h2 className="mt-3 max-w-2xl font-editorial text-3xl font-medium leading-tight sm:text-4xl">
            Get one seasonal haldi recipe and Ayurvedic kitchen tip every Sunday.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="ritual-newsletter-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="ritual-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setJoined(false);
              }}
              placeholder="you@example.com"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 focus:border-[#F2C56B] focus:outline-none focus:ring-2 focus:ring-[#F2C56B]/30"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F2C56B] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#231F20] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B]"
            >
              {joined ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              {joined ? 'You’re on the list' : 'Join the Journal'}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-[#E7D6B8]/60">
            Newsletter sign-up is a local preview; your email is not sent or stored.
          </p>
          {joined && (
            <p role="status" aria-live="polite" className="mt-2 text-xs text-[#F2C56B]">
              Thanks for joining the Sunday ritual preview.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export function RitualsRecipesPage() {
  const { addItem } = useCart();
  const reduced = usePrefersReducedMotion();
  const [category, setCategory] = useState('all');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const closeRecipe = useCallback(() => setActiveRecipe(null), []);

  const filteredRecipes = category === 'all'
    ? RECIPES
    : RECIPES.filter((recipe) => recipe.category === category);

  const addHaldi = () => addItem(HALDI_PRODUCT, HALDI_VARIANT, 'one-time', 1);
  const addDuo = () => {
    addItem(HALDI_PRODUCT, HALDI_VARIANT, 'one-time', 1);
    addItem(PEPPER_PRODUCT, PEPPER_VARIANT, 'one-time', 1);
  };
  const addHaldiFromReader = () => {
    addHaldi();
    closeRecipe();
  };

  return (
    <div className="flex-1 bg-[#F9F6F0]">
      <JournalHero />
      <AbsorptionSpotlight onAddDuo={addDuo} />

      <section id="recipes" className="scroll-mt-24 bg-[#F2EEE6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="A Little Golden Wisdom"
            title="A ritual for every part of your day."
            subtitle="Choose a recipe, gather what you have, and bring haldi to the table in a way that feels like your own."
          />

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter recipes by category">
            {RECIPE_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F] sm:text-xs ${
                  category === item.id
                    ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                    : 'border-[#C89A57]/40 bg-[#F9F6F0]/75 text-[#231F20]/70 hover:border-[#C86D1F] hover:text-[#C86D1F]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">{filteredRecipes.length} recipes shown</p>
          <motion.div layout={!reduced} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onRead={setActiveRecipe}
                  onQuickAdd={addHaldi}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <WeeklyNewsletter />

      <AnimatePresence>
        {activeRecipe && (
          <RecipeReader
            key={activeRecipe.id}
            recipe={activeRecipe}
            onClose={closeRecipe}
            onAddHaldi={addHaldiFromReader}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
