import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, MapPin } from 'lucide-react';
import { apiGet } from '../../services/api';
import { validateIndianPincode } from '../../utils/pincode';

function getEstimatedDate(days) {
  const date = new Date(Date.now() + days * 86_400_000);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function ProductDeliveryEstimator() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const requestId = useRef(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentRequestId = requestId.current + 1;
    requestId.current = currentRequestId;
    const validation = validateIndianPincode(pincode);
    if (!validation.valid) {
      setIsChecking(false);
      setResult({ valid: false, message: validation.message });
      return;
    }

    setIsChecking(true);
    setResult(null);
    try {
      const serviceability = await apiGet(
        `shipping/check-pincode/${validation.pincode}`
      );
      if (requestId.current !== currentRequestId) return;
      if (!serviceability.available) {
        setResult({
          valid: false,
          message: `No courier service is currently available for PIN ${validation.pincode}.`,
        });
        return;
      }

      const date = serviceability.estimatedDeliveryDays
        ? getEstimatedDate(serviceability.estimatedDeliveryDays)
        : null;
      setResult({
        valid: true,
        message: date
          ? `Estimated delivery by ${date}${serviceability.courierName ? ` via ${serviceability.courierName}` : ''}.`
          : `Courier service is available for PIN ${validation.pincode}${serviceability.courierName ? ` via ${serviceability.courierName}` : ''}.`,
        codAvailable: serviceability.codAvailable,
      });
    } catch (error) {
      if (requestId.current === currentRequestId) {
        setResult({
          valid: false,
          message: error.message || 'Could not check courier serviceability.',
        });
      }
    } finally {
      if (requestId.current === currentRequestId) setIsChecking(false);
    }
  };

  return (
    <div className="border-t border-[#E7D6B8] pt-5">
      <label
        htmlFor="pdp-pincode"
        className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#231F20]/70"
      >
        <MapPin className="h-3.5 w-3.5 text-[#C86D1F]" aria-hidden="true" />
        Check delivery estimate
      </label>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          id="pdp-pincode"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          value={pincode}
          onChange={(event) => {
            requestId.current += 1;
            setPincode(event.target.value.replace(/\D/g, ''));
            setResult(null);
            setIsChecking(false);
          }}
          placeholder="Enter 6-digit Pincode"
          className="min-w-0 flex-1 rounded-full border border-[#E7D6B8] bg-white px-4 py-2.5 text-xs text-[#231F20] placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isChecking}
          className="rounded-full bg-[#231F20] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C86D1F]"
        >
          {isChecking ? 'Checking…' : 'Check'}
        </button>
      </form>
      <p className="mt-2 text-[10px] leading-relaxed text-[#231F20]/50">
        Live courier serviceability and COD availability are checked with Shiprocket.
      </p>
      {isChecking && (
        <p role="status" className="mt-2 flex items-center gap-1.5 text-xs text-[#8A5429]">
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          Checking courier serviceability…
        </p>
      )}
      {result && (
        <p
          role="status"
          className={`mt-2 flex items-start gap-1.5 text-xs ${
            result.valid ? 'text-[#66735A]' : 'text-[#C86D1F]'
          }`}
        >
          {result.valid ? (
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
          <span>
            {result.message}
            {result.valid && ` COD ${result.codAvailable ? 'is available' : 'is not available'} for this PIN.`}
          </span>
        </p>
      )}
    </div>
  );
}
