import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CROSS_SELL_PRODUCTS } from '../../data/products';
import { formatINR } from '../../utils/format';
import { PincodeChecker } from '../products/PincodeChecker';
import { CouponField } from './CouponField';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    addItem,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    appliedCoupon,
    freeShippingThreshold,
    progress,
    amountRemaining,
    estimatedShipping,
  } = useCart();
  const pepper = CROSS_SELL_PRODUCTS.find((product) => product.id === 'sample-crushed-black-pepper');
  const pepperInCart = items.some((item) => item.productId === pepper.id);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#171B17]/60 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 flex h-[100dvh] w-full max-w-md flex-col border-l border-[#E7D6B8] bg-[#F9F6F0] text-[#231F20] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[#E7D6B8] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#C86D1F]" />
                <h2 className="font-editorial text-2xl font-medium">Your Golden Bag</h2>
                <span className="rounded-full bg-[#E7D6B8]/60 px-2 py-0.5 text-xs">
                  {items.reduce((count, item) => count + item.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close shopping bag"
                className="rounded-full p-2 transition-colors hover:bg-[#E7D6B8]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="border-b border-[#E7D6B8] bg-[#E7D6B8]/40 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Truck className="h-4 w-4 shrink-0 text-[#C86D1F]" />
                {amountRemaining > 0 ? (
                  <span>
                    Add <strong>{formatINR(amountRemaining)}</strong> more to unlock FREE Express
                    Shipping
                  </span>
                ) : (
                  <span className="font-semibold text-[#66735A]">
                    You&apos;ve unlocked FREE Express Shipping!
                  </span>
                )}
              </div>
              <div
                role="progressbar"
                aria-label="Free shipping progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E7D6B8]"
              >
                <div
                  className="h-full bg-[#C86D1F] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-right text-[10px] text-[#231F20]/60">
                Free above {formatINR(freeShippingThreshold)}
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
              {items.length === 0 ? (
                <div className="space-y-4 py-16 text-center">
                  <ShoppingBag className="mx-auto h-10 w-10 text-[#B8A67D]" />
                  <p className="font-editorial text-2xl">Your bag is waiting</p>
                  <p className="mx-auto max-w-xs text-sm text-[#231F20]/65">
                    Explore the collection and find a golden ritual for your kitchen.
                  </p>
                  <a
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#231F20] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#F9F6F0] transition-colors hover:bg-[#C86D1F]"
                  >
                    Explore Pure Haldi <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                items.map((item) => (
                  <article
                    key={item.key}
                    className="flex gap-4 rounded-2xl border border-[#E7D6B8] bg-white p-3.5"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-24 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-editorial text-lg font-medium leading-snug">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="p-1 text-[#231F20]/45 hover:text-[#C86D1F]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="mt-1 inline-block rounded-full bg-[#E7D6B8]/50 px-2.5 py-1 text-[11px] text-[#231F20]/75">
                          {item.variantLabel}
                        </span>
                        {item.purchaseType === 'subscribe' && (
                          <p className="mt-1 text-[11px] text-[#66735A]">
                            Subscribe &amp; Save
                            {item.subscriptionDiscountPercent
                              ? ` ${item.subscriptionDiscountPercent}%`
                              : ''}
                            {item.subscriptionFrequency
                              ? ` · every ${item.subscriptionFrequency} days`
                              : ''}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#E7D6B8] bg-[#F9F6F0]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="p-1.5 hover:text-[#C86D1F]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="p-1.5 hover:text-[#C86D1F]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatINR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {items.length > 0 && (
                <>
                  {!pepperInCart && (
                    <section className="rounded-2xl border border-[#B8A67D]/60 bg-[#E7D6B8]/30 p-4">
                      <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C86D1F]">
                        <Tag className="h-3.5 w-3.5" />
                        Complete Your Ritual
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={pepper.image}
                          alt=""
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-editorial text-base font-medium leading-tight">
                            {pepper.name}
                          </h3>
                          <p className="mt-1 text-[11px] text-[#231F20]/65">
                            A peppery pairing for golden milk.
                          </p>
                          <p className="mt-1 text-xs font-semibold">
                            {formatINR(pepper.variants[0].price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem(pepper, pepper.variants[0])}
                          className="rounded-full border border-[#C86D1F] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#C86D1F] transition-colors hover:bg-[#C86D1F] hover:text-white"
                        >
                          Add
                        </button>
                      </div>
                    </section>
                  )}
                  <PincodeChecker compact />
                </>
              )}
            </div>

            {items.length > 0 && (
              <footer className="space-y-3 border-t border-[#E7D6B8] bg-white p-5 sm:p-6">
                <CouponField compact />
                <div className="space-y-1.5 text-sm">
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
                    <span>Express shipping</span>
                    <span>{estimatedShipping === 0 ? 'FREE' : formatINR(estimatedShipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E7D6B8] pt-2 text-base font-semibold">
                    <span>Estimated total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                  <p className="text-right text-[10px] text-[#231F20]/50">
                    Demo pricing; final tax and delivery terms to be confirmed.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#231F20]"
                  >
                    Proceed to Express Checkout <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full rounded-full border border-[#E7D6B8] py-2.5 text-xs uppercase tracking-[0.14em] text-[#231F20]/80 hover:border-[#231F20]"
                  >
                    Continue Shopping
                  </button>
                </div>
                <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-[#66735A]">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  Storefront preview · product and policy details pending confirmation
                </p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
