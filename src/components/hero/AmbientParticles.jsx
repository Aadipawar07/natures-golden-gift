import React from 'react';
import { motion } from 'framer-motion';

const PARTICLES = [
  { id: 1, left: '14%', top: '28%', size: 6, delay: 0 },
  { id: 2, left: '28%', top: '62%', size: 4, delay: 1.2 },
  { id: 3, left: '54%', top: '22%', size: 5, delay: 0.6 },
  { id: 4, left: '72%', top: '44%', size: 7, delay: 1.8 },
  { id: 5, left: '84%', top: '30%', size: 4, delay: 0.9 },
];

export function AmbientParticles({ reduced = false }) {
  if (reduced) return null;

  return PARTICLES.map((particle) => (
    <motion.span
      key={particle.id}
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full bg-[#F2C56B]/75 blur-[1px]"
      style={{
        left: particle.left,
        top: particle.top,
        width: particle.size,
        height: particle.size,
      }}
      animate={{ y: [-10, 12, -10], opacity: [0.3, 0.85, 0.3] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        delay: particle.delay,
        ease: 'easeInOut',
      }}
    />
  ));
}
