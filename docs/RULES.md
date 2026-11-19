# Development Rules — Nature's Golden Gift

1. **Never Destroy Working Functionality**: Inspect files before editing; preserve existing working state and interactions.
2. **No Duplicate Components**: Reuse shared primitives (`GlassCard`, `MagneticButton`, `SectionHeading`) rather than duplicating markup.
3. **Zero Fabricated Business Claims**:
   - Never invent FSSAI registration numbers, organic certification IDs, lab reports, or curcumin percentages.
   - Clearly label unverified credentials as placeholders pending verification.
   - Clearly label sample reviews as `[Demo Review]` and sample farmer/region profiles as `[Sample Profile]`.
   - Include an explicit scientific caveat on the at-home water test guide stating it is **not** a reliable scientific method to verify purity or detect adulteration.
4. **No Broken Assets**: Centralize all image paths in `src/assets/media.js` and verify every referenced image file exists on disk.
5. **Consistent Design Tokens**: Use CSS variables and Tailwind theme tokens from `DESIGN.md` (`#F9F6F0` warm linen, `#231F20` deep charcoal, `#C86D1F` burnt saffron, etc.).
6. **Selective Glassmorphism**: Reserve frosted glass panels for floating hero cards, navigation bar on scroll, and interactive overlays—never apply glassmorphism to every card indiscriminately.
7. **Motion & Accessibility Discipline**:
   - Animate only `transform` and `opacity` where possible.
   - Honor `prefers-reduced-motion: reduce`.
   - Maintain keyboard navigation, ARIA labels, and visible focus outlines.
   - Ensure zero horizontal overflow across mobile (375px), tablet (768px), and desktop (1440px).
8. **Single Animation System**: Use Framer Motion + lightweight scroll-progress hooks consistently without mixing competing scroll-hijacking libraries.
9. **Prioritize Working Code**: Every interactive control (cart drawer, pack selector, pincode checker, before/after slider, review filter, recipe quick-add, mobile menu) must function end-to-end.
