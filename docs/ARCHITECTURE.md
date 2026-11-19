# Architecture — Nature's Golden Gift

## 1. Technology Stack
- **Framework**: React 18 (functional components, hooks)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 + custom CSS variables (`src/styles/tokens.css`)
- **Animations**: Framer Motion + custom IntersectionObserver / scroll-progress hooks (single unified motion system to avoid duplicate runtime overhead and respect `prefers-reduced-motion`)
- **Icons**: Lucide React + custom botanical SVG line-art icons
- **Fonts**: `Cormorant Garamond` (editorial serif display) & `Plus Jakarta Sans` / `Inter` (clean sans-serif UI)

## 2. Application Structure
```text
src/
├── assets/          # Centralized image manifest & asset paths
├── components/
│   ├── layout/      # Navbar, MobileMenu, Footer, ScrollProgress
│   ├── hero/        # CinematicHero, FloatingCards, ParticleCanvas
│   ├── storytelling/# ScrollStory and the farm-to-jar OurStoryPage
│   ├── products/    # CollectionPage, ProductDetailPage, buy box, gallery, product cards
│   ├── rituals/     # DailyRituals, RitualIcon
│   ├── trust/       # PurityTransparency, BeforeAfterSlider, WaterTestGuide
│   ├── origin/      # FarmerOrigin, IndiaOriginMap
│   ├── reviews/     # CustomerLove (filterable demo reviews)
│   ├── journal/     # JournalRecipes, ShoppableRecipeCard
│   ├── conversion/  # FinalConversionBanner
│   ├── cart/        # CartDrawer, coupon controls, express checkout and confirmation
│   └── ui/          # MagneticButton, GlassCard, SectionHeading, SearchModal
├── data/            # Configurable products, rituals, regions, reviews, journal
├── hooks/           # useCart, useScrollProgress, useReducedMotion, useParallax
├── styles/          # tokens.css, global.css
├── utils/           # currency, pincode validation, storage helpers
├── App.jsx
└── main.jsx
```

## 3. Page Routing
- Native path handling in `App.jsx` renders the home page at `/`, the collection at `/shop`, the farm-to-jar story at `/our-story`, the purity promise at `/purity-promise`, the rituals and recipes journal at `/rituals`, gifting and bulk orders at `/gifting`, FAQ and contact at `/faq-contact`, order tracking preview at `/track-order`, the tabbed policy preview at `/policies`, the shared product template at `/product/:slug`, and the express checkout preview at `/checkout`.
- Product links from the home grid, collection cards, and search results use the same slug route.
- Opening `/product` without a slug selects the Heirloom Everyday Haldi Powder default; unknown slugs render a collection link instead of silently selecting another product.

## 4. State & Cart Architecture
- **CartContext (`src/hooks/useCart.jsx`)**:
  - Persists items to `localStorage` under `ngg_cart_v1`.
  - Supports `addItem(product, variant, purchaseType, qty, options)`, `updateQuantity(key, delta)`, `removeItem(key)`, `clearCart()`.
  - Optional subscription discount and delivery frequency metadata are carried through to the cart drawer.
  - Computes shared subtotal, `PURE10` discount, ₹599 free-shipping progress, ₹49 standard shipping, and estimated total for drawer and checkout.
  - Keeps the optional coupon in tab-scoped session storage so it survives navigation between the drawer and checkout.
  - Controls `isCartOpen`, `isSearchOpen`, and `activeProductModal`.
- **Checkout preview (`src/components/cart/CheckoutPage.jsx`)**: guest contact/address form, selectable demo UPI/card/COD states, and a simulated order confirmation. No payment or delivery provider is connected; card and UPI fields are never persisted or transmitted.
- **Support preview (`src/components/support/`)**: FAQ, contact-form confirmation, order lookup, and policies UI are frontend-only. Configure `VITE_SUPPORT_EMAIL`, `VITE_SUPPORT_WHATSAPP_NUMBER`, `VITE_SUPPORT_PHONE`, and `VITE_SUPPORT_STUDIO_ADDRESS` before publishing contact links; no order, tracking, or contact backend is connected.

## 5. Data Architecture & Honesty Boundaries
All domain data resides in `src/data/` as clean, typed/documented JS modules:
- `products.js`: Home and collection product catalog, slugs, PDP copy, galleries, pack prices, usage rituals, demo reviews, and cross-sells.
- `recipesData.js`: Editorial recipe cards, ingredient checklists, cooking steps, skincare safety notes, and the qualified ingredient-pairing spotlight.
- `gifting.js`: Gifting and bulk inquiry concepts, ready-to-ship gift-box preview products, and illustrative volume tiers.
- `faqData.js`: Searchable support questions and verification-aware draft product and policy guidance.
- `policies.js`: Shipping, returns, privacy, and terms policy preview copy pending business/legal review.
- `collection.js`: Collection exports re-used from `products.js` plus the category list.
- `story.js`: 4 narrative stages with editable origin & processing fields.
- `origin.js`: Sample/configurable regions (Meghalaya, Erode, Sangli) explicitly flagged `isSample: true`.
- `reviews.js`: Compatibility export of product-catalog demo reviews with `isDemo: true`.

## 6. Future Backend Integration Points
- Replace `validateIndianPincodeDemo()` in `src/utils/pincode.js` with Shiprocket/Delhivery API call.
- Connect the checkout preview to a payment provider and delivery service only after production integrations, policies, and required credentials are verified.
- Hydrate `products.js` and `reviews.js` from headless CMS / Shopify Storefront GraphQL API.
