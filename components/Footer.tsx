'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--brand-obsidian)', color: '#FFF', padding: '60px 0 30px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>BICHAE v2</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.6, maxWidth: '320px' }}>
              하루 단 하나의 제품을 위한 과학적 성분 분석, 글로벌 최저가 추적, 독립적 소셜 검증 에디토리얼 서비스.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '16px' }}>연동 글로벌 플랫폼</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: '#9CA3AF' }}>
              <li>• Stylevana Global</li>
              <li>• Olive Young Global</li>
              <li>• StyleKorean</li>
              <li>• YesStyle Beauty</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '16px' }}>독립성 및 공지사항</h4>
            <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.6 }}>
              <strong>Bichae v2 큐레이션 정책:</strong> 본 서비스는 광고성 상품 목록 배열을 지양하며, 매일 단 하나의 제품을 객관적 전성분 검증 및 글로벌 가격 인텔리전스를 바탕으로 분석합니다.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: '#9CA3AF' }}>
          <div>© 2026 BICHAE v2. Built with Next.js & Cloudflare Pages.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Curated with <Heart size={14} color="#E07A5F" fill="#E07A5F" /> for K-Beauty & Science Enthusiasts
          </div>
        </div>

      </div>
    </footer>
  );
}
