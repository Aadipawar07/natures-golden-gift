import React, { useState } from 'react';
import { BookOpen, ShoppingBag, ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { JOURNAL_ARTICLES, SHOPPABLE_RECIPE } from '../../data/journal';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export function JournalRecipes() {
  const { addItem } = useCart();
  const [activeArticle, setActiveArticle] = useState(null);

  const handleAddRecipeIngredients = () => {
    const bundle = PRODUCTS.find((p) => p.id === 'ngg-ritual-bundle') || PRODUCTS[0];
    const variant = bundle.variants[0];
    addItem(bundle, variant, 'one-time', 1);
  };

  return (
    <section id="journal" className="py-24 lg:py-32 bg-[#E7D6B8]/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Golden Journal"
          title="Stories, Rituals & A Little Golden Wisdom."
          subtitle="Culinary heritage, ingredient craft, and everyday kitchen recipes—written as gentle inspiration, never medical advice."
        />

        {/* Shoppable Recipe Feature Card */}
        <div className="mt-14 rounded-[2.25rem] bg-[#262B22] text-[#F9F6F0] overflow-hidden grid lg:grid-cols-12 shadow-xl">
          <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto relative">
            <img
              src={SHOPPABLE_RECIPE.image}
              alt={SHOPPABLE_RECIPE.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark text-[10px] uppercase tracking-[0.16em] text-[#F2C56B]">
              Shoppable Recipe
            </span>
          </div>

          <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#F2C56B]">
                {SHOPPABLE_RECIPE.subtitle}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
                {SHOPPABLE_RECIPE.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#E7D6B8]/85 max-w-xl">
                {SHOPPABLE_RECIPE.description}
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {SHOPPABLE_RECIPE.ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#171B17]/70 border border-white/10 text-xs"
                  >
                    <span className="font-medium text-[#F9F6F0]">{ing.name}</span>
                    <span className="text-[#F2C56B]">{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <p className="text-xs text-[#E7D6B8]/70">
                Adds our Golden Milk Ritual Bundle (250g Turmeric Jar + Cracked Pepper Pairing) to your bag.
              </p>
              <MagneticButton onClick={handleAddRecipeIngredients} variant="gold">
                <ShoppingBag className="w-4 h-4" />
                <span>Add Ingredients to Cart</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Editorial Magazine Grid */}
        <div className="mt-10 grid md:grid-cols-3 gap-7">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group rounded-3xl bg-[#F9F6F0] border border-[#E7D6B8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#C86D1F] mb-2">
                    <span>{article.category}</span>
                    <span className="text-[#231F20]/55">{article.readTime}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-medium text-[#231F20] leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#231F20]/75 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#231F20] hover:text-[#C86D1F] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <MagneticButton href="/rituals" variant="outlineDark">
            <span>Explore All Rituals &amp; Recipes</span>
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>

      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
          className="fixed inset-0 z-50 bg-[#171B17]/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-[#F9F6F0] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E7D6B8] shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-[#C86D1F]">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h3 className="font-editorial text-3xl font-medium text-[#231F20] mt-1">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="p-2 rounded-full hover:bg-[#E7D6B8]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="mt-5 rounded-2xl w-full aspect-[16/9] object-cover"
            />
            <div className="mt-5 space-y-3 text-sm sm:text-base text-[#231F20]/85 leading-relaxed">
              {activeArticle.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
