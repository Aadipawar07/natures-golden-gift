import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { CROSS_SELL_PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';

const REVIEW_FILTERS = ['All', 'Cooking', 'Golden Milk / Immunity', 'Skincare'];

function RitualIllustration({ type }) {
  const iconPaths = {
    cooking: (
      <>
        <path d="M8 16h24l-3 11H11L8 16Z" />
        <path d="M6 16h28M13 31h14M15 12c-2-2 2-3 0-5m8 5c-2-2 2-3 0-5" />
        <path d="m28 8 5-4m-2 0 2 0 0 2" />
      </>
    ),
    milk: (
      <>
        <path d="M11 15h18l-2 17H13l-2-17Z" />
        <path d="M11 19h18M15 11c0-3 10-3 10 0s-10 3-10 0Z" />
        <path d="M18 7c-2-2 2-3 0-5m6 5c-2-2 2-3 0-5M31 10l3-3" />
      </>
    ),
    mask: (
      <>
        <path d="M6 19h28c0 8-6 13-14 13S6 27 6 19Z" />
        <path d="M9 19c3-4 19-4 22 0M14 13c-2-2 2-3 0-5m9 5c-2-2 2-3 0-5" />
        <circle cx="20" cy="24" r="1" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-12 w-12 text-[#C86D1F]"
    >
      {iconPaths[type]}
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-[#E7D6B8] bg-white p-5">
      <div className="flex items-center gap-1 text-[#C86D1F]" aria-label="5 out of 5 demo rating">
        {Array.from({ length: review.rating }, (_, index) => (
          <Star key={index} className="h-3 w-3 fill-current" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#231F20]/80">“{review.quote}”</p>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#E7D6B8]/70 pt-3">
        <div>
          <p className="text-xs font-semibold text-[#231F20]">{review.name}</p>
          <p className="mt-0.5 text-[10px] text-[#231F20]/55">{review.location}</p>
        </div>
        <p className="text-right text-[9px] text-[#231F20]/50">{review.date || 'Sample date'}</p>
      </div>
      <p className="mt-3 text-[9px] uppercase tracking-[0.12em] text-[#C86D1F]">
        [Demo Review] · Not verified
      </p>
    </article>
  );
}

export function ProductStorySections({ product }) {
  const { addItem } = useCart();
  const [activeReviewFilter, setActiveReviewFilter] = useState('All');
  const reviews = product.reviews || [];
  const rituals = product.usageRituals || [];

  const filteredReviews = useMemo(
    () => reviews.filter((review) => {
        if (activeReviewFilter === 'All') return true;
        if (activeReviewFilter === 'Golden Milk / Immunity') return review.category === 'Rituals';
        return review.category === activeReviewFilter;
      }),
    [activeReviewFilter, reviews]
  );

  const starCounts = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((review) => review.rating === rating).length,
      })),
    [reviews]
  );
  const demoRating = product.demoRating || 5;
  const demoReviewCount = product.demoReviewCount || reviews.length;

  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">A little, every day</p>
          <h2 className="mt-2 font-editorial text-3xl font-medium text-[#231F20] sm:text-4xl">
            Three golden rituals
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {rituals.map((ritual, index) => (
              <motion.article
                key={ritual.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="rounded-3xl border border-[#E7D6B8] bg-[#F9F6F0] p-6"
              >
                <RitualIllustration type={ritual.icon} />
                <p className="mt-4 font-editorial text-2xl font-medium text-[#231F20]">
                  {ritual.title}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C86D1F]">
                  {ritual.amount}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#231F20]/65">
                  {ritual.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#262B22] py-10 text-[#F9F6F0] sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#F2C56B]">Process & provenance</p>
            <h2 className="mt-2 font-editorial text-3xl font-medium sm:text-4xl">
              Color and aroma begin with the root.
            </h2>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-[#E7D6B8]/80 sm:text-sm">
              Cold-milled, unbleached, and single-origin are sample product descriptors pending
              batch verification. Aroma and color can vary with harvest; no lab or comparative
              purity claims are made here.
            </p>
          </div>
          <span className="rounded-full border border-[#F2C56B]/30 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#F2C56B]">
            Batch details pending
          </span>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 bg-[#F9F6F0] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">The kitchen journal</p>
              <h2 className="mt-2 font-editorial text-3xl font-medium text-[#231F20] sm:text-4xl">
                Notes from our demo customers
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#231F20]/60">
                Testimonials and ratings below are prototype content, not verified buyer reviews
                and not linked to this specific product.
              </p>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#E7D6B8] bg-white p-4">
                <span className="font-editorial text-4xl font-semibold text-[#231F20]">
                  {demoRating.toFixed(1)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center text-[#C86D1F]" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-[#231F20]/55">
                    {demoReviewCount} demo reviews · sample score for {product.name}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-[9px] text-[#231F20]/45">
                  Bars reflect the {reviews.length} displayed demo testimonials, not verified product reviews.
                </p>
                {starCounts.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-2 text-[10px] text-[#231F20]/60">
                    <span className="w-10">{rating} star</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E7D6B8]/60">
                      <div
                        className="h-full rounded-full bg-[#C86D1F]"
                        style={{
                          width: `${reviews.length ? (count / reviews.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="w-4 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2" aria-label="Filter demo reviews">
                {REVIEW_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveReviewFilter(filter)}
                    aria-pressed={activeReviewFilter === filter}
                    className={`rounded-full border px-3.5 py-2 text-[10px] transition-colors ${
                      activeReviewFilter === filter
                        ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                        : 'border-[#E7D6B8] bg-white text-[#231F20]/70 hover:border-[#C86D1F]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <p className="rounded-2xl border border-[#E7D6B8] bg-white p-5 text-xs text-[#231F20]/60">
                  No demo reviews in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E7D6B8] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">Complete the ritual</p>
          <h2 className="mt-2 font-editorial text-3xl font-medium text-[#231F20] sm:text-4xl">
            Pair it with
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CROSS_SELL_PRODUCTS.map((product) => {
              const variant = product.variants[0];
              return (
                <article
                  key={product.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#E7D6B8] bg-[#F9F6F0] p-4"
                >
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="h-20 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-editorial text-xl font-medium text-[#231F20]">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-[#231F20]/55">
                      {variant.label} · {formatINR(variant.price)} · Sample listing
                    </p>
                    <button
                      type="button"
                      onClick={() => addItem(product, variant)}
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C86D1F] hover:text-[#231F20]"
                    >
                      <ShoppingBag className="h-3 w-3" aria-hidden="true" />
                      Quick Add
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
