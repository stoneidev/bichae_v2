'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useReveal } from '@/shared/lib/useReveal';

export function HeroWidget() {
  useReveal();

  return (
    <section style={{ padding: '72px 0 32px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Eyebrow */}
        <div data-reveal className="eyebrow" style={{ marginBottom: '20px' }}>
          Today&apos;s Featured Curation
        </div>

        {/* Hero Headline */}
        <h1
          data-reveal
          style={{
            fontFamily: 'var(--font-serif), var(--font-serif-fallback)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.035em',
            color: 'var(--text-primary)', margin: '0 auto 20px auto',
            transitionDelay: '60ms',
          }}
        >
          One product, studied <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 400 }}>completely</span>.
        </h1>

        {/* Lead */}
        <p
          data-reveal
          className="lead measure"
          style={{ margin: '0 auto 32px auto', transitionDelay: '120ms' }}
        >
          Each day, a single K-beauty formulation — read for its ingredients, priced
          across the world&apos;s trusted retailers, and weighed against what the
          community actually says.
        </p>

        {/* Scroll Indicator */}
        <div
          data-reveal
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', transitionDelay: '180ms' }}
        >
          <span>Read today&apos;s dossier</span>
          <ArrowDown size={13} className="animate-bounce" color="var(--brand-rose)" />
        </div>

      </div>
    </section>
  );
}
