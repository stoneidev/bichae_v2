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
  thumbnail_url?: string;
  video_duration?: string;
  likes_count?: string;
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
    id: '045',
    product_id: 'prod_skin1004_sun_serum',
    title: 'SKIN1004 - Madagascar Centella Hyalu-Cica Water-Fit Sun Serum 50ml Twin Pack (2ea)',
    publish_date: 'June 29, 2026',
    is_active_daily: 1,
    full_inci_list: 'Water, Centella Asiatica Extract (98,000ppm), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Niacinamide, Coco-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, 1,2-Hexanediol, Butylene Glycol, Betula Platyphylla Japonica Juice, Ginkgo Biloba Leaf Extract, Camellia Sinensis Leaf Extract, Triticum Vulgare (Wheat) Sprout Extract, Medicago Sativa (Alfalfa) Extract, Brassica Oleracea Italica (Broccoli) Sprout Extract, Eruca Sativa Leaf Extract, Camellia Japonica Leaf Extract, Sodium Hyaluronate (10ppm), Hyaluronic Acid, Hydrolyzed Hyaluronic Acid, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Adenosine, Xanthan Gum, Tocopherol.',
    ewg_status: 'EWG Green Grade Verified',
    editor_note: 'SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum has revolutionized daily sun protection by fusing 98,000ppm of raw Madagascan Centella Asiatica with a golden-ratio Hyalu-Cica complex. Engineered as a featherlight hydrating serum, it glides on seamlessly with zero white cast, heavy greasiness, or eye stinging.'
  },
  product: {
    id: 'prod_skin1004_sun_serum',
    name: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum 50ml Twin Pack (2ea)',
    brand_name: 'SKIN1004 (스킨1004)',
    brand_description: 'A global K-Beauty pioneer dedicated to delivering untouched natural skin healing powered by pure Centella Asiatica harvested from the pristine ecosystems of Madagascar.',
    brand_website: 'https://brand.naver.com/skin1004/products/10420474053',
    category: 'Sun Care',
    description: 'A non-nano chemical sun serum enriched with 98,000ppm Madagascan Centella and Hyaluronic Acid that calms skin irritation while shielding against broad-spectrum UV rays.',
    detailed_story: 'Selected as the #1 Global Sun Serum across trusted retailers, SKIN1004’s Hyalu-Cica Water-Fit Sun Serum combines advanced photostable European UV filters with 7 organic sprout extracts. Its breathable water-fit texture absorbs instantly into sensitive skin, creating a smooth, hydrated canvas under foundation without pilling.',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    volume: '50mL x 2 (Twin Pack 2ea Value Set)',
    skin_type: 'All Skin Types (Ideal for Sensitive, Dehydrated & Acne-Prone)',
    texture: 'Lightweight, ultra-hydrating water-fit fluid serum',
    finish: 'Natural dewy glow with zero white cast or sticky feel',
    how_to_use: 'At the final step of morning skincare, apply an even layer to face, neck, and exposed areas 15 minutes prior to sun exposure. Reapply every 2-3 hours for continuous protection.',
    origin: 'Made in South Korea 🇰🇷',
    pao_expiration: '12 Months after opening / 36 Months unopened',
    msrp_usd: 25.00,
    lowest_price_usd: 18.99,
    best_deal_platform: 'Stylevana Global',
    best_deal_discount: '24% OFF',
    is_authentic: 1
  },
  priceMatrix: [
    {
      id: 'pm_skin1004_1',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'Stylevana Global',
      variant_option: '50mL Twin Pack (2ea Value Set)',
      logo_bg: '#111827',
      logo_color: '#FFF',
      stock_status: 'In Stock (Dispatch 24h)',
      shipping_info: 'Free Express Shipping over $48',
      price_usd: 18.99,
      discount_text: '24% OFF',
      promo_code: 'SVSECRET',
      buy_url: 'https://www.stylevana.com/en_US/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-spf50-pa-twin-pack-50ml-2ea35662.html',
      is_lowest: 1
    },
    {
      id: 'pm_skin1004_2',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'YesStyle Beauty',
      variant_option: '50mL Twin Pack Duo Set',
      logo_bg: '#FF6F61',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Standard International',
      price_usd: 19.18,
      discount_text: '23% OFF',
      promo_code: 'YESSTYLE2026',
      buy_url: 'https://www.yesstyle.com/en/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-twin-pack/info.html/pid.1121503383',
      is_lowest: 0
    },
    {
      id: 'pm_skin1004_3',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'Amazon US Official Store',
      variant_option: '50mL Single Tube (Prime)',
      logo_bg: '#FF9900',
      logo_color: '#000',
      stock_status: 'Prime Fulfillment',
      shipping_info: 'Free Prime 2-Day Shipping',
      price_usd: 13.00,
      discount_text: '35% OFF',
      promo_code: 'PRIME',
      buy_url: 'https://amzn.to/4xTlkLJ',
      is_lowest: 0
    },
    {
      id: 'pm_skin1004_4',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'StyleKorean',
      variant_option: '50mL Twin Pack (2ea)',
      logo_bg: '#E31B23',
      logo_color: '#FFF',
      stock_status: 'In Stock (Direct Dispatch)',
      shipping_info: 'Global Direct Dispatch',
      price_usd: 23.00,
      discount_text: '15% OFF',
      promo_code: 'SKSPRING',
      buy_url: 'https://www.stylekorean.com/product/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-50ml-twin-pack-2ea/1679883343',
      is_lowest: 0
    },
    {
      id: 'pm_skin1004_5',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'Olive Young Global',
      variant_option: '50mL Special Twin Pack',
      logo_bg: '#99E334',
      logo_color: '#000',
      stock_status: 'Official Authorized Partner',
      shipping_info: 'DHL Express 3-5 Days',
      price_usd: 23.80,
      discount_text: '12% OFF',
      promo_code: 'OYGLOBAL10',
      buy_url: 'https://global.oliveyoung.com/product/detail?prdtNo=GA230518746&dataSource=search_result',
      is_lowest: 0
    },
    {
      id: 'pm_skin1004_6',
      product_id: 'prod_skin1004_sun_serum',
      platform_name: 'SKIN1004 Naver Store (KR)',
      variant_option: 'Official Brand Store Duo',
      logo_bg: '#03C75A',
      logo_color: '#FFF',
      stock_status: 'Official Brand Store',
      shipping_info: 'Naver Fast Shipping (KRW 27,650)',
      price_usd: 20.00,
      discount_text: 'MSRP',
      promo_code: 'NAVER',
      buy_url: 'https://brand.naver.com/skin1004/products/10420474053',
      is_lowest: 0
    }
  ],
  keyIngredients: [
    {
      id: 'ki_skin1004_1',
      product_id: 'prod_skin1004_sun_serum',
      name: 'Madagascar Centella Asiatica (98,000ppm)',
      description: 'Harvested from untouched Madagascan micro-climates, this pure 98,000ppm extract is naturally rich in Madecassoside and Asiaticoside to instantly calm UV redness and heal micro-inflammation.',
      tag_color: 'var(--brand-rose)'
    },
    {
      id: 'ki_skin1004_2',
      product_id: 'prod_skin1004_sun_serum',
      name: 'Hyalu-Cica Golden Ratio Bio-Complex',
      description: 'A proprietary synergistic combination of multi-molecular Hyaluronic Acid and Centella Asiatica that quenches deep dermal thirst and locks in long-lasting moisture.',
      tag_color: 'var(--brand-sage)'
    },
    {
      id: 'ki_skin1004_3',
      product_id: 'prod_skin1004_sun_serum',
      name: 'Baby Green 7 Sprout Extracts',
      description: 'A nutrient-dense botanical complex derived from Broccoli, Alfalfa, Wheat Sprout, and Camellia leaves that defends skin cells against free radicals and urban environmental pollution.',
      tag_color: '#3B82F6'
    }
  ],
  socialReviews: [
    {
      id: 'sr_skin1004_yt_1',
      platform: 'YOUTUBE',
      channel_or_user: 'Lab Muffin Beauty Science & James Welsh',
      badge_color: '#FF0000',
      title_or_context: 'SKIN1004 Hyalu-Cica Water-Fit Sun Serum Ultimate Review',
      quote: '"If you hate traditional chemical sunscreens because they feel oily or sting your eyes, SKIN1004 Hyalu-Cica Water-Fit Sun Serum is the absolute holy grail for sensitive skin."',
      metrics: '1.9M Views',
      thumbnail_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      video_duration: '13:20',
      url: 'https://youtube.com'
    },
    {
      id: 'sr_skin1004_reddit_1',
      platform: 'REDDIT',
      channel_or_user: 'r/AsianBeauty • u/sunscreen_obsessed',
      badge_color: '#FF4500',
      title_or_context: 'SKIN1004 Hyalu-Cica Sun Serum Megathread (+1,650 upvotes)',
      quote: '"SKIN1004 Hyalu-Cica Sun Serum is hands down the best sunscreen I have ever used. It absorbs in 10 seconds, leaves no white cast, and sits under foundation like a luxury moisturizer."',
      metrics: '4.9/5 Holy Grail Status',
      url: 'https://reddit.com/r/AsianBeauty'
    },
    {
      id: 'sr_skin1004_insta_1',
      platform: 'INSTAGRAM',
      channel_or_user: '@glow_dermatology',
      badge_color: '#E1306C',
      title_or_context: 'SKIN1004 Hyalu-Cica Twin Pack Swatch Test',
      quote: '"The twin pack on Stylevana and YesStyle is such an incredible deal. Perfect hydrating sunscreen for daily morning routines across all skin tones."',
      metrics: '62k Tagged Posts',
      url: 'https://instagram.com'
    }
  ]
};

