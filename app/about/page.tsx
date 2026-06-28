'use client';

import React from 'react';
import Link from 'next/link';
import { HeaderWidget, FooterWidget } from '@/src/widgets';
import { Sparkles, FlaskConical, DollarSign, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <HeaderWidget />
      
      <section style={{ padding: '60px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-rose-light)', border: '1px solid rgba(128, 0, 32, 0.15)',
              fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-rose)', marginBottom: '16px',
              letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              <Sparkles size={14} color="var(--brand-rose)" />
              <span>ABOUT BICHAE V2 • EDITORIAL PHILOSOPHY</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Independent Science &amp; Price Curation
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
              Bichae v2 is a daily single-product intelligence platform. We bypass traditional, crowded shopping catalogs to deliver an in-depth, lab-grade editorial analysis of one exceptional K-Beauty formulation every 24 hours.
            </p>
          </div>

          {/* 3 Core Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
            
            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <FlaskConical size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>100% INCI Formulation Science</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Every featured product undergoes comprehensive INCI ingredient verification against European CosIng and EWG Deep Skin databases to ensure zero hidden irritants and maximum skin barrier safety.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--brand-sage-light)', color: 'var(--brand-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <DollarSign size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Global Price Comparison</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                We continuously track prices across major authorized retailers including Stylevana, Olive Young, StyleKorean, and YesStyle to surface the verified lowest global deal for every featured product.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Reddit &amp; Multi-Platform Consensus</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                We aggregate verified community discussions from r/AsianBeauty and r/SkincareAddiction alongside trusted YouTube dermatologist reviews and Instagram beauty editor swatch tests.
              </p>
            </div>

          </div>

          {/* Mission Box */}
          <div style={{
            padding: '36px', borderRadius: 'var(--radius-lg)', background: 'var(--brand-obsidian)',
            color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--brand-rose)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Our Uncompromised Editorial Policy</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#D1D5DB', lineHeight: 1.7 }}>
              Bichae v2 operates independently. We do not accept paid placements to feature products in our daily deep dive. Every product is selected strictly based on formulation integrity, clinical active efficacy, and authentic global demand.
            </p>
            <div style={{ paddingTop: '12px' }}>
              <Link href="/" style={{ padding: '10px 22px', borderRadius: 'var(--radius-full)', background: 'var(--brand-rose)', color: '#FFF', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore Today&apos;s Single Feature <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <FooterWidget />
    </main>
  );
}
