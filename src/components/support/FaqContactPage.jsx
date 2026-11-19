import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  AlertCircle,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  Mail,
  LoaderCircle,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { MEDIA } from '../../assets/media';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../../data/faqData';
import {
  HAS_CONFIGURED_EMAIL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_STUDIO_ADDRESS,
  SUPPORT_WHATSAPP_URL,
} from '../../data/support';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { apiPost } from '../../services/api';
import { StoryArtwork } from '../storytelling/StoryArtwork';
import { SectionHeading } from '../ui/SectionHeading';

const fieldClassName =
  'mt-1.5 min-h-11 w-full rounded-xl border border-[#E7D6B8] bg-white/80 px-3.5 py-2.5 text-sm text-[#231F20] placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:outline-none focus:ring-2 focus:ring-[#C86D1F]/15';

function SupportHero({ query, onQueryChange }) {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#171B17] pb-14 pt-32 text-[#F9F6F0] sm:pb-16 lg:pb-20">
      <img
        src={MEDIA.heroLandscape}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171B17]/95 via-[#171B17]/80 to-[#171B17]/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171B17]/80 via-transparent to-[#171B17]/15" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F2C56B]">
            <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
            Customer Care &amp; Kitchen Guidance
          </span>
          <h1 className="mt-6 font-editorial text-5xl font-medium leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            How Can We Help You Today?
          </h1>
          <p className="mt-5 max-w-2xl font-editorial text-xl leading-snug text-[#E7D6B8] sm:text-2xl">
            Everything you need to know about storing your haldi, tracking orders, and understanding
            our purity guidance—or reach out directly to our team.
          </p>
          <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
          <div className="mt-8 flex min-h-14 max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-[#F9F6F0] px-4 text-[#231F20] shadow-[0_20px_60px_-32px_rgba(0,0,0,0.65)] focus-within:ring-2 focus-within:ring-[#F2C56B]">
            <Search className="h-5 w-5 shrink-0 text-[#C86D1F]" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search questions (e.g., shelf life, storage, COD, shipping)..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#231F20]/45"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A5429] hover:bg-[#E7D6B8]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-[#E7D6B8]/70">
            Search updates instantly. Product details and policies marked as draft below still need
            confirmation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FaqAccordion({ items }) {
  const [expandedId, setExpandedId] = useState(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setExpandedId(null);
  }, [items]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = expandedId === item.id;
        const answerId = `faq-answer-${item.id}`;
        const buttonId = `faq-question-${item.id}`;

        return (
          <motion.article
            key={item.id}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.14) }}
            className="overflow-hidden rounded-2xl border border-[#E7D6B8] bg-white/80 shadow-[0_12px_35px_-30px_rgba(35,31,32,0.45)]"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpandedId(isOpen ? null : item.id)}
                className="flex min-h-[72px] w-full items-center gap-4 px-4 py-4 text-left sm:px-6"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F3ECE1] text-[#C86D1F]">
                  <CircleHelp className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 font-editorial text-xl font-medium leading-snug text-[#231F20] sm:text-2xl">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#C86D1F] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#E7D6B8]/70 px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <p className="pl-0 text-sm leading-relaxed text-[#231F20]/75 sm:pl-[3.25rem]">
                      {item.answer}
                    </p>
                    {item.note && (
                      <p role="note" className="mt-3 rounded-xl border border-[#C86D1F]/15 bg-[#F3ECE1]/70 p-3 text-[11px] leading-relaxed text-[#7D512F] sm:ml-[3.25rem]">
                        {item.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}

function FaqSection({ query }) {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0]);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = useMemo(
    () =>
      FAQ_ITEMS.filter((item) => {
        const matchesCategory =
          activeCategory === FAQ_CATEGORIES[0] || item.category === activeCategory;
        const matchesQuery =
          !normalizedQuery ||
          `${item.question} ${item.answer} ${item.category} ${item.note || ''}`
            .toLowerCase()
            .includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, normalizedQuery],
  );

  return (
    <section className="bg-[#F9F6F0] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Answers, Simply"
          title="A little clarity for your everyday ritual."
          subtitle="Browse by topic or search for a word to find the guidance you need."
          align="center"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter questions by category">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`min-h-10 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F] sm:text-[11px] ${
                activeCategory === category
                  ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                  : 'border-[#E7D6B8] bg-white/70 text-[#231F20]/70 hover:border-[#C86D1F] hover:text-[#C86D1F]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? 'answer' : 'answers'} found.
        </p>
        <div className="mt-7">
          {visibleItems.length > 0 ? (
            <FaqAccordion items={visibleItems} />
          ) : (
            <div className="rounded-3xl border border-dashed border-[#C8B692] bg-white/60 px-5 py-10 text-center sm:px-10">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#F3ECE1] text-[#C86D1F]">
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-editorial text-2xl font-medium">No questions found just yet.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#231F20]/65">
                Try another search, or send your question through the contact form and we’ll point
                you in the right direction.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {SUPPORT_WHATSAPP_URL ? (
                  <a
                    href={SUPPORT_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask Us on WhatsApp
                  </a>
                ) : (
                  <a
                    href="#contact-form"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
                  >
                    Ask our team instead <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
              {!SUPPORT_WHATSAPP_URL && (
                <p className="mt-3 text-[10px] text-[#231F20]/50">
                  WhatsApp support number is not configured in this preview.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SupportContactCards({ copyStatus, onCopyEmail }) {
  return (
    <div className="space-y-4">
      <StoryArtwork
        src={MEDIA.kitchenJar}
        alt="A warm apothecary jar scene in the brand's editorial illustration style"
        label="A note from our kitchen"
        className="h-[245px] sm:h-[285px]"
      >
        <div>
          <p className="font-editorial text-2xl font-medium">Here for the small details.</p>
          <p className="mt-1 text-xs text-[#F9F6F0]/75">A thoughtful answer starts with a good question.</p>
        </div>
      </StoryArtwork>

      <article className="rounded-2xl border border-[#E7D6B8] bg-white/80 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-editorial text-2xl font-medium">WhatsApp Concierge</h3>
            {SUPPORT_WHATSAPP_URL ? (
              <a
                href={SUPPORT_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#66735A] px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66735A]"
              >
                Message us <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <p role="note" className="mt-2 text-xs leading-relaxed text-[#7D512F]">
                WhatsApp number pending configuration. Use the contact form while this preview is being set up.
              </p>
            )}
            <p className="mt-3 inline-flex items-start gap-2 text-[10px] leading-relaxed text-[#231F20]/55">
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C86D1F]" aria-hidden="true" />
              Under-15-minute replies, Mon–Sat 10 AM–7 PM IST, are a proposed service target pending confirmation.
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-[#E7D6B8] bg-white/80 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-editorial text-2xl font-medium">Email Support</h3>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Nature’s Golden Gift support')}`}
              className="mt-1 inline-block break-all text-sm text-[#8A5429] underline decoration-[#C86D1F]/40 underline-offset-4 hover:text-[#C86D1F]"
            >
              {SUPPORT_EMAIL}
            </a>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onCopyEmail}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E7D6B8] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wide hover:border-[#C86D1F] hover:text-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
              >
                {copyStatus === 'Email copied.' ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {copyStatus === 'Email copied.' ? 'Copied' : 'Copy Email'}
              </button>
              <span role="status" aria-live="polite" className="text-[10px] text-[#66735A]">
                {copyStatus}
              </span>
            </div>
            {!HAS_CONFIGURED_EMAIL && (
              <p role="note" className="mt-2 text-[10px] text-[#7D512F]">
                Demo email placeholder; configure the support inbox before launch.
              </p>
            )}
          </div>
        </div>
      </article>

      {SUPPORT_PHONE && (
        <a
          href={`tel:${SUPPORT_PHONE}`}
          className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#E7D6B8] bg-white/80 p-4 text-sm hover:border-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F3ECE1] text-[#C86D1F]">
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          Call support <span className="ml-auto break-all text-xs text-[#231F20]/60">{SUPPORT_PHONE}</span>
        </a>
      )}

      <article className="rounded-2xl border border-[#E7D6B8] bg-[#F3ECE1]/70 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#C86D1F]">
            {SUPPORT_STUDIO_ADDRESS ? (
              <MapPin className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Store className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <h3 className="font-editorial text-2xl font-medium">Kitchen &amp; Packing Studio</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#231F20]/65">
              {SUPPORT_STUDIO_ADDRESS || 'Studio address pending configuration.'}
            </p>
            <p className="mt-3 inline-flex items-start gap-2 text-[10px] leading-relaxed text-[#7D512F]">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              FSSAI licence details are a placeholder pending verification.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function ContactForm({ onSubmit, submission, onReset, isSubmitting, submissionError }) {
  if (submission) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-full flex-col justify-center rounded-[1.75rem] border border-[#C86D1F]/30 bg-[#F3ECE1] p-6 sm:p-9"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#66735A] text-white">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">
          Support request received
        </p>
        <h3 className="mt-2 font-editorial text-3xl font-medium sm:text-4xl">Thank you for reaching out.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#231F20]/75">
          Your message has been recorded. Reference <strong>{submission.reference}</strong>.
        </p>
        <p className="mt-4 rounded-xl border border-[#C86D1F]/20 bg-white/65 p-4 text-xs leading-relaxed text-[#231F20]/75">
          Automated email notifications are not configured yet. Keep your reference if you contact support about this message.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F9F6F0] hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
        >
          Send another message <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[1.75rem] border border-[#E7D6B8] bg-white/80 p-5 shadow-[0_20px_60px_-40px_rgba(35,31,32,0.35)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">We’re listening</span>
          <h3 className="mt-1 font-editorial text-3xl font-medium">Send us a note.</h3>
        </div>
        <Mail className="mt-1 h-5 w-5 shrink-0 text-[#C86D1F]" aria-hidden="true" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label htmlFor="support-name" className="text-xs font-medium">
          Full Name *
          <input id="support-name" name="name" type="text" autoComplete="name" required maxLength={100} className={fieldClassName} placeholder="Your name" />
        </label>
        <label htmlFor="support-email" className="text-xs font-medium">
          Email Address *
          <input id="support-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClassName} placeholder="you@example.com" />
        </label>
        <label htmlFor="support-order-id" className="text-xs font-medium">
          Order ID <span className="font-normal text-[#231F20]/45">(optional)</span>
          <input id="support-order-id" name="orderId" type="text" maxLength={32} className={fieldClassName} placeholder="#HLD-8492" />
        </label>
        <label htmlFor="support-topic" className="text-xs font-medium">
          Topic *
          <select id="support-topic" name="topic" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>Select a topic</option>
            <option>Order &amp; Delivery Status</option>
            <option>Product &amp; Storage Advice</option>
            <option>Purity Guarantee / Return</option>
            <option>Gifting &amp; Bulk</option>
            <option>Other</option>
          </select>
        </label>
        <label htmlFor="support-message" className="text-xs font-medium sm:col-span-2">
          Message *
          <textarea id="support-message" name="message" rows={5} required minLength={5} maxLength={2000} className={`${fieldClassName} resize-y`} placeholder="Tell us how we can help." />
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_-8px_rgba(200,109,31,0.45)] transition-colors hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20]"
      >
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        {isSubmitting ? 'Sending message…' : 'Send message'}
      </button>
      {submissionError && (
        <p role="alert" className="flex items-start gap-2 text-xs leading-relaxed text-[#C86D1F]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {submissionError}
        </p>
      )}
    </form>
  );
}

function ContactSection() {
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard access is unavailable in this browser.');
      }
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopyStatus('Email copied.');
      window.setTimeout(() => setCopyStatus(''), 2500);
    } catch (error) {
      setCopyStatus(error instanceof Error ? 'Copy unavailable. Select the email address above.' : 'Copy unavailable.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmissionError('');
    try {
      const result = await apiPost('inquiries', {
        kind: 'CONTACT',
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        orderId: String(formData.get('orderId') || '').trim(),
        inquiryType: String(formData.get('topic') || '').trim(),
        message: String(formData.get('message') || '').trim(),
      });
      setSubmission({ reference: result.reference });
    } catch (error) {
      setSubmissionError(error.message || 'We could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="scroll-mt-24 bg-[#F2EEE6] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A Human Answer"
          title="We’re happy to help."
          subtitle="For an order question, include your order ID. For storage or cooking advice, tell us how you use your haldi."
        />
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <SupportContactCards copyStatus={copyStatus} onCopyEmail={copyEmail} />
          <ContactForm
            onSubmit={handleSubmit}
            submission={submission}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
            onReset={() => setSubmission(null)}
          />
        </div>
      </div>
    </section>
  );
}

function QuickTrackOrder() {
  return (
    <section className="bg-[#F9F6F0] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-5 rounded-[1.75rem] border border-[#C86D1F]/25 bg-[#F3ECE1] p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C86D1F]">
              <PackageCheck className="h-4 w-4" aria-hidden="true" /> Order help
            </span>
            <h2 className="mt-2 font-editorial text-2xl font-medium sm:text-3xl">
              Already placed an order? Enter Order ID to track live status.
            </h2>
            <p className="mt-2 text-[10px] leading-relaxed text-[#231F20]/55">
              Track with your order ID and the email address or phone number used at checkout.
            </p>
          </div>
          <form action="/track-order" method="get" className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <label htmlFor="quick-order-id" className="sr-only">Order ID</label>
            <input
              id="quick-order-id"
              name="orderId"
              type="text"
              required
              minLength={4}
              maxLength={32}
              placeholder="#HLD-8492"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-[#E7D6B8] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:ring-2 focus:ring-[#C86D1F]/15 sm:min-w-[220px]"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#231F20] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
            >
              Track Order <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function FaqContactPage() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SupportHero query={query} onQueryChange={setQuery} />
      <FaqSection query={query} />
      <ContactSection />
      <QuickTrackOrder />
    </>
  );
}
