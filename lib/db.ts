import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Product {
  id: string;
  name: string;
  brand_name: string;
  brand_description?: string;
  brand_website?: string;
  category: string;
  description: string;
  detailed_story?: string;
  image_url?: string;
  volume?: string;
  skin_type?: string;
  texture?: string;
  finish?: string;
  how_to_use?: string;
  origin?: string;
  pao_expiration?: string;
  msrp_usd: number;
  lowest_price_usd: number;
  best_deal_platform: string;
  best_deal_discount: string;
  is_authentic: number;
  created_at?: string;
}

export interface PriceItem {
  id: string;
  product_id: string;
  platform_name: string;
  variant_option?: string;
  logo_bg?: string;
  logo_color?: string;
  stock_status: string;
  shipping_info: string;
  price_usd: number;
  promo_code?: string;
  discount_text?: string;
  buy_url: string;
  is_lowest: number;
}

export interface KeyIngredient {
  id: string;
  product_id: string;
  name: string;
  description: string;
  tag_color?: string;
}

export interface CommunityReview {
  id: string;
  platform: 'REDDIT' | 'YOUTUBE' | 'INSTAGRAM';
  channel_or_user: string;
  badge_color: string;
  title_or_context: string;
  quote: string;
  metrics: string;
  url?: string;
}

export interface Report {
  id: string;
  product_id: string;
  title: string;
  publish_date: string;
  is_active_daily: number;
  full_inci_list: string;
  ewg_status?: string;
  editor_note?: string;
}

export interface FullDailyReportPayload {
  report: Report;
  product: Product;
  priceMatrix: PriceItem[];
  keyIngredients: KeyIngredient[];
  socialReviews: CommunityReview[];
}

export interface ArchiveReportItem {
  id: string;
  title: string;
  category: string;
  price: string;
  discount: string;
  rating: string;
  tag: string;
  productId: string;
}

