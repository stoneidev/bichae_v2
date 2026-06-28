'use client';

import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

export function HeroWidget() {
  return (
    <section style={{ padding: '48px 0 24px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose-light)', border: '1px solid rgba(128, 0, 32, 0.15)',
          fontSize: '0.775rem', fontWeight: 800, color: 'var(--brand-rose)', marginBottom: '20px',
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>
          <Sparkles size={13} color="var(--brand-rose)" />
          <span>TODAY&apos;S FEATURED CURATION</span>
        </div>

        {/* Hero Title focused purely on product curation */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em',
          color: 'var(--text-primary)', maxWidth: '920px', margin: '0 auto 16px auto'
        }}>
          One Product. <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 400 }}>Complete Editorial Science.</span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.075rem', color: 'var(--text-secondary)', maxWidth: '700px',
          margin: '0 auto 28px auto', fontWeight: 400, lineHeight: 1.65
        }}>
          Today&apos;s single-product intelligence deep dive—featuring an exhaustive INCI dermatological breakdown, a real-time global price matrix across authorized retailers, and community consensus.
        </p>

        {/* Smooth Scroll Indicator */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.775rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <span>Scroll to read today&apos;s magazine dossier</span>
          <ArrowDown size={14} className="animate-bounce" color="var(--brand-rose)" />
        </div>

      </div>
    </section>
  );
}
