# Issue #24: Retailer Conversion & Trust Signal Overhaul

## Status: IN PROGRESS

GitHub: https://github.com/stoneidev/bichae_v2/issues/24

## Goal
Drive trusted **click-through to each retailer** from this page. Add conversion mechanics and trust signals at world-class editorial-commerce standard.

## Findings (headless-browser review)
1. **Trust signals thin** — self-asserted badges only; no "why trust us" (verification method, data source, last-updated timestamp). Price lacks context (when checked, FX basis, shipping included?).
2. **Retailer rows weak** — initial-box logos ("ST"/"OL") read as low-trust; Stylevana & StyleKorean both show "ST". No rating / shipping reliability / authenticity guarantee. No total-landed (price + shipping) comparison.
3. **Flat CTA hierarchy** — only "Shop Lowest" stands out; mobile table is horizontal-scroll (poor conversion) → needs card layout.
4. **Comprehensiveness** — add a trust badge strip (Authorized Retailer / Secure Checkout / Authenticity Guarantee), a "How we verify" transparency block, and an update timestamp.

## Checklist
- [ ] Price table header: trust context (updated time, FX/shipping note).
- [ ] Redesign retailer rows/cards: clear identity, authenticity/shipping trust indicators, total-cost awareness.
- [ ] Mobile retailer card layout (no horizontal scroll).
- [ ] Strengthen CTA hierarchy (primary emphasis, natural-language copy).
- [ ] Trust badge strip + "How we verify" transparency section.
- [ ] Surface verification summary near the top/hero.
- [ ] Accessibility (keyboard/aria), dark mode, responsive verified; build & lint pass.
