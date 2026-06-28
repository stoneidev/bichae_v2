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
    id: '044',
    product_id: 'prod_anua_pdrn_serum',
    title: 'Anua - PDRN Hyaluronic Capsule 100 Serum 30ml Double Set',
    publish_date: 'June 28, 2026',
    is_active_daily: 1,
    full_inci_list: 'Water, Butylene Glycol, Propanediol, Glycerin, Hydrolyzed Hyaluronic Acid, 1,2-Hexanediol, Niacinamide, Glyceryl Oleate, Lauryl Glucoside, Myristyl Glucoside, Polyglyceryl-6 Laurate, Hydrogenated Lecithin, Glutathione, Hydrolyzed Collagen, Sodium Hyaluronate, Coptis Japonica Root Extract, Adenosine, Melia Azadirachta Leaf Extract, Melia Azadirachta Flower Extract, Coccinia Indica Fruit Extract, Sodium DNA, Solanum Melongena (Eggplant) Fruit Extract, Hyaluronic Acid, Hydrolyzed Sodium Hyaluronate, Hydroxypropyltrimonium Hyaluronate, Potassium Hyaluronate, Sodium Hyaluronate Crosspolymer, Sodium Acetylated Hyaluronate, Ocimum Sanctum Leaf Extract, Citric Acid, Curcuma Longa (Turmeric) Root Extract, Corallina Officinalis Extract, Sodium Citrate, Pentylene Glycol.',
    ewg_status: 'EWG Green Grade Verified',
    editor_note: 'Anua PDRN Hyaluronic Capsule 100 Serum represents a breakthrough in bio-identical dermal rejuvenation, combining Smart Encapsulated PDRN (Sodium DNA) with an 11-type Multi-Hyaluronic Acid matrix. Engineered to penetrate deep epidermal layers, it delivers instant moisture plumping and barrier repair.'
  },
  product: {
    id: 'prod_anua_pdrn_serum',
    name: 'PDRN Hyaluronic Capsule 100 Serum 30ml Double Set',
    brand_name: 'Anua (아누아)',
    brand_description: 'A minimalist Korean skincare pioneer focused on high-purity clinical botanical ingredients that soothe skin inflammation and reinforce natural dermal vitality.',
    brand_website: 'https://global.oliveyoung.com/product/detail?prdtNo=GA260439734&dataSource=top_orders',
    category: 'Essence & Serum',
    description: 'A revolutionary bio-encapsulated hydration serum powered by Sodium DNA (PDRN) and 11 distinct molecular weights of Hyaluronic Acid for deep elasticity and glass-skin radiance.',
    detailed_story: 'Formulated with high-purity PDRN derived from marine DNA structures, Anua’s Capsule 100 Serum utilizes micro-fluidic encapsulation technology. Upon application, the micro-capsules burst to release concentrated Glutathione, Hydrolyzed Collagen, and Niacinamide, transforming dull, dehydrated skin into a plump, radiant canvas.',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    volume: '30mL x 2 (Double Set Duo Pack / Bundle)',
    skin_type: 'Dehydrated, Sensitive, Aging & Loss of Elasticity',
    texture: 'Lightweight fluid serum with dissolved micro-capsules',
    finish: 'Intensely plump, dewy glass-skin finish with zero tackiness',
    how_to_use: 'After cleansing and prepping skin with toner, apply 2-3 pumps of serum across face and neck. Gently press and pat until the hydrating micro-capsules dissolve completely.',
    origin: 'Made in South Korea 🇰🇷',
    pao_expiration: '12 Months after opening / 36 Months unopened',
    msrp_usd: 48.00,
    lowest_price_usd: 32.00,
    best_deal_platform: 'Olive Young Global',
    best_deal_discount: '33% OFF',
    is_authentic: 1
  },
  priceMatrix: [
    {
      id: 'pm_anua_1',
      product_id: 'prod_anua_pdrn_serum',
      platform_name: 'Olive Young Global',
      variant_option: '30mL Double Planning Set (Duo)',
      logo_bg: '#99E334',
      logo_color: '#000',
      stock_status: 'Official Authorized Partner',
      shipping_info: 'DHL Express 3-5 Days',
      price_usd: 32.00,
      discount_text: '33% OFF',
      promo_code: 'OYGLOBAL10',
      buy_url: 'https://global.oliveyoung.com/product/detail?prdtNo=GA260439734&dataSource=top_orders',
      is_lowest: 1
    },
    {
      id: 'pm_anua_2',
      product_id: 'prod_anua_pdrn_serum',
      platform_name: 'StyleKorean',
      variant_option: '30mL Serum (Single Unit Pack)',
      logo_bg: '#E31B23',
      logo_color: '#FFF',
      stock_status: 'In Stock (Direct Dispatch)',
      shipping_info: 'Global Direct Dispatch',
      price_usd: 19.90,
      discount_text: '28% OFF',
      promo_code: 'SKSPRING',
      buy_url: 'https://www.stylekorean.com/shop/1734073142',
      is_lowest: 0
    },
    {
      id: 'pm_anua_3',
      product_id: 'prod_anua_pdrn_serum',
      platform_name: 'Stylevana Global',
      variant_option: '30mL Double Set Search Match',
      logo_bg: '#111827',
      logo_color: '#FFF',
      stock_status: 'In Stock (Dispatch 24h)',
      shipping_info: 'Free Express Shipping over $48',
      price_usd: 31.80,
      discount_text: '30% OFF',
      promo_code: 'SVSECRET',
      buy_url: 'https://www.stylevana.com/en_US/catalogsearch/result/?q=Anua+PDRN+Hyaluronic+Capsule+100+Serum+30ml+Double+Set',
      is_lowest: 0
    },
    {
      id: 'pm_anua_4',
      product_id: 'prod_anua_pdrn_serum',
      platform_name: 'YesStyle Beauty',
      variant_option: '30mL Bundle Set (2 pcs)',
      logo_bg: '#FF6F61',
      logo_color: '#FFF',
      stock_status: 'In Stock',
      shipping_info: 'Standard International',
      price_usd: 33.50,
      discount_text: '26% OFF',
      promo_code: 'YESSTYLE2026',
      buy_url: 'https://www.yesstyle.com/en/anua-pdrn-hyaluronic-acid-capsule-100-serum-bundle-set-2-pcs/info.html/pid.1137150340',
      is_lowest: 0
    },
    {
      id: 'pm_anua_5',
      product_id: 'prod_anua_pdrn_serum',
      platform_name: 'Amazon US Official Store',
      variant_option: '30mL Bottle (Prime Fulfillment)',
      logo_bg: '#FF9900',
      logo_color: '#000',
      stock_status: 'Prime Fulfillment',
      shipping_info: 'Free Prime 2-Day Shipping',
      price_usd: 22.00,
      discount_text: '15% OFF',
      promo_code: 'PRIME',
      buy_url: 'https://www.amazon.com/Hyaluronic-Hydration-Moisture-Plumping-Fragrance/dp/B0DLB58CWR/ref=sr_1_5?crid=29E0YPPDPJ18G&dib=eyJ2IjoiMSJ9.TyPlwy1VxO1DCXqU7Sm5dMOimbTXUtrbd4FB9ZpJTDr8oBjzgQgdknhNCqINz95A8oMZucoVGypKnmKX2Hqn4-AZtKiaRG_6iP6vt-rJ5_fT2V_Ak4U1xbac6D_bDaicKJqtQkZBbnUPdoXHDlbcNWO-UFeNvYSbMuwoOqAQXbGoU48E9U_6AZD7KUfm3Ur0s38xFL-eU8gNIOyd1UAGcmJR1oJ4UqYGnGHclFF1ChvL6kEoHYbk5uovP6PiVoD_88uzFVNHc9-6OWGzYgDMebO3VFrmrL4QH60MAheDp0A.9Gujy8KX6L57EQF0R05QjyqZL6kCcCSG2cYNXEuDz08&dib_tag=se&keywords=Anua+PDRN+Hyaluronic+Capsule+100+Serum+30ml+Double+Set&nsdOptOutParam=true&qid=1782649369&sprefix=anua+pdrn+hyaluronic+capsule+100+serum+30ml+double+set%2Caps%2C266&sr=8-5',
      is_lowest: 0
    }
  ],
  keyIngredients: [
    {
      id: 'ki_anua_1',
      product_id: 'prod_anua_pdrn_serum',
      name: 'Sodium DNA (Smart Encapsulated PDRN)',
      description: 'Bio-identical Polydeoxyribonucleotide (PDRN) derived from marine DNA complexes that stimulates dermal cell regeneration, fortifies compromised skin barriers, and improves overall elastic density.',
      tag_color: 'var(--brand-rose)'
    },
    {
      id: 'ki_anua_2',
      product_id: 'prod_anua_pdrn_serum',
      name: '11-Type Multi-Hyaluronic Acid Matrix',
      description: 'A multi-molecular weight hyaluronic complex engineered to hydrate multiple skin layers, preventing transepidermal water loss and creating a long-lasting moisture reservoir.',
      tag_color: 'var(--brand-sage)'
    },
    {
      id: 'ki_anua_3',
      product_id: 'prod_anua_pdrn_serum',
      name: 'Glutathione & Niacinamide Synergist',
      description: 'A high-potency antioxidant blend that brightens hyperpigmentation, inhibits melanin synthesis, and imparts a luminous porcelain clarity to stressed skin.',
      tag_color: '#3B82F6'
    }
  ],
  socialReviews: [
    {
      id: 'sr_anua_yt_1',
      platform: 'YOUTUBE',
      channel_or_user: 'Glass Skin Science & K-Beauty Lab',
      badge_color: '#FF0000',
      title_or_context: 'Anua PDRN Hyaluronic Capsule 100 Serum Clinical Breakdown',
      quote: '"Anua PDRN Capsule 100 Serum is one of the most exciting bio-tech formulations this year. The encapsulated PDRN and 11 hyaluronic acids produce immediate epidermal plumping without stickiness."',
      metrics: '850k Views',
      thumbnail_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      video_duration: '11:15',
      url: 'https://youtube.com'
    },
    {
      id: 'sr_anua_reddit_1',
      platform: 'REDDIT',
      channel_or_user: 'r/AsianBeauty • u/pdrn_glow_obsessed',
      badge_color: '#FF4500',
      title_or_context: 'Anua PDRN Serum Holy Grail Review (+940 upvotes)',
      quote: '"If you have dehydrated skin that looks dull under makeup, Anua PDRN Hyaluronic Capsule 100 Serum is life-changing. The double pack on Olive Young is hands down the best value."',
      metrics: '4.9/5 Glass Skin Rating',
      url: 'https://reddit.com/r/AsianBeauty'
    },
    {
      id: 'sr_anua_insta_1',
      platform: 'INSTAGRAM',
      channel_or_user: '@seoul_dermal_editor',
      badge_color: '#E1306C',
      title_or_context: 'Anua PDRN Capsule 100 Serum Layering Swatch',
      quote: '"Watching the hydrating PDRN micro-capsules melt into the skin is super satisfying. Leaves a dewy glass-skin glow that lasts all day."',
      metrics: '28k Tagged Posts',
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
