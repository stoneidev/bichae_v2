'use client';

import React, { useState, useEffect } from 'react';
import {
  ExternalLink, CheckCircle2, Shield, ArrowUpRight, Package,
  Leaf, Sun, Lightbulb, Microscope, ScrollText, Camera, MapPin, Sparkles, Quote, Award
} from 'lucide-react';
import type { FullDailyReportPayload } from '@/entities/report';

export function DailyReportWidget() {
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

  if (loading) {
    return (
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div className="skeleton" style={{ height: '540px', width: '100%', borderRadius: 'var(--radius-lg)' }}></div>
        </div>
      </section>
    );
  }

  if (!reportData) return null;

  const { report, product, priceMatrix, keyIngredients, socialReviews } = reportData;

  const filteredReviews = socialFilter === 'ALL'
    ? socialReviews
    : socialReviews.filter((r) => r.platform.toUpperCase() === socialFilter);

  return (
    <section style={{ padding: '10px 0 60px 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Monochromatic Luxury Magazine Outer Wrapper */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column'
        }}>
          
          {/* CHAPTER I: PRODUCT OVERVIEW & STUDIO SHOWCASE */}
          <div style={{
            padding: '40px 48px', borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)'
          }}>
            <div className="product-hero-grid">

              {/* High-End Editorial Studio Photo Showcase */}
              <div style={{
                position: 'relative', width: '100%',
                borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(10, 10, 12, 0.12)',
                boxShadow: '0 20px 40px rgba(10, 10, 12, 0.1)', background: '#FFF'
              }}>
                <img
                  src={product.image_url || '/images/beauty_of_joseon_sunscreen.jpg'}
                  alt={`${product.brand_name} ${product.name}`}
                  width={340}
                  height={340}
                  style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', display: 'block', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: '14px', left: '14px',
                  padding: '5px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(10, 10, 12, 0.85)',
                  color: '#FFF', fontSize: '0.725rem', fontWeight: 700, backdropFilter: 'blur(6px)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.04em'
                }}>
                  <Camera size={13} color="var(--brand-rose)" /> Verified Studio Shot
                </div>
              </div>

              {/* Title, Editorial Metadata & Price Summary */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span className="badge badge-trending" style={{ fontWeight: 800, letterSpacing: '0.05em' }}>EDITION NO. {report.id}</span>
                  {product.is_authentic ? (
                    <span className="badge badge-verified" style={{ letterSpacing: '0.02em' }}><CheckCircle2 size={12} /> 100% Direct Authentic</span>
                  ) : null}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published: {report.publish_date}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                  {report.title}
                </h2>

                <p style={{ fontSize: '1.025rem', color: 'var(--text-secondary)', marginBottom: '22px', lineHeight: 1.65, fontWeight: 400 }}>
                  {product.description}
                </p>

                {/* Quick Specs Pill Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Package size={13} color="var(--brand-rose)" /> {product.volume}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Leaf size={13} color="var(--brand-sage)" /> {report.ewg_status}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Sun size={13} color="var(--brand-rose)" /> {product.category}</span>
                  {product.origin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><MapPin size={13} /> {product.origin}</span>}
                </div>

                {/* Horizontal Price Summary Bar */}
                <div className="product-price-bar">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Global Verified Lowest</span>
                    <span className="price-amount" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFF', lineHeight: 1.05 }}>
                      ${Number(product.lowest_price_usd).toFixed(2)} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-rose-light)' }}>USD</span>
                    </span>
                  </div>
                  <div className="price-divider" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official MSRP</span>
                    <span className="price-amount" style={{ fontSize: '1rem', fontWeight: 600, color: '#9CA3AF', textDecoration: 'line-through' }}>${Number(product.msrp_usd).toFixed(2)}</span>
                  </div>
                  <div className="price-divider" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Best Deal Partner</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Award size={14} color="var(--brand-rose)" /> {product.best_deal_platform} ({product.best_deal_discount})
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* High-Fashion Curator Science Note Pull-Quote (Bespoke Magazine Editorial) */}
            {report.editor_note && (
              <div style={{
                marginTop: '36px', padding: '32px 36px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      CURATOR&apos;S FORMULATION DOSSIER
                    </span>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      VERIFIED DERMATOLOGICAL REVIEW
                    </span>
                  </div>
                  
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.075rem', color: 'var(--text-primary)',
                    lineHeight: 1.7, fontStyle: 'italic', fontWeight: 400, margin: '4px 0'
                  }}>
                    &ldquo;{report.editor_note}&rdquo;
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px' }}>
                    <span style={{ fontSize: '0.775rem', fontWeight: 800, color: 'var(--brand-obsidian)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      — BICHAE EDITORIAL RESEARCH TEAM
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* CHAPTER II: DENSE CROSS-PLATFORM PRICE MATRIX */}
          <div style={{ padding: '40px 48px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CHAPTER II • GLOBAL PRICE MATRIX</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Cross-Platform Price &amp; Package Tracking</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Real-time verified prices and specific retailer package options from authorized distributors</p>
              </div>
              <span className="badge badge-trending" style={{ fontSize: '0.775rem', fontWeight: 800, letterSpacing: '0.04em' }}>Real-Time Sync</span>
            </div>

            {/* High-Density Table Layout */}
            <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Platform</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Option / Pack Details</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Stock &amp; Dispatch</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Promo Code</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Discount</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Verified Price</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'right' }}>Direct Link</th>
                  </tr>
                </thead>
                <tbody>
                  {priceMatrix.map((item) => (
                    <tr 
                      key={item.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        background: item.is_lowest ? 'rgba(128, 0, 32, 0.03)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '18px 20px', fontWeight: 700 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span style={{ 
                            width: '34px', height: '34px', borderRadius: '8px', 
                            background: item.logo_bg || '#0A0A0C', color: item.logo_color || '#FFF', 
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                            fontWeight: 800, fontSize: '0.65rem', textAlign: 'center', flexShrink: 0
                          }}>
                            {item.platform_name.substring(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.platform_name}</div>
                            {item.is_lowest ? <span style={{ fontSize: '0.675rem', color: 'var(--brand-rose)', fontWeight: 800, letterSpacing: '0.06em' }}>★ VERIFIED LOWEST</span> : null}
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '18px 20px', fontWeight: 600, color: 'var(--brand-obsidian)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Package size={14} color="var(--brand-rose)" />
                          <span>{item.variant_option || 'Standard Pack'}</span>
                        </div>
                      </td>

                      <td style={{ padding: '18px 20px', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.stock_status}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{item.shipping_info}</div>
                      </td>

                      <td style={{ padding: '18px 20px' }}>
                        {item.promo_code ? (
                          <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '0.775rem', fontWeight: 800, color: 'var(--brand-rose)', fontFamily: 'monospace' }}>
                            {item.promo_code}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                        )}
                      </td>

                      <td style={{ padding: '18px 20px', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-sage)' }}>
                        {item.discount_text || '—'}
                      </td>

                      <td style={{ padding: '18px 20px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--text-primary)' }}>
                          ${Number(item.price_usd).toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: 600 }}>USD</span>
                      </td>

                      <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                        <a 
                          href={item.buy_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ 
                            padding: '8px 18px', borderRadius: 'var(--radius-full)', 
                            background: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-obsidian)', 
                            color: '#FFF', 
                            fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px',
                            textDecoration: 'none', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)'
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


          {/* CHAPTER III: TECHNICAL DOSSIER & HERITAGE */}
          <div style={{ padding: '40px 48px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CHAPTER III • TECHNICAL DOSSIER</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Formulation Specifications &amp; Heritage</h3>
            </div>
            
            {/* Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Net Volume / Size</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.volume || '50ml'}</div>
              </div>

              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Skin Type Suitability</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.skin_type || 'All Skin Types'}</div>
              </div>

              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Formulation &amp; Texture</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.texture || 'Lightweight lotion'}</div>
              </div>

              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Finish &amp; Feel</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.finish || 'Natural glow'}</div>
              </div>

              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Country of Origin</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.origin || 'Made in South Korea 🇰🇷'}</div>
              </div>

              <div style={{ padding: '18px 22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>PAO / Shelf Life</div>
                <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-primary)' }}>{product.pao_expiration || '12M after opening'}</div>
              </div>
            </div>

            {/* Detailed Story & How to use */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {product.detailed_story && (
                <div style={{ padding: '28px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', color: 'var(--brand-obsidian)' }}><Sparkles size={18} color="var(--brand-rose)" /> Formulation &amp; Heritage</h4>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {product.detailed_story}
                  </p>
                </div>
              )}

              {product.how_to_use && (
                <div style={{ padding: '28px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', color: 'var(--brand-obsidian)' }}><Lightbulb size={18} color="var(--brand-rose)" /> Application Method</h4>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {product.how_to_use}
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* CHAPTER IV: INCI SCIENCE & EWG SAFETY */}
          <div style={{ padding: '40px 48px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CHAPTER IV • DERMATOLOGICAL ANALYSIS</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>100% INCI Ingredient Science &amp; EWG Safety</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Cross-verified against European CosIng &amp; EWG Deep Skin database</p>
              </div>
              <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 16px', letterSpacing: '0.04em' }}>{report.ewg_status}</span>
            </div>

            {/* Key Active Ingredients Laboratory Infographic Cards */}
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 700, marginBottom: '18px', color: 'var(--brand-obsidian)' }}><Microscope size={18} color="var(--brand-rose)" /> Active Components Laboratory Cards</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px', marginBottom: '32px' }}>
              {keyIngredients.map((ing) => (
                <div key={ing.id} style={{ padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--brand-rose)', marginBottom: '8px', fontSize: '1rem', letterSpacing: '-0.01em' }}>{ing.name}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ing.description}</p>
                </div>
              ))}
            </div>

            {/* Full INCI Declaration Box */}
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', color: 'var(--brand-obsidian)' }}><ScrollText size={18} color="var(--brand-rose)" /> Complete INCI Declaration List</h4>
            <div style={{
              padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
              fontSize: '0.825rem', lineHeight: 1.85, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace'
            }}>
              {report.full_inci_list}
            </div>
          </div>


          {/* CHAPTER V: REDDIT & SOCIAL CONSENSUS */}
          <div style={{ padding: '40px 48px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CHAPTER V • COMMUNITY CONSENSUS</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>Reddit, YouTube &amp; Instagram Real Reviews</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Aggregated authentic user threads from r/AsianBeauty and top beauty editors</p>
              </div>

              {/* Platform Filter Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['ALL', 'REDDIT', 'YOUTUBE', 'INSTAGRAM'] as const).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSocialFilter(platform)}
                    style={{
                      padding: '7px 16px', borderRadius: 'var(--radius-full)',
                      fontSize: '0.775rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em',
                      border: socialFilter === platform ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
                      background: socialFilter === platform ? 'var(--brand-rose)' : 'var(--bg-card)',
                      color: socialFilter === platform ? '#FFF' : 'var(--text-secondary)',
                      boxShadow: socialFilter === platform ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Social Pull-Quote Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
              {filteredReviews.map((rev) => (
                <div key={rev.id} style={{
                  padding: '26px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.12, color: 'var(--text-primary)' }}>
                    <Quote size={40} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <span style={{ padding: '5px 12px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.06em' }}>
                        {rev.platform}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-obsidian)' }}>{rev.metrics}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {rev.channel_or_user}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-rose)', marginBottom: '12px' }}>
                      {rev.title_or_context}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* CHAPTER VI: BRAND ORIGIN & VERIFICATION */}
          <div style={{ padding: '40px 48px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CHAPTER VI • MANUFACTURER VERIFICATION</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, marginBottom: '20px', color: 'var(--brand-obsidian)' }}>Official Brand Heritage &amp; Supply Chain</h3>
            
            <div style={{ padding: '32px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-obsidian)', marginBottom: '8px' }}>{product.brand_name}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {product.brand_description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                {product.brand_website && (
                  <a href={product.brand_website} target="_blank" rel="noreferrer" style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }}>
                    Visit Official Brand Portal <ExternalLink size={15} />
                  </a>
                )}
                <span style={{ fontSize: '0.875rem', color: 'var(--brand-sage)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={18} /> 100% Direct Manufacturer Authentic Supply Chain Verified
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
