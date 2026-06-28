'use client';

import React from 'react';
import { Sparkles, ShieldCheck, DollarSign, FlaskConical, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ padding: '50px 0 30px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose-light)', border: '1px solid rgba(224, 122, 95, 0.2)',
          fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-rose)', marginBottom: '20px'
        }}>
          <Sparkles size={16} />
          <span>DAILY SINGLE-PRODUCT DEEP DIVE • 하루 단 하나의 제품</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
          fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em',
          color: 'var(--text-primary)', maxWidth: '920px', margin: '0 auto 16px auto'
        }}>
          매일 단 하나의 제품만 <span style={{ fontStyle: 'italic', color: 'var(--brand-rose)', fontWeight: 500 }}>초밀착 과학 분석</span>합니다
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '720px',
          margin: '0 auto 36px auto', fontWeight: 400, lineHeight: 1.6
        }}>
          복잡한 쇼핑몰 카탈로그를 벗어나, 성분 종합 검증(INCI Science)부터 글로벌 최저가 매트릭스와 검증된 소셜 컨센서스까지 하루에 단 하나의 명작에만 집중합니다.
        </p>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px', maxWidth: '1000px', margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <FlaskConical size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>100% 전성분 (INCI) 분석</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>EWG 그린 등급 검증 및 유효 성분의 효능과 피부 반응성 정밀 가이드</p>
          </div>

          <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--brand-sage-light)', color: 'var(--brand-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <DollarSign size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>글로벌 최저가 매트릭스</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>올리브영, 스타일코리안, 예스스타일 등 글로벌 플랫폼 실시간 재고 & 가격 연동</p>
          </div>

          <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(212, 163, 115, 0.15)', color: 'var(--brand-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <Award size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>크로스 소셜 데이터 검증</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>유튜브, 인스타그램, 글로벌 뷰티 커뮤니티의 검증된 사용자 실사용 평가 교차 검증</p>
          </div>
        </div>

      </div>
    </section>
  );
}

