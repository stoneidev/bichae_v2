'use client';

import React, { useState, useEffect } from 'react';
import {
  ExternalLink, CheckCircle2, Shield, ArrowUpRight, BookOpen, Package,
  Leaf, Sun, Lightbulb, Microscope, ScrollText, Camera, MapPin, Sparkles
} from 'lucide-react';
import { FullDailyReportPayload } from '@/lib/db';

export default function DailyReportCard() {
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
      <section style={{ padding: '20px 0 60px 0' }} aria-busy="true" aria-live="polite">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
            padding: '36px 40px', overflow: 'hidden'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div className="skeleton" style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '280px', borderRadius: 'var(--radius-md)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="skeleton" style={{ height: '20px', width: '60%' }} />
                <div className="skeleton" style={{ height: '36px', width: '90%' }} />
                <div className="skeleton" style={{ height: '16px', width: '100%' }} />
                <div className="skeleton" style={{ height: '16px', width: '80%' }} />
              </div>
              <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: 'var(--radius-md)' }} />
            </div>
            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Loading today&apos;s report…
            </span>
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
    <section style={{ padding: '10px 0 60px 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Flat Editorial Magazine Outer Wrapper */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column'
        }}>
          
          {/* ==========================================
              CHAPTER 01: PRODUCT OVERVIEW & PHOTO
             ========================================== */}
          <div style={{
            padding: '36px 40px', borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)'
          }}>
            <div className="product-hero-grid">

              {/* Product Photo Showcase */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  position: 'relative', display: 'inline-block', width: '100%', maxWidth: '280px',
                  borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-md)', background: '#FFF'
                }}>
                  <img
                    src={product.image_url || '/images/beauty_of_joseon_sunscreen.jpg'}
                    alt={`${product.brand_name} ${product.name}`}
                    width={280}
                    height={280}
                    style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', display: 'block', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', bottom: '12px', left: '12px',
                    padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(0,0,0,0.75)',
                    color: '#FFF', fontSize: '0.75rem', fontWeight: 700, backdropFilter: 'blur(4px)',
                    display: 'inline-flex', alignItems: 'center', gap: '5px'
                  }}>
                    <Camera size={12} /> Product Photo
                  </div>
                </div>
              </div>

              {/* Middle Title & Metadata */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span className="badge badge-trending" style={{ fontWeight: 700 }}>No. {report.id}</span>
                  {product.is_authentic ? (
                    <span className="badge badge-verified"><CheckCircle2 size={12} /> Authenticity Verified</span>
                  ) : null}
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{report.publish_date}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.25 }}>
                  {report.title}
                </h2>

                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                  {product.description}
                </p>

                {/* Quick Specs Pill Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Package size={13} /> {product.volume}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Leaf size={13} /> {report.ewg_status}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Sun size={13} /> {product.category}</span>
                  {product.origin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><MapPin size={13} /> {product.origin}</span>}
                </div>
              </div>

              {/* Right Price Highlight Card */}
              <div className="product-hero-price" style={{
                background: 'var(--bg-main)', padding: '24px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '14px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Lowest Verified Price</span>
                  <span className="price-amount" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--brand-rose)', lineHeight: 1.1 }}>
                    ${Number(product.lowest_price_usd).toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>USD</span>
                  </span>
                </div>
                <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Official MSRP</span>
                  <span className="price-amount" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'line-through' }}>${Number(product.msrp_usd).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Best Deal</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-sage)', textAlign: 'right' }}>{product.best_deal_platform} ({product.best_deal_discount})</span>
                </div>
              </div>

            </div>

            {/* Editor Formulation Story Box */}
            {report.editor_note && (
              <div style={{
                padding: '24px 28px', background: 'rgba(224, 122, 95, 0.04)', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(224, 122, 95, 0.2)', display: 'flex', gap: '16px', alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px', background: 'var(--brand-rose)',
                  color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                    Curator&apos;s Formulation Science Note
                  </h4>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {report.editor_note}
                  </p>
                </div>
              </div>
            )}
          </div>


          {/* ==========================================
              CHAPTER 02: DENSE PRICE MATRIX TABLE
             ========================================== */}
          <div style={{ padding: '36px 40px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Chapter 01 • Global Pricing</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Price Comparison Across Trusted Retailers</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Verified prices and pack options from authorized global sellers</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Updated {report.publish_date}</span>
            </div>

            {/* Compact Dense Table Layout */}
            <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.775rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Platform</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Retailer Option / Pack</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Stock & Dispatch</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Promo Code</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Discount</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Verified Price</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Direct PDP Deal</th>
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

                      <td style={{ padding: '16px 18px', fontWeight: 600, color: 'var(--brand-obsidian)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Package size={14} color="var(--brand-rose)" />
                          <span>{item.variant_option || 'Standard Pack'}</span>
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
                          {item.is_lowest ? 'Buy Direct PDP' : 'Go to Direct PDP'} <ArrowUpRight size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* ==========================================
              CHAPTER 03: DETAILED SPECS & STORY
             ========================================== */}
          <div style={{ padding: '36px 40px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Chapter 02 • Product Dossier</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Technical Specifications & Formulation Story</h3>
            </div>
            
            {/* Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Net Volume / Size</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.volume || '50ml'}</div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Skin Type Suitability</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.skin_type || 'All Skin Types'}</div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Formulation & Texture</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.texture || 'Lightweight lotion'}</div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Finish & Feel</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.finish || 'Natural glow'}</div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Country of Manufacture</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.origin || 'Made in South Korea 🇰🇷'}</div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>PAO / Shelf Life</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{product.pao_expiration || '12M after opening'}</div>
              </div>
            </div>

            {/* Detailed Story & How to use */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {product.detailed_story && (
                <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--brand-obsidian)' }}><Sparkles size={16} color="var(--brand-rose)" /> Formulation &amp; Heritage</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {product.detailed_story}
                  </p>
                </div>
              )}

              {product.how_to_use && (
                <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--brand-obsidian)' }}><Lightbulb size={16} color="var(--brand-rose)" /> How to Use</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {product.how_to_use}
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* ==========================================
              CHAPTER 04: INCI SCIENCE & SAFETY
             ========================================== */}
          <div style={{ padding: '36px 40px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Chapter 03 • Dermatological Analysis</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>INCI Ingredient Science & EWG Safety</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Cross-verified against European CosIng & EWG Deep Skin database</p>
              </div>
              <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>{report.ewg_status}</span>
            </div>

            {/* Key Active Ingredients Breakdown */}
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--brand-obsidian)' }}><Microscope size={16} color="var(--brand-rose)" /> Active Components Breakdown</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {keyIngredients.map((ing) => (
                <div key={ing.id} style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: ing.tag_color || 'var(--brand-rose)', marginBottom: '6px', fontSize: '0.95rem' }}>{ing.name}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ing.description}</p>
                </div>
              ))}
            </div>

            {/* Full INCI List */}
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}><ScrollText size={16} color="var(--brand-rose)" /> Complete INCI Declaration List</h4>
            <div style={{
              padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
              fontSize: '0.825rem', lineHeight: 1.8, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace'
            }}>
              {report.full_inci_list}
            </div>
          </div>


          {/* ==========================================
              CHAPTER 05: REDDIT & SOCIAL CONSENSUS
             ========================================== */}
          <div style={{ padding: '36px 40px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Chapter 04 • Community Consensus</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Reddit, YouTube & Instagram Real Reviews</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Aggregated authentic user threads from r/AsianBeauty and top beauty editors</p>
              </div>

              {/* Platform Filter Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['ALL', 'REDDIT', 'YOUTUBE', 'INSTAGRAM'] as const).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSocialFilter(platform)}
                    style={{
                      padding: '6px 14px', borderRadius: 'var(--radius-full)',
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {filteredReviews.map((rev) => (
                <div key={rev.id} style={{ padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                        {rev.platform}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>{rev.metrics}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
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


          {/* ==========================================
              CHAPTER 06: BRAND ORIGIN & VERIFICATION
             ========================================== */}
          <div style={{ padding: '36px 40px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Chapter 05 • Manufacturer Verification</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: 'var(--brand-obsidian)' }}>Official Brand Heritage & Supply Chain</h3>
            
            <div style={{ padding: '28px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                  <Shield size={16} /> 100% Direct Manufacturer Authentic Supply Chain Verified
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
