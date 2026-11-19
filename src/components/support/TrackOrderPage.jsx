import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  CreditCard,
  LoaderCircle,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { SUPPORT_WHATSAPP_URL } from '../../data/support';
import { MEDIA } from '../../assets/media';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { apiGet } from '../../services/api';

const DEMO_ORDER_ID = '#HLD-8492';
const FIELD_CLASS =
  'min-h-12 w-full rounded-xl border border-[#E7D6B8] bg-white px-4 py-3 text-sm text-[#231F20] outline-none placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:ring-2 focus:ring-[#C86D1F]/15';

const MILESTONES = [
  {
    title: 'Order Confirmed',
    detail: 'Small-batch order received & queued.',
    icon: CheckCircle2,
  },
  {
    title: 'Freshly Packed in UV-Safe Jar',
    detail: 'Packing and dispatch updates are provided by the fulfilment team.',
    icon: PackageCheck,
  },
  {
    title: 'In Transit via Express Courier',
    detail: 'The current carrier event appears here when available.',
    icon: Truck,
  },
  {
    title: 'Delivered',
    detail: 'The carrier confirms delivery to your address.',
    icon: MapPin,
  },
];

function isValidOrderId(value) {
  return /^#?[A-Za-z0-9-]{4,31}$/.test(value.trim());
}

function isEmailOrIndianMobile(value) {
  const identifier = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) || /^[6-9]\d{9}$/.test(identifier);
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return String(value);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function activityForMilestone(activities, index) {
  const patterns = [
    null,
    /pack|manifest|ready/i,
    /transit|pickup|picked up|shipped|out for delivery/i,
    /deliver/i,
  ];
  return patterns[index]
    ? activities.find((activity) =>
        patterns[index].test(`${activity.status} ${activity.location}`)
      )
    : null;
}

