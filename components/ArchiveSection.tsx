'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar, Loader2 } from 'lucide-react';
import { ArchiveReportItem } from '@/lib/db';

const CATEGORIES = ['All Categories', 'Sun Care', 'Essence & Serum', 'Toner & Mist'];

export default function ArchiveSection() {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-rose)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px' }}>
              <Calendar size={14} /> PAST DAILY INTELLIGENCE ARCHIVES
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '4px' }}>Historical Deep Dive Archives</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Explore past verified K-beauty single-product deep dives and historical price metrics in Cloudflare D1.</p>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '7px 16px', borderRadius: 'var(--radius-full)', 
                  border: selectedCategory === cat ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)', 
                  background: selectedCategory === cat ? 'var(--brand-rose-light)' : 'var(--bg-card)', 
                  color: selectedCategory === cat ? 'var(--brand-rose)' : 'var(--text-secondary)',
                  fontSize: '0.825rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            <Loader2 className="animate-spin" style={{ width: '22px', height: '22px', color: 'var(--brand-rose)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Querying D1 Relational Archives...</span>
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
                  padding: '24px', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.775rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Daily Report #{item.id}</span>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-main)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', lineHeight: 1.4, color: 'var(--text-primary)' }}>{item.title}</h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-obsidian)' }}>{item.price}</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--brand-sage)', fontWeight: 700, marginLeft: '6px' }}>{item.discount}</span>
                  </div>
                  <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                    Read Deep Dive <ArrowUpRight size={14} />
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
