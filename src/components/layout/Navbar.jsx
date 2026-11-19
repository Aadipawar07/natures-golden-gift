import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, PackageCheck, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const isNonHomePage = window.location.pathname.replace(/\/+$/, '') !== '';
  const isHomePage = !isNonHomePage;
  const [scrolled, setScrolled] = useState(isNonHomePage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: 'Shop', navLabel: 'SHOP', href: '/shop' },
    { label: 'Our Story', navLabel: 'OUR STORY', href: '/our-story' },
    { label: 'Purity Promise', navLabel: 'PURITY', href: '/purity-promise' },
    { label: 'Rituals & Recipes', navLabel: 'RITUALS', href: isNonHomePage ? '/rituals#recipes' : '#rituals' },
    { label: 'Gifting & Bulk', navLabel: 'GIFTING', href: '/gifting' },
  ];
  const mobileLinks = [
    ...navLinks,
    { label: 'Track Order', href: '/track-order' },
    { label: 'Support & FAQ', href: '/faq-contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(isNonHomePage || window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNonHomePage]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {isHomePage && (
        <a
          href="/track-order"
          className="fixed inset-x-0 top-0 z-40 flex h-8 items-center justify-center gap-1 bg-[#231F20] px-2 text-center text-[8px] font-medium leading-none tracking-wide text-[#F9F6F0] transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2C56B] sm:gap-1.5 sm:px-3 sm:text-[10px]"
        >
          <span className="whitespace-nowrap">Free Express Shipping Above ₹599</span>
          <span className="text-[#F2C56B]" aria-hidden="true">•</span>
          <span className="whitespace-nowrap">Need help or want to Track Your Order?</span>
          <ArrowRight className="h-3 w-3 shrink-0 text-[#F2C56B]" aria-hidden="true" />
        </a>
      )}

      <header
        className={`fixed inset-x-0 z-40 transition-all duration-500 ${
          isHomePage ? 'top-8' : 'top-0'
        } ${
          scrolled
            ? 'glass-light py-3 shadow-[0_8px_30px_rgba(35,31,32,0.06)]'
            : 'bg-gradient-to-b from-[#171B17]/75 via-[#171B17]/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          <a
            href="/#hero"
            aria-label="Nature's Golden Gift home"
            className={`flex items-center gap-2.5 group ${
              scrolled ? 'text-[#231F20]' : 'text-[#F9F6F0]'
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-[#C86D1F] flex items-center justify-center text-white font-editorial text-lg font-semibold shadow-sm group-hover:scale-105 transition-transform">
              N
            </span>
            <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight">
              Nature&apos;s Golden Gift
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap text-[10px] xl:text-[11px] uppercase tracking-[0.14em] font-medium transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#C86D1F] hover:after:w-full after:transition-all ${
                  scrolled
                    ? 'text-[#231F20]/80 hover:text-[#C86D1F]'
                    : 'text-[#F9F6F0]/90 hover:text-[#F2C56B]'
                }`}
              >
                {link.navLabel}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/track-order"
              aria-label="Track Order"
              title="Track Order"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled
                  ? 'text-[#231F20] hover:bg-[#E7D6B8]/50'
                  : 'text-[#F9F6F0] hover:bg-white/10'
              }`}
            >
              <PackageCheck className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag with ${itemCount} items`}
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                scrolled
                  ? 'text-[#231F20] hover:bg-[#E7D6B8]/50'
                  : 'text-[#F9F6F0] hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
              <span className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[9px] font-semibold tabular-nums ${
                scrolled ? 'bg-[#C86D1F] text-white' : 'bg-[#F2C56B] text-[#231F20]'
              }`}>
                {itemCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              className={`lg:hidden p-2 rounded-full ${
                scrolled ? 'text-[#231F20]' : 'text-[#F9F6F0]'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#171B17]/95 backdrop-blur-xl text-[#F9F6F0] flex flex-col justify-between p-6 sm:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-editorial text-2xl font-semibold text-[#F2C56B]">
                Nature&apos;s Golden Gift
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close mobile menu"
                className="p-2.5 rounded-full border border-[#E7D6B8]/25 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-6 my-auto">
              {mobileLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="whitespace-nowrap font-editorial text-3xl sm:text-5xl hover:text-[#F2C56B] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#E7D6B8]/70 uppercase tracking-[0.16em]">
              <span>From Farm to Kitchen</span>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setIsCartOpen(true);
                }}
                className="text-[#F2C56B] underline underline-offset-4"
              >
                Bag ({itemCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
