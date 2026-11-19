import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';
import { SectionHeading } from '../ui/SectionHeading';

const CATEGORIES = ['All', 'Cooking', 'Rituals', 'Skincare'];

export function CustomerLove() {
  const [filter, setFilter] = useState('All');

  const visibleReviews =
    filter === 'All' ? REVIEWS : REVIEWS.filter((r) => r.category === filter);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Community Notes (Demo)"
            title="Loved by Home Cooks & Wellness Seekers."
            subtitle="Sample customer cards structured for future verified photo and video reviews."
          />

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reviews by use case">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition-all ${
                  filter === cat
                    ? 'bg-[#231F20] text-[#F9F6F0]'
                    : 'bg-[#E7D6B8]/45 text-[#231F20]/75 hover:bg-[#E7D6B8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl bg-white border border-[#E7D6B8] overflow-hidden flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={review.image}
                    alt={`${review.category} ritual by ${review.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-light text-[10px] uppercase tracking-[0.14em] font-semibold text-[#231F20]">
                    Demo Review
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#231F20]/80 text-[10px] uppercase tracking-[0.14em] text-[#F9F6F0]">
                    {review.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-0.5 text-[#C86D1F] mb-3">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#231F20]/85 leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#E7D6B8]/50 text-xs">
                <p className="font-semibold text-[#231F20]">{review.name}</p>
                <p className="text-[#231F20]/60 mt-0.5">
                  {review.location} • {review.packPurchased}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
