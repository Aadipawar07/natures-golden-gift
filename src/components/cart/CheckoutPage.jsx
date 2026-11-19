import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  LockKeyhole,
  LoaderCircle,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { apiGet, apiPost } from '../../services/api';
import { createCashfreeClient, loadCashfreeSdk } from '../../services/cashfree';
import { formatINR } from '../../utils/format';
import { validateIndianPincode } from '../../utils/pincode';
import { CheckoutOrderSummary } from './CheckoutOrderSummary';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

function normalizeIndianMobile(value) {
  const compact = String(value || '').trim().replace(/[\s()-]/g, '');
  const digits = compact.replace(/\D/g, '');
  const hasExplicitCountryCode = /^\+91/.test(compact);
  const hasPlainCountryCode = /^91/.test(compact) && digits.length === 12;
  return (hasExplicitCountryCode || hasPlainCountryCode) && digits.length >= 2
    ? digits.slice(2)
    : digits;
}

function checkoutCartItem(item) {
  const sku = typeof item.sku === 'string' ? item.sku.trim() : '';
  const keyParts = typeof item.key === 'string' ? item.key.split('__') : [];
  const skuParts = sku ? sku.split('__') : [];
  const productId = item.productId || keyParts[0] || skuParts[0] || '';
  const variantId = item.variantId || keyParts[1] || skuParts[1] || '';
  return {
    ...(sku || (productId && variantId)
      ? { sku: sku || `${productId}__${variantId}` }
      : {}),
    productId,
    variantId,
    key: item.key,
    name: item.name || item.title || 'Turmeric product',
    packSize: item.packSize || item.variantLabel || variantId || 'Standard pack',
    quantity: item.quantity ?? item.qty,
    price: item.price ?? item.unitPrice ?? 0,
    purchaseType: item.purchaseType,
  };
}

const FIELD_CLASS =
  'mt-1.5 w-full rounded-xl border border-[#E7D6B8] bg-white px-3.5 py-3 text-sm text-[#231F20] outline-none transition-colors placeholder:text-[#231F20]/35 focus:border-[#C86D1F] focus:ring-2 focus:ring-[#C86D1F]/10';

