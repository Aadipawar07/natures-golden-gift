import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { PincodeChecker } from './PincodeChecker';

export function ProductModal() {
  const { activeProduct, setActiveProduct, addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [qty, setQty] = useState(1);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (activeProduct) {
      setSelectedVariantId(activeProduct.defaultVariantId || activeProduct.variants[0].id);
      setQty(1);
      setPurchaseType('one-time');
      setActiveImageIdx(0);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const variant =
    activeProduct.variants.find((v) => v.id === selectedVariantId) ||
    activeProduct.variants[0];

  const unitPrice =
    purchaseType === 'subscribe'
      ? Math.round(variant.price * (1 - activeProduct.subscribeDiscountPercent / 100))
      : variant.price;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeProduct.name}
      className="fixed inset-0 z-50 bg-[#171B17]/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setActiveProduct(null)}
    >
      <div
        className="bg-[#F9F6F0] rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E7D6B8] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => setActiveProduct(null)}
            aria-label="Close product details"
            className="p-2 rounded-full hover:bg-[#E7D6B8]/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#E7D6B8]">
              <img
                src={activeProduct.gallery[activeImageIdx] || activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {activeProduct.gallery.length > 1 && (
              <div className="flex gap-2">
                {activeProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                      i === activeImageIdx ? 'border-[#C86D1F]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#231F20]/70">
              <Star className="w-3.5 h-3.5 fill-[#C86D1F] text-[#C86D1F]" />
              <span>
                {activeProduct.demoRating} ({activeProduct.demoReviewCount} Demo Reviews)
              </span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#231F20]">
              {activeProduct.name}
            </h3>
            <p className="text-sm text-[#231F20]/80 leading-relaxed">
              {activeProduct.longDescription}
            </p>

            <div className="flex items-baseline gap-2.5">
              <span className="font-editorial text-3xl font-semibold">{formatINR(unitPrice)}</span>
              <span className="text-xs text-[#231F20]/55">(Demo Pricing)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeProduct.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`px-3.5 py-2 rounded-full text-xs border transition-all ${
                    v.id === variant.id
                      ? 'bg-[#231F20] text-[#F9F6F0] border-[#231F20]'
                      : 'border-[#E7D6B8] hover:border-[#C86D1F]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#E7D6B8] bg-white px-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addItem(activeProduct, variant, purchaseType, qty);
                  setActiveProduct(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#C86D1F] text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#b05d17]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {qty} to Bag</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#E7D6B8] space-y-2 text-xs">
              {activeProduct.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4">
                  <span className="text-[#231F20]/60">{spec.label}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <PincodeChecker compact />
          </div>
        </div>
      </div>
    </div>
  );
}
