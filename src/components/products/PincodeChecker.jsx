import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateIndianPincode } from '../../utils/pincode';

export function PincodeChecker({ compact = false }) {
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    setResult(validateIndianPincode(pin));
  };

  return (
    <div className={compact ? 'mt-3' : 'mt-5 pt-5 border-t border-[#E7D6B8]'}>
      <label
        htmlFor="pincode-input"
        className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-[#231F20]/75 mb-2"
      >
        <MapPin className="w-3.5 h-3.5 text-[#C86D1F]" />
        <span>Check Delivery Availability (India PIN)</span>
      </label>
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          id="pincode-input"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          placeholder="e.g. 400001"
          className="flex-1 min-w-0 px-3.5 py-2 rounded-full bg-white border border-[#B8A67D]/50 text-sm text-[#231F20] placeholder:text-[#231F20]/40 focus:border-[#C86D1F] focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-[#231F20] text-[#F9F6F0] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#C86D1F] transition-colors"
        >
          Check
        </button>
      </form>
      {result && (
        <p
          className={`mt-2 flex items-start gap-1.5 text-xs leading-snug ${
            result.valid ? 'text-[#66735A]' : 'text-[#C86D1F]'
          }`}
        >
          {result.valid ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{result.message}</span>
        </p>
      )}
    </div>
  );
}