function FormField({ id, label, optional = false, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-[#231F20]/80">
        {label} {optional && <span className="text-[#231F20]/45">(optional)</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-[#231F20]/55">{hint}</p>}
    </div>
  );
}

function StepHeading({ number, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#231F20] text-xs font-semibold text-white">
        {number}
      </span>
      <div>
        <h2 className="font-editorial text-2xl font-medium leading-tight">{title}</h2>
        {description && <p className="mt-1 text-xs text-[#231F20]/60">{description}</p>}
      </div>
    </div>
  );
}

function PaymentOption({ id, selected, onSelect, icon: Icon, title, description, children }) {
  return (
    <div
      className={`rounded-2xl border transition-colors ${
        selected ? 'border-[#C86D1F] bg-[#C86D1F]/[0.04] ring-1 ring-[#C86D1F]/30' : 'border-[#E7D6B8] bg-white'
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3 p-4">
        <input
          type="radio"
          name="payment-method"
          value={id}
          checked={selected}
          onChange={() => onSelect(id)}
          className="mt-1 h-4 w-4 accent-[#C86D1F]"
        />
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#C86D1F]" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="mt-0.5 block text-[11px] leading-relaxed text-[#231F20]/60">
            {description}
          </span>
        </span>
        {id === 'prepaid' && (
          <span className="rounded-full bg-[#66735A]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#66735A]">
            Recommended
          </span>
        )}
      </label>
      {selected && children && <div className="px-4 pb-4 pl-[3.55rem]">{children}</div>}
    </div>
  );
}

function OrderConfirmation({ order }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="rounded-3xl border border-[#E7D6B8] bg-white p-6 text-center shadow-sm sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#66735A]/10 text-[#66735A]">
          <Check className="h-7 w-7" />
        </span>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86D1F]">
          Order confirmed
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-medium sm:text-5xl">
          Your ritual is on its way.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#231F20]/65">
          {order.paymentMethod === 'COD'
            ? 'Your order has been received. Payment is due at delivery.'
            : 'Your Cashfree payment has been verified.'}
        </p>
        <div className="mt-7 rounded-2xl bg-[#F9F6F0] p-5 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7D6B8] pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#231F20]/55">Order ID</p>
              <p className="mt-1 font-editorial text-xl font-semibold">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#231F20]/55">Estimated delivery</p>
              <p className="mt-1 text-sm font-semibold">{order.deliveryDate || 'Dispatch updates will follow'}</p>
            </div>
          </div>
          {order.paymentReference && (
            <p className="border-b border-[#E7D6B8] py-3 text-xs text-[#231F20]/65">
              Payment reference: <span className="font-mono font-semibold text-[#231F20]">{order.paymentReference}</span>
            </p>
          )}
          {order.shiprocketOrderId && (
            <p className="border-b border-[#E7D6B8] py-3 text-xs text-[#231F20]/65">
              Shiprocket order: <span className="font-mono font-semibold text-[#231F20]">{order.shiprocketOrderId}</span>
              {order.shiprocketShipmentId && (
                <span> · Shipment {order.shiprocketShipmentId}</span>
              )}
            </p>
          )}
          {order.shipmentError && (
            <p role="status" className="mt-3 rounded-xl border border-[#C86D1F]/20 bg-white/70 p-3 text-xs leading-relaxed text-[#7D512F]">
              {order.shipmentError} Your order is confirmed; please contact support if tracking does not appear.
            </p>
          )}
          <ul className="space-y-3 py-4">
            {order.items.map((item) => (
              <li key={item.key} className="flex items-start justify-between gap-3 text-sm">
                <span className="min-w-0">
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-xs text-[#231F20]/55">
                    {item.variantLabel} × {item.quantity}
                  </span>
                </span>
                <span className="shrink-0">{formatINR(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-[#E7D6B8] pt-3 text-sm">
            <div className="flex justify-between">
              <span>Item subtotal</span>
              <span>{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#66735A]">
                <span>Discount ({order.appliedCoupon})</span>
                <span>−{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-[#E7D6B8] pt-3 font-semibold">
            <span>Estimated total</span>
            <span>{formatINR(order.total)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#231F20]/55">
            Confirmation sent to {order.email}. Delivery estimates depend on live courier serviceability.
          </p>
        </div>
        <a
          href="/shop"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#231F20] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#C86D1F]"
        >
          Continue Shopping <ArrowLeft className="h-4 w-4 rotate-180" />
        </a>
      </div>
    </main>
  );
}

export function CheckoutPage() {
  const { items, subtotal, discount, appliedCoupon, estimatedShipping, total, clearCart } = useCart();
  const checkoutKeyRef = useRef(null);
  const pincodeRequestRef = useRef(0);
  const [contact, setContact] = useState({
    email: '',
    mobile: '',
    whatsappUpdates: false,
    fullName: '',
    pincode: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
  });
  const [pinMessage, setPinMessage] = useState('');
  const [pinMessageIsError, setPinMessageIsError] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [paymentError, setPaymentError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [order, setOrder] = useState(null);

  const setContactField = (field, value) =>
    setContact((current) => ({ ...current, [field]: value }));

  const checkPincode = async (value) => {
    const requestId = pincodeRequestRef.current + 1;
    pincodeRequestRef.current = requestId;
    setDeliveryEstimate(null);
    if (!value) {
      setPinMessage('');
      setPinMessageIsError(false);
      setIsCheckingPincode(false);
      return;
    }

    const validation = validateIndianPincode(value);
    if (!validation.valid) {
      setPinMessage(validation.message);
      setPinMessageIsError(true);
      setIsCheckingPincode(false);
      return;
    }

    setIsCheckingPincode(true);
    setPinMessageIsError(false);
    setPinMessage('Checking live courier serviceability…');
    try {
      const result = await apiGet(`shipping/check-pincode/${validation.pincode}`);
      if (pincodeRequestRef.current !== requestId) return;
      if (!result.available) {
        setPinMessage('No Shiprocket courier service is currently available for this PIN.');
        setPinMessageIsError(true);
        return;
      }

      const deliveryDate = result.estimatedDeliveryDays
        ? new Date(Date.now() + result.estimatedDeliveryDays * 86_400_000)
        : null;
      setDeliveryEstimate({
        pincode: validation.pincode,
        courierName: result.courierName,
        estimatedDeliveryDays: result.estimatedDeliveryDays,
        deliveryDate: deliveryDate
          ? new Intl.DateTimeFormat('en-IN', {
              day: 'numeric',
              month: 'long',
            }).format(deliveryDate)
          : null,
        codAvailable: result.codAvailable,
      });
      setPinMessage(
        `Serviceable${result.courierName ? ` via ${result.courierName}` : ''}. ${
          result.codAvailable ? 'COD is available.' : 'COD is not available.'
        }`
      );
    } catch (error) {
      if (pincodeRequestRef.current === requestId) {
        setPinMessage(error.message || 'Could not check courier serviceability.');
        setPinMessageIsError(true);
      }
    } finally {
      if (pincodeRequestRef.current === requestId) setIsCheckingPincode(false);
    }
  };

  const makeIdempotencyKey = () => {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const buildOrderSnapshot = (
    result,
    method,
    paymentReference = null,
    currentDeliveryEstimate = deliveryEstimate
  ) => ({
    orderNumber: result.orderNumber,
    deliveryDate:
      result.estimatedDeliveryDate ||
      (currentDeliveryEstimate?.pincode === contact.pincode
        ? currentDeliveryEstimate.deliveryDate
        : null),
    items: items.map((item) => ({ ...item })),
    subtotal: result.subtotal ?? subtotal,
    discount: result.discount ?? discount,
    appliedCoupon,
    shipping: result.shippingFee ?? estimatedShipping,
    total: result.totalAmount ?? total,
    email: contact.email,
    paymentMethod: method,
    paymentReference,
    shiprocketOrderId: result.shiprocketOrderId || result.order?.shiprocketOrderId || null,
    shiprocketShipmentId: result.shiprocketShipmentId || result.order?.shiprocketShipmentId || null,
    shipmentSyncStatus: result.shipmentSyncStatus || result.order?.shipmentSyncStatus || null,
    shipmentError:
      result.shipmentError ||
      ((result.shipmentSyncStatus || result.order?.shipmentSyncStatus) &&
        (result.shipmentSyncStatus || result.order?.shipmentSyncStatus) !== 'CREATED'
        ? 'Payment was accepted, but shipment booking is still pending.'
        : null),
  });

  const completeOrder = (result, method, paymentReference, currentDeliveryEstimate) => {
    setOrder(buildOrderSnapshot(result, method, paymentReference, currentDeliveryEstimate));
    setPendingPayment(null);
    clearCart();
    checkoutKeyRef.current = null;
  };

  const verifyPayment = async (
    orderNumber,
    {
      poll = true,
      fallbackMessage = '',
      paymentSessionId = null,
      contactValue = contact.mobile ? `+91${contact.mobile}` : contact.email,
    } = {}
  ) => {
    setPaymentError('');
    setIsProcessing(true);
    const attempts = poll ? 8 : 1;

    try {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const result = await apiPost(
          'orders/verify-payment',
          { orderNumber },
          { headers: { 'X-Order-Contact': contactValue } }
        );
        if (result.paymentStatus === 'PAID') {
          completeOrder(result, 'PREPAID', result.paymentReference);
          return true;
        }
        if (result.paymentStatus === 'FAILED') {
          setPendingPayment(null);
          checkoutKeyRef.current = null;
          setPaymentError('The payment did not complete. Your cart is still here; you can safely try again.');
          return false;
        }
        if (attempt + 1 < attempts) {
          await new Promise((resolve) => window.setTimeout(resolve, 1500));
        }
      }

      setPendingPayment({ orderNumber, paymentSessionId, contactValue });
      setPaymentError(
        fallbackMessage ||
          `Payment for ${orderNumber} is still being confirmed. Your cart is saved; check the status again shortly.`
      );
      return false;
    } catch (error) {
      setPendingPayment({ orderNumber, paymentSessionId, contactValue });
      setPaymentError(error.message || 'Payment status could not be checked. Your cart is still here.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || isProcessing || pendingPayment) return;
    setPaymentError('');
    setIsProcessing(true);

    const method = paymentMethod === 'cod' ? 'COD' : 'PREPAID';
    const payload = {
      customer: {
        name: contact.fullName.trim(),
        email: contact.email.trim(),
        phone: normalizeIndianMobile(contact.mobile),
      },
      address: {
        street: [contact.address.trim(), contact.landmark.trim()].filter(Boolean).join(', '),
        city: contact.city.trim(),
        state: contact.state.trim(),
        pincode: contact.pincode.trim(),
      },
      items: items.map(checkoutCartItem),
      couponCode: appliedCoupon || '',
      paymentMethod: method,
    };
    const fingerprint = JSON.stringify(payload);
    if (!checkoutKeyRef.current || checkoutKeyRef.current.fingerprint !== fingerprint) {
      checkoutKeyRef.current = { fingerprint, value: makeIdempotencyKey() };
    }

    try {
      let submitDeliveryEstimate = deliveryEstimate;
      if (method === 'COD') {
        const serviceability = await apiGet(
          `shipping/check-pincode/${contact.pincode}`
        );
        if (!serviceability.available) {
          throw new Error('COD is unavailable because no courier serves this PIN.');
        }
        if (!serviceability.codAvailable) {
          throw new Error('Cash on Delivery is not available for this PIN. Choose online payment instead.');
        }
        const deliveryDate = serviceability.estimatedDeliveryDays
          ? new Date(Date.now() + serviceability.estimatedDeliveryDays * 86_400_000)
          : null;
        submitDeliveryEstimate = {
          pincode: contact.pincode,
          deliveryDate: deliveryDate
            ? new Intl.DateTimeFormat('en-IN', {
                day: 'numeric',
                month: 'long',
              }).format(deliveryDate)
            : null,
          courierName: serviceability.courierName,
          estimatedDeliveryDays: serviceability.estimatedDeliveryDays,
          codAvailable: serviceability.codAvailable,
        };
        setDeliveryEstimate(submitDeliveryEstimate);
      }

      const result = await apiPost('orders/checkout', payload, {
        headers: { 'Idempotency-Key': checkoutKeyRef.current.value },
      });
      if (!result?.orderNumber) throw new Error('The checkout response did not include an order number.');

      if (method === 'COD') {
        completeOrder(result, method, null, submitDeliveryEstimate);
        return;
      }
      const paymentSessionId = result.paymentSessionId || result.payment_session_id;
      if (!paymentSessionId) {
        throw new Error('Cashfree did not return a payment session. Please retry checkout.');
      }

      const CashfreeConstructor = await loadCashfreeSdk();
      const cashfree = createCashfreeClient(CashfreeConstructor);
      let checkoutResult;
      try {
        checkoutResult = await cashfree.checkout({
          paymentSessionId,
          redirectTarget: '_modal',
        });
      } catch (error) {
        const paymentMessage = error?.message || 'Payment window closed before completing checkout.';
        await verifyPayment(result.orderNumber, {
          fallbackMessage: `Payment window closed or payment was cancelled. ${paymentMessage} If you completed payment, check again shortly.`,
          paymentSessionId,
          contactValue: `+91${normalizeIndianMobile(contact.mobile)}`,
        });
        return;
      }

      const modalMessage = checkoutResult?.error?.message
        ? `Payment was cancelled or could not be completed. ${checkoutResult.error.message}`
        : '';
      await verifyPayment(result.orderNumber, {
        fallbackMessage: modalMessage
          ? `${modalMessage} Your cart remains saved; you can check payment status again.`
          : '',
        paymentSessionId,
        contactValue: `+91${normalizeIndianMobile(contact.mobile)}`,
      });
    } catch (error) {
      setPaymentError(error.message || 'We could not start checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resumeCashfreePayment = async () => {
    if (!pendingPayment?.paymentSessionId || isProcessing) return;
    setIsProcessing(true);
    setPaymentError('');
    try {
      const CashfreeConstructor = await loadCashfreeSdk();
      const cashfree = createCashfreeClient(CashfreeConstructor);
      const result = await cashfree.checkout({
        paymentSessionId: pendingPayment.paymentSessionId,
        redirectTarget: '_modal',
      });
      const modalMessage = result?.error?.message
        ? `Payment was cancelled or could not be completed. ${result.error.message}`
        : '';
      await verifyPayment(pendingPayment.orderNumber, {
        fallbackMessage: modalMessage || '',
        paymentSessionId: pendingPayment.paymentSessionId,
        contactValue: pendingPayment.contactValue,
      });
    } catch (error) {
      setPaymentError(error.message || 'Could not reopen Cashfree checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231F20]">
      <header className="border-b border-[#E7D6B8] bg-[#F9F6F0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" aria-label="Nature's Golden Gift home" className="font-editorial text-xl font-semibold sm:text-2xl">
            Nature&apos;s Golden Gift
          </a>
          <span className="hidden items-center gap-2 rounded-full border border-[#E7D6B8] bg-white/70 px-3 py-2 text-[10px] text-[#231F20]/70 sm:inline-flex">
            <LockKeyhole className="h-3.5 w-3.5 text-[#66735A]" />
            Secure payment via Cashfree
          </span>
          <a href="/shop" className="inline-flex items-center gap-1.5 text-xs font-medium hover:text-[#C86D1F]">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Shop</span>
            <span className="sm:hidden">Shop</span>
          </a>
        </div>
      </header>

      {order ? (
        <OrderConfirmation order={order} />
      ) : items.length === 0 ? (
        <main className="mx-auto max-w-xl px-4 py-20 text-center">
          <ShoppingBagIcon />
          <h1 className="mt-5 font-editorial text-4xl">Your bag is empty</h1>
          <p className="mt-2 text-sm text-[#231F20]/65">Add a product before starting checkout.</p>
          <a href="/shop" className="mt-6 inline-flex rounded-full bg-[#231F20] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C86D1F]">
            Explore the collection
          </a>
        </main>
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86D1F]">
              Guest checkout
            </p>
            <h1 className="mt-1 font-editorial text-4xl font-medium sm:text-5xl">A few details, then your ritual.</h1>
            <p className="mt-2 text-xs text-[#231F20]/60">
              Your order is sent securely to our checkout service. Card details are handled by Cashfree, not stored on this site.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.8fr)] lg:gap-10">
            <form
              id="express-checkout-form"
              onSubmit={handleSubmit}
              className="order-2 space-y-5 lg:order-1"
            >
              <section className="rounded-3xl border border-[#E7D6B8] bg-white p-5 sm:p-7">
                <StepHeading number="1" title="Contact information" description="No account needed." />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField id="checkout-email" label="Email address">
                    <input
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={contact.email}
                      onChange={(event) => setContactField('email', event.target.value)}
                      placeholder="you@example.com"
                      className={FIELD_CLASS}
                    />
                  </FormField>
                  <FormField id="checkout-mobile" label="Mobile number">
                    <div className="mt-1.5 flex overflow-hidden rounded-xl border border-[#E7D6B8] bg-white focus-within:border-[#C86D1F] focus-within:ring-2 focus-within:ring-[#C86D1F]/10">
                      <span className="flex items-center border-r border-[#E7D6B8] px-3 text-sm text-[#231F20]/60">+91</span>
                      <input
                        id="checkout-mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        pattern="[6-9][0-9]{9}"
                        maxLength={16}
                        value={contact.mobile}
                        onChange={(event) => setContactField('mobile', normalizeIndianMobile(event.target.value).slice(0, 10))}
                        placeholder="10-digit number"
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                      />
                    </div>
                  </FormField>
                  <label className="flex items-start gap-2.5 text-xs text-[#231F20]/70 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={contact.whatsappUpdates}
                      onChange={(event) => setContactField('whatsappUpdates', event.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#C86D1F]"
                    />
                    Send order updates and product tips on WhatsApp (optional)
                  </label>
                </div>
              </section>

              <section className="rounded-3xl border border-[#E7D6B8] bg-white p-5 sm:p-7">
                <StepHeading number="2" title="Delivery address" description="Enter an Indian delivery address." />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField id="checkout-name" label="Full name">
                    <input id="checkout-name" autoComplete="name" required value={contact.fullName} onChange={(event) => setContactField('fullName', event.target.value)} placeholder="Name on the delivery" className={FIELD_CLASS} />
                  </FormField>
                  <FormField id="checkout-pincode" label="6-digit PIN code">
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C86D1F]" />
                      <input
                        id="checkout-pincode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        required
                        pattern="[1-9][0-9]{5}"
                        maxLength={6}
                        value={contact.pincode}
                        onChange={(event) => {
                          const value = event.target.value.replace(/\D/g, '');
                          setContactField('pincode', value);
                          setDeliveryEstimate(null);
                          setPinMessage('');
                          setPinMessageIsError(false);
                          setIsCheckingPincode(false);
                          pincodeRequestRef.current += 1;
                        }}
                        onBlur={(event) => checkPincode(event.target.value)}
                        placeholder="e.g. 400001"
                        className={`${FIELD_CLASS} pl-10`}
                      />
                    </div>
                    {pinMessage && (
                      <p aria-live="polite" className={`mt-1 text-[11px] ${pinMessageIsError ? 'text-[#C86D1F]' : 'text-[#66735A]'}`}>
                        {isCheckingPincode && <LoaderCircle className="mr-1 inline h-3 w-3 animate-spin" aria-hidden="true" />}
                        {pinMessage}
                        {deliveryEstimate?.deliveryDate && ` Estimated delivery by ${deliveryEstimate.deliveryDate}.`}
                      </p>
                    )}
                  </FormField>
                  <FormField id="checkout-address" label="Flat / house no. & street">
                    <input id="checkout-address" autoComplete="street-address" required value={contact.address} onChange={(event) => setContactField('address', event.target.value)} placeholder="House, building, street" className={FIELD_CLASS} />
                  </FormField>
                  <FormField id="checkout-landmark" label="Landmark" optional>
                    <input id="checkout-landmark" value={contact.landmark} onChange={(event) => setContactField('landmark', event.target.value)} placeholder="Nearby landmark" className={FIELD_CLASS} />
                  </FormField>
                  <FormField id="checkout-city" label="City">
                    <input id="checkout-city" autoComplete="address-level2" required value={contact.city} onChange={(event) => setContactField('city', event.target.value)} placeholder="City" className={FIELD_CLASS} />
                  </FormField>
                  <FormField id="checkout-state" label="State / Union Territory">
                    <select id="checkout-state" autoComplete="address-level1" required value={contact.state} onChange={(event) => setContactField('state', event.target.value)} className={`${FIELD_CLASS} appearance-auto`}>
                      <option value="" disabled>Select state / UT</option>
                      {INDIAN_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                  </FormField>
                </div>
              </section>

              <section className="rounded-3xl border border-[#E7D6B8] bg-white p-5 sm:p-7">
                <StepHeading number="3" title="Payment method" description="Choose secure online payment or cash on delivery." />
                <div className="space-y-3">
                  <PaymentOption
                    id="prepaid"
                    selected={paymentMethod === 'prepaid'}
                    onSelect={(method) => {
                      setPaymentMethod(method);
                      setPaymentError('');
                    }}
                    icon={CreditCard}
                    title="UPI, cards & netbanking"
                    description="Pay securely in the Cashfree checkout window. This site never collects or stores payment credentials."
                  />

                  <PaymentOption
                    id="cod"
                    selected={paymentMethod === 'cod'}
                    onSelect={(method) => {
                      setPaymentMethod(method);
                      setPaymentError('');
                    }}
                    icon={Banknote}
                    title="Cash on Delivery"
                    description="Your order will be submitted to Shiprocket; COD availability depends on your delivery PIN."
                  />
                </div>
                {paymentError && (
                  <p role="alert" className="mt-3 flex items-start gap-1.5 text-xs text-[#C86D1F]">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {paymentError}
                  </p>
                )}
                {pendingPayment && (
                  <button
                    type="button"
                    onClick={() => verifyPayment(pendingPayment.orderNumber, {
                      poll: true,
                      paymentSessionId: pendingPayment.paymentSessionId,
                      contactValue: pendingPayment.contactValue,
                    })}
                    disabled={isProcessing}
                    className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#C86D1F] px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#9A531D] disabled:opacity-60"
                  >
                    {isProcessing && <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                    Check payment status for {pendingPayment.orderNumber}
                  </button>
                )}
                {pendingPayment?.paymentSessionId && (
                  <button
                    type="button"
                    onClick={resumeCashfreePayment}
                    disabled={isProcessing}
                    className="mt-3 ml-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#231F20] px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white disabled:opacity-60"
                  >
                    {isProcessing && <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                    Resume Cashfree checkout
                  </button>
                )}
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-[#E7D6B8]/30 p-3 text-[11px] leading-relaxed text-[#231F20]/65">
                  <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#66735A]" />
                  Payments are processed by Cashfree. Never send card or UPI credentials to customer support.
                </p>
              </section>
            </form>

            <CheckoutOrderSummary isProcessing={isProcessing} isPending={Boolean(pendingPayment)} />
          </div>
        </main>
      )}
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7D6B8]/50 text-[#C86D1F]">
      <ShoppingBag className="h-6 w-6" />
    </span>
  );
}