function OrderTimeline({ order, onReset }) {
  const [copyStatus, setCopyStatus] = useState('');
  const reducedMotion = usePrefersReducedMotion();
  const shipmentRank = { PROCESSING: 0, PACKED: 1, IN_TRANSIT: 2, DELIVERED: 3 };
  const currentRank = shipmentRank[order.shipmentStatus] ?? 0;
  const confirmed =
    order.orderStatus === 'CONFIRMED' ||
    order.paymentStatus === 'PAID' ||
    order.paymentMethod === 'COD';

  const copyAwb = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.');
      await navigator.clipboard.writeText(order.awbCode);
      setCopyStatus('AWB copied.');
      window.setTimeout(() => setCopyStatus(''), 2500);
    } catch {
      setCopyStatus('Copy unavailable; select the AWB above.');
    }
  };

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      aria-labelledby="tracking-timeline-heading"
      className="mt-7 rounded-[1.75rem] border border-[#E7D6B8] bg-white/85 p-5 shadow-[0_20px_60px_-40px_rgba(35,31,32,0.35)] sm:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-[#E7D6B8] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C86D1F]">
              <PackageCheck className="h-4 w-4" aria-hidden="true" /> {order.orderNumber}
            </span>
            <span className="rounded-full bg-[#F3ECE1] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#7D512F]">
              {order.live ? 'Live carrier data' : 'Order record'}
            </span>
          </div>
          <h2 id="tracking-timeline-heading" className="mt-2 font-editorial text-3xl font-medium sm:text-4xl">
            {order.shipmentStatus === 'DELIVERED'
              ? 'Your harvest has arrived.'
              : order.shipmentStatus === 'IN_TRANSIT'
                ? 'Your harvest is on its way.'
                : 'Your order is being prepared.'}
          </h2>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F3ECE1] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#8A5429]">
          <CreditCard className="h-3.5 w-3.5" aria-hidden="true" /> Payment: {order.paymentStatus}
        </span>
      </div>

      <ol className="relative mt-6 space-y-0 before:absolute before:bottom-8 before:left-[15px] before:top-4 before:w-px before:bg-[#E7D6B8] md:grid md:grid-cols-4 md:gap-4 md:space-y-0 md:before:left-[8%] md:before:right-[8%] md:before:top-[17px] md:before:h-px md:before:w-auto">
        {MILESTONES.map((milestone, index) => {
          const Icon = milestone.icon;
          const complete = index === 0 ? confirmed : confirmed && currentRank >= index;
          const activity = activityForMilestone(order.activities || [], index);
          const when = index === 0
            ? formatDate(order.createdAt)
            : activity?.date
              ? formatDate(activity.date)
              : complete
                ? 'Milestone confirmed'
                : '';
          return (
            <li key={milestone.title} className="relative grid grid-cols-[32px_1fr] gap-3 pb-6 last:pb-0 md:block md:pb-0">
              <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border-2 md:mx-auto ${complete ? 'border-[#C86D1F] bg-[#C86D1F] text-white' : 'border-[#D5C6AA] bg-[#F9F6F0] text-[#8B806E]'}`}>
                {complete ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
              </span>
              <div className="min-w-0 md:pt-4 md:text-center">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#C86D1F]">Step 0{index + 1}</p>
                <h3 className="mt-1 font-editorial text-xl font-semibold leading-tight">{milestone.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-[#231F20]/65">{milestone.detail}</p>
                {when && <p className="mt-2 text-[9px] leading-relaxed text-[#231F20]/50">{when}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-3 rounded-2xl border border-[#E7D6B8] bg-[#F9F6F0] p-4 sm:grid-cols-2">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#231F20]/55">Courier</p>
          <p className="mt-1 text-sm font-semibold">{order.courierName || 'Not assigned yet'}</p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#231F20]/55">AWB tracking number</p>
          {order.awbCode ? (
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <p className="font-mono text-sm font-semibold tracking-wide">{order.awbCode}</p>
              <button
                type="button"
                onClick={copyAwb}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[#E7D6B8] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide hover:border-[#C86D1F] hover:text-[#C86D1F]"
              >
                <Clipboard className="h-3.5 w-3.5" aria-hidden="true" /> Copy
              </button>
              <span role="status" aria-live="polite" className="text-[10px] text-[#66735A]">{copyStatus}</span>
            </div>
          ) : (
            <p className="mt-1 text-xs text-[#231F20]/60">Tracking details will appear when the courier label is created.</p>
          )}
        </div>
        {order.estimatedDeliveryDate && (
          <div className="sm:col-span-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#231F20]/55">Estimated delivery</p>
            <p className="mt-1 text-sm font-semibold">{formatDate(order.estimatedDeliveryDate)}</p>
          </div>
        )}
      </div>

      {order.shipmentStatusDetail && (
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#231F20]/70">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#C86D1F]" aria-hidden="true" />
          Latest update: {order.shipmentStatusDetail}
        </p>
      )}
      {order.activities?.length > 0 && (
        <ul className="mt-4 divide-y divide-[#E7D6B8] rounded-xl border border-[#E7D6B8] bg-white/70 px-4">
          {order.activities.slice(0, 5).map((activity, index) => (
            <li key={`${activity.date}-${index}`} className="flex flex-col gap-1 py-3 text-xs sm:flex-row sm:justify-between">
              <span className="font-medium">{activity.status}</span>
              <span className="text-[#231F20]/55">{[activity.location, activity.date].filter(Boolean).join(' · ')}</span>
            </li>
          ))}
        </ul>
      )}

      {order.trackingUrl && (
        <a
          href={order.trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#9A531D] underline underline-offset-4"
        >
          View carrier tracking <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {SUPPORT_WHATSAPP_URL ? (
          <a
            href={SUPPORT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#66735A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66735A]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
          </a>
        ) : (
          <a href="/faq-contact#contact-form" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#66735A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#231F20]">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Contact shipment support
          </a>
        )}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#231F20]/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] hover:border-[#C86D1F] hover:text-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
        >
          Track another order <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
}

export function TrackOrderPage() {
  const initialOrderId = new URLSearchParams(window.location.search).get('orderId')?.trim() || '';
  const [orderId, setOrderId] = useState(initialOrderId);
  const [identifier, setIdentifier] = useState('');
  const [lookupStatus, setLookupStatus] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runLookup = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (!isValidOrderId(orderId)) {
      setOrder(null);
      setLookupStatus('Enter an order ID using letters, numbers, and hyphens.');
      return;
    }
    if (!isEmailOrIndianMobile(identifier)) {
      setOrder(null);
      setLookupStatus('Enter a valid email address or 10-digit Indian mobile number.');
      return;
    }

    setLookupStatus('');
    setOrder(null);
    setIsLoading(true);
    try {
      const result = await apiGet(
        `orders/track/${encodeURIComponent(orderId.trim().replace(/^#/, '').toUpperCase())}`,
        { headers: { 'X-Order-Contact': identifier.trim() } }
      );
      setOrder(result);
      window.history.replaceState(null, '', `/track-order?orderId=${encodeURIComponent(result.orderNumber)}`);
    } catch (error) {
      setLookupStatus(error.message || 'We could not find a matching order.');
    } finally {
      setIsLoading(false);
    }
  };

  const useExampleOrderId = () => {
    setOrderId(DEMO_ORDER_ID);
    setLookupStatus('');
    setOrder(null);
    document.getElementById('track-identifier')?.focus();
  };

  const resetLookup = () => {
    setOrderId('');
    setIdentifier('');
    setLookupStatus('');
    setOrder(null);
    window.history.replaceState(null, '', '/track-order');
  };

  return (
    <main className="min-h-[65vh] bg-[#F9F6F0] px-5 pb-16 pt-32 text-[#231F20] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/faq-contact" className="inline-flex items-center gap-2 text-xs font-medium text-[#8A5429] hover:text-[#C86D1F]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> FAQ &amp; Contact
        </a>
        <div className="mt-6 grid items-center gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <section className="rounded-[2rem] border border-[#E7D6B8] bg-white/85 p-6 shadow-[0_25px_70px_-45px_rgba(35,31,32,0.4)] sm:p-9">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F3ECE1] text-[#C86D1F]">
              <PackageCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C86D1F]">
              Live Order Tracking
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-medium leading-tight sm:text-5xl">
              Where Is Your Fresh Harvest?
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#231F20]/70">
              Enter your Order ID and registered mobile number or email to view dispatch updates.
            </p>

            <form onSubmit={runLookup} className="mt-6 space-y-4">
              <label htmlFor="track-order-id" className="block text-xs font-medium">
                Order ID
                <input
                  id="track-order-id"
                  name="orderId"
                  type="text"
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  required
                  minLength={4}
                  maxLength={32}
                  autoComplete="off"
                  placeholder="#HLD-8492"
                  className={`${FIELD_CLASS} mt-1.5`}
                />
              </label>
              <label htmlFor="track-identifier" className="block text-xs font-medium">
                Registered Phone or Email
                <input
                  id="track-identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Email or 10-digit mobile number"
                  className={`${FIELD_CLASS} mt-1.5`}
                />
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231F20]"
              >
                {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                {isLoading ? 'Looking up order…' : 'Track Order'}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
              <span className="text-[#231F20]/60">Order ID format:</span>
              <button
                type="button"
                onClick={useExampleOrderId}
                className="font-semibold text-[#9A531D] underline decoration-[#C86D1F]/40 underline-offset-4 hover:text-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D1F]"
              >
                {DEMO_ORDER_ID}
              </button>
            </div>
            {lookupStatus && (
              <p role="alert" className="mt-4 rounded-xl border border-[#C86D1F]/25 bg-[#F3ECE1] p-3 text-xs leading-relaxed text-[#7D512F]">
                {lookupStatus}
              </p>
            )}
            <p role="note" className="mt-4 inline-flex items-start gap-2 text-[10px] leading-relaxed text-[#8B4F28]">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Your registered email or mobile number is used to verify the order and is not placed in the tracking URL.
            </p>
          </section>

          <div className="relative mx-auto w-full max-w-lg">
            <img
              src={MEDIA.kitchenJar}
              alt="A warm apothecary jar scene representing a carefully packed turmeric harvest"
              className="aspect-[4/3] w-full rounded-[2rem] border border-[#E7D6B8] object-cover shadow-[0_25px_70px_-38px_rgba(35,31,32,0.42)]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/35 bg-[#F9F6F0]/90 p-4 shadow-lg backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
              <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C86D1F]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> From our studio to your doorstep
              </span>
              <p className="mt-1 font-editorial text-xl font-medium">Every step, a little closer to your kitchen.</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {order && <OrderTimeline key={order.orderNumber} order={order} onReset={resetLookup} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
