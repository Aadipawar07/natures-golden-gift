# Design System — Nature's Golden Gift

## 1. Visual Direction
**Botanical Apothecary × Cinematic Anime Landscape Painting × Editorial Luxury Commerce.**
Calm, sunlit, nostalgic, and tactile—avoiding sterile white SaaS templates and neon gradients.

## 2. Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--bg-linen` | `#F9F6F0` | Primary page background (warm linen) |
| `--text-charcoal` | `#231F20` | Primary body & heading text |
| `--accent-saffron` | `#C86D1F` | Primary CTAs, active highlights, badges |
| `--sand` | `#E7D6B8` | Secondary surfaces, borders, dividers |
| `--olive` | `#B8A67D` | Muted accents, captions, subtle borders |
| `--botanical` | `#66735A` | Botanical tags, trust indicators, map accents |
| `--turmeric` | `#F2C56B` | Golden highlights, ambient glow, particles |
| `--white-soft` | `#FFFFFF` | High-contrast card surfaces & inverted text |
| `--dark-forest` | `#171B17` | Dark cinematic storytelling & footer base |
| `--dark-moss` | `#262B22` | Elevated dark section cards |

## 3. Typography
- **Display / Editorial Serif**: `'Cormorant Garamond', Georgia, serif` — oversized headings (`clamp(2.5rem, 6vw, 5.5rem)`), tight tracking (`-0.02em`), expressive line breaks.
- **Body / UI Sans**: `'Inter', system-ui, -apple-system, sans-serif` — crisp 15–17px body copy, `1.65` line height, uppercase tracked micro-labels (`0.14em`).

## 4. Glassmorphism & Surface Rules
- Use `backdrop-filter: blur(14px)` with `rgba(249, 246, 240, 0.72)` (light) or `rgba(23, 27, 23, 0.68)` (dark) **only** on:
  1. Scrolled navigation bar
  2. Hero floating storytelling cards
  3. Product quick-overlay badges & cart/modal surfaces
- Standard editorial cards use solid warm linen, sand (`#E7D6B8`), or `#262B22` with `1px solid` organic borders.

## 5. Motion Language
- **Easing**: Smooth botanical ease `[0.22, 1, 0.36, 1]`.
- **Parallax**: Subtle desktop-only mouse/scroll depth on hero layers; disabled on mobile and `prefers-reduced-motion`.
- **Particles**: Lightweight GPU-composited golden dust motes in Hero and Final Conversion Banner.
