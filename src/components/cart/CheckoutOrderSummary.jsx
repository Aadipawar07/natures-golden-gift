import React from 'react';
import { BadgeCheck, LockKeyhole, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { CouponField } from './CouponField';

function OrderItems({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={item.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#231F20] px-1 text-[10px] text-white">
              {item.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-editorial text-base font-medium">{item.name}</p>
            <p className="text-[11px] text-[#231F20]/60">
              {item.variantLabel}
              {item.purchaseType === 'subscribe' && ' · Subscribe & Save'}
            </p>
          </div>
          <span className="text-sm font-medium">
            {formatINR(item.unitPrice * item.quantity)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CheckoutOrderSummary({ isProcessing = false, isPending = false }) {
  const {
    items,
    subtotal,
    discount,
    appliedCoupon,
    estimatedShipping,
    total,
  } = useCart();

  return (
    <aside className="order-1 lg:order-2">
      <div className="rounded-3xl border border-[#E7D6B8] bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-medium">Order summary</h2>
          <span className="text-xs text-[#231F20]/60">{items.length} item types</span>
        </div>

        <details className="mb-4 border-b border-[#E7D6B8] pb-4 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
            <span>Show items</span>
            <span>{formatINR(subtotal)}</span>
          </summary>
          <div className="pt-4">
            <OrderItems items={items} />
          </div>
        </details>
        <div className="mb-5 hidden border-b border-[#E7D6B8] pb-5 lg:block">
          <OrderItems items={items} />
        </div>

        <CouponField />

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between text-[#231F20]/75">
            <span>Item subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[#66735A]">
              <span>Discount ({appliedCoupon})</span>
              <span>−{formatINR(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#231F20]/75">
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-[#C86D1F]" />
              Express shipping
            </span>
            <span>{estimatedShipping === 0 ? 'FREE' : formatINR(estimatedShipping)}</span>
          </div>
          <div className="flex justify-between border-t border-[#E7D6B8] pt-3 text-base font-semibold">
            <span>Estimated total</span>
            <span>{formatINR(total)}</span>
          </div>
          <p className="text-right text-[10px] leading-relaxed text-[#231F20]/50">
            Demo pricing. Tax inclusion and final delivery terms require confirmation.
          </p>
        </div>

        <button
          type="submit"
          form="express-checkout-form"
          disabled={isProcessing || isPending || items.length === 0}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#231F20] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Connecting securely…
            </>
          ) : isPending ? (
            'Check payment status below'
          ) : (
            `Place Order — ${formatINR(total)}`
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-[#231F20]/55">
          <LockKeyhole className="h-3.5 w-3.5 shrink-0" />
          Prepaid payments are securely processed by Cashfree.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2 border-t border-[#E7D6B8] pt-4 text-[10px] leading-snug text-[#231F20]/60 sm:grid-cols-3">
          <p className="flex items-start gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#66735A]" />
            Purity terms pending confirmation
          </p>
          <p className="flex items-start gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#66735A]" />
            FSSAI credentials pending verification
          </p>
          <p className="flex items-start gap-1.5">
            <Truck className="h-3.5 w-3.5 shrink-0 text-[#66735A]" />
            Replacement policy pending confirmation
          </p>
        </div>
      </div>
    </aside>
  );
}
