'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, FlaskConical, DollarSign, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Header />
      
      <section style={{ padding: '60px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-rose-light)', border: '1px solid rgba(224, 122, 95, 0.2)',
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '16px'
            }}>
              <Sparkles size={14} />
              <span>ABOUT BICHAE V2 • EDITORIAL PHILOSOPHY</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Independent Science & Price Curation
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>High-Density Price Tracking Matrix</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Our real-time Cloudflare D1 price tracking engine continuously monitors major global authorized retailers including Stylevana, Olive Young, StyleKorean, and YesStyle to identify verified lowest global deals.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(212, 163, 115, 0.15)', color: 'var(--brand-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Reddit & Multi-Platform Consensus</h3>
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
              <a href="/" style={{ padding: '10px 22px', borderRadius: 'var(--radius-full)', background: 'var(--brand-rose)', color: '#FFF', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore Today's Single Feature <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
