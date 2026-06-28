-- D1 Database Seed Migration: 0001_seed.sql

-- Insert Products
INSERT OR REPLACE INTO products (
  id, name, brand_name, brand_description, brand_website, category, description, volume, msrp_usd, lowest_price_usd, best_deal_platform, best_deal_discount, is_authentic
) VALUES (
  'prod_boj_sun',
  'Relief Sun: Rice + Probiotics (SPF50+ PA++++)',
  'Beauty of Joseon (조선미녀)',
  'Inspired by traditional Hanbang holistic herbal medicine of the Joseon Dynasty, reinterpreted with modern dermatological science for gentle, effective daily skincare.',
  'https://beautyofjoseon.com',
  'Sun Care',
  'An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts that deeply hydrates and brightens skin without white cast.',
  '50ml',
  18.00,
  11.80,
  'Stylevana',
  '34% OFF',
  1
);

INSERT OR REPLACE INTO products (
  id, name, brand_name, brand_description, brand_website, category, description, volume, msrp_usd, lowest_price_usd, best_deal_platform, best_deal_discount, is_authentic
) VALUES (
  'prod_cosrx_snail',
  'Advanced Snail 96 Mucin Power Essence',
  'COSRX',
  'Formulated with skin-friendly ingredients that soothe irritated skin and recharge skin vitality.',
  'https://cosrx.com',
  'Essence & Serum',
  'Lightweight essence which absorbs into skin fast to give skin natural glow from the inside.',
  '100ml',
  25.00,
  12.50,
  'StyleKorean',
  '50% OFF',
  1
);

INSERT OR REPLACE INTO products (
  id, name, brand_name, brand_description, brand_website, category, description, volume, msrp_usd, lowest_price_usd, best_deal_platform, best_deal_discount, is_authentic
) VALUES (
  'prod_anua_heartleaf',
  'Heartleaf 77% Soothing Toner',
  'ANUA',
  'Focuses on natural ingredients to solve skin problems and maintain healthy skin.',
  'https://anua.kr',
  'Toner & Mist',
  'Highly moisturizing soothing toner infused with 77% Heartleaf extract to soothe sensitive skin.',
  '250ml',
  22.00,
  14.20,
  'Olive Young Global',
  '35% OFF',
  1
);

INSERT OR REPLACE INTO products (
  id, name, brand_name, brand_description, brand_website, category, description, volume, msrp_usd, lowest_price_usd, best_deal_platform, best_deal_discount, is_authentic
) VALUES (
  'prod_roundlab_birch',
  'Birch Juice Moisturizing Sunscreen',
  'ROUND LAB',
  'Uses clean moisture components derived from Korean nature.',
  'https://roundlab.com',
  'Sun Care',
  'Moisturizing sunscreen that protects skin from harmful UV rays while replenishing moisture.',
  '50ml',
  28.00,
  13.90,
  'Stylevana',
  '50% OFF',
  1
);

-- Insert Price Matrix for Beauty of Joseon
INSERT OR REPLACE INTO price_matrix (
  id, product_id, platform_name, logo_bg, logo_color, stock_status, shipping_info, price_usd, promo_code, discount_text, buy_url, is_lowest
) VALUES 
('pm_boj_1', 'prod_boj_sun', 'Stylevana Global', '#FFF', 'var(--brand-obsidian)', 'In Stock', 'Free Shipping over $48', 11.80, 'INF10BOJ (-10%)', '34% OFF', 'https://stylevana.com', 1),
('pm_boj_2', 'prod_boj_sun', 'Olive Young Global', '#99E334', '#000', 'Official Retailer', 'Express Shipping', 13.50, NULL, '25% OFF', 'https://global.oliveyoung.com', 0),
('pm_boj_3', 'prod_boj_sun', 'StyleKorean', '#E31B23', '#FFF', 'In Stock', 'Global Dispatch', 14.00, NULL, '22% OFF', 'https://stylekorean.com', 0);

