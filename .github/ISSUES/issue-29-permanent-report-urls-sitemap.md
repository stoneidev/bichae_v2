# Issue #29: SEO Foundation — Permanent Report URLs + Dynamic Sitemap

## Status: COMPLETED

GitHub: https://github.com/stoneidev/bichae_v2/issues/29

## Why
Affiliate revenue needs accumulating search index. The site rewrote a single home page daily, so past reports vanished, the sitemap held only `/` and `/about`, and archive cards linked to `href="#"`. Net indexable pages ≈ 0 — no SEO compounding was possible.

## What shipped
- `getReportByIdFromDb(id)` and `getAllReportSummariesFromDb()` in `lib/db.ts` (D1 + mock fallback; archived ids synthesized in mock so local dev renders them).
- `GET /api/reports/[id]` edge route.
- `/report/[id]` server-rendered page with per-product `generateMetadata` (title, description, canonical, OpenGraph, Twitter) — content is server-rendered (`initialData`) for crawlability, with `notFound()` for unknown ids.
- `DailyReportWidget` gained optional `reportId` + `initialData` props (no client fetch when server data is supplied).
- Dynamic `sitemap.ts` (edge) listing every report URL.
- Archive cards now deep-link to `/report/[id]`.

## Verified
- Build + lint clean; new routes registered (`/report/[id]`, `/api/reports/[id]`, dynamic `/sitemap.xml`).
- `/report/044` and `/report/041` render with product-specific `<title>`; `/report/999` → not found.
- sitemap.xml emits `/report/*` for all reports.

## Follow-ups (separate issues) — required to actually hit revenue goal
- Affiliate tracking link wrapper + `/go/[retailer]` redirect + `rel="sponsored nofollow"` + FTC/공정위 disclosure. **(prerequisite for any earnings — buy_urls currently have no affiliate tags)**
- Comparison/listicle pages ("Best Korean Sunscreens 2026", "A vs B") targeting high-intent keywords.
- Category hub pages (`/sun-care`, `/toner`) for topical authority.
- Custom domain, Google Search Console + Analytics, real affiliate program sign-ups.
