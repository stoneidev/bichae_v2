import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Product {
  id: string;
  name: string;
  brand_name: string;
  brand_description?: string;
  brand_website?: string;
  category: string;
  description: string;
  volume?: string;
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

export interface SocialReview {
  id: string;
  product_id: string;
  platform: string;
  badge_color: string;
  score_summary: string;
  quote: string;
  analysis_meta: string;
}

export interface Report {
  id: string;
  product_id: string;
  title: string;
  publish_date: string;
  is_active_daily: number;
  full_inci_list: string;
  ewg_status?: string;
}

export interface FullDailyReportPayload {
  report: Report;
  product: Product;
  priceMatrix: PriceItem[];
  keyIngredients: KeyIngredient[];
  socialReviews: SocialReview[];
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
    ewg_status: 'EWG Green Grade Verified'
  },
  product: {
    id: 'prod_boj_sun',
    name: 'Relief Sun: Rice + Probiotics (SPF50+ PA++++)',
    brand_name: 'Beauty of Joseon (조선미녀)',
    brand_description: 'Inspired by traditional Hanbang holistic herbal medicine of the Joseon Dynasty, reinterpreted with modern dermatological science for gentle, effective daily skincare.',
    brand_website: 'https://beautyofjoseon.com',
    category: 'Sun Care',
    description: 'An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts that deeply hydrates and brightens skin without white cast.',
    volume: '50ml',
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
      logo_bg: '#FFF',
      logo_color: 'var(--brand-obsidian)',
      stock_status: 'In Stock',
      shipping_info: 'Free Shipping over $48',
      price_usd: 11.80,
      promo_code: 'INF10BOJ (-10%)',
      discount_text: '34% OFF',
      buy_url: 'https://stylevana.com',
      is_lowest: 1
    },
    {
      id: 'pm_boj_2',
      product_id: 'prod_boj_sun',
      platform_name: 'Olive Young Global',
      logo_bg: '#99E334',
      logo_color: '#000',
      stock_status: 'Official Retailer',
      shipping_info: 'Express Shipping',
      price_usd: 13.50,
      promo_code: undefined,
      discount_text: '25% OFF',
      buy_url: 'https://global.oliveyoung.com',
      is_lowest: 0
    },
    {
      id: 'pm_boj_3',
      product_id: 'prod_boj_sun',
      platform_name: 'StyleKorean',
      logo_bg: '#E31B23',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Global Dispatch',
      price_usd: 14.00,
      promo_code: undefined,
      discount_text: '22% OFF',
      buy_url: 'https://stylekorean.com',
      is_lowest: 0
    }
  ],
  keyIngredients: [
    {
      id: 'ki_boj_1',
      product_id: 'prod_boj_sun',
      name: 'Oryza Sativa (Rice) Extract (30%)',
      description: 'Rich in vitamins B, C, E, amino acids, and minerals to deeply hydrate and soothe irritated skin barrier.',
      tag_color: 'var(--brand-rose)'
    },
    {
      id: 'ki_boj_2',
      product_id: 'prod_boj_sun',
      name: 'Grain Ferment Extracts',
      description: 'Lactobacillus/Rice Ferment helps nourish natural skin microbiome and boost elasticity.',
      tag_color: 'var(--brand-sage)'
    },
    {
      id: 'ki_boj_3',
      product_id: 'prod_boj_sun',
      name: 'Niacinamide (Vitamin B3 2%)',
      description: 'Regulates sebum production, reduces hyperpigmentation, and brightens overall complexions.',
      tag_color: 'var(--brand-champagne)'
    }
  ],
  socialReviews: [
    {
      id: 'sr_boj_1',
      product_id: 'prod_boj_sun',
      platform: 'YOUTUBE',
      badge_color: '#FF0000',
      score_summary: 'Consensus: 4.9 / 5.0',
      quote: '"Universally praised by Hyram, James Welsh, and Gothamista as the holy grail sunscreen for daily wear under makeup."',
      analysis_meta: 'Analyzed across 140+ video reviews'
    },
    {
      id: 'sr_boj_2',
      product_id: 'prod_boj_sun',
      platform: 'INSTAGRAM',
      badge_color: '#E1306C',
      score_summary: 'Trending Tag #beautyofjoseonsunscreen',
      quote: '"Over 85,000+ posts. High engagement on aesthetic texture swatches demonstrating zero white cast and glowing dewiness."',
      analysis_meta: 'Top viral reels in US & Europe'
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

export async function getDailyReportFromDb(): Promise<FullDailyReportPayload> {
  try {
    const context = getRequestContext();
    const db = (context?.env as any)?.DB;
    if (db && typeof db.prepare === 'function') {
      // Execute D1 Query
      const reportRes = await db.prepare('SELECT * FROM reports WHERE is_active_daily = 1 LIMIT 1').first();
      if (reportRes) {
        const report = reportRes as Report;
        const productRes = await db.prepare('SELECT * FROM products WHERE id = ?').bind(report.product_id).first();
        const priceRes = await db.prepare('SELECT * FROM price_matrix WHERE product_id = ? ORDER BY price_usd ASC').bind(report.product_id).all();
        const ingredientsRes = await db.prepare('SELECT * FROM key_ingredients WHERE product_id = ?').bind(report.product_id).all();
        const reviewsRes = await db.prepare('SELECT * FROM social_reviews WHERE product_id = ?').bind(report.product_id).all();

        return {
          report,
          product: productRes as Product,
          priceMatrix: (priceRes.results || []) as PriceItem[],
          keyIngredients: (ingredientsRes.results || []) as KeyIngredient[],
          socialReviews: (reviewsRes.results || []) as SocialReview[],
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
    const context = getRequestContext();
    const db = (context?.env as any)?.DB;
    if (db && typeof db.prepare === 'function') {
      let query = `
        SELECT r.id, r.title, p.category, p.lowest_price_usd, p.best_deal_discount, r.ewg_status, r.product_id
        FROM reports r
        JOIN products p ON r.product_id = p.id
        WHERE r.is_active_daily = 0
      `;
      const bindings: any[] = [];
      if (category && category !== 'All Categories' && category !== 'All') {
        query += ' AND p.category = ?';
        bindings.push(category);
      }
      query += ' ORDER BY r.id DESC';

      const stmt = db.prepare(query);
      const res = bindings.length > 0 ? await stmt.bind(...bindings).all() : await stmt.all();

      if (res && res.results) {
        return res.results.map((row: any) => ({
          id: row.id,
          title: row.title,
          category: row.category,
          price: `$${Number(row.lowest_price_usd).toFixed(2)} USD`,
          discount: row.best_deal_discount,
          rating: '4.9',
          tag: row.category === 'Sun Care' ? 'Hydrating' : (row.category === 'Toner & Mist' ? 'Acne Safe' : 'EWG Green'),
          productId: row.product_id
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
    const context = getRequestContext();
    const db = (context?.env as any)?.DB;
    if (db && typeof db.prepare === 'function') {
      const res = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
      if (res) return res as Product;
    }
  } catch (err) {
    console.warn('D1 Product query error:', err);
  }
  if (MOCK_DAILY_REPORT.product.id === id) return MOCK_DAILY_REPORT.product;
  return null;
}
