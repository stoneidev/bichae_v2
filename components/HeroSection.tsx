'use client';

import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ padding: '40px 0 20px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 16px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose-light)', border: '1px solid rgba(224, 122, 95, 0.2)',
          fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '16px'
        }}>
          <Sparkles size={14} />
          <span>TODAY&apos;S SINGLE FEATURED CURATION • JUNE 28, 2026</span>
        </div>

        {/* Hero Title focused purely on product curation */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
          fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em',
          color: 'var(--text-primary)', maxWidth: '900px', margin: '0 auto 12px auto'
        }}>
          One Product. <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 400 }}>Complete Editorial Science.</span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '680px',
          margin: '0 auto 24px auto', fontWeight: 400, lineHeight: 1.6
        }}>
          Below is today&apos;s verified single-product deep dive—featuring an exhaustive INCI breakdown, high-density global price tracking matrix, and community consensus.
        </p>

        {/* Smooth Scroll Indicator */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <span>Scroll For Today&apos;s Magazine Report</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>

      </div>
    </section>
  );
}
