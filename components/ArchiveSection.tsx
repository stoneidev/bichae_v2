'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar, Loader2, Award } from 'lucide-react';
import { ArchiveReportItem } from '@/lib/db';

const CATEGORIES = ['전체 카테고리', 'Sun Care', 'Essence & Serum', 'Toner & Mist'];

export default function ArchiveSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체 카테고리');
  const [reports, setReports] = useState<ArchiveReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArchive() {
      setLoading(true);
      try {
        const queryCat = selectedCategory === '전체 카테고리' ? 'All Categories' : selectedCategory;
        const url = queryCat === 'All Categories' 
          ? '/api/reports/archive' 
          : `/api/reports/archive?category=${encodeURIComponent(queryCat)}`;
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
    <section style={{ padding: '50px 0 80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-rose)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <Calendar size={16} /> PAST DAILY DEEP DIVES
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, marginBottom: '6px' }}>지난 일간 딥다이브 아카이브</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>날짜별로 검증 분석된 K-뷰티 명작들의 히스토리컬 데이터와 가격 매트릭스 기록입니다.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '8px 18px', borderRadius: 'var(--radius-full)', 
                  border: selectedCategory === cat ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)', 
                  background: selectedCategory === cat ? 'var(--brand-rose-light)' : 'var(--bg-card)', 
                  color: selectedCategory === cat ? 'var(--brand-rose)' : 'var(--text-secondary)',
                  fontSize: '0.85rem', fontWeight: 600,
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
            <Loader2 className="animate-spin" style={{ width: '24px', height: '24px', color: 'var(--brand-rose)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cloudflare D1 타임라인 데이터 로딩 중...</span>
          </div>
        ) : reports.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            "{selectedCategory}" 카테고리의 아카이브 리포트가 없습니다.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {reports.map((item) => (
              <div 
                key={item.id}
                className="glass-panel glow-effect"
                style={{
                  padding: '28px', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-rose)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Daily Report #{item.id}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'var(--bg-main)', fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.45, color: 'var(--text-primary)' }}>{item.title}</h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-obsidian)' }}>{item.price}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--brand-sage)', fontWeight: 700, marginLeft: '8px' }}>{item.discount}</span>
                  </div>
                  <button style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 700, border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                    리포트 읽기 <ArrowUpRight size={14} />
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