// Fallback Mock Data for Local Node.js Development & Static Build Steps
const MOCK_DAILY_REPORT: FullDailyReportPayload = {
  report: {
    id: '042',
    product_id: 'prod_boj_sun',
    title: 'Beauty of Joseon - Relief Sun: Rice + Probiotics (SPF50+ PA++++) 50ml',
    publish_date: 'June 28, 2026',
    is_active_daily: 1,
    full_inci_list: 'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Coco-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol, Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate.',
    ewg_status: 'EWG Green Grade Verified',
    editor_note: 'Beauty of Joseon Relief Sun has revolutionized daily UV protection by merging 30% organic rice extract with fermented probiotic filters. Formulated to mimic a lightweight hydrating lotion, it absorbs seamlessly into sensitive and acne-prone skin with zero white cast or eye sting.'
  },
  product: {
    id: 'prod_boj_sun',
    name: 'Relief Sun: Rice + Probiotics (SPF50+ PA++)',
    brand_name: 'Beauty of Joseon (조선미녀)',
    brand_description: 'Inspired by traditional Hanbang holistic herbal medicine of the Joseon Dynasty, reinterpreted with modern dermatological science for gentle, effective daily skincare.',
    brand_website: 'https://beautyofjoseon.com',
    category: 'Sun Care',
    description: 'An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts that deeply hydrates, calms, and brightens skin.',
    detailed_story: 'Formulated without artificial fragrance, essential oils, or drying alcohols, Relief Sun features photostable European chemical UV filters (Uvinul A Plus, Uvinul T 150, Tinosorb M, Iscotrizinol). Its nourishing texture feels like a soothing daily moisturizer, making it the globally acclaimed #1 Korean sunscreen for all skin tones.',
    image_url: '/images/beauty_of_joseon_sunscreen.jpg',
    volume: '50ml / 1.69 fl. oz.',
    skin_type: 'All Skin Types (Ideal for Sensitive, Combination & Dry)',
    texture: 'Lightweight, silky fluid lotion cream',
    finish: 'Natural dewy glow without greasy residue or white cast',
    how_to_use: 'At the final step of morning skincare, apply an even, generous layer to face, neck, and exposed areas 15 minutes before sun exposure. Reapply every 2-3 hours during extended outdoor activity.',
    origin: 'Made in South Korea 🇰🇷',
    pao_expiration: '12 Months after opening / 36 Months unopened',
    msrp_usd: 18.00,
    lowest_price_usd: 11.80,
    best_deal_platform: 'Stylevana',
    best_deal_discount: '34% OFF',
    is_authentic: 1
  },
  priceMatrix: [
    {
      id: 'pm_boj_1',
      product_id: 'prod_boj_sun',
      platform_name: 'Stylevana Global',
      variant_option: 'Standard Tube (50ml)',
      logo_bg: '#111827',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Free Express Shipping over $48',
      price_usd: 11.80,
      promo_code: 'INF10BOJ (-10%)',
      discount_text: '34% OFF',
      buy_url: 'https://www.stylevana.com/en_US/beauty-of-joseon-relief-sun-rice-probiotics-spf50-pa-50ml.html',
      is_lowest: 1
    },
    {
      id: 'pm_boj_2',
      product_id: 'prod_boj_sun',
      platform_name: 'Olive Young Global',
      variant_option: 'Special Duo Set (50ml + 50ml)',
      logo_bg: '#99E334',
      logo_color: '#000',
      stock_status: 'Official Authorized Retailer',
      shipping_info: 'DHL Express 3-5 Days',
      price_usd: 23.50,
      promo_code: 'OYSUMMER5',
      discount_text: '25% OFF',
      buy_url: 'https://global.oliveyoung.com/product/detail?prdtNo=GA220113425',
      is_lowest: 0
    },
    {
      id: 'pm_boj_3',
      product_id: 'prod_boj_sun',
      platform_name: 'StyleKorean',
      variant_option: 'Single Unit Pack (50ml)',
      logo_bg: '#E31B23',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Global Direct Dispatch',
      price_usd: 14.00,
      promo_code: 'BEAUTY10',
      discount_text: '22% OFF',
      buy_url: 'https://www.stylekorean.com/shop/beauty-of-joseon-relief-sun-rice-probiotics-spf50-pa-50ml/1638842426/',
      is_lowest: 0
    },
    {
      id: 'pm_boj_4',
      product_id: 'prod_boj_sun',
      platform_name: 'YesStyle Beauty',
      variant_option: 'Standard 50ml Box',
      logo_bg: '#FF6F61',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Standard International',
      price_usd: 14.80,
      promo_code: 'YESSTYLE2026',
      discount_text: '18% OFF',
      buy_url: 'https://www.yesstyle.com/en/beauty-of-joseon-relief-sun-50ml/info.html/pid.1107725235',
      is_lowest: 0
    }
  ],
  keyIngredients: [
    {
      id: 'ki_boj_1',
      product_id: 'prod_boj_sun',
      name: 'Oryza Sativa (Rice) Extract (30%)',
      description: 'Harvested from clean Korean rice fields, rich in vitamins B, C, E, amino acids, and minerals to deeply hydrate and soothe skin barrier.',
      tag_color: 'var(--brand-rose)'
    },
    {
      id: 'ki_boj_2',
      product_id: 'prod_boj_sun',
      name: 'Grain Ferment Probiotics',
      description: 'Lactobacillus/Rice Ferment & Pumpkin Ferment extracts nourish the skin microbiome, boosting cellular elasticity and repair.',
      tag_color: 'var(--brand-sage)'
    },
    {
      id: 'ki_boj_3',
      product_id: 'prod_boj_sun',
      name: 'Niacinamide (Vitamin B3 2%)',
      description: 'Clinical-grade active that regulates sebum production, fades post-acne hyperpigmentation, and enhances natural radiance.',
      tag_color: 'var(--brand-champagne)'
    },
    {
      id: 'ki_boj_4',
      product_id: 'prod_boj_sun',
      name: 'Modern Organic UV Filter Complex',
      description: 'Uvinul A Plus, Tinosorb M, and Uvinul T 150 provide photostable, non-irritating broad-spectrum protection against UVA & UVB rays.',
      tag_color: '#3B82F6'
    }
  ],
  socialReviews: [
    {
      id: 'sr_boj_reddit_1',
      platform: 'REDDIT',
      channel_or_user: 'r/AsianBeauty • u/skincare_addict99',
      badge_color: '#FF4500',
      title_or_context: 'HG Sunscreen Holy Grail Thread (+1,420 upvotes)',
      quote: '"As someone with sensitive combination skin that breaks out from almost every chemical sunscreen, this is pure magic. It sits under foundation like a high-end hydrating primer and never stings my eyes."',
      metrics: 'Verified 4.9/5 Megathread Rating'
    },
    {
      id: 'sr_boj_reddit_2',
      platform: 'REDDIT',
      channel_or_user: 'r/SkincareAddiction • u/dermatology_enthusiast',
      badge_color: '#FF4500',
      title_or_context: 'INCI Formulation Analysis',
      quote: '"The inclusion of modern photostable European filters combined with 30% rice water makes this formulated at a level far superior to standard drugstore US sunscreens."',
      metrics: 'Top Voted Review 2026'
    },
    {
      id: 'sr_boj_yt_1',
      platform: 'YOUTUBE',
      channel_or_user: 'Beauty Within & James Welsh',
      badge_color: '#FF0000',
      title_or_context: 'Comprehensive Sunscreen Battle (2.4M Views)',
      quote: '"If you hate traditional sunscreens because they feel heavy or leave a purple cast on deeper skin tones, Beauty of Joseon is the definitive gold standard solution."',
      metrics: 'Editor Choice Award'
    },
    {
      id: 'sr_boj_insta_1',
      platform: 'INSTAGRAM',
      channel_or_user: '@glow_journal & @kbeauty_curator',
      badge_color: '#E1306C',
      title_or_context: 'Viral Swatch & Finish Test (120k Likes)',
      quote: '"Demonstrating zero white cast across Fitzpatrick skin types I-VI. Absorbs within 30 seconds into a velvety satin glow."',
      metrics: '85,000+ Tagged Posts'
    }
  ]
};

