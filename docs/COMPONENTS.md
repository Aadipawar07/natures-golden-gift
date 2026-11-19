# Component Inventory — Nature's Golden Gift

| Component | Path | Responsibility | Key Props / State |
| :--- | :--- | :--- | :--- |
| `Navbar` | `src/components/layout/Navbar.jsx` | Compact five-link desktop navigation, homepage announcement strip, tracking/cart utilities, and seven-link mobile menu | `CartContext`, mobile menu state |
| `MobileMenu` | `src/components/layout/MobileMenu.jsx` | Animated full-screen mobile navigation drawer | `isOpen`, `onClose` |
| `CinematicHero` | `src/components/hero/CinematicHero.jsx` | Full-screen layered anime landscape, parallax, floating glass cards, CTAs | `onExplore`, `onQuickAdd` |
| `AmbientParticles` | `src/components/hero/AmbientParticles.jsx` | Shared golden-hour particle animation used by hero art scenes | `reduced` |
| `ScrollStory` | `src/components/storytelling/ScrollStory.jsx` | 4-stage scroll-linked *From Earth to Gold* narrative with progress bar | `stages` from `data/story.js` |
| `OurStoryPage` | `src/components/storytelling/OurStoryPage.jsx` | Farm-to-jar visual story with verification notes and shop conversion | `CartContext`, story data |
| `StoryArtwork` | `src/components/storytelling/StoryArtwork.jsx` | Reusable painterly image frame, grid overlay, optional botanical root line art | `src`, `alt`, `label` |
| `FarmToJarTimeline` | `src/components/storytelling/FarmToJarTimeline.jsx` | Responsive, animated four-step process story with pending-verification labels | `data/ourStory.js` |
| `ValueComparison` | `src/components/storytelling/ValueComparison.jsx` | Supplier-neutral commercial context vs. the brand's intended, unverified standards | `data/ourStory.js` |
| `ProductDiscovery` | `src/components/products/ProductDiscovery.jsx` | Featured jar showcase + 100g/250g/500g pack selector + subscribe toggle | `products`, `onSelectProduct` |
| `CollectionPage` | `src/components/products/CollectionPage.jsx` | Slug-linked shop collection with client-side filtering, sorting, and ritual bundle | `category`, `sort` state |
| `CollectionFilterBar` | `src/components/products/CollectionFilterBar.jsx` | Accessible category filters and sort selector | `activeCategory`, `sortBy` |
| `CollectionProductCard` | `src/components/products/CollectionProductCard.jsx` | Collection card with pack selection and cart quick-add; image and title link to PDP | `product`, selected pack |
| `ProductDetailPage` | `src/components/products/ProductDetailPage.jsx` | Shared slug-driven product detail template, buy state, and sticky add bar | `productSlug`, `CartContext` |
| `ProductGallery` | `src/components/products/ProductGallery.jsx` | Four-view product gallery with accessible thumbnails and animated image changes | `product` |
| `ProductBuyBox` | `src/components/products/ProductBuyBox.jsx` | Dynamic pack pricing, subscription options, quantity, delivery, and accordions | `product`, selection state |
| `ProductDeliveryEstimator` | `src/components/products/ProductDeliveryEstimator.jsx` | Six-digit PIN validation and explicitly demo delivery estimate | `pincode`, `result` |
| `ProductStorySections` | `src/components/products/ProductStorySections.jsx` | Product usage rituals, sample review filters, process note, and cross-sells | `product`, `CartContext` |
| `ProductCard` | `src/components/products/ProductCard.jsx` | Individual pack card with hover image swap, quick-add, and demo rating | `product`, `onAdd`, `onInspect` |
| `ProductModal` | `src/components/products/ProductModal.jsx` | Reusable PDP foundation modal (gallery, pack/qty, subscribe, PIN check) | `product`, `onClose` |
| `DailyRituals` | `src/components/rituals/DailyRituals.jsx` | 3-card editorial rituals section with custom SVG icons | `rituals` from `data/rituals.js` |
| `PurityTransparency` | `src/components/trust/PurityTransparency.jsx` | Interactive before/after slider, credential placeholders, water-test caveat | `sliderPos` state |
| `PurityPromisePage` | `src/components/trust/PurityPromisePage.jsx` | Interactive, illustrative water-settling guide; verification-aware quality pillars, sensory checklist, and draft guarantee terms | `activeStep`, purity promise data |
| `FarmerOrigin` | `src/components/origin/FarmerOrigin.jsx` | Interactive custom SVG India map + sample region/farmer cards | `activeRegion` state |
| `CustomerLove` | `src/components/reviews/CustomerLove.jsx` | Filterable demo testimonial grid/carousel (Cooking, Rituals, Skincare) | `filter` state |
| `JournalRecipes` | `src/components/journal/JournalRecipes.jsx` | Editorial magazine grid + shoppable Golden Milk recipe bundle | `articles`, `onAddBundle` |
| `RitualsRecipesPage` | `src/components/journal/RitualsRecipesPage.jsx` | Filterable shoppable recipe hub, ingredient-pairing spotlight, accessible recipe drawer, and local newsletter preview | `category`, `activeRecipe`, `CartContext` |
| `GiftingBulkPage` | `src/components/gifting/GiftingBulkPage.jsx` | Gifting and bulk inquiry page with preview gift products, cart integration, volume guide, and local-only inquiry confirmation | `CartContext`, `submission` |
| `FaqContactPage` | `src/components/support/FaqContactPage.jsx` | Searchable category-filtered FAQ, contact channels, copy-email action, local contact request preview, and track-order entry point | `query`, `category`, `submission` |
| `TrackOrderPage` | `src/components/support/TrackOrderPage.jsx` | Validates an order ID and contact identifier, then presents an explicitly illustrative demo timeline for the sample order only | `orderId`, `identifier`, `showDemo` |
| `PoliciesPage` | `src/components/support/PoliciesPage.jsx` | Hash-addressable tabs for shipping, returns, privacy, and terms policy drafts | `activeId`, URL hash |
| `FinalConversionBanner` | `src/components/conversion/FinalConversionBanner.jsx` | Atmospheric closing CTA banner | `onShop` |
| `HomeGiftingBanner` | `src/components/conversion/HomeGiftingBanner.jsx` | Homepage gifting and bulk supply callout linking to the gifting page | Static editorial content |
| `Footer` | `src/components/layout/Footer.jsx` | Brand story, links, newsletter form, payment badges, copyright | `email` form state |
| `CartDrawer` | `src/components/cart/CartDrawer.jsx` | Slide-over cart with free-shipping progress, quantity controls, sample upsell, coupon, and express-checkout link | `CartContext` |
| `CouponField` | `src/components/cart/CouponField.jsx` | Applies or removes the shared `PURE10` cart coupon | `CartContext` |
| `CheckoutPage` | `src/components/cart/CheckoutPage.jsx` | Guest address form, demo payment-method selection, validation, and simulated order confirmation | `CartContext`, transient form state |
| `CheckoutOrderSummary` | `src/components/cart/CheckoutOrderSummary.jsx` | Responsive order summary, coupon control, shipping, total, and transparent preview notices | `CartContext` |
| `PincodeChecker` | `src/components/products/PincodeChecker.jsx` | Indian 6-digit PIN-code validator with configurable demo response | `pincode`, `status` |
