import React, { useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  const handleMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const baseStyles =
    'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#C86D1F] text-white hover:bg-[#b05d17] shadow-[0_10px_28px_-8px_rgba(200,109,31,0.55)]',
    secondary:
      'bg-transparent border border-[#E7D6B8]/60 text-[#F9F6F0] hover:bg-[#F9F6F0]/10',
    outlineDark:
      'bg-transparent border border-[#231F20]/30 text-[#231F20] hover:border-[#C86D1F] hover:text-[#C86D1F]',
    gold:
      'bg-[#F2C56B] text-[#231F20] hover:bg-[#eab851] shadow-[0_10px_28px_-8px_rgba(242,197,107,0.45)]',
  };

  const style = reduced
    ? undefined
    : { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