const MOCK_ARCHIVE_REPORTS: ArchiveReportItem[] = [
  {
    id: '041',
    title: 'COSRX - Advanced Snail 96 Mucin Power Essence 100ml',
    category: 'Essence & Serum',
    price: '$12.50 USD',
    discount: '50% OFF',
    rating: '4.9',
    tag: 'EWG Green',
    productId: 'prod_cosrx_snail'
  },
  {
    id: '040',
    title: 'ANUA - Heartleaf 77% Soothing Toner 250ml',
    category: 'Toner & Mist',
    price: '$14.20 USD',
    discount: '35% OFF',
    rating: '4.8',
    tag: 'Acne Safe',
    productId: 'prod_anua_heartleaf'
  },
  {
    id: '039',
    title: 'ROUND LAB - Birch Juice Moisturizing Sunscreen 50ml',
    category: 'Sun Care',
    price: '$13.90 USD',
    discount: '50% OFF',
    rating: '4.9',
    tag: 'Hydrating',
    productId: 'prod_roundlab_birch'
  }
];

function withTimeout<T>(promise: Promise<T>, ms = 1500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('D1 Query Timeout')), ms))
  ]);
}

export async function getDailyReportFromDb(): Promise<FullDailyReportPayload> {
  try {
    let context: ReturnType<typeof getRequestContext> | undefined;
    try {
      context = getRequestContext();
    } catch {
      context = undefined;
    }
    const db = (context?.env as Record<string, unknown>)?.DB as { prepare: (q: string) => { bind: (...args: unknown[]) => { first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> }; first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> } } | undefined;
    if (db && typeof db.prepare === 'function') {
      const reportRes = await withTimeout(db.prepare('SELECT * FROM reports WHERE is_active_daily = 1 LIMIT 1').first());
      if (reportRes) {
        const report = reportRes as Report;
        const productRes = await withTimeout(db.prepare('SELECT * FROM products WHERE id = ?').bind(report.product_id).first());
        const priceRes = await withTimeout(db.prepare('SELECT * FROM price_matrix WHERE product_id = ? ORDER BY price_usd ASC').bind(report.product_id).all());
        const ingredientsRes = await withTimeout(db.prepare('SELECT * FROM key_ingredients WHERE product_id = ?').bind(report.product_id).all());
        const reviewsRes = await withTimeout(db.prepare('SELECT * FROM social_reviews WHERE product_id = ?').bind(report.product_id).all());

        return {
          report,
          product: productRes as unknown as Product,
          priceMatrix: (priceRes.results || []) as unknown as PriceItem[],
          keyIngredients: (ingredientsRes.results || []) as unknown as KeyIngredient[],
          socialReviews: (reviewsRes.results || []) as unknown as CommunityReview[],
        };
      }
    }
  } catch (err) {
    console.warn('D1 Query failed or environment context not present, falling back to local mock payload:', err);
  }

  return MOCK_DAILY_REPORT;
}

