-- Seed Data for Cloudflare D1

INSERT OR REPLACE INTO products (id, name, brand_name, brand_description, brand_website, category, description, volume, msrp_usd, lowest_price_usd, best_deal_platform, best_deal_discount, is_authentic)
VALUES (
  'prod_boj_sun',
  'Relief Sun: Rice + Probiotics (SPF50+ PA++++)',
  'Beauty of Joseon (조선미녀)',
  'Inspired by traditional Hanbang holistic herbal medicine of the Joseon Dynasty, reinterpreted with modern dermatological science.',
  'https://beautyofjoseon.com',
  'Sun Care',
  'An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts that deeply hydrates and brightens skin.',
  '50ml',
  18.00,
  11.80,
  'Stylevana',
  '34% OFF',
  1
);

INSERT OR REPLACE INTO reports (id, product_id, title, publish_date, is_active_daily, full_inci_list, ewg_status)
VALUES (
  '042',
  'prod_boj_sun',
  'Beauty of Joseon - Relief Sun: Rice + Probiotics (SPF50+ PA++++) 50ml',
  'June 28, 2026',
  1,
  'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide...',
  'EWG Green Grade Verified'
);

INSERT OR REPLACE INTO price_items (id, product_id, platform_name, logo_bg, logo_color, stock_status, shipping_info, price_usd, promo_code, discount_text, buy_url, is_lowest)
VALUES 
('pr_1', 'prod_boj_sun', 'Stylevana', '#FFF', '#1D2D44', 'In Stock', 'Free Shipping over $48', 11.80, 'INF10BOJ (-10%)', '34% OFF', 'https://stylevana.com', 1),
('pr_2', 'prod_boj_sun', 'Olive Young Global', '#99E334', '#000', 'Official Stock', 'Express Shipping', 13.50, NULL, '25% OFF', 'https://global.oliveyoung.com', 0),
('pr_3', 'prod_boj_sun', 'StyleKorean', '#E31B23', '#FFF', 'In Stock', 'Global Dispatch', 14.00, NULL, '22% OFF', 'https://stylekorean.com', 0);