-- Insert Key Ingredients for Beauty of Joseon
INSERT OR REPLACE INTO key_ingredients (
  id, product_id, name, description, tag_color
) VALUES
('ki_boj_1', 'prod_boj_sun', 'Oryza Sativa (Rice) Extract (30%)', 'Rich in vitamins B, C, E, amino acids, and minerals to deeply hydrate and soothe irritated skin barrier.', 'var(--brand-rose)'),
('ki_boj_2', 'prod_boj_sun', 'Grain Ferment Extracts', 'Lactobacillus/Rice Ferment helps nourish natural skin microbiome and boost elasticity.', 'var(--brand-sage)'),
('ki_boj_3', 'prod_boj_sun', 'Niacinamide (Vitamin B3 2%)', 'Regulates sebum production, reduces hyperpigmentation, and brightens overall complexions.', 'var(--brand-champagne)');

-- Insert Social Reviews for Beauty of Joseon
INSERT OR REPLACE INTO social_reviews (
  id, product_id, platform, badge_color, score_summary, quote, analysis_meta
) VALUES
('sr_boj_1', 'prod_boj_sun', 'YOUTUBE', '#FF0000', 'Consensus: 4.9 / 5.0', '"Universally praised by Hyram, James Welsh, and Gothamista as the holy grail sunscreen for daily wear under makeup."', 'Analyzed across 140+ video reviews'),
('sr_boj_2', 'prod_boj_sun', 'INSTAGRAM', '#E1306C', 'Trending Tag #beautyofjoseonsunscreen', '"Over 85,000+ posts. High engagement on aesthetic texture swatches demonstrating zero white cast and glowing dewiness."', 'Top viral reels in US & Europe');

-- Insert Reports
INSERT OR REPLACE INTO reports (
  id, product_id, title, publish_date, is_active_daily, full_inci_list, ewg_status
) VALUES (
  '042',
  'prod_boj_sun',
  'Beauty of Joseon - Relief Sun: Rice + Probiotics (SPF50+ PA++++) 50ml',
  'June 28, 2026',
  1,
  'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Coco-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol, Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate.',
  'EWG Green Grade Verified'
);

INSERT OR REPLACE INTO reports (
  id, product_id, title, publish_date, is_active_daily, full_inci_list, ewg_status
) VALUES (
  '041',
  'prod_cosrx_snail',
  'COSRX - Advanced Snail 96 Mucin Power Essence 100ml',
  'June 27, 2026',
  0,
  'Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Carbomer, Panthenol, Arginine.',
  'EWG Green Grade Verified'
);

INSERT OR REPLACE INTO reports (
  id, product_id, title, publish_date, is_active_daily, full_inci_list, ewg_status
) VALUES (
  '040',
  'prod_anua_heartleaf',
  'ANUA - Heartleaf 77% Soothing Toner 250ml',
  'June 26, 2026',
  0,
  'Houttuynia Cordata Extract (77%), Water, 1,2-Hexanediol, Glycerin, Betaine, Centella Asiatica Extract, Chamomilla Recutita (Matricaria) Flower Extract, Vitex Agnus-Castus Extract, Phellinus Linteus Extract, Arctium Lappa Root Extract, Pyrus Malus (Apple) Fruit Extract, Saccharum Officinarum (Sugarcane) Extract, Panthenol, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Tromethamine, Disodium EDTA.',
  'EWG Green Grade Verified'
);

INSERT OR REPLACE INTO reports (
  id, product_id, title, publish_date, is_active_daily, full_inci_list, ewg_status
) VALUES (
  '039',
  'prod_roundlab_birch',
  'ROUND LAB - Birch Juice Moisturizing Sunscreen 50ml',
  'June 25, 2026',
  0,
  'Water, Betula Platyphylla Japonica Juice (1,425ppm), Glycerin, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Niacinamide, Polymethylsilsesquioxane, Caprylyl Methicone, Sodium Hyaluronate, Hyaluronic Acid, Tocopherol.',
  'EWG Green Grade Verified'
);
