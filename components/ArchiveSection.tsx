'use client';

import React from 'react';
import { Sparkles, ArrowUpRight, Search, Filter } from 'lucide-react';

const ARCHIVE_REPORTS = [
  {
    id: '041',
    title: 'COSRX - Advanced Snail 96 Mucin Power Essence 100ml',
    category: 'Essence & Serum',
    price: '$12.50 USD',
    discount: '30% OFF',
    rating: '4.9',
    tag: 'EWG Green'
  },
  {
    id: '040',
    title: 'ANUA - Heartleaf 77% Soothing Toner 250ml',
    category: 'Toner & Mist',
    price: '$14.20 USD',
    discount: '25% OFF',
    rating: '4.8',
    tag: 'Acne Safe'
  },
  {
    id: '039',
    title: 'ROUND LAB - Birch Juice Moisturizing Sunscreen 50ml',
    category: 'Sun Care',
    price: '$13.90 USD',
    discount: '28% OFF',
    rating: '4.9',
    tag: 'Hydrating'
  },
];

export default function ArchiveSection() {
  return (
    <section style={{ padding: '40px 0 80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '4px' }}>Daily Reports Archive</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Explore past verified K-beauty deep-dives and historical price comparisons.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} /> All Categories
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {ARCHIVE_REPORTS.map((item) => (
            <div 
              key={item.id}
              className="glass-panel glow-effect"
              style={{
                padding: '24px', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase' }}>Report #{item.id}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-main)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</span>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4 }}>{item.title}</h4>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-obsidian)' }}>{item.price}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-sage)', fontWeight: 700, marginLeft: '6px' }}>{item.discount}</span>
                </div>
                <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read Report <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
