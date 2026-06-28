# Issue #24: Retailer Conversion & Trust Signal Overhaul

## Status: COMPLETED

GitHub: https://github.com/stoneidev/bichae_v2/issues/24

## Goal
Drive trusted **click-through to each retailer** from this page. Add conversion mechanics and trust signals at world-class editorial-commerce standard.

## Findings (headless-browser review)
1. **Trust signals thin** — self-asserted badges only; no "why trust us" (verification method, data source, last-updated timestamp). Price lacks context (when checked, FX basis, shipping included?).
2. **Retailer rows weak** — initial-box logos ("ST"/"OL") read as low-trust; Stylevana & StyleKorean both show "ST". No rating / shipping reliability / authenticity guarantee. No total-landed (price + shipping) comparison.
3. **Flat CTA hierarchy** — only "Shop Lowest" stands out; mobile table is horizontal-scroll (poor conversion) → needs card layout.
4. **Comprehensiveness** — add a trust badge strip (Authorized Retailer / Secure Checkout / Authenticity Guarantee), a "How we verify" transparency block, and an update timestamp.

## Checklist
- [x] Price table header: trust context — live "Verified {date}" dot, "USD, before shipping & duties", "N authorized retailers tracked".
- [x] Redesign retailer rows/cards: distinct monograms (SG/OY/SK no longer collide) + per-row "Authorized" trust label.
- [x] Mobile retailer card layout (no horizontal scroll; verified doc==win at 390px).
- [x] Strengthen CTA copy ("Shop Lowest" / "View"), added reusable `.cta-primary`/`.cta-secondary`.
- [x] Trust badge strip (Authorized retailers · Authenticity guaranteed · Secure checkout) + "How We Verify" transparency section (Authorized sources / Like-for-like / No paid placement).
- [x] Build & lint pass; dark mode + responsive verified via headless browser.

Note: JSON-LD Product structured data (AggregateOffer + AggregateRating) was also added for SEO/trust.

## Follow-ups (same thread)
- [x] **Removed fabricated promo codes** — the promo codes were invented mock/seed values (INF10BOJ, OYSUMMER5, etc.), not verified. Showing fake codes undermines trust, so the Promo Code column (desktop) and chip (mobile) were removed, along with the unused copy handler/state. Mobile CTA is now full-width.
- [x] **Added a category-aware Buyer's Guide chapter** (`src/widgets/daily-report/model/buyingGuides.ts`) — "How to Read, Choose & Use a Sunscreen" with three columns (how to use / how to choose / how to read the label). Keyed off `product.category` with a generic skincare fallback. New Chapter V; community→VI, maker→VII.
- [x] **Dark-mode legibility fix** — table "Option/Pack" text and review metrics used fixed `--brand-obsidian` (near-black) and were invisible on dark backgrounds; switched to theme-aware `--text-primary`.
