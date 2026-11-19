import React from 'react';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] mb-4 ${
            dark ? 'text-[#F2C56B]' : 'text-[#C86D1F]'
          }`}
        >
          <span className="h-[1px] w-6 bg-current opacity-60" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-[-0.02em] ${
          dark ? 'text-[#F9F6F0]' : 'text-[#231F20]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-[#E7D6B8]/85' : 'text-[#231F20]/75'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
