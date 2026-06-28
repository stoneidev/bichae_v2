'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, FlaskConical, MessageSquare, Building2, 
  ExternalLink, CheckCircle2, Shield, ArrowUpRight, Loader2, BookOpen
} from 'lucide-react';
import { FullDailyReportPayload } from '@/lib/db';

export default function DailyReportCard() {
  const [activeTab, setActiveTab] = useState<'prices' | 'ingredients' | 'reviews' | 'brand'>('prices');
  const [reportData, setReportData] = useState<FullDailyReportPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDailyReport() {
      try {
        const res = await fetch('/api/reports/daily');
        const json = await res.json();
        if (json.success && json.data) {
          setReportData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch daily report:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDailyReport();
  }, []);

  if (loading || !reportData) {
    return (
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)', padding: '60px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px'
          }}>
            <Loader2 className="animate-spin" style={{ width: '32px', height: '32px', color: 'var(--brand-rose)' }} />
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>오늘의 딥다이브 리포트를 불러오는 중입니다...</p>
          </div>
        </div>
      </section>
    );
  }

  const { report, product, priceMatrix, keyIngredients, socialReviews } = reportData;

  return (
    <section style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        
        {/* Main Product Card Container */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          
          {/* Top Banner Header */}
          <div style={{
            padding: '36px', borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center'
          }}>
            
            {/* Left Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span className="badge badge-trending" style={{ fontWeight: 700 }}>오늘의 단 하나의 선택 #{report.id}</span>
                <span className="badge badge-verified"><CheckCircle2 size={12} /> {product.is_authentic ? '정품 검증 완료' : 'Standard'}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>발행일: {report.publish_date}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.25 }}>
                {report.title}
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                {product.description}
              </p>

              {/* Quick Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>☀️ 카테고리: {product.category}</span>
                <span style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>📦 규격: {product.volume}</span>
                <span style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>🌱 등급: {report.ewg_status}</span>
              </div>
            </div>

            {/* Right Highlights Box */}
            <div style={{
              background: 'var(--bg-main)', padding: '28px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>글로벌 포착 최저가</span>
                <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--brand-rose)' }}>${Number(product.lowest_price_usd).toFixed(2)} USD</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-subtle)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>공식 권장 소비자 가격</span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'line-through' }}>${Number(product.msrp_usd).toFixed(2)} USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>최저가 매장 및 할인율</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-sage)' }}>{product.best_deal_platform} ({product.best_deal_discount})</span>
              </div>
            </div>

          </div>

          {/* Curator's Deep Dive Story Section */}
          <div style={{
            padding: '28px 36px', background: 'rgba(224, 122, 95, 0.04)',
            borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '16px', alignItems: 'flex-start'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px', background: 'var(--brand-rose)',
              color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '4px' }}>
                오늘의 에디터 정밀 분석 노트 (Curator's Science Note)
              </h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                조선미녀 맑은쌀선크림은 전통 한방 성분인 쌀추출물(30%)과 발효 미생물 필터레이트를 현대 유기 자외선 차단제 기법과 결합하여 백탁 없이 수분크림처럼 스며드는 독보적인 제형 기술을 완성했습니다. 피부 자극 최소화와 글로벌 최저가 수급 타이밍을 집중 검증했습니다.
              </p>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)', overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('prices')}
              style={{
                padding: '18px 28px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'prices' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'prices' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <DollarSign size={18} /> 실시간 최저가 매트릭스
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              style={{
                padding: '18px 28px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'ingredients' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'ingredients' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <FlaskConical size={18} /> 전성분(INCI) & 피부 연구소 분석
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '18px 28px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'reviews' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'reviews' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <MessageSquare size={18} /> 크로스 소셜 컨센서스 (글로벌 평점)
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              style={{
                padding: '18px 28px', fontWeight: 700, fontSize: '0.95rem',
                color: activeTab === 'brand' ? 'var(--brand-rose)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'brand' ? '3px solid var(--brand-rose)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: 'transparent', cursor: 'pointer'
              }}
            >
              <Building2 size={18} /> 브랜드 스토리 & 공식 원산지
            </button>
          </div>

          {/* Tab Content Panels */}
          <div style={{ padding: '36px' }}>
            
            {/* 1. PRICES TAB */}
            {activeTab === 'prices' && (
              <div>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>글로벌 주요 플랫폼 실시간 가격 비교</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cloudflare D1 실시간 추적 엔진 연동</span>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {priceMatrix.map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '20px 24px', borderRadius: 'var(--radius-md)', 
                        border: item.is_lowest ? '2px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
                        background: item.is_lowest ? 'var(--brand-rose-light)' : 'var(--bg-card)', 
                        flexWrap: 'wrap', gap: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '52px', height: '52px', borderRadius: '12px', 
                          background: item.logo_bg || '#FFF', display: 'flex', alignItems: 'center', 
                          justifyContent: 'center', fontWeight: 800, color: item.logo_color || '#000', 
                          fontSize: '0.75rem', textAlign: 'center', padding: '4px', boxShadow: 'var(--shadow-sm)' 
                        }}>
                          {item.platform_name.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.platform_name}</h4>
                            {item.is_lowest ? <span className="badge badge-trending">최저가 포착</span> : null}
                          </div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.stock_status} • {item.shipping_info}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: item.is_lowest ? 'var(--brand-rose)' : 'var(--text-primary)' }}>
                            ${Number(item.price_usd).toFixed(2)} USD
                          </span>
                          {item.promo_code && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--brand-sage)', fontWeight: 700 }}>
                              할인 코드: {item.promo_code}
                            </div>
                          )}
                        </div>
                        <a 
                          href={item.buy_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ 
                            padding: '10px 22px', borderRadius: 'var(--radius-full)', 
                            background: item.is_lowest ? 'var(--brand-rose)' : 'var(--bg-main)', 
                            color: item.is_lowest ? '#FFF' : 'var(--text-primary)', 
                            border: item.is_lowest ? 'none' : '1px solid var(--border-subtle)',
                            fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px',
                            textDecoration: 'none'
                          }}
                        >
                          {item.is_lowest ? '최저가 구매' : '판매처 이동'} <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. INGREDIENTS TAB */}
            {activeTab === 'ingredients' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>전성분 안전성 및 유효 핵심 성분 리포트</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>CosIng 및 EWG Deep Skin 데이터베이스 교차 확인 완료</p>
                  </div>
                  <span className="badge badge-ewg" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>{report.ewg_status}</span>
                </div>

                {/* Key Active Ingredients Breakdown */}
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', color: 'var(--brand-obsidian)' }}>🌾 핵심 유효 성분 (Key Active Components)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                  {keyIngredients.map((ing) => (
                    <div key={ing.id} style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 700, color: ing.tag_color || 'var(--brand-rose)', marginBottom: '6px', fontSize: '1rem' }}>{ing.name}</div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ing.description}</p>
                    </div>
                  ))}
                </div>

                {/* Full INCI List */}
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>📜 공식 전성분 표기 (Full INCI List)</h4>
                <div style={{
                  padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)',
                  fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)'
                }}>
                  {report.full_inci_list}
                </div>
              </div>
            )}

            {/* 3. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>글로벌 소셜 미디어 검증 & 크로스 평가</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {socialReviews.map((rev) => (
                    <div key={rev.id} style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '4px', background: rev.badge_color, color: '#FFF', fontSize: '0.75rem', fontWeight: 800 }}>{rev.platform}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{rev.score_summary}</span>
                      </div>
                      <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '14px', lineHeight: 1.5 }}>
                        "{rev.quote}"
                      </p>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{rev.analysis_meta}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. BRAND TAB */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>브랜드 스토리 및 제조사 공식 인증</h3>
                
                <div style={{ padding: '28px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--brand-obsidian)', marginBottom: '8px' }}>{product.brand_name}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {product.brand_description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {product.brand_website && (
                      <a href={product.brand_website} target="_blank" rel="noreferrer" style={{ padding: '10px 22px', borderRadius: 'var(--radius-full)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                        공식 웹사이트 방문 <ExternalLink size={14} />
                      </a>
                    )}
                    <span style={{ fontSize: '0.9rem', color: 'var(--brand-sage)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Shield size={18} /> 100% 정품 제조사 입증 완료
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
