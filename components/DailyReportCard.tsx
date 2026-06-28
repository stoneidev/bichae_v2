'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, FlaskConical, MessageSquare, Building2, 
  ExternalLink, CheckCircle2, Shield, ArrowUpRight, Loader2, BookOpen,
  Info, Sparkles, Check, ThumbsUp, Layers, Compass, Tag
} from 'lucide-react';
import { FullDailyReportPayload } from '@/lib/db';

export default function DailyReportCard() {
  const [activeTab, setActiveTab] = useState<'prices' | 'ingredients' | 'community' | 'specs' | 'brand'>('prices');
  const [reportData, setReportData] = useState<FullDailyReportPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [socialFilter, setSocialFilter] = useState<'ALL' | 'REDDIT' | 'YOUTUBE' | 'INSTAGRAM'>('ALL');

  useEffect(() => {
    async function fetchDailyReport() {
      try {
        const res = await fetch('/api/reports/daily');
        const json = await res.json();
        if (json.success && json.data) {
          setReportData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch daily report:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDailyReport();
  }, []);

  if (loading || !reportData) {
    return (
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)', padding: '60px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px'
          }}>
            <Loader2 className="animate-spin" style={{ width: '32px', height: '32px', color: 'var(--brand-rose)' }} />
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loading Cloudflare D1 Real-time Analysis Payload...</p>
          </div>
        </div>
      </section>
    );
  }

  const { report, product, priceMatrix, keyIngredients, socialReviews } = reportData;

  const filteredReviews = socialFilter === 'ALL' 
    ? socialReviews 
    : socialReviews.filter(r => r.platform === socialFilter);

  return (
    <section style={{ padding: '16px 0 60px 0' }}>
      <div className="container">
        
        {/* Main Single Product Card Container */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          
          {/* Top Banner Header */}
          <div style={{
            padding: '32px', borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center'
          }}>
            
            {/* Left Header Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span className="badge badge-trending" style={{ fontWeight: 700 }}>Featured Daily Choice #{report.id}</span>
                <span className="badge badge-verified"><CheckCircle2 size={12} /> {product.is_authentic ? '100% Verified Authentic' : 'Standard'}</span>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{report.publish_date}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.25 }}>
                {report.title}
              </h2>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.55 }}>
                {product.description}
              </p>

              {/* Quick Specs Pill Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>📦 {product.volume}</span>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>🌱 {report.ewg_status}</span>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>☀️ {product.category}</span>
                {product.origin && <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>{product.origin}</span>}
              </div>
            </div>

            {/* Right Quick Price Summary Box */}
            <div style={{
              background: 'var(--bg-main)', padding: '24px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Lowest Verified Price</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-rose)' }}>${Number(product.lowest_price_usd).toFixed(2)} USD</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Official MSRP</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'line-through' }}>${Number(product.msrp_usd).toFixed(2)} USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Best Deal Platform</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-sage)' }}>{product.best_deal_platform} ({product.best_deal_discount})</span>
              </div>
            </div>

          </div>

          {/* Curator Editorial Science Note */}
          {report.editor_note && (
            <div style={{
              padding: '24px 32px', background: 'rgba(224, 122, 95, 0.04)',
              borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '16px', alignItems: 'flex-start'
            }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px', background: 'var(--brand-rose)',
                color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <BookOpen size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                  Curator's Science & Formulation Note
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {report.editor_note}
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation Controls */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)', overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('prices')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === 'prices' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'prices' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <DollarSign size={16} /> Price Matrix Table
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === 'specs' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'specs' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <Info size={16} /> Detailed Specs & Story
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === 'ingredients' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'ingredients' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <FlaskConical size={16} /> INCI Science & Safety
            </button>

            <button
              onClick={() => setActiveTab('community')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === 'community' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'community' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <MessageSquare size={16} /> Reddit, YouTube & Social Consensus
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              style={{
                padding: '16px 24px', fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === 'brand' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'brand' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <Building2 size={16} /> Brand Origin
            </button>
          </div>

          {/* Tab Content Panels */}
          <div style={{ padding: '32px' }}>
            
            {/* 1. DENSE PRICE MATRIX TABLE TAB */}
            {activeTab === 'prices' && (
              <div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Global Cross-Platform Price Tracking Matrix</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>High-density real-time price comparative analysis updated via Cloudflare D1</p>
                  </div>
                  <span className="badge badge-trending" style={{ fontSize: '0.775rem' }}>4 Verified Platforms</span>
                </div>

                {/* Compact Dense Table Layout */}
                <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        <th style={{ padding: '14px 18px', fontWeight: 700 }}>Platform</th>
                        <th style={{ padding: '14px 18px', fontWeight: 700 }}>Stock & Shipping</th>
                        <th style={{ padding: '14px 18px', fontWeight: 700 }}>Promo Code</th>
                        <th style={{ padding: '14px 18px', fontWeight: 700 }}>Discount</th>
                        <th style={{ padding: '14px 18px', fontWeight: 700 }}>Verified Price</th>
                        <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Direct Deal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceMatrix.map((item) => (
                        <tr 
                          key={item.id}
                          style={{
                            borderBottom: '1px solid var(--border-subtle)',
                            background: item.is_lowest ? 'var(--brand-rose-light)' : 'transparent',
                            transition: 'background 0.2s'
                          }}
                        >
                          <td style={{ padding: '16px 18px', fontWeight: 700 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ 
                                width: '32px', height: '32px', borderRadius: '8px', 
                                background: item.logo_bg || '#000', color: item.logo_color || '#FFF', 
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                                fontWeight: 800, fontSize: '0.65rem', textAlign: 'center', flexShrink: 0
                              }}>
                                {item.platform_name.substring(0, 2).toUpperCase()}
                              </span>
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.platform_name}</div>
                                {item.is_lowest ? <span style={{ fontSize: '0.7rem', color: 'var(--brand-rose)', fontWeight: 800 }}>★ LOWEST PRICE</span> : null}
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '16px 18px', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.stock_status}</div>
                            <div style={{ color: 'var(--text-muted)' }}>{item.shipping_info}</div>
                          </td>

                          <td style={{ padding: '16px 18px' }}>
                            {item.promo_code ? (
                              <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '0.775rem', fontWeight: 700, color: 'var(--brand-sage)', fontFamily: 'monospace' }}>
                                {item.promo_code}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                            )}
                          </td>

                          <td style={{ padding: '16px 18px', fontWeight: 700, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-sage)' }}>
                            {item.discount_text || '—'}
                          </td>

                          <td style={{ padding: '16px 18px' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--text-primary)' }}>
                              ${Number(item.price_usd).toFixed(2)}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>USD</span>
                          </td>

                          <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                            <a 
                              href={item.buy_url} 
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ 
                                padding: '8px 16px', borderRadius: 'var(--radius-full)', 
                                background: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-obsidian)', 
                                color: '#FFF', 
                                fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px',
                                textDecoration: 'none', transition: 'transform 0.15s'
                              }}
                            >
                              {item.is_lowest ? 'Buy Lowest' : 'Get Deal'} <ArrowUpRight size={14} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. DETAILED SPECS & STORY TAB */}
            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '18px' }}>Comprehensive Technical Specifications & Product Story</h3>
                
                {/* Specs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Net Volume / Size</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.volume || '50ml'}</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Skin Type Suitability</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.skin_type || 'All Skin Types'}</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Formulation & Texture</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.texture || 'Lightweight lotion'}</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Finish & Feel</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.finish || 'Natural glow'}</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Country of Manufacture</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.origin || 'Made in South Korea 🇰🇷'}</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>PAO / Shelf Life</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.pao_expiration || '12M after opening'}</div>
                  </div>
                </div>

                {/* In-Depth Story */}
                {product.detailed_story && (
                  <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--brand-obsidian)' }}>✨ Deep Formulation & Heritage Story</h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {product.detailed_story}
                    </p>
                  </div>
                )}

                {/* How To Use Guide */}
                {product.how_to_use && (
                  <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', marginTop: '16px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--brand-obsidian)' }}>💡 Dermatologist Recommended Application</h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {product.how_to_use}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 3. INCI SCIENCE TAB */}
            {activeTab === 'ingredients' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Authoritative INCI Ingredient Science & Safety</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cross-referenced against EU CosIng & EWG Deep Skin database</p>
                  </div>
                  <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>{report.ewg_status}</span>
                </div>

                {/* Key Active Ingredients Breakdown */}
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--brand-obsidian)' }}>🔬 Key Active Ingredients Breakdown</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                  {keyIngredients.map((ing) => (
                    <div key={ing.id} style={{ padding: '18px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 700, color: ing.tag_color || 'var(--brand-rose)', marginBottom: '6px', fontSize: '0.95rem' }}>{ing.name}</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ing.description}</p>
                    </div>
                  ))}
                </div>

                {/* Full INCI List */}
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>📜 Complete INCI Declaration List (English)</h4>
                <div style={{
                  padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                  fontSize: '0.825rem', lineHeight: 1.8, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
                  fontFamily: 'monospace'
                }}>
                  {report.full_inci_list}
                </div>
              </div>
            )}

            {/* 4. REDDIT, YOUTUBE & INSTAGRAM COMMUNITY CONSENSUS TAB */}
            {activeTab === 'community' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Cross-Platform Social & Community Consensus</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Aggregated authentic user experiences from Reddit, YouTube, and Instagram</p>
                  </div>

                  {/* Platform Filter Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {(['ALL', 'REDDIT', 'YOUTUBE', 'INSTAGRAM'] as const).map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSocialFilter(platform)}
                        style={{
                          padding: '6px 12px', borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                          border: socialFilter === platform ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
                          background: socialFilter === platform ? 'var(--brand-rose-light)' : 'var(--bg-card)',
                          color: socialFilter === platform ? 'var(--brand-rose)' : 'var(--text-secondary)'
                        }}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Social Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} style={{ padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                            {rev.platform}
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>{rev.metrics}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                          {rev.channel_or_user}
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '10px' }}>
                          {rev.title_or_context}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.55 }}>
                          {rev.quote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. BRAND TAB */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Official Brand Heritage & Authentic Verification</h3>
                
                <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '6px' }}>{product.brand_name}</h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {product.brand_description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    {product.brand_website && (
                      <a href={product.brand_website} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                        Visit Official Brand Portal <ExternalLink size={14} />
                      </a>
                    )}
                    <span style={{ fontSize: '0.875rem', color: 'var(--brand-sage)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Shield size={16} /> 100% Direct Manufacturer Authentic Supply Chain
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
