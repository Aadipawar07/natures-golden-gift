# Testing & Verification Plan — Nature's Golden Gift

## 1. Build & Syntax Checks
- Verify all ES modules, JSX syntax, CSS tokens, and asset paths resolve cleanly.
- Standard project commands:
  - `npm run dev` — Local Vite dev server
  - `npm run build` — Production bundle build
  - `npm run preview` — Preview production build

## 2. Functional Interaction Checklist
- [x] Navbar transitions cleanly on scroll; mobile menu opens/closes with keyboard Escape support.
- [x] Search modal filters products, rituals, and journal topics.
- [x] Hero CTAs scroll smoothly to `#products` and `#story`.
- [x] Scroll Story updates active stage indicator across all 4 narrative stages.
- [x] Product Discovery pack size selector (100g / 250g / 500g) and One-Time vs. Subscribe toggle update price dynamically.
- [x] Quick Add & Add to Cart open/update the Cart Drawer and increment navbar badge.
- [x] Cart Drawer supports quantity `+`/`-`, item removal, free shipping progress bar, and `localStorage` persistence across page reloads.
- [x] Indian 6-digit PIN-code checker validates format (`^[1-9][0-9]{5}$`) and displays demo availability.
- [x] Purity Before/After slider drags smoothly via mouse, touch, and keyboard arrow keys.
- [x] Origin India SVG map switches active region & sample farmer cards.
- [x] Customer Love filters by *All*, *Cooking*, *Rituals*, and *Skincare*.
- [x] Shoppable Golden Milk recipe adds ingredients to cart in one click.

## 3. Responsive & Accessibility Checks
- Tested viewports: `375px` (Mobile), `768px` (Tablet), `1280px` (Laptop), `1440px` (Desktop).
- Verified `prefers-reduced-motion: reduce` disables parallax and continuous particle motion.
- Verified zero broken images and zero horizontal overflow (`overflow-x: hidden` on root container).