export async function getArchiveReportsFromDb(category?: string): Promise<ArchiveReportItem[]> {
  try {
    let context: ReturnType<typeof getRequestContext> | undefined;
    try {
      context = getRequestContext();
    } catch {
      context = undefined;
    }
    const db = (context?.env as Record<string, unknown>)?.DB as { prepare: (q: string) => { bind: (...args: unknown[]) => { first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> }; first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> } } | undefined;
    if (db && typeof db.prepare === 'function') {
      let query = `
        SELECT r.id, r.title, p.category, p.lowest_price_usd, p.best_deal_discount, r.ewg_status, r.product_id
        FROM reports r
        JOIN products p ON r.product_id = p.id
        WHERE r.is_active_daily = 0
      `;
      const bindings: unknown[] = [];
      if (category && category !== 'All Categories' && category !== 'All') {
        query += ' AND p.category = ?';
        bindings.push(category);
      }
      query += ' ORDER BY r.id DESC';

      const stmt = db.prepare(query);
      const res = bindings.length > 0 ? await withTimeout(stmt.bind(...bindings).all()) : await withTimeout(stmt.all());

      if (res && res.results) {
        return res.results.map((row: Record<string, unknown>) => ({
          id: String(row.id || ''),
          title: String(row.title || ''),
          category: String(row.category || ''),
          price: `$${Number(row.lowest_price_usd || 0).toFixed(2)} USD`,
          discount: String(row.best_deal_discount || ''),
          rating: '4.9',
          tag: row.category === 'Sun Care' ? 'Hydrating' : (row.category === 'Toner & Mist' ? 'Acne Safe' : 'EWG Green'),
          productId: String(row.product_id || '')
        }));
      }
    }
  } catch (err) {
    console.warn('D1 Archive Query failed or context not present, falling back to mock:', err);
  }

  if (category && category !== 'All Categories' && category !== 'All') {
    return MOCK_ARCHIVE_REPORTS.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }
  return MOCK_ARCHIVE_REPORTS;
}

export async function getProductByIdFromDb(id: string): Promise<Product | null> {
  try {
    let context: ReturnType<typeof getRequestContext> | undefined;
    try {
      context = getRequestContext();
    } catch {
      context = undefined;
    }
    const db = (context?.env as Record<string, unknown>)?.DB as { prepare: (q: string) => { bind: (...args: unknown[]) => { first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> }; first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> } } | undefined;
    if (db && typeof db.prepare === 'function') {
      const res = await withTimeout(db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first());
      if (res) return res as Product;
    }
  } catch (err) {
    console.warn('D1 Product query error:', err);
  }
  if (MOCK_DAILY_REPORT.product.id === id) return MOCK_DAILY_REPORT.product;
  return null;
}
