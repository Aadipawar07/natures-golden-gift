import React, { useEffect, useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export function CouponField({ compact = false }) {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState(appliedCoupon);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCode(appliedCoupon);
  }, [appliedCoupon]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const applied = applyCoupon(code);
    setMessage(applied ? 'PURE10 applied — 10% off items.' : 'That code is not available.');
  };

  const content = (
    <div className={compact ? 'pt-3' : 'rounded-2xl border border-[#E7D6B8] bg-white p-4'}>
      {appliedCoupon ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-[#66735A]">
            <Tag className="h-4 w-4" />
            <span><strong>{appliedCoupon}</strong> applied</span>
          </span>
          <button
            type="button"
            onClick={() => {
              removeCoupon();
              setMessage('');
            }}
            className="inline-flex items-center gap-1 text-xs text-[#231F20]/65 hover:text-[#C86D1F]"
          >
            Remove <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor={compact ? 'cart-coupon-code' : 'checkout-coupon-code'} className="sr-only">
            Coupon code
          </label>
          <input
            id={compact ? 'cart-coupon-code' : 'checkout-coupon-code'}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter coupon code"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-xl border border-[#E7D6B8] bg-[#F9F6F0] px-3 py-2.5 text-sm outline-none focus:border-[#C86D1F]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#231F20] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#C86D1F]"
          >
            Apply
          </button>
        </form>
      )}
      <p aria-live="polite" className="mt-2 min-h-4 text-xs text-[#66735A]">
        {message}
      </p>
    </div>
  );

  if (!compact) {
    return (
      <div>
        <h3 className="mb-2 text-sm font-semibold">Coupon code</h3>
        {content}
      </div>
    );
  }

  return (
    <details className="border-t border-[#E7D6B8] pt-3">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium">
        <Tag className="h-4 w-4 text-[#C86D1F]" />
        {appliedCoupon ? `Coupon applied: ${appliedCoupon}` : 'Apply Coupon'}
      </summary>
      {content}
    </details>
  );
}
