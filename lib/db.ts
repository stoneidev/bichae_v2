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
    id: '043',
    product_id: 'prod_unove_hair_mask',
    title: 'UNOVE - Deep Damage Repair Hair Mask (Treatment / Hair Pack) 320mL Double Pack',
    publish_date: 'June 28, 2026',
    is_active_daily: 1,
    full_inci_list: 'Water, Glycerin, Dimethicone, Cetyl Alcohol, Behentrimonium Chloride, Butylene Glycol, Cetearyl Alcohol, Dipropylene Glycol, Behenyl Alcohol, Fragrance, Behentrimonium Methosulfate, Amodimethicone, Isopropyl Alcohol, Sorbitol, Stearamidopropyl Dimethylamine, Trehalose, Steartrimonium Chloride, Caprylyl Glycol, Lactic Acid, Stearyl Alcohol, Arachidyl Alcohol, Tocopheryl Acetate, Propylene Glycol, Hexyl Cinnamal, Citric Acid, Cetrimonium Chloride, Trideceth-15, Trideceth-3, Geraniol, Citronellol, Limonene, Phenoxyethanol, Hydrolyzed Milk Protein, Hydrolyzed Keratin, Ethanol, 1,2-Hexanediol, Hydrolyzed Collagen, Acetic Acid, Hydrolyzed Silk, Silk Amino Acids, Ethyl Hexanediol, Glycine, Glutamic Acid, Glutamine, Lysine, Leucine, Methionine, Valine, Serine, Cystine, Asparagine, Aspartic Acid, Isoleucine, Alanine, Arginine, Ornithine, Taurine, Tyrosine, Threonine, Tryptophan, Phenylalanine, Proline, Histidine, Macadamia Integrifolia Seed Oil, Camellia Japonica Seed Oil, Cysteine, Argania Spinosa Kernel Oil, Ethylhexylglycerin, Olea Europaea (Olive) Fruit Oil, Sunflower Seed Oil, Hydrolyzed Corn Protein, Hydrolyzed Wheat Protein, Hydrolyzed Soy Protein Extract.',
    ewg_status: 'EWG Verified Clean Hair Formula',
    editor_note: 'UNOVE Deep Damage Repair Hair Mask has set the gold standard in salon-grade hair rehabilitation by infusing 30,000ppm of Keratin-PF with 31 proteins and amino acids. Specifically engineered for bleached, permed, and severely heat-damaged strands, it transforms rough cuticles into silk with zero heaviness.'
  },
  product: {
    id: 'prod_unove_hair_mask',
    name: 'Deep Damage Repair Hair Mask (Treatment EX) 320mL Double Pack',
    brand_name: 'UNOVE (어노브)',
    brand_description: 'The award-winning luxury hair care division of Olive Young Korea, dedicated to restoring structural hair damage with high-potency clinical protein formulations.',
    brand_website: 'https://global.oliveyoung.com/product/detail?prdtNo=GA230418386',
    category: 'Hair Care',
    description: 'A clinical protein treatment mask containing 30,000ppm Keratin-PF and 31 amino acid nutrient complexes that repair cuticles damaged by perms, bleaching, and thermal styling tools.',
    detailed_story: 'Selected as Olive Young Korea’s #1 Hair Treatment, UNOVE Deep Damage Repair Hair Mask (formerly EX) features a rich, gel-cream texture that instantly seals damaged hair cuticles. Packed with hydrolyzed silk, collagen, and 5 plant-derived golden oils, it leaves hair impossibly smooth and fragrant with a signature woody floral amber scent.',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    volume: '320mL x 2 (640mL Total Double Pack Duo)',
    skin_type: 'Severely Damaged, Bleached, Frizzy & Dry Hair',
    texture: 'Rich, cocooning silky protein gel cream',
    finish: 'Silky smooth salon finish with high glossy shine',
    how_to_use: 'After shampooing, gently squeeze out excess water. Apply an even amount through mid-lengths to ends. Leave on for 1 to 3 minutes (or 5-10 mins for deep conditioning), then rinse thoroughly with warm water.',
    origin: 'Made in South Korea 🇰🇷',
    pao_expiration: '12 Months after opening / 36 Months unopened',
    msrp_usd: 42.00,
    lowest_price_usd: 26.40,
    best_deal_platform: 'Olive Young Global',
    best_deal_discount: '37% OFF',
    is_authentic: 1
  },
  priceMatrix: [
    {
      id: 'pm_unove_1',
      product_id: 'prod_unove_hair_mask',
      platform_name: 'Olive Young Global',
      variant_option: '320mL Double Pack (Duo Special Set)',
      logo_bg: '#99E334',
      logo_color: '#000',
      stock_status: 'Official Authorized Partner',
      shipping_info: 'DHL Express 3-5 Days',
      price_usd: 26.40,
      discount_text: '37% OFF',
      promo_code: 'OYGLOBAL10',
      buy_url: 'https://global.oliveyoung.com/product/detail?prdtNo=GA230418386',
      is_lowest: 1
    },
    {
      id: 'pm_unove_2',
      product_id: 'prod_unove_hair_mask',
      platform_name: 'StyleKorean',
      variant_option: '320mL Double Value Pack',
      logo_bg: '#E31B23',
      logo_color: '#FFF',
      stock_status: 'In Stock (Direct Dispatch)',
      shipping_info: 'Global Direct Dispatch',
      price_usd: 28.90,
      discount_text: '31% OFF',
      promo_code: 'SKSPRING',
      buy_url: 'https://www.stylekorean.com/shop/unove-deep-damage-treatment-ex-320ml-duo-set/1682390234/',
      is_lowest: 0
    },
    {
      id: 'pm_unove_3',
      product_id: 'prod_unove_hair_mask',
      platform_name: 'YesStyle Beauty',
      variant_option: '320mL JUMBO Pack',
      logo_bg: '#FF6F61',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Standard International',
      price_usd: 29.50,
      discount_text: '30% OFF',
      promo_code: 'YESSTYLE2026',
      buy_url: 'https://www.yesstyle.com/en/unove-deep-damage-repair-hair-mask-320ml/info.html/pid.1118930214',
      is_lowest: 0
    },
    {
      id: 'pm_unove_4',
      product_id: 'prod_unove_hair_mask',
      platform_name: 'Stylevana Global',
      variant_option: '320mL Value Duo Set',
      logo_bg: '#111827',
      logo_color: '#FFF',
      stock_status: 'In Stock (Dispatch 24h)',
      shipping_info: 'Free Express Shipping over $48',
      price_usd: 30.20,
      discount_text: '28% OFF',
      promo_code: 'SVSECRET',
      buy_url: 'https://www.stylevana.com/en_US/unove-deep-damage-treatment-ex-320ml-set.html',
      is_lowest: 0
    }
  ],
  keyIngredients: [
    {
      id: 'ki_unove_1',
      product_id: 'prod_unove_hair_mask',
      name: 'Keratin-PF (30,000ppm Concentration)',
      description: 'A clinical-grade protein complex engineered to fill broken cuticle gaps caused by chemical bleaching and heat styling, restoring structural hair elasticity and preventing split ends.',
      tag_color: 'var(--brand-rose)'
    },
    {
      id: 'ki_unove_2',
      product_id: 'prod_unove_hair_mask',
      name: '31 Proteins & Amino Acids Matrix',
      description: 'An extensive bio-matrix containing Hydrolyzed Silk, Collagen, and Wheat Proteins alongside 20+ amino acids that deeply coat each hair strand for tangle-free combing.',
      tag_color: 'var(--brand-sage)'
    },
    {
      id: 'ki_unove_3',
      product_id: 'prod_unove_hair_mask',
      name: '5 Golden Botanical Oils Blend',
      description: 'Cold-pressed Macadamia, Argan, Camellia, Olive, and Sunflower seed oils seal in essential hydration and create a lightweight shield against humidity frizz.',
      tag_color: '#3B82F6'
    }
  ],
  socialReviews: [
    {
      id: 'sr_unove_yt_1',
      platform: 'YOUTUBE',
      channel_or_user: 'K-Beauty Hair Lab & Director Pi',
      badge_color: '#FF0000',
      title_or_context: 'Olive Young #1 Hair Treatment: UNOVE Deep Damage Repair Analysis',
      quote: '"If your hair feels like straw after bleaching or perming, UNOVE Deep Damage Repair Hair Mask is the single most effective home clinic treatment on the market today."',
      metrics: '1.2M Views',
      thumbnail_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      video_duration: '12:45',
      url: 'https://youtube.com'
    },
    {
      id: 'sr_unove_reddit_1',
      platform: 'REDDIT',
      channel_or_user: 'r/AsianBeauty • u/bleached_hair_save_me',
      badge_color: '#FF4500',
      title_or_context: 'Holy Grail Hair Mask Megathread (+1,180 upvotes)',
      quote: '"UNOVE Deep Damage Treatment 320ml is worth every single penny. It detangles my bleached platinum hair in 60 seconds and smells like a luxury Le Labo perfume."',
      metrics: '4.9/5 Holy Grail Status',
      url: 'https://reddit.com/r/AsianBeauty'
    },
    {
      id: 'sr_unove_insta_1',
      platform: 'INSTAGRAM',
      channel_or_user: '@seoul_salon_curator',
      badge_color: '#E1306C',
      title_or_context: 'UNOVE 320ml Double Pack Value Review',
      quote: '"The 320ml double pack is the best value in K-beauty right now. It leaves hair so glossy and soft that you won’t need salon gloss treatments."',
      metrics: '35k Tagged Posts',
      url: 'https://instagram.com'
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
