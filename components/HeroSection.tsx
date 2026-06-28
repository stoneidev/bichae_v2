'use client';

import React from 'react';
import { Sparkles, TrendingUp, DollarSign, FlaskConical, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ padding: '60px 0 40px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose-light)', border: '1px solid rgba(224, 122, 95, 0.2)',
          fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '24px'
        }}>
          <Sparkles size={16} />
          <span>Daily K-Beauty Science & Price Intelligence</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
          color: 'var(--text-primary)', maxWidth: '900px', margin: '0 auto 20px auto'
        }}>
          One Product. <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 400 }}>Every Single Detail.</span> Verified Daily.
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '680px',
          margin: '0 auto 40px auto', fontWeight: 400
        }}>
          Unbiased global price tracking across Olive Young, StyleKorean, YesStyle & Stylevana, coupled with lab-grade ingredient safety reports and social sentiment.
        </p>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px', maxWidth: '1000px', margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <DollarSign size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Real-Time Price Matrix</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Live cross-platform deal comparison to secure the lowest global price.</p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--brand-sage-light)', color: 'var(--brand-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <FlaskConical size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Authoritative INCI Reports</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>EWG Green Grade verification & active ingredient breakdown for skin safety.</p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(212, 163, 115, 0.15)', color: 'var(--brand-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <TrendingUp size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Multi-Social Consensus</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Aggregated reviews from YouTube, Instagram, and global beauty blogs.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
