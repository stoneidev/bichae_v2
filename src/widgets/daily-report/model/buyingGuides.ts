/**
 * Category-aware editorial buyer's guides.
 *
 * Keyed by product `category` (case-insensitive). Each guide is split into
 * three columns: how to use, how to choose, and how to read the label.
 * Falls back to a generic skincare guide for unmapped categories.
 */

export interface GuideColumn {
  title: string;
  intro?: string;
  points: { label: string; detail: string }[];
}

export interface BuyingGuide {
  eyebrow: string;
  title: string;
  standfirst: string;
  columns: GuideColumn[];
}

const SUN_CARE_GUIDE: BuyingGuide = {
  eyebrow: 'The Bichae Guide',
  title: 'How to Read, Choose & Use a Sunscreen',
  standfirst:
    'Sunscreen is the single most effective anti-aging and skin-protection step — but only if you pick the right one and use enough of it. Here is what actually matters.',
  columns: [
    {
      title: 'How to use it',
      points: [
        { label: 'Apply enough', detail: 'About two finger-lengths (≈1/4 teaspoon) for the face and neck. Most people use half of what they need and get far less than the labeled SPF.' },
        { label: 'Make it the last step', detail: 'Apply as the final morning skincare step, after moisturizer and before makeup. Wait ~15 minutes before sun exposure.' },
        { label: 'Reapply', detail: 'Every two hours outdoors, and after sweating, swimming, or towel-drying. Indoors away from windows, a single morning application is usually fine.' },
        { label: 'Don’t miss spots', detail: 'Ears, sides of the neck, hairline, and the backs of the hands are the most commonly forgotten — and the first to show sun damage.' },
      ],
    },
    {
      title: 'How to choose a good one',
      points: [
        { label: 'Broad spectrum', detail: 'It must protect against both UVB (burning) and UVA (aging). Look for "broad spectrum" plus a PA rating.' },
        { label: 'SPF 50+ / PA++++', detail: 'SPF measures UVB protection; the Asian "PA" scale (up to PA++++) measures UVA. For daily wear, SPF 50+ PA++++ is the dependable benchmark.' },
        { label: 'A texture you’ll re-use', detail: 'The best sunscreen is the one you will actually reapply. Match the finish — dewy, matte, or invisible — to your skin so it never feels like a chore.' },
        { label: 'Sensitive skin', detail: 'Prefer fragrance-free and low- or no-alcohol formulas. Mineral filters (zinc oxide, titanium dioxide) are gentlest for reactive or post-procedure skin.' },
      ],
    },
    {
      title: 'How to read the label',
      points: [
        { label: 'Chemical (organic) filters', detail: 'Absorb UV and convert it to heat. Modern photostable ones include Tinosorb S/M, Uvinul A Plus, and Uvinul T 150 — broad, elegant, low white-cast.' },
        { label: 'Mineral (inorganic) filters', detail: 'Zinc Oxide and Titanium Dioxide sit on skin and scatter UV. Very tolerable, but can leave a white cast on deeper skin tones.' },
        { label: 'Filter percentage', detail: 'Higher-listed filters and a richer filter blend generally mean more robust, even protection — not just a high SPF number from one ingredient.' },
        { label: 'Watch-outs', detail: 'If your skin is reactive, note "alcohol denat." high on the list and any added "fragrance/parfum." Neither is harmful by default, but both are common irritants.' },
      ],
    },
  ],
};

const GENERIC_GUIDE: BuyingGuide = {
  eyebrow: 'The Bichae Guide',
  title: 'How to Read, Choose & Use This Product',
  standfirst:
    'A few fundamentals make the difference between a product that works for your skin and one that sits in a drawer. Here is how to judge it.',
  columns: [
    {
      title: 'How to use it',
      points: [
        { label: 'Patch test first', detail: 'Apply a small amount to the inner forearm for 24–48 hours before using on the face, especially with active ingredients.' },
        { label: 'Layer thin to thick', detail: 'Apply lightest, most watery textures first and richest last, giving each layer a moment to absorb.' },
        { label: 'Introduce one active at a time', detail: 'Start a new active every 1–2 weeks so you can tell what helps — and what irritates.' },
      ],
    },
    {
      title: 'How to choose a good one',
      points: [
        { label: 'Match it to a concern', detail: 'Buy for a specific goal — hydration, barrier repair, brightening — rather than marketing claims.' },
        { label: 'Short, purposeful formulas', detail: 'A focused ingredient list with meaningful concentrations usually beats a long list of trace "fairy dusting."' },
        { label: 'Suits your skin type', detail: 'Lightweight gels for oily/combination skin; richer creams for dry skin. The right texture is the one you’ll keep using.' },
      ],
    },
    {
      title: 'How to read the label',
      points: [
        { label: 'Order matters', detail: 'Ingredients are listed by descending concentration. The first five tell you most of what a formula really is.' },
        { label: 'Find the actives', detail: 'Locate the hero ingredients and roughly where they sit — an active near the bottom is likely present in token amounts.' },
        { label: 'Know your irritants', detail: 'If your skin is sensitive, watch for high-listed "alcohol denat." and added "fragrance/parfum."' },
      ],
    },
  ],
};

const GUIDES: Record<string, BuyingGuide> = {
  'sun care': SUN_CARE_GUIDE,
};

export function getBuyingGuide(category: string | undefined): BuyingGuide {
  if (!category) return GENERIC_GUIDE;
  return GUIDES[category.trim().toLowerCase()] ?? GENERIC_GUIDE;
}
