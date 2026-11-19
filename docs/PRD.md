# Product Requirements Document (PRD) — Nature's Golden Gift

## 1. Product Overview
**Nature's Golden Gift** is a frontend-first, conversion-focused e-commerce web experience for a natural Indian turmeric brand. Tagline: *"Nature's purest gold, from farm to kitchen."*

## 2. Business Objectives
Every section of the homepage is engineered to serve at least one core conversion goal:
- **Create desire** through atmospheric anime-inspired agricultural art and macro editorial photography.
- **Build trust** via transparent sourcing placeholders, honest quality education, and zero fabricated claims.
- **Educate** consumers on daily culinary, wellness, and botanical rituals.
- **Remove purchase objections** with pack size options (100g, 250g, 500g), PIN-code delivery check, and clear return/purity policies.
- **Increase cart additions & repeat purchases** through quick-add controls, shoppable recipe bundles, and subscription-ready architecture.

## 3. Target Audience & Personas
1. **Gen-Z Aesthetic & Wellness Explorers** — Drawn to lo-fi/anime visual storytelling, clean apothecary packaging, and golden milk rituals.
2. **Young Urban Professionals** — Seeking quick, trustworthy pantry upgrades and frictionless mobile checkout.
3. **Everyday Indian Home Cooks** — Looking for rich color, aroma, and honest value in 250g/500g family packs.
4. **Health-Conscious Families** — Focused on ingredient transparency, batch traceability, and non-medical wellness education.

## 4. Functional Requirements (Milestone 1 — Homepage & Commerce Foundation)
- **FR-01 Immersive Navigation**: Transparent-to-frosted sticky header with section links, search modal/filter trigger, account placeholder, and live cart badge.
- **FR-02 Cinematic Hero**: Full-screen layered landscape, mouse-responsive desktop parallax, floating translucent storytelling cards, dual CTAs, and scroll indicator.
- **FR-03 Scroll Story (From Earth to Gold)**: 4-stage scroll-linked narrative (*Born From The Earth*, *Grown With Care*, *Carefully Transformed*, *Delivered To Your Kitchen*) with reduced-motion and mobile fallbacks.
- **FR-04 Product Discovery**: Interactive pack-size selector (100g Trial, 250g Everyday, 500g Family), purchase mode toggle (One-Time / Subscribe & Save UI), quick-add to cart, and product detail modal.
- **FR-05 Daily Rituals**: 3-card editorial showcase (*The Culinary Staple*, *The Nighttime Elixir*, *The Botanical Mask*) with custom line-art icons and interactive modal/drawer details.
- **FR-06 Purity & Transparency**: Interactive before/after comparison slider, batch traceability & FSSAI/Organic placeholder panels (explicitly marked as pending verification), and *"Understanding Turmeric Quality"* with honest water-test caveats.
- **FR-07 Farmer & Origin Experience**: Custom SVG India origin map highlighting candidate regions (Meghalaya, Erode, Sangli — marked as sample/configurable), interactive region selector, and sample farmer cards.
- **FR-08 Customer Love**: Filterable review carousel/grid (*All*, *Cooking*, *Rituals*, *Skincare*) with visible `[DEMO REVIEW]` labels.
- **FR-09 Journal & Shoppable Recipes**: Editorial magazine cards + interactive *"Add Ingredients to Cart"* shoppable Golden Milk recipe flow.
- **FR-10 Final Conversion Banner & Premium Footer**: Atmospheric closing CTA, newsletter signup with validation, policy links, and payment method badges.
- **FR-11 Cart Drawer & Commerce System**: Slide-over cart with `localStorage` persistence, quantity +/-/remove, configurable free-shipping progress bar, Indian 6-digit PIN-code checker (demo response), and checkout foundation modal.

## 5. Non-Functional Requirements
- **Performance**: GPU-composited `transform`/`opacity` animations, lazy-loaded below-the-fold images, zero layout shift.
- **Accessibility**: Semantic HTML5 landmarks, keyboard-navigable drawers/modals/sliders, visible focus rings, `prefers-reduced-motion` support, descriptive `alt` attributes.
- **Responsiveness**: Fluid layouts across 375px mobile, 768px tablet, 1280px laptop, and 1440px+ desktop with zero horizontal overflow.

## 6. Out of Scope (Current Frontend Milestone)
- Live payment gateway processing (Razorpay/UPI/Stripe).
- Backend database, user authentication, or live courier API integration.
- Fabricated FSSAI numbers, lab reports, curcumin percentages, or verified customer reviews.
