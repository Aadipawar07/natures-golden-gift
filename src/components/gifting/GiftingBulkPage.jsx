import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  AlertCircle,
  BadgeInfo,
  Building2,
  CalendarDays,
  Check,
  Gift,
  Heart,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  ShoppingBag,
  Store,
  Truck,
} from 'lucide-react';
import { MEDIA } from '../../assets/media';
import {
  BULK_VOLUME_TIERS,
  GIFTING_INQUIRY_TYPES,
  GIFTING_OFFERINGS,
  GIFTING_STATUS_NOTE,
  READY_TO_SHIP_GIFTS,
} from '../../data/gifting';
import { useCart } from '../../hooks/useCart';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { apiPost } from '../../services/api';
import { formatINR } from '../../utils/format';
import { StoryArtwork } from '../storytelling/StoryArtwork';
import { SectionHeading } from '../ui/SectionHeading';

const offeringIcons = {
  gift: Gift,
  heart: Heart,
  supply: Store,
};

const fieldClassName =
  'mt-1.5 min-h-11 w-full rounded-xl border border-[#E7D6B8] bg-white/80 px-3.5 py-2.5 text-sm text-[#231F20] placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:outline-none focus:ring-2 focus:ring-[#C86D1F]/15';

function scrollToSection(event, id) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) {
    window.location.hash = id;
    return;
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function GiftBoxIllustration() {
  return (
    <svg
      viewBox="0 0 640 440"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gift-linen" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F9F6F0" />
          <stop offset="100%" stopColor="#D8C6A7" />
        </linearGradient>
        <linearGradient id="gift-glass" x1="0" x2="1">
          <stop offset="0%" stopColor="#8C3D18" />
          <stop offset="48%" stopColor="#C86D1F" />
          <stop offset="100%" stopColor="#7A351A" />
        </linearGradient>
      </defs>
      <ellipse cx="330" cy="372" rx="230" ry="28" fill="#171B17" opacity="0.35" />
      <path d="M104 207 L316 145 L534 207 L534 347 L319 407 L104 344Z" fill="url(#gift-linen)" stroke="#B8A67D" strokeWidth="3" />
      <path d="M104 207 L319 269 L534 207 L316 145Z" fill="#F9F6F0" stroke="#B8A67D" strokeWidth="3" />
      <path d="M104 207 L319 269 L319 407 L104 344Z" fill="#E8DDCB" opacity="0.92" />
      <path d="M319 269 L534 207 L534 347 L319 407Z" fill="#D8C6A7" opacity="0.88" />
      <path d="M281 258 L345 240 L345 399 L281 381Z" fill="#B95E36" />
      <path d="M106 204 L320 142 L533 204 L469 224 L320 181 L169 225Z" fill="#E6D8C1" stroke="#B8A67D" strokeWidth="3" />
      <path d="M290 168 C260 130 225 145 252 174 C271 192 291 189 319 177 C345 199 375 186 388 166 C399 142 359 132 333 166" fill="none" stroke="#B95E36" strokeWidth="12" strokeLinecap="round" />
      <path d="M320 173 L320 231" stroke="#B95E36" strokeWidth="12" strokeLinecap="round" />

      <g transform="translate(358 82)">
        <rect x="7" y="12" width="70" height="22" rx="5" fill="#59321F" />
        <path d="M13 34 H71 L67 133 Q42 148 17 133Z" fill="url(#gift-glass)" stroke="#E7D6B8" strokeWidth="3" />
        <path d="M25 51 V118" stroke="#F2C56B" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
        <rect x="21" y="78" width="43" height="36" rx="3" fill="#F9F6F0" opacity="0.88" />
        <path d="M31 94 H54" stroke="#C86D1F" strokeWidth="2" />
        <path d="M32 100 H51" stroke="#66735A" strokeWidth="1.5" />
      </g>
      <g transform="translate(435 145) scale(.8)">
        <rect x="8" y="12" width="64" height="20" rx="5" fill="#4B3324" />
        <path d="M13 32 H67 L63 112 Q40 126 17 112Z" fill="#9A552D" stroke="#E7D6B8" strokeWidth="3" />
        <circle cx="29" cy="62" r="4" fill="#231F20" />
        <circle cx="41" cy="58" r="4" fill="#231F20" />
        <circle cx="52" cy="68" r="4" fill="#231F20" />
        <rect x="22" y="82" width="36" height="20" rx="2" fill="#F9F6F0" opacity="0.85" />
      </g>
      <g transform="translate(462 283) rotate(-23)">
        <ellipse cx="19" cy="8" rx="14" ry="9" fill="#D5AC62" stroke="#8E713D" strokeWidth="2" />
        <path d="M32 8 H135" stroke="#C8A35C" strokeWidth="7" strokeLinecap="round" />
        <path d="M36 6 H129" stroke="#F9F6F0" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path d="M138 102 C152 76 176 69 196 80 M134 116 C158 106 174 109 190 125" fill="none" stroke="#66735A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="139" cy="101" r="4" fill="#F2C56B" />
      <circle cx="137" cy="116" r="3" fill="#F2C56B" />
    </svg>
  );
}

function GiftingHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#171B17] pb-16 pt-32 text-[#F9F6F0] sm:pb-20 lg:pb-24">
      <img
        src={MEDIA.heroLandscape}
        alt=""
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171B17]/95 via-[#171B17]/80 to-[#171B17]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/85 via-transparent to-[#171B17]/20" />
      <div className="bg-editorial-grid-dark absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(242,197,107,0.2),transparent_38%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F2C56B]">
            <Gift className="h-3.5 w-3.5" />
            Artisanal Gifting &amp; Culinary Supply
          </span>
          <h1 className="mt-6 max-w-3xl font-editorial text-5xl font-medium leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Share the Warmth of Pure, Single-Origin Gold.
          </h1>
          <p className="mt-6 max-w-2xl font-editorial text-xl leading-snug text-[#E7D6B8] sm:text-2xl">
            From heirloom wedding favors and festive wellness hampers to freshly milled bulk packs for conscious kitchens, cafes, and Ayurvedic wellness studios.
          </p>
          <p role="note" className="mt-4 max-w-2xl border-l-2 border-[#F2C56B]/60 pl-3 text-[10px] leading-relaxed text-[#F9F6F0]/65">
            Gifting formats and product-origin, milling, packaging, and compliance details shown here are concepts pending verification.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#inquiry-form"
              onClick={(event) => scrollToSection(event, 'inquiry-form')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_-8px_rgba(200,109,31,0.55)] transition-colors hover:bg-[#a95416] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B] sm:text-xs"
            >
              Request a Custom Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#ready-gifts"
              onClick={(event) => scrollToSection(event, 'ready-gifts')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#E7D6B8]/60 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F9F6F0] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B] sm:text-xs"
            >
              Shop Ready-to-Ship Gift Boxes <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.1 }}
          className="mx-auto w-full max-w-xl"
        >
          <StoryArtwork
            src={MEDIA.kitchenJar}
            alt="Warm apothecary scene used as the backdrop for a gift box concept illustration"
            label="Gift box concept art"
            className="aspect-[4/3] border-[#F2C56B]/30"
          >
            <GiftBoxIllustration />
          </StoryArtwork>
        </motion.div>
      </div>
    </section>
  );
}

function OfferingsSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-[#F9F6F0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Three Thoughtful Ways to Gift or Stock"
          title="Made for milestones, gatherings, and everyday kitchens."
          subtitle="Explore a starting point for your event or business; each format can be discussed through the inquiry form."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {GIFTING_OFFERINGS.map((offering, index) => {
            const Icon = offeringIcons[offering.icon];
            return (
              <motion.article
                key={offering.number}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.06 }}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#E7D6B8] bg-white/70"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={offering.image} alt={offering.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/55 via-transparent to-[#171B17]/10" aria-hidden="true" />
                  <span className="glass-dark absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#F2C56B]">
                    Planning concept · {offering.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F3ECE1] text-[#C86D1F]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-editorial text-2xl font-medium leading-tight text-[#231F20]">{offering.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#231F20]/70">
                    <strong className="font-semibold text-[#231F20]">Ideal for:</strong> {offering.idealFor}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#231F20]/75">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#66735A]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex rounded-full border border-[#C86D1F]/25 bg-[#F3ECE1] px-3 py-2 text-[9px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-[#8A5429] sm:text-[10px]">
                      {offering.badge}
                    </span>
                    <p className="mt-2 text-[9px] leading-relaxed text-[#231F20]/50">
                      MOQ and customization shown are proposed details, pending confirmation.
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div role="note" className="mt-8 flex items-start gap-3 rounded-2xl border border-[#C86D1F]/20 bg-[#F3ECE1]/70 p-4 text-xs leading-relaxed text-[#231F20]/75 sm:p-5">
          <BadgeInfo className="mt-0.5 h-4 w-4 shrink-0 text-[#C86D1F]" />
          <p>
            <strong className="text-[#231F20]">Product details to confirm:</strong> single-origin sourcing, cold-milling, UV protection for amber jars, and current FSSAI licensing are not verified for these proposed packs.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReadyGiftBoxes({ onAddGift }) {
  return (
    <section id="ready-gifts" className="scroll-mt-24 bg-[#F2EEE6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Ready-to-Ship · Preview Assortment"
          title="A little golden something, ready to give."
          subtitle="Two curated gift-box concepts for individual shoppers. Preview prices and contents are supplied for this storefront and need stock and fulfilment confirmation."
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {READY_TO_SHIP_GIFTS.map((gift, index) => (
            <motion.article
              key={gift.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="grid overflow-hidden rounded-[1.75rem] border border-[#E7D6B8] bg-[#F9F6F0] shadow-[0_16px_50px_-36px_rgba(35,31,32,0.4)] sm:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img src={gift.image} alt={gift.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/55 via-transparent to-transparent" aria-hidden="true" />
                <span className="glass-dark absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#F2C56B]">
                  Curated hamper concept
                </span>
              </div>
              <div className="flex flex-col p-5 sm:p-6 lg:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">Ready-to-ship gift</span>
                    <h3 className="mt-1 font-editorial text-3xl font-medium leading-tight text-[#231F20]">{gift.name}</h3>
                  </div>
                  <span className="shrink-0 font-editorial text-2xl font-semibold text-[#C86D1F]">{formatINR(gift.price)}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {gift.contents.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#231F20]/75">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#66735A]" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[9px] leading-relaxed text-[#231F20]/50">
                  Preview contents and price; availability and final pack details require confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => onAddGift(gift)}
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F9F6F0] transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F] sm:mt-5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add Gift Box to Cart
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VolumeTierGuide() {
  return (
    <section className="bg-[#F9F6F0] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Bulk Volume Guide · Planning Tiers"
          title="A starting point for larger gatherings and kitchens."
          subtitle="These illustrative slabs help frame an inquiry. Final discount, eligibility, and dispatch depend on confirmed quote terms."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {BULK_VOLUME_TIERS.map((tier, index) => (
            <article key={tier.volume} className={`rounded-[1.6rem] border p-5 sm:p-6 ${index === 1 ? 'border-[#C86D1F]/45 bg-[#F3ECE1]' : 'border-[#E7D6B8] bg-white/70'}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]">
                  {index === 2 ? <Building2 className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#231F20]/50">Illustrative tier</span>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C86D1F]">{tier.volume}</p>
              <h3 className="mt-2 font-editorial text-3xl font-semibold leading-tight text-[#231F20]">{tier.saving}</h3>
              <div className="mt-4 flex items-start gap-2 border-t border-[#E7D6B8] pt-4 text-xs leading-relaxed text-[#231F20]/70">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#66735A]" />
                {tier.inclusion}
              </div>
            </article>
          ))}
        </div>
        <p role="note" className="mt-4 text-[10px] leading-relaxed text-[#231F20]/50">
          Discounts, quantities, account support, and Pan-India dispatch are proposed terms and must be confirmed before being offered.
        </p>
      </div>
    </section>
  );
}

function InquiryContactPanel({ onStartInquiry }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] bg-[#262B22] p-6 text-[#F9F6F0] sm:p-7">
        <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#F2C56B]">
          <MessageCircle className="h-3.5 w-3.5" /> Gifting concierge
        </span>
        <h3 className="mt-3 font-editorial text-3xl font-medium leading-tight">Let’s make it personal.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#E7D6B8]/80">
          Share a few details and the team can review your event, quantity, and packaging needs once inquiry delivery is connected.
        </p>
        <button
          type="button"
          onClick={onStartInquiry}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#F2C56B]/45 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F2C56B] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C56B]"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Concierge
        </button>
        <p className="mt-2 text-[9px] leading-relaxed text-[#E7D6B8]/60">
          WhatsApp number is not configured; this button opens the inquiry form instead.
        </p>
      </div>

      <div className="space-y-3 rounded-[1.75rem] border border-[#E7D6B8] bg-white/75 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]"><Mail className="h-4 w-4" /></span>
          <div>
            <h4 className="text-xs font-semibold text-[#231F20]">Bulk email</h4>
            <p className="mt-1 text-xs text-[#231F20]/60">Concierge email address pending configuration.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]"><Truck className="h-4 w-4" /></span>
          <div>
            <h4 className="text-xs font-semibold text-[#231F20]">Sample dispatch</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#231F20]/60">“Within 48 hours” is a proposed timeline pending operational confirmation.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]"><MapPin className="h-4 w-4" /></span>
          <div>
            <h4 className="text-xs font-semibold text-[#231F20]">Delivery planning</h4>
            <p className="mt-1 text-xs text-[#231F20]/60">Share your destination city and target date in the form.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InquiryConfirmation({ name, reference, onReset }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-full flex-col justify-center rounded-[1.75rem] border border-[#C86D1F]/30 bg-[#F3ECE1] p-6 sm:p-9">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#66735A] text-white">
        <Check className="h-7 w-7" />
      </span>
      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">Inquiry received</p>
      <h3 className="mt-2 font-editorial text-3xl font-medium text-[#231F20] sm:text-4xl">
        Thank you{name ? `, ${name}` : ''}.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#231F20]/75">
        Your gifting request has been recorded. Reference ID: <strong className="text-[#231F20]">{reference}</strong>
      </p>
      <p className="mt-4 rounded-xl border border-[#C86D1F]/20 bg-white/65 p-4 text-xs leading-relaxed text-[#231F20]/75">
        We have saved your details for review. Automated email and WhatsApp notifications are not configured yet.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F9F6F0] transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
      >
        Start another inquiry <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function InquiryForm({ onSubmit, isSubmitting, submissionError }) {
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[1.75rem] border border-[#E7D6B8] bg-white/80 p-5 shadow-[0_20px_60px_-40px_rgba(35,31,32,0.35)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">Tell us what you’re planning</span>
          <h3 className="mt-1 font-editorial text-3xl font-medium text-[#231F20]">Request a tailored quote</h3>
        </div>
        <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#B8A67D]" aria-hidden="true" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#231F20]">
          Full Name <span className="text-[#C86D1F]" aria-hidden="true">*</span>
          <input name="fullName" type="text" autoComplete="name" required maxLength={100} className={fieldClassName} placeholder="Your name" />
        </label>
        <label className="text-xs font-medium text-[#231F20]">
          Company / Event Name <span className="font-normal text-[#231F20]/45">(optional)</span>
          <input name="company" type="text" autoComplete="organization" maxLength={120} className={fieldClassName} placeholder="Studio, company, or celebration" />
        </label>
        <label className="text-xs font-medium text-[#231F20]">
          Email Address <span className="text-[#C86D1F]" aria-hidden="true">*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClassName} placeholder="you@example.com" />
        </label>
        <label className="text-xs font-medium text-[#231F20]">
          Mobile / WhatsApp Number <span className="text-[#C86D1F]" aria-hidden="true">*</span>
          <div className="mt-1.5 flex overflow-hidden rounded-xl border border-[#E7D6B8] bg-white/80 focus-within:border-[#C86D1F] focus-within:ring-2 focus-within:ring-[#C86D1F]/15">
            <span className="grid place-items-center border-r border-[#E7D6B8] px-3 text-xs text-[#231F20]/60">+91</span>
            <input
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              minLength={10}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
              className="min-h-11 min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-[#231F20] placeholder:text-[#231F20]/40 focus:outline-none"
              placeholder="10-digit number"
            />
          </div>
        </label>
        <label className="text-xs font-medium text-[#231F20] sm:col-span-2">
          Inquiry Type <span className="text-[#C86D1F]" aria-hidden="true">*</span>
          <select name="inquiryType" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>Select the closest fit</option>
            {GIFTING_INQUIRY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-[#231F20] sm:col-span-2">
          Estimated Quantity / Weight <span className="font-normal text-[#231F20]/45">(optional)</span>
          <input name="quantity" type="text" maxLength={100} className={fieldClassName} placeholder="e.g., 25 gift boxes or 5 kg bulk" />
        </label>
        <label className="text-xs font-medium text-[#231F20]">
          Delivery City <span className="font-normal text-[#231F20]/45">(optional)</span>
          <input name="city" type="text" autoComplete="address-level2" maxLength={100} className={fieldClassName} placeholder="City" />
        </label>
        <label className="text-xs font-medium text-[#231F20]">
          Target Date <span className="font-normal text-[#231F20]/45">(optional)</span>
          <input name="targetDate" type="date" min={minDate} className={fieldClassName} />
        </label>
        <label className="text-xs font-medium text-[#231F20] sm:col-span-2">
          Customization Notes <span className="font-normal text-[#231F20]/45">(optional)</span>
          <textarea name="notes" rows={4} maxLength={1200} className={`${fieldClassName} resize-y`} placeholder="Branding, monogram, packaging, or other requests" />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_-8px_rgba(200,109,31,0.45)] transition-colors hover:bg-[#a95416] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20]"
      >
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        {isSubmitting ? 'Sending inquiry…' : 'Send inquiry'}
      </button>
      {submissionError && (
        <p role="alert" className="flex items-start gap-2 text-xs leading-relaxed text-[#C86D1F]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {submissionError}
        </p>
      )}
    </form>
  );
}

function InquirySection() {
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('fullName') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const inquiryType = String(formData.get('inquiryType') || '').trim();
    const quantity = String(formData.get('quantity') || '').trim();
    const city = String(formData.get('city') || '').trim();
    const notes = String(formData.get('notes') || '').trim();
    const details = [
      `Gifting/bulk inquiry: ${inquiryType}.`,
      quantity ? `Estimated quantity: ${quantity}.` : '',
      city ? `Delivery city: ${city}.` : '',
      notes,
    ].filter(Boolean).join('\n');

    setIsSubmitting(true);
    setSubmissionError('');
    try {
      const result = await apiPost('inquiries', {
        kind: 'GIFTING_BULK',
        name,
        email: String(formData.get('email') || '').trim(),
        phone: `+91${String(formData.get('mobile') || '').trim()}`,
        company,
        inquiryType,
        quantity,
        city,
        targetDate: String(formData.get('targetDate') || ''),
        message: details,
      });
      setSubmission({ name, reference: result.reference });
    } catch (error) {
      setSubmissionError(error.message || 'We could not send your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startInquiry = () => {
    const form = document.getElementById('gifting-inquiry-form');
    form?.querySelector('input[name="fullName"]')?.focus({ preventScroll: true });
    document.getElementById('inquiry-form')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section id="inquiry-form" className="scroll-mt-24 bg-[#F2EEE6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gifting & Bulk Inquiry"
          title="Tell us what you have in mind."
          subtitle="Share a few planning details and our team can review your request. Inquiries are recorded securely."
        />
        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <InquiryContactPanel onStartInquiry={startInquiry} />
          {submission ? (
            <InquiryConfirmation
              name={submission.name}
              reference={submission.reference}
              onReset={() => setSubmission(null)}
            />
          ) : (
            <div id="gifting-inquiry-form">
              <InquiryForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submissionError={submissionError}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function GiftingBulkPage() {
  const { addItem } = useCart();

  const handleAddGift = (gift) => {
    addItem(gift, gift.variant, 'one-time', 1);
  };

  return (
    <div className="flex-1 bg-[#F9F6F0]">
      <GiftingHero />
      <OfferingsSection />
      <ReadyGiftBoxes onAddGift={handleAddGift} />
      <VolumeTierGuide />
      <InquirySection />
    </div>
  );
}
