import React from 'react';
import { Check, CircleHelp } from 'lucide-react';
import { motion } from 'framer-motion';
import { VALUE_COMPARISON } from '../../data/ourStory';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { SectionHeading } from '../ui/SectionHeading';

function ComparisonColumn({ title, description, field, emphasized = false }) {
  return (
    <div
      className={`rounded-[2rem] border p-5 sm:p-7 ${
        emphasized
          ? 'border-[#C86D1F]/30 bg-[#231F20] text-[#F9F6F0]'
          : 'border-[#E7D6B8] bg-white text-[#231F20]'
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.17em] ${
          emphasized ? 'text-[#F2C56B]' : 'text-[#C86D1F]'
        }`}
      >
        {emphasized ? 'Our intended standard · pending verification' : 'General category context'}
      </p>
      <h3 className="mt-2 font-editorial text-3xl font-medium">{title}</h3>
      <p
        className={`mt-2 min-h-10 text-xs leading-relaxed ${
          emphasized ? 'text-[#E7D6B8]/75' : 'text-[#231F20]/60'
        }`}
      >
        {description}
      </p>

      <dl className="mt-5 divide-y divide-[#E7D6B8]/20">
        {VALUE_COMPARISON.map((row) => (
          <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[115px_1fr] sm:gap-3">
            <dt
              className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${
                emphasized ? 'text-[#F2C56B]' : 'text-[#C86D1F]'
              }`}
            >
              {row.label}
            </dt>
            <dd
              className={`flex items-start gap-2 text-xs leading-relaxed ${
                emphasized ? 'text-[#F9F6F0]/85' : 'text-[#231F20]/70'
              }`}
            >
              {emphasized ? (
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F2C56B]" />
              ) : (
                <CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B8A67D]" />
              )}
              {row[field]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ValueComparison() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-[#F9F6F0] py-20 bg-editorial-grid sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="04 / A MORE TRANSPARENT VALUE"
          title="Why Our Haldi Costs More*"
          subtitle="A premium should be supported by traceable choices, not slogans. Our cost structure and sourcing relationships are not yet verified; this is a framework for the details we intend to publish."
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          <ComparisonColumn
            title="Standard Commercial Haldi"
            description="Practices differ across brands, suppliers, and products; these are not universal claims."
            field="standard"
          />
          <ComparisonColumn
            title="Our Small-Batch Haldi"
            description="The intended approach is described below. Each claim needs evidence before it is represented as a product fact."
            field="our"
            emphasized
          />
        </motion.div>

        <p className="mt-5 text-[10px] leading-relaxed text-[#231F20]/55">
          *Farm relationships, process records, final formulation, and current product cost inputs remain pending confirmation.
        </p>
      </div>
    </section>
  );
}
