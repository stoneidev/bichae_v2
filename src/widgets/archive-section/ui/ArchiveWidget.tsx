'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import type { ArchiveReportItem } from '@/entities/report';

const CATEGORIES = ['All Categories', 'Sun Care', 'Essence & Serum', 'Toner & Mist'];

export function ArchiveWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [reports, setReports] = useState<ArchiveReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    <section style={{ padding: '48px 0 80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-rose)', fontWeight: 800, fontSize: '0.775rem', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Calendar size={14} color="var(--brand-rose)" /> PAST DAILY INTELLIGENCE ARCHIVES
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '4px' }}>Past Deep Dives</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Browse previous K-beauty single-product reviews and their price history.</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {reports.map((item) => (
              <div 
                key={item.id}
                className="glass-panel glow-effect"
                style={{
                  padding: '26px', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.775rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>EDITION #{item.id}</span>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--bg-main)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.35, color: 'var(--text-primary)' }}>{item.title}</h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-obsidian)' }}>{item.price}</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--brand-sage)', fontWeight: 800, marginLeft: '8px' }}>{item.discount}</span>
                  </div>
                  <button style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', fontSize: '0.775rem', fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#FFF', boxShadow: 'var(--shadow-sm)' }}>
                    Read Dossier <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
