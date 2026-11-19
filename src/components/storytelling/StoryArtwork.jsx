import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

export function StoryArtwork({
  src,
  alt,
  label,
  className = '',
  rootDetails = false,
  children,
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate overflow-hidden rounded-[2rem] border border-[#F2C56B]/25 bg-[#171B17] shadow-[0_30px_80px_-28px_rgba(35,31,32,0.42)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#171B17]/80 via-[#171B17]/10 to-[#171B17]/20"
        aria-hidden="true"
      />
      <div className="bg-editorial-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      {rootDetails && (
        <svg
          viewBox="0 0 600 400"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
          aria-hidden="true"
        >
          <path
            d="M278 105 C282 158 262 178 253 213 C244 247 249 280 230 321 M282 161 C311 185 332 196 362 199 C393 202 414 220 432 248 M260 203 C227 206 207 222 190 246 M253 251 C282 264 302 288 311 325"
            fill="none"
            stroke="#F2C56B"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="3 7"
          />
          <circle cx="278" cy="104" r="3" fill="#F2C56B" />
          <circle cx="431" cy="248" r="2.5" fill="#F2C56B" />
          <circle cx="190" cy="246" r="2.5" fill="#F2C56B" />
        </svg>
      )}
      <figcaption className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        {label && (
          <span className="glass-dark inline-flex w-fit rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#F2C56B]">
            {label}
          </span>
        )}
        {children && <div className="text-[#F9F6F0]">{children}</div>}
      </figcaption>
    </motion.figure>
  );
}
