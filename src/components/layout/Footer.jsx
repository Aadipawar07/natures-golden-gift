import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SUPPORT_EMAIL } from '../../data/support';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#171B17] text-[#E7D6B8] border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="md:col-span-4 space-y-4">
            <span className="font-editorial text-3xl text-[#F9F6F0] font-medium block">
              Nature&apos;s Golden Gift
            </span>
            <p className="text-sm text-[#E7D6B8]/75 leading-relaxed max-w-sm">
              Nature&apos;s purest gold, from farm to kitchen. Thoughtfully packaged natural turmeric
              celebrating Indian agricultural heritage and daily rituals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                aria-label="Email Customer Support"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#C86D1F] text-[#F9F6F0] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.18em] text-[#F2C56B] font-semibold">Explore</h3>
            <ul className="space-y-2.5 text-[#E7D6B8]/75">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/our-story" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="/purity-promise" className="hover:text-white transition-colors">Purity Promise</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Shop Collection</a></li>
              <li><a href="/rituals" className="hover:text-white transition-colors">Rituals &amp; Recipes</a></li>
              <li><a href="/gifting" className="hover:text-white transition-colors">Gifting &amp; Bulk Orders</a></li>
              <li><a href="/faq-contact" className="hover:text-white transition-colors">FAQ &amp; Contact Us</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.18em] text-[#F2C56B] font-semibold">Support</h3>
            <ul className="space-y-2.5 text-[#E7D6B8]/75">
              <li><a href="/track-order" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="/policies#shipping" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="/faq-contact" className="hover:text-white transition-colors">FAQ &amp; Support</a></li>
              <li><a href="/policies#refunds" className="hover:text-white transition-colors">Return &amp; Purity Guarantee</a></li>
              <li><a href="/policies#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/policies#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#F2C56B] font-semibold">
              The Golden Dispatch
            </h3>
            <p className="text-xs text-[#E7D6B8]/75 leading-relaxed">
              Seasonal harvest notes, kitchen recipes, and small-batch release updates.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address for newsletter"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/40 focus:border-[#F2C56B] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-4 py-2.5 rounded-full bg-[#C86D1F] text-white hover:bg-[#b05d17] transition-colors inline-flex items-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="flex items-center gap-1.5 text-xs text-[#F2C56B]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed to demo newsletter preview.</span>
              </p>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E7D6B8]/60">
          <p>&copy; {new Date().getFullYear()} Nature&apos;s Golden Gift. Frontend Commerce Prototype.</p>
          <div className="flex flex-wrap items-center gap-2">
            {['UPI (Planned)', 'Cards (Planned)', 'Wallets (Planned)', 'COD (Planned)'].map((pm) => (
              <span
                key={pm}
                className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[10px]"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
