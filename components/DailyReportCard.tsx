'use client';

import React, { useState } from 'react';
import { 
  DollarSign, FlaskConical, MessageSquare, Building2, 
  ExternalLink, CheckCircle2, Star, Shield, Award, ArrowUpRight, ChevronRight
} from 'lucide-react';

export default function DailyReportCard() {
  const [activeTab, setActiveTab] = useState<'prices' | 'ingredients' | 'reviews' | 'brand'>('prices');

  return (
    <section style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        
        {/* Main Product Card Container */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          
          {/* Top Banner Header */}
          <div style={{
            padding: '32px', borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center'
          }}>
            
            {/* Left Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="badge badge-trending">Daily Deep Dive #042</span>
                <span className="badge badge-verified"><CheckCircle2 size={12} /> Verified Authentic</span>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>June 28, 2026</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
                Beauty of Joseon - Relief Sun: Rice + Probiotics (SPF50+ PA++++) 50ml
              </h2>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts that deeply hydrates and brightens skin without white cast.
              </p>

              {/* Quick Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>☀️ Chemical Filter</span>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>🌾 30% Rice Extract</span>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>✨ Niacinamide 2%</span>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>🌱 EWG All Green</span>
              </div>
            </div>

            {/* Right Highlights Box */}
            <div style={{
              background: 'var(--bg-main)', padding: '24px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Lowest Global Price</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-rose)' }}>$11.80 USD</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Official Manufacturer MSRP</span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'line-through' }}>$18.00 USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Best Deal Platform</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-sage)' }}>Stylevana (34% OFF)</span>
              </div>
            </div>

          </div>

          {/* Tab Navigation Controls */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)', overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('prices')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'prices' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'prices' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              <DollarSign size={18} /> Price Intelligence Matrix
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'ingredients' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'ingredients' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              <FlaskConical size={18} /> Authoritative INCI & Safety Report
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'reviews' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'reviews' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              <MessageSquare size={18} /> Social Proof & Media Consensus
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'brand' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'brand' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              <Building2 size={18} /> Official Brand Info
            </button>
          </div>

          {/* Tab Content Panels */}
          <div style={{ padding: '32px' }}>
            
            {/* 1. PRICES TAB */}
            {activeTab === 'prices' && (
              <div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Live Global Cross-Platform Price Tracking</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated 2 hours ago via API</span>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  
                  {/* Stylevana */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--brand-rose)',
                    background: 'var(--brand-rose-light)', flexWrap: 'wrap', gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-obsidian)', fontSize: '0.9rem', boxShadow: 'var(--shadow-sm)' }}>STYLEVANA</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Stylevana Global</h4>
                          <span className="badge badge-trending">Lowest Price</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>In Stock • Free Shipping over $48</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--brand-rose)' }}>$11.80 USD</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--brand-sage)', fontWeight: 700 }}>Use Code: INF10BOJ (-10%)</div>
                      </div>
                      <a href="https://stylevana.com" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: 'var(--brand-rose)', color: '#FFF', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Buy Now <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Olive Young Global */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)', flexWrap: 'wrap', gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#99E334', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: '0.75rem' }}>OLIVE YOUNG</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Olive Young Global</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Official Retailer • Express Shipping</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>$13.50 USD</span>
                      </div>
                      <a href="https://global.oliveyoung.com" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Visit Deal <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>

                  {/* StyleKorean */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)', flexWrap: 'wrap', gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E31B23', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#FFF', fontSize: '0.75rem' }}>STYLE KOREAN</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>StyleKorean</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>In Stock • Global Dispatch</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>$14.00 USD</span>
                      </div>
                      <a href="https://stylekorean.com" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Visit Deal <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 2. INGREDIENTS TAB */}
            {activeTab === 'ingredients' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Authoritative Ingredient Safety & Science Analysis</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Verified against CosIng & EWG Deep Skin Database</p>
                  </div>
                  <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>EWG Green Grade Verified</span>
                </div>

                {/* Key Active Ingredients Breakdown */}
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--brand-obsidian)' }}>🌾 Key Active Components</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                  
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--brand-rose)', marginBottom: '4px' }}>Oryza Sativa (Rice) Extract (30%)</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Rich in vitamins B, C, E, amino acids, and minerals to deeply hydrate and soothe irritated skin barrier.</p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--brand-sage)', marginBottom: '4px' }}>Grain Ferment Extracts</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lactobacillus/Rice Ferment helps nourish natural skin microbiome and boost elasticity.</p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--brand-champagne)', marginBottom: '4px' }}>Niacinamide (Vitamin B3 2%)</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Regulates sebum production, reduces hyperpigmentation, and brightens overall complexions.</p>
                  </div>

                </div>

                {/* Full INCI List */}
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>📜 Full INCI Ingredient List (English)</h4>
                <div style={{
                  padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                  fontSize: '0.825rem', lineHeight: 1.8, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)'
                }}>
                  Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Coco-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol, Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate.
                </div>
              </div>
            )}

            {/* 3. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Global Social Proof & Media Consensus</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  
                  {/* YouTube Summary */}
                  <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#FF0000', color: '#FFF', fontSize: '0.75rem', fontWeight: 800 }}>YOUTUBE</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Consensus: 4.9 / 5.0</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '12px' }}>
                      "Universally praised by Hyram, James Welsh, and Gothamista as the holy grail sunscreen for daily wear under makeup."
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Analyzed across 140+ video reviews</div>
                  </div>

                  {/* Instagram Summary */}
                  <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#E1306C', color: '#FFF', fontSize: '0.75rem', fontWeight: 800 }}>INSTAGRAM</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Trending Tag #beautyofjoseonsunscreen</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '12px' }}>
                      "Over 85,000+ posts. High engagement on aesthetic texture swatches demonstrating zero white cast and glowing dewiness."
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top viral reels in US & Europe</div>
                  </div>

                </div>
              </div>
            )}

            {/* 4. BRAND TAB */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Official Brand Verification & Origin</h3>
                
                <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '4px' }}>Beauty of Joseon (조선미녀)</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Inspired by the traditional Hanbang (Korean holistic herbal medicine) practices of the Joseon Dynasty, reinterpreted with modern dermatological science for gentle, effective daily skincare.
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <a href="https://beautyofjoseon.com" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      Official Website <ExternalLink size={14} />
                    </a>
                    <span style={{ fontSize: '0.85rem', color: 'var(--brand-sage)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Shield size={16} /> 100% Authentic Korean Manufacture Certified
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
