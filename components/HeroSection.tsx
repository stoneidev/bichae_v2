'use client';

import React from 'react';
import { Sparkles, DollarSign, FlaskConical, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ padding: '48px 0 28px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 16px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose-light)', border: '1px solid rgba(224, 122, 95, 0.2)',
          fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '18px'
        }}>
          <Sparkles size={14} />
          <span>DAILY SINGLE-PRODUCT DEEP DIVE • VERIFIED EDITORIAL SCIENCE</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3.6rem)',
          fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em',
          color: 'var(--text-primary)', maxWidth: '900px', margin: '0 auto 14px auto'
        }}>
          One Product. <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 400 }}>Every Single Detail.</span> Verified Daily.
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '700px',
          margin: '0 auto 32px auto', fontWeight: 400, lineHeight: 1.6
        }}>
          Bypassing generic shopping catalogs to bring you an unbiased, lab-grade single product deep dive daily—featuring authoritative INCI science, high-density price tracking matrices, and real Reddit & multi-platform consensus.
        </p>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px', maxWidth: '1000px', margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <FlaskConical size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>100% INCI Science Breakdown</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>EWG Green Grade verification, active component analysis & irritation profiling.</p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--brand-sage-light)', color: 'var(--brand-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <DollarSign size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Dense Price Matrix Table</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>High-density cross-platform deal comparison across Stylevana, Olive Young & StyleKorean.</p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(212, 163, 115, 0.15)', color: 'var(--brand-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Award size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Reddit & Social Consensus</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Cross-verified community discussions from r/AsianBeauty, YouTube experts, and Instagram.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
