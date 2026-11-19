import React, { useEffect } from 'react';
import { CartProvider, useCart } from './hooks/useCart';
import { Navbar } from './components/layout/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { ScrollStory } from './components/storytelling/ScrollStory';
import { OurStoryPage } from './components/storytelling/OurStoryPage';
import { ProductDiscovery } from './components/products/ProductDiscovery';
import { DailyRituals } from './components/rituals/DailyRituals';
import { PurityTransparency } from './components/trust/PurityTransparency';
import { PurityPromisePage } from './components/trust/PurityPromisePage';
import { FarmerOrigin } from './components/origin/FarmerOrigin';
import { CustomerLove } from './components/reviews/CustomerLove';
import { JournalRecipes } from './components/journal/JournalRecipes';
import { RitualsRecipesPage } from './components/journal/RitualsRecipesPage';
import { GiftingBulkPage } from './components/gifting/GiftingBulkPage';
import { FaqContactPage } from './components/support/FaqContactPage';
import { TrackOrderPage } from './components/support/TrackOrderPage';
import { PoliciesPage } from './components/support/PoliciesPage';
import { FinalConversionBanner } from './components/conversion/FinalConversionBanner';
import { HomeGiftingBanner } from './components/conversion/HomeGiftingBanner';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { ProductModal } from './components/products/ProductModal';
import { SearchModal } from './components/ui/SearchModal';
import { CollectionPage } from './components/products/CollectionPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { DEFAULT_PRODUCT, findProductBySlug } from './data/products';

function StorefrontShell() {
  const { toastMessage } = useCart();
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const isCollectionPage = pathname === '/shop';
  const isOurStoryPage = pathname === '/our-story';
  const isPurityPromisePage = pathname === '/purity-promise';
  const isRitualsRecipesPage = pathname === '/rituals';
  const isGiftingBulkPage = pathname === '/gifting';
  const isFaqContactPage = pathname === '/faq-contact';
  const isTrackOrderPage = pathname === '/track-order';
  const isPoliciesPage = pathname === '/policies';
  const isProductPage = pathname === '/product' || pathname.startsWith('/product/');
  const isCheckoutPage = pathname === '/checkout';
  const productSlug =
    pathname.split('/')[2] ||
    new URLSearchParams(window.location.search).get('slug') ||
    new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    if (isCheckoutPage) {
      document.title = `Secure Checkout — Nature's Golden Gift`;
      return;
    }
    if (isOurStoryPage) {
      document.title = `Our Story — Nature's Golden Gift`;
      return;
    }
    if (isPurityPromisePage) {
      document.title = `Purity & Quality Promise — Nature's Golden Gift`;
      return;
    }
    if (isRitualsRecipesPage) {
      document.title = `Rituals & Recipes — Nature's Golden Gift`;
      return;
    }
    if (isGiftingBulkPage) {
      document.title = `Gifting & Bulk Orders — Nature's Golden Gift`;
      return;
    }
    if (isFaqContactPage) {
      document.title = `FAQ & Contact Us — Nature's Golden Gift`;
      return;
    }
    if (isTrackOrderPage) {
      document.title = `Track Order — Nature's Golden Gift`;
      return;
    }
    if (isPoliciesPage) {
      document.title = `Legal & Store Policies — Nature's Golden Gift`;
      return;
    }
    const product = productSlug ? findProductBySlug(productSlug) : DEFAULT_PRODUCT;
    document.title = isProductPage && product
      ? `${product.name} — Nature's Golden Gift`
      : isCollectionPage
        ? "Shop the Pure Haldi Collection — Nature's Golden Gift"
        : "Nature's Golden Gift — Nature's Purest Gold, From Farm to Kitchen";
  }, [isCheckoutPage, isCollectionPage, isFaqContactPage, isGiftingBulkPage, isOurStoryPage, isPoliciesPage, isProductPage, isPurityPromisePage, isRitualsRecipesPage, isTrackOrderPage, productSlug]);

  if (isCheckoutPage) return <CheckoutPage />;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#231F20]">
      <Navbar />

      <main className="flex-1">
        {isCollectionPage ? (
          <CollectionPage />
        ) : isOurStoryPage ? (
          <OurStoryPage />
        ) : isPurityPromisePage ? (
          <PurityPromisePage />
        ) : isRitualsRecipesPage ? (
          <RitualsRecipesPage />
        ) : isGiftingBulkPage ? (
          <GiftingBulkPage />
        ) : isFaqContactPage ? (
          <FaqContactPage />
        ) : isTrackOrderPage ? (
          <TrackOrderPage />
        ) : isPoliciesPage ? (
          <PoliciesPage />
        ) : isProductPage ? (
          <ProductDetailPage productSlug={productSlug} />
        ) : (
          <>
            <CinematicHero />
            <ScrollStory />
            <ProductDiscovery />
            <DailyRituals />
            <PurityTransparency />
            <FarmerOrigin />
            <CustomerLove />
            <JournalRecipes />
            <HomeGiftingBanner />
            <FinalConversionBanner />
          </>
        )}
      </main>

      <Footer />

      <CartDrawer />
      <ProductModal />
      <SearchModal />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#231F20] text-[#F9F6F0] text-xs font-medium shadow-xl border border-[#F2C56B]/30"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StorefrontShell />
    </CartProvider>
  );
}
