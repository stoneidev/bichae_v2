'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ArchiveReportItem } from '@/entities/report';
import { useReveal } from '@/shared/lib/useReveal';

const CATEGORIES = ['All Categories', 'Sun Care', 'Essence & Serum', 'Toner & Mist'];

export function ArchiveWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [reports, setReports] = useState<ArchiveReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useReveal(reports);

  useEffect(() => {
    async function fetchArchive() {
      setLoading(true);
      try {
        const url = selectedCategory === 'All Categories' 
          ? '/api/reports/archive' 
          : `/api/reports/archive?category=${encodeURIComponent(selectedCategory)}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setReports(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch archive reports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArchive();
  }, [selectedCategory]);

  return (
    <section className="chapter" style={{ borderTop: '1px solid var(--border-subtle)', paddingBottom: '88px' }}>
      <div className="container" style={{ padding: 0 }}>

        <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="eyebrow">The Archive</div>
            <h3 className="chapter-title">Past Deep Dives</h3>
            <p className="measure-wide" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', lineHeight: 1.6 }}>Browse previous K-beauty single-product reviews and their price history.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '7px 18px', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em',
                  border: selectedCategory === cat ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)', 
                  background: selectedCategory === cat ? 'var(--brand-rose)' : 'var(--bg-card)', 
                  color: selectedCategory === cat ? '#FFF' : 'var(--text-secondary)',
                  fontSize: '0.8rem', fontWeight: 800,
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: selectedCategory === cat ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }} aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="skeleton" style={{ height: '14px', width: '40%' }} />
                <div className="skeleton" style={{ height: '20px', width: '90%' }} />
                <div className="skeleton" style={{ height: '20px', width: '70%' }} />
                <div className="skeleton" style={{ height: '32px', width: '100%', marginTop: '8px' }} />
              </div>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No reports found for category &quot;{selectedCategory}&quot;.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {reports.map((item, i) => (
              <a
                key={item.id}
                href={`/report/${item.id}`}
                data-reveal
                className="archive-card"
                style={{
                  padding: '28px 0', transition: 'transform 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  borderTop: '2px solid var(--text-primary)', color: 'inherit',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>No. {item.id}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif), var(--font-serif-fallback)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.3, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{item.title}</h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="tnum" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.price}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-sage)', fontWeight: 700, marginLeft: '8px' }}>{item.discount}</span>
                  </div>
                  <span className="archive-card-cta" style={{ fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--text-primary)' }}>
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
