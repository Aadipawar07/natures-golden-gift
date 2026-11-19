let sdkPromise;

export function loadCashfreeSdk() {
  if (window.Cashfree) return Promise.resolve(window.Cashfree);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[data-cashfree-sdk="v3"]'
    );
    const script = existingScript || document.createElement('script');

    const handleLoad = () => {
      if (window.Cashfree) resolve(window.Cashfree);
      else reject(new Error('Cashfree checkout could not be loaded.'));
    };
    const handleError = () => {
      script.remove();
      reject(new Error('Cashfree checkout could not be loaded.'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
    if (!existingScript) {
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.dataset.cashfreeSdk = 'v3';
      document.head.appendChild(script);
    }
  }).catch((error) => {
    sdkPromise = null;
    throw error;
  });

  return sdkPromise;
}

export function createCashfreeClient(CashfreeConstructor) {
  const configuredMode = import.meta.env.VITE_CASHFREE_ENV || 'sandbox';
  const mode = configuredMode.toLowerCase();
  if (!['sandbox', 'production'].includes(mode)) {
    throw new Error('VITE_CASHFREE_ENV must be "sandbox" or "production".');
  }
  return CashfreeConstructor({ mode });
}
