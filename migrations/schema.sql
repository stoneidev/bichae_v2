-- Bichae v2 Cloudflare D1 Relational Database Schema

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_description TEXT,
  brand_website TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  volume TEXT,
  msrp_usd REAL NOT NULL,
  lowest_price_usd REAL NOT NULL,
  best_deal_platform TEXT NOT NULL,
  best_deal_discount TEXT NOT NULL,
  is_authentic INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  publish_date TEXT NOT NULL,
  is_active_daily INTEGER DEFAULT 0,
  full_inci_list TEXT NOT NULL,
  ewg_status TEXT,
  editor_note TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS price_matrix (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  platform_name TEXT NOT NULL,
  logo_bg TEXT,
  logo_color TEXT,
  stock_status TEXT NOT NULL,
  shipping_info TEXT NOT NULL,
  price_usd REAL NOT NULL,
  promo_code TEXT,
  discount_text TEXT,
  buy_url TEXT NOT NULL,
  is_lowest INTEGER DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS key_ingredients (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tag_color TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS social_reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  badge_color TEXT NOT NULL,
  score_summary TEXT NOT NULL,
  quote TEXT NOT NULL,
  analysis_meta TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
