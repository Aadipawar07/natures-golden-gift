import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ngg_cart_v1';
const COUPON_STORAGE_KEY = 'ngg_coupon_v1';
export const FREE_SHIPPING_THRESHOLD = 599;
export const SHIPPING_FEE = 49;
const PROMO_CODE = 'PURE10';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      return sessionStorage.getItem(COUPON_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) sessionStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      else sessionStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {
      // Session storage is optional; the coupon still works for the current page.
    }
  }, [appliedCoupon]);

  useEffect(() => {
    if (items.length === 0 && appliedCoupon) setAppliedCoupon('');
  }, [items.length, appliedCoupon]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 2800);
  };

  const addItem = (product, variant, purchaseType = 'one-time', qty = 1, options = {}) => {
    const subscriptionDiscountPercent =
      purchaseType === 'subscribe'
        ? options.discountPercent ?? product.subscribeDiscountPercent ?? 10
        : null;
    const unitPrice =
      purchaseType === 'subscribe'
        ? Math.round(variant.price * (1 - subscriptionDiscountPercent / 100))
        : variant.price;

    const subscriptionFrequency =
      purchaseType === 'subscribe' ? options.subscriptionFrequency || null : null;
    const itemKey = `${product.id}__${variant.id}__${purchaseType}${
      subscriptionFrequency ? `__${subscriptionFrequency}d` : ''
    }`;

    setItems((prev) => {
      const existing = prev.find((i) => i.key === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.key === itemKey ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.name,
          image: product.image,
          variantId: variant.id,
          variantLabel: variant.label,
          purchaseType,
          subscriptionDiscountPercent,
          subscriptionFrequency,
          unitPrice,
          quantity: qty,
        },
      ];
    });

    showToast(`Added ${variant.label} to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (key, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon('');
  };

  const applyCoupon = (code) => {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === PROMO_CODE) {
      setAppliedCoupon(normalizedCode);
      return true;
    }
    setAppliedCoupon('');
    return false;
  };

  const removeCoupon = () => setAppliedCoupon('');

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const discount = appliedCoupon === PROMO_CODE ? Math.round(subtotal * 0.1) : 0;
    const progress = Math.min(
      100,
      Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
    );
    const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const estimatedShipping =
      subtotal === 0 ? 0 : amountRemaining === 0 ? 0 : SHIPPING_FEE;
    const total = subtotal - discount + estimatedShipping;

    return {
      subtotal,
      itemCount,
      discount,
      appliedCoupon,
      total,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      progress,
      amountRemaining,
      estimatedShipping,
    };
  }, [items, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        activeProduct,
        setActiveProduct,
        toastMessage,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        ...summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
