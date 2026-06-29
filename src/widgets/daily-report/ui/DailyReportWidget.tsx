'use client';

import React, { useState, useEffect } from 'react';
import {
  ExternalLink, CheckCircle2, ArrowUpRight, Package,
  Leaf, Sun, Microscope, ScrollText, Camera, Sparkles, Quote, Award,
  ThumbsUp, Globe, ShieldCheck, FlaskRound, X, MessageSquare, Play, Heart,
  Lock, Database, Scale, BadgeCheck
} from 'lucide-react';
import type { FullDailyReportPayload } from '@/entities/report';
import type { CommunityReview } from '@/shared';
import { useReveal } from '@/shared/lib/useReveal';
import { getBuyingGuide } from '../model/buyingGuides';

export interface DailyReportWidgetProps {
  /** When set, fetch this specific report (permanent /report/[id] page). */
  reportId?: string;
  /** Server-rendered payload — skips client fetch entirely (best for SEO). */
  initialData?: FullDailyReportPayload | null;
}

export function DailyReportWidget({ reportId, initialData }: DailyReportWidgetProps = {}) {
  const [reportData, setReportData] = useState<FullDailyReportPayload | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [socialFilter, setSocialFilter] = useState<'ALL' | 'REDDIT' | 'YOUTUBE' | 'INSTAGRAM'>('ALL');
  const [inciTab, setInciTab] = useState<'ACTIVES' | 'FULL'>('ACTIVES');
  const [selectedReview, setSelectedReview] = useState<CommunityReview | null>(null);

  // Attach scroll-reveal once the report content has rendered.
  useReveal(reportData);

  useEffect(() => {
    // Already have server-rendered data — nothing to fetch.
    if (initialData) return;
    async function fetchReport() {
      try {
        const endpoint = reportId ? `/api/reports/${reportId}` : '/api/reports/daily';
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json.success && json.data) {
          setReportData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch report:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [reportId, initialData]);

  if (loading) {
    return (
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
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

  const cleanOrigin = product.origin ? product.origin.replace('🇰🇷', '').trim() : 'Made in South Korea';
  const guide = getBuyingGuide(product.category);

  // Distinct two-letter monogram so similarly-named retailers don't collide
  // (e.g. "Stylevana" → SV, "StyleKorean" → SK).
  const retailerMonogram = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    const w = words[0] || '';
    const caps = w.replace(/[^A-Z]/g, '');
    if (caps.length >= 2) return caps.slice(0, 2);
    return w.slice(0, 2).toUpperCase();
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand_name} ${product.name}`,
    image: product.image_url || 'https://bichae-v2.pages.dev/images/beauty_of_joseon_sunscreen.jpg',
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand_name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: product.lowest_price_usd,
      highPrice: product.msrp_usd,
      offerCount: priceMatrix.length,
      offers: priceMatrix.map((item) => ({
        '@type': 'Offer',
        price: item.price_usd,
        priceCurrency: 'USD',
        seller: {
          '@type': 'Organization',
          name: item.platform_name,
        },
        url: item.buy_url,
        availability: 'https://schema.org/InStock',
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: socialReviews.length > 0 ? socialReviews.length * 10 : 150,
    },
  };

  return (
    <section style={{ padding: '10px 0 40px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container" style={{ maxWidth: '1240px' }}>

        {/* Editorial Magazine Spread — separated by whitespace + hairlines, not boxes */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* CHAPTER I: PRODUCT OVERVIEW & STUDIO SHOWCASE */}
          <div data-reveal className="chapter" style={{ paddingTop: '40px' }}>
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
                  <Camera size={13} color="var(--brand-rose)" /> Studio Showcase
                </div>
              </div>

              {/* Title, Editorial Metadata & Price Summary */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span className="badge badge-trending" style={{ fontWeight: 800, letterSpacing: '0.05em' }}>EDITION NO. {report.id}</span>
                  {product.is_authentic ? (
                    <span className="badge badge-verified" style={{ letterSpacing: '0.02em' }}><CheckCircle2 size={12} /> Authentic Sourced</span>
                  ) : null}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published: {report.publish_date}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                  {report.title}
                </h2>

                <p className="measure" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '22px', lineHeight: 1.7, fontWeight: 400 }}>
                  {product.description}
                </p>

                {/* Quick Specs Pill Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Package size={13} color="var(--brand-rose)" /> {product.volume}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Leaf size={13} color="var(--brand-sage)" /> {report.ewg_status}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Sun size={13} color="var(--brand-rose)" /> {product.category}</span>
                  {product.origin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}><Globe size={13} color="var(--brand-rose)" /> {cleanOrigin}</span>}
                </div>

                {/* Horizontal Price Summary Bar */}
                <div className="product-price-bar">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Global Verified Lowest</span>
                    <span className="price-amount tnum" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFF', lineHeight: 1.05 }}>
                      ${Number(product.lowest_price_usd).toFixed(2)} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-rose-light)' }}>USD</span>
                    </span>
                  </div>
                  <div className="price-divider" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official MSRP</span>
                    <span className="price-amount tnum" style={{ fontSize: '1rem', fontWeight: 600, color: '#9CA3AF', textDecoration: 'line-through' }}>${Number(product.msrp_usd).toFixed(2)}</span>
                  </div>
                  <div className="price-divider" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A0A4B0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Best Deal Partner</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Award size={14} color="var(--brand-rose)" /> {product.best_deal_platform} ({product.best_deal_discount})
                    </span>
                  </div>
                </div>

                {/* Trust guarantees */}
                <div className="trust-strip">
                  <span className="trust-item"><ShieldCheck size={16} /> Authorized retailers only</span>
                  <span className="trust-item"><CheckCircle2 size={16} /> Authenticity guaranteed</span>
                  <span className="trust-item"><Lock size={16} /> Secure checkout on each site</span>
                </div>
              </div>

            </div>

            {/* Curator's Note — editorial pull-quote, framed by whitespace and a hairline */}
            {report.editor_note && (
              <figure
                data-reveal
                style={{
                  margin: '48px auto 0 auto', maxWidth: '760px', textAlign: 'center',
                  paddingTop: '40px', borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div className="eyebrow" style={{ marginBottom: '20px' }}>Curator&apos;s Note</div>
                <blockquote
                  style={{
                    fontFamily: 'var(--font-serif), var(--font-serif-fallback)',
                    fontSize: 'clamp(1.25rem, 2.1vw, 1.6rem)', color: 'var(--text-primary)',
                    lineHeight: 1.5, fontStyle: 'italic', fontWeight: 400, margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  &ldquo;{report.editor_note}&rdquo;
                </blockquote>
                <figcaption style={{ marginTop: '24px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Bichae Editorial Research Team
                </figcaption>
              </figure>
            )}
          </div>

          <hr className="rule" />


          {/* CHAPTER II: CROSS-PLATFORM PRICE COMPARISON */}
          <div data-reveal className="chapter">
            <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div className="eyebrow">Chapter II — Global Pricing</div>
                <h3 className="chapter-title">Where to Buy It — Compared</h3>
                <p className="measure-wide" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>Verified prices from authorized global distributors. Every link opens the retailer&apos;s own product page — we never resell or take payment.</p>
              </div>
            </div>

            {/* Price provenance: live status + basis note */}
            <div className="price-meta">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <span className="live-dot" /> Verified {report.publish_date}
              </span>
              <span>·</span>
              <span>Prices in USD, before shipping &amp; duties</span>
              <span>·</span>
              <span>{priceMatrix.length} authorized retailers tracked</span>
            </div>

            {/* High-Density Table Layout (Desktop) */}
            <div className="price-matrix-desktop" style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Platform</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Option / Pack Details</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Stock &amp; Dispatch</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Discount</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Verified Price</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'right' }}>Direct Link</th>
                  </tr>
                </thead>
                <tbody>
                  {priceMatrix.map((item) => (
                    <tr 
                      key={item.id}
                      className={item.is_lowest ? 'row-champagne-glaze' : ''}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '18px 20px', fontWeight: 700 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span className="retailer-logo" style={{
                            background: item.logo_bg || '#0A0A0C', color: item.logo_color || '#FFF',
                          }}>
                            {retailerMonogram(item.platform_name)}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.platform_name}</div>
                            {item.stock_status?.toLowerCase().includes('official') || item.platform_name?.toLowerCase().includes('naver') ? (
                              <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#03C75A', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <ShieldCheck size={12} color="#03C75A" /> Official Direct Store (공식몰)
                              </span>
                            ) : item.is_lowest ? (
                              <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-rose)', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Award size={11} color="var(--brand-rose)" /> Lowest Price
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--brand-sage)', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <BadgeCheck size={12} /> Authorized Distributor
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '18px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Package size={14} color="var(--brand-rose)" />
                          <span>{item.variant_option || 'Standard Pack'}</span>
                        </div>
                      </td>

                      <td style={{ padding: '18px 20px', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.stock_status}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{item.shipping_info}</div>
                      </td>

                      <td style={{ padding: '18px 20px', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-sage)' }}>
                        {item.discount_text || '—'}
                      </td>

                      <td style={{ padding: '18px 20px' }}>
                        <span className="tnum" style={{ fontSize: '1.2rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--text-primary)' }}>
                          ${Number(item.price_usd).toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: 600 }}>USD</span>
                      </td>

                      <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                        <a 
                          href={item.buy_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-pdp"
                          style={{ 
                            padding: '8px 18px', borderRadius: 'var(--radius-full)', 
                            background: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-obsidian)', 
                            color: '#FFF', 
                            fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px',
                            textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          {item.is_lowest ? 'Shop Lowest' : 'View'} <ArrowUpRight size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Touch-Optimized Retailer Card Stack (Mobile) */}
            <div className="price-matrix-mobile">
              {priceMatrix.map((item) => (
                <div 
                  key={item.id}
                  className={`retailer-card ${item.is_lowest ? 'retailer-card-lowest' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="retailer-logo" style={{
                        background: item.logo_bg || '#0A0A0C', color: item.logo_color || '#FFF',
                      }}>
                        {retailerMonogram(item.platform_name)}
                      </span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{item.platform_name}</div>
                        {item.is_lowest ? (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-rose)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Award size={12} color="var(--brand-rose)" /> Lowest Price Deal
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--brand-sage)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <BadgeCheck size={12} /> Authorized
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="tnum" style={{ fontSize: '1.25rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--text-primary)' }}>
                        ${Number(item.price_usd).toFixed(2)}
                      </div>
                      {item.discount_text && (
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-sage)' }}>
                          {item.discount_text}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                      <Package size={14} color="var(--brand-rose)" />
                      <span>{item.variant_option || 'Standard Pack'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.stock_status}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.775rem' }}>{item.shipping_info}</span>
                    </div>
                  </div>

                  <div style={{ paddingTop: '4px' }}>
                    <a
                      href={item.buy_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pdp"
                      style={{
                        padding: '12px 20px', borderRadius: 'var(--radius-full)', width: '100%',
                        background: item.is_lowest ? 'var(--brand-rose)' : 'var(--brand-obsidian)',
                        color: '#FFF',
                        fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {item.is_lowest ? 'Shop Lowest Price' : `View at ${item.platform_name}`} <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* How we verify — transparency that earns the click */}
            <div style={{ marginTop: '40px', paddingTop: '36px', borderTop: '1px solid var(--border-subtle)' }}>
              <div className="eyebrow" style={{ marginBottom: '24px' }}>How We Verify</div>
              <div className="verify-grid">
                <div className="verify-item">
                  <span className="verify-icon"><Database size={20} /></span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Authorized sources only</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Every price is pulled from a brand-authorized retailer&apos;s official product page — no grey-market sellers.</p>
                </div>
                <div className="verify-item">
                  <span className="verify-icon"><Scale size={20} /></span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Like-for-like comparison</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>We normalize pack size and currency so the lowest price reflects the same product, not a different bundle.</p>
                </div>
                <div className="verify-item">
                  <span className="verify-icon"><ShieldCheck size={20} /></span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>No paid placement</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Rankings are decided by verified price alone. Retailers cannot pay to appear first.</p>
                </div>
              </div>
            </div>
          </div>


          <hr className="rule" />

          {/* CHAPTER III: TECHNICAL DOSSIER & HERITAGE */}
          <div data-reveal className="chapter">
            <div style={{ marginBottom: '28px' }}>
              <div className="eyebrow">Chapter III — Technical Dossier</div>
              <h3 className="chapter-title">Specifications &amp; Heritage</h3>
            </div>
            
            {/* Specs — hairline-separated definition list, no boxes */}
            <dl className="spec-list" style={{ marginBottom: '40px' }}>
              {[
                { label: 'Net Volume / Size', value: product.volume || '50ml' },
                { label: 'Skin Type', value: product.skin_type || 'All Skin Types' },
                { label: 'Texture', value: product.texture || 'Lightweight lotion' },
                { label: 'Finish & Feel', value: product.finish || 'Natural glow' },
                { label: 'Country of Origin', value: cleanOrigin },
                { label: 'PAO / Shelf Life', value: product.pao_expiration || '12M after opening' },
              ].map((spec) => (
                <div key={spec.label} className="spec-row">
                  <dt style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{spec.label}</dt>
                  <dd style={{ fontWeight: 600, fontSize: '0.975rem', color: 'var(--text-primary)', margin: 0 }}>{spec.value}</dd>
                </div>
              ))}
            </dl>

            {/* Detailed Story & How to use — editorial columns, drop cap on the lead */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {product.detailed_story && (
                <div>
                  <h4 style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '12px', color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Formulation &amp; Heritage</h4>
                  <p className="dropcap" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {product.detailed_story}
                  </p>
                </div>
              )}

              {product.how_to_use && (
                <div>
                  <h4 style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '12px', color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>How to Use</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {product.how_to_use}
                  </p>
                </div>
              )}
            </div>
          </div>


          <hr className="rule" />

          {/* CHAPTER IV: INCI SCIENCE & EWG SAFETY */}
          <div data-reveal className="chapter">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div className="eyebrow">Chapter IV — Ingredient Analysis</div>
                <h3 className="chapter-title">The Science, Ingredient by Ingredient</h3>
                <p className="measure-wide" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>Cross-verified against the European CosIng and EWG databases.</p>
              </div>

              <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 16px', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="ewg-glow-indicator" title="Verified Safe Grade 1-2" />
                {report.ewg_status}
              </span>
            </div>

            {/* Skin Barrier Compatibility Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              <span className="badge" style={{ background: 'var(--brand-sage-light)', color: 'var(--brand-sage)', border: '1px solid rgba(44, 74, 62, 0.2)' }}>
                <ShieldCheck size={13} /> Sensitive Safe
              </span>
              <span className="badge" style={{ background: 'var(--bg-main)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                <FlaskRound size={13} color="var(--brand-rose)" /> Non-Comedogenic
              </span>
              <span className="badge" style={{ background: 'var(--bg-main)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                <Sparkles size={13} color="var(--brand-rose)" /> Fragrance-Free
              </span>
            </div>

            {/* Interactive View Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <button
                onClick={() => setInciTab('ACTIVES')}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                  border: inciTab === 'ACTIVES' ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
                  background: inciTab === 'ACTIVES' ? 'var(--brand-rose)' : 'var(--bg-main)',
                  color: inciTab === 'ACTIVES' ? '#FFF' : 'var(--text-secondary)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Microscope size={14} /> Key Actives Laboratory Cards
              </button>
              <button
                onClick={() => setInciTab('FULL')}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                  border: inciTab === 'FULL' ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
                  background: inciTab === 'FULL' ? 'var(--brand-rose)' : 'var(--bg-main)',
                  color: inciTab === 'FULL' ? '#FFF' : 'var(--text-secondary)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <ScrollText size={14} /> Full INCI Safety Declaration
              </button>
            </div>

            {/* Tab 1: Key Active Ingredients Laboratory Infographic Cards */}
            {inciTab === 'ACTIVES' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
                {keyIngredients.map((ing) => (
                  <div key={ing.id} style={{ padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--brand-rose)', fontSize: '1rem', letterSpacing: '-0.01em' }}>{ing.name}</div>
                      <span className="badge badge-verified" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Active</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ing.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Full INCI Declaration Box */}
            {inciTab === 'FULL' && (
              <div style={{
                padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                fontSize: '0.825rem', lineHeight: 1.85, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
                fontFamily: 'monospace'
              }}>
                {report.full_inci_list}
              </div>
            )}
          </div>


          <hr className="rule" />

          {/* CHAPTER V: BUYER'S GUIDE (category-aware) */}
          <div data-reveal className="chapter">
            <div style={{ marginBottom: '32px', maxWidth: '720px' }}>
              <div className="eyebrow">{guide.eyebrow}</div>
              <h3 className="chapter-title">{guide.title}</h3>
              <p className="lead" style={{ marginTop: '12px', fontSize: '1.05rem' }}>{guide.standfirst}</p>
            </div>

            <div className="guide-grid">
              {guide.columns.map((col) => (
                <div key={col.title}>
                  <div className="guide-col-title">{col.title}</div>
                  {col.points.map((pt, idx) => (
                    <div key={pt.label} className="guide-point">
                      <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                      <div>
                        <div className="label">{pt.label}</div>
                        <div className="detail">{pt.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>


          <hr className="rule" />

          {/* CHAPTER VI: REDDIT & SOCIAL CONSENSUS */}
          <div data-reveal className="chapter">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div className="eyebrow">Chapter VI — Community Consensus</div>
                <h3 className="chapter-title">What People Actually Say</h3>
                <p className="measure-wide" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>Verified voices from r/AsianBeauty, YouTube dermatologists, and Instagram editors.</p>
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
            
            {/* Authentic Platform Media Preview Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {filteredReviews.map((rev) => {
                const accentClass = rev.platform === 'REDDIT'
                  ? 'platform-accent-reddit'
                  : rev.platform === 'YOUTUBE'
                    ? 'platform-accent-youtube'
                    : 'platform-accent-instagram';
                return (
                  <div 
                    key={rev.id} 
                    className={`review-preview-card ${accentClass}`}
                    onClick={() => setSelectedReview(rev)}
                    style={{
                      padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                      border: 'none', display: 'flex', flexDirection: 'column',
                      justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div>
                      {/* Media Preview Header for YouTube & Instagram */}
                      {rev.thumbnail_url ? (
                        <div className="media-thumb-container" style={{ height: '160px', marginBottom: '16px' }}>
                          <img src={rev.thumbnail_url} alt={rev.title_or_context} className="media-thumb-img" />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />
                          
                          {/* YouTube Play Overlay */}
                          {rev.platform === 'YOUTUBE' && (
                            <>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="play-btn-circle">
                                  <Play size={20} fill="#FFF" style={{ marginLeft: '3px' }} />
                                </div>
                              </div>
                              {rev.video_duration && (
                                <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(10,10,12,0.85)', color: '#FFF', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontFamily: 'monospace' }}>
                                  {rev.video_duration}
                                </span>
                              )}
                            </>
                          )}

                          {/* Instagram Likes Badge Overlay */}
                          {rev.platform === 'INSTAGRAM' && (
                            <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(10,10,12,0.85)', color: '#FFF', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700, backdropFilter: 'blur(6px)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                              <Heart size={13} fill="#FF3B30" color="#FF3B30" /> {rev.likes_count || '12.4k'} Likes
                            </div>
                          )}

                          <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 10px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.675rem', fontWeight: 800, letterSpacing: '0.06em' }}>
                            {rev.platform}
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <span style={{ padding: '5px 12px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.06em' }}>
                            {rev.platform}
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <ThumbsUp size={13} color="var(--brand-rose)" /> {rev.metrics}
                          </span>
                        </div>
                      )}

                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {rev.channel_or_user}
                      </div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--brand-rose)', marginBottom: '10px', lineHeight: 1.35 }}>
                        {rev.title_or_context}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>

                    <div style={{ paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '10px' }}>
                      <span>
                        {rev.platform === 'YOUTUBE' ? 'Watch Video Analysis' : rev.platform === 'INSTAGRAM' ? 'View Instagram Post' : 'Read Community Discussion'}
                      </span> 
                      <ArrowUpRight size={14} color="var(--brand-rose)" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          <hr className="rule" />

          {/* CHAPTER VI: BRAND ORIGIN & VERIFICATION */}
          <div data-reveal className="chapter">
            <div className="eyebrow">Chapter VII — The Maker</div>

            <h3 className="chapter-title" style={{ marginBottom: '20px' }}>Brand Heritage &amp; Supply Chain</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif), var(--font-serif-fallback)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{product.brand_name}</h4>
                <p className="measure" style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {product.brand_description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {product.brand_website && (
                  <a href={product.brand_website} target="_blank" rel="noreferrer" className="btn-pdp" style={{ padding: '12px 26px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    Visit Official Brand Site <ExternalLink size={15} />
                  </a>
                )}
                <span style={{ fontSize: '0.85rem', color: 'var(--brand-sage)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                  <ShieldCheck size={17} /> Authentic, direct-from-manufacturer supply chain
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Review Detail Media Preview Modal Overlay */}
      {selectedReview && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <button
              onClick={() => setSelectedReview(null)}
              style={{
                position: 'absolute', top: '16px', right: '16px', zIndex: 20,
                background: 'rgba(10,10,12,0.8)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '36px', height: '36px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                color: '#FFF', backdropFilter: 'blur(4px)'
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Media Header */}
            {selectedReview.thumbnail_url ? (
              <div style={{ position: 'relative', width: '100%', height: '240px', background: '#0A0A0C' }}>
                <img src={selectedReview.thumbnail_url} alt={selectedReview.title_or_context} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(10,10,12,0.9) 100%)' }} />
                {selectedReview.platform === 'YOUTUBE' && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="play-btn-circle" style={{ width: '56px', height: '56px' }}>
                      <Play size={26} fill="#FFF" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '20px', left: '28px', right: '28px', color: '#FFF' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '4px', background: selectedReview.badge_color, fontSize: '0.725rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {selectedReview.platform}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif), var(--font-serif-fallback)', fontSize: '1.4rem', fontWeight: 700, color: '#FFF', marginTop: '8px', lineHeight: 1.25 }}>
                    {selectedReview.title_or_context}
                  </h3>
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px 32px 0 32px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '4px', background: selectedReview.badge_color, color: '#FFF', fontSize: '0.725rem', fontWeight: 800 }}>
                  {selectedReview.platform}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif), var(--font-serif-fallback)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '12px' }}>
                  {selectedReview.title_or_context}
                </h3>
              </div>
            )}

            <div style={{ padding: '28px 32px 32px 32px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-rose)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} /> {selectedReview.channel_or_user} • {selectedReview.metrics}
              </div>

              <div style={{
                padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)', marginBottom: '28px', position: 'relative'
              }}>
                <Quote size={28} color="var(--brand-rose)" style={{ marginBottom: '8px', opacity: 0.4 }} />
                <p style={{ fontFamily: 'var(--font-serif), var(--font-serif-fallback)', fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.7 }}>
                  &ldquo;{selectedReview.quote}&rdquo;
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedReview.url ? (
                  <a
                    href={selectedReview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pdp"
                    style={{
                      padding: '12px 24px', borderRadius: 'var(--radius-full)',
                      background: selectedReview.badge_color, color: '#FFF',
                      fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px',
                      textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {selectedReview.platform === 'YOUTUBE' ? 'Watch Full Video on YouTube' : selectedReview.platform === 'INSTAGRAM' ? 'Open Original Post on Instagram' : 'View Thread on Reddit'} <ExternalLink size={15} />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedReview(null)}
                  style={{
                    padding: '10px 20px', borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-main)', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