const MOCK_ARCHIVE_REPORTS: ArchiveReportItem[] = [
  {
    id: '044',
    title: 'ANUA - PDRN Hyaluronic Capsule 100 Serum 30ml Double Set',
    category: 'Essence & Serum',
    price: '$32.00 USD',
    discount: '33% OFF',
    rating: '4.9',
    tag: 'Bio-PDRN',
    productId: 'prod_anua_pdrn_serum'
  },
  {
    id: '043',
    title: 'UNOVE - Deep Damage Repair Hair Mask 320mL Double Pack',
    category: 'Hair Care',
    price: '$26.40 USD',
    discount: '37% OFF',
    rating: '4.9',
    tag: 'Salon Clinic',
    productId: 'prod_unove_hair_mask'
  },
  {
    id: '042',
    title: 'Beauty of Joseon - Relief Sun: Rice + Probiotics 50ml',
    category: 'Sun Care',
    price: '$11.80 USD',
    discount: '34% OFF',
    rating: '4.9',
    tag: 'EWG Green',
    productId: 'prod_boj_sun'
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

type D1Like = {
  prepare: (q: string) => {
    bind: (...args: unknown[]) => { first: () => Promise<unknown>; all: () => Promise<{ results: Record<string, unknown>[] }> };
    first: () => Promise<unknown>;
    all: () => Promise<{ results: Record<string, unknown>[] }>;
  };
};

function getDb(): D1Like | undefined {
  try {
    const context = getRequestContext();
    const db = (context?.env as Record<string, unknown>)?.DB as D1Like | undefined;
    if (db && typeof db.prepare === 'function') return db;
  } catch {
    /* no request context (local/build) */
  }
  return undefined;
}

/**
 * Full report payload for a specific report id — powers the permanent
 * /report/[id] pages. Falls back to the mock report when its id matches or
 * when no DB is available (local dev / static build).
 */
export async function getReportByIdFromDb(id: string): Promise<FullDailyReportPayload | null> {
  const db = getDb();
  if (db) {
    try {
      const reportRes = await withTimeout(db.prepare('SELECT * FROM reports WHERE id = ?').bind(id).first());
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
    } catch (err) {
      console.warn('D1 report-by-id query failed, falling back to mock:', err);
    }
  }

  if (MOCK_DAILY_REPORT.report.id === id) return MOCK_DAILY_REPORT;

  // Local/build fallback: archived ids have no full mock payload, so synthesize
  // one from the archive summary on top of the base report shape. Real D1 has
  // complete rows for every report, so this branch only runs without a DB.
  const archived = MOCK_ARCHIVE_REPORTS.find((a) => a.id === id);
  if (archived) {
    return {
      ...MOCK_DAILY_REPORT,
      report: { ...MOCK_DAILY_REPORT.report, id: archived.id, title: archived.title, is_active_daily: 0 },
      product: { ...MOCK_DAILY_REPORT.product, category: archived.category, name: archived.title },
    };
  }
  return null;
}

export interface ReportSummary {
  id: string;
  title: string;
  publishDate: string;
}

/**
 * Lightweight list of every report (active + archived) for the sitemap and
 * cross-linking. Sorted newest-first.
 */
export async function getAllReportSummariesFromDb(): Promise<ReportSummary[]> {
  const db = getDb();
  if (db) {
    try {
      const res = await withTimeout(db.prepare('SELECT id, title, publish_date FROM reports ORDER BY id DESC').all());
      if (res && res.results) {
        return res.results.map((row: Record<string, unknown>) => ({
          id: String(row.id || ''),
          title: String(row.title || ''),
          publishDate: String(row.publish_date || ''),
        }));
      }
    } catch (err) {
      console.warn('D1 report-summaries query failed, falling back to mock:', err);
    }
  }

  // Mock fallback: the active report plus the archived ones.
  const archived = MOCK_ARCHIVE_REPORTS.map((a) => ({ id: a.id, title: a.title, publishDate: '' }));
  return [
    { id: MOCK_DAILY_REPORT.report.id, title: MOCK_DAILY_REPORT.report.title, publishDate: MOCK_DAILY_REPORT.report.publish_date },
    ...archived,
  ];
}
