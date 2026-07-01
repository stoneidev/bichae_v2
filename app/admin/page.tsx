'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Save, Lock, CheckCircle2, ArrowLeft, Sparkles, ShieldAlert, Laptop
} from 'lucide-react';

type TabId = 'basic' | 'malls' | 'editorial' | 'chapters';

interface DermalCard { icon: string; title: string; body: string; }
interface GuideStep { step: string; title: string; desc: string; }
interface AppStep { label: string; title: string; body: string; }
interface Certification { icon: string; label: string; }

interface DermalScience { title: string; description: string; cards: DermalCard[]; }
interface BuyerGuide { title: string; description: string; steps: GuideStep[]; }
interface ApplicationSteps { title: string; description: string; steps: AppStep[]; }
interface MakerStory {
  brandDisplayName: string; story: string;
  certifications: Certification[];
  storeName: string; storeUrl: string; storeShipping: string;
  reviewTags: string[];
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-subtle)', background: 'var(--bg-main)',
  color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'inherit',
};
const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: 'vertical' as const,
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', fontWeight: 800,
  textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.06em',
};
const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' as const };

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });
  const [officialUrl, setOfficialUrl] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // Basic Info
  const [reportId, setReportId] = useState('047');
  const [publishDate, setPublishDate] = useState(() =>
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  );
  const [isActiveDaily, setIsActiveDaily] = useState(true);
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [category, setCategory] = useState('Sun Care');
  const [volume, setVolume] = useState('50ml');
  const [msrpUsd, setMsrpUsd] = useState('25.00');
  const [productDescription, setProductDescription] = useState('');
  const [fullInciList, setFullInciList] = useState('');
  const [ewgStatus, setEwgStatus] = useState('EWG Green Grade Verified');
  const [editorNote, setEditorNote] = useState('');

  // Malls
  const [malls, setMalls] = useState([
    { name: 'Amazon US Official Store', price: '13.00', url: '', variant: '50ml Single', stock: 'Prime Fulfillment', shipping: 'Free Prime Shipping', logoBg: '#FF9900', logoColor: '#000' },
    { name: 'Olive Young Global', price: '23.80', url: '', variant: '50ml', stock: 'Official Partner', shipping: 'DHL Express 3-5 Days', logoBg: '#99E334', logoColor: '#000' },
    { name: 'Stylevana Global', price: '18.99', url: '', variant: '50ml', stock: 'In Stock', shipping: 'Free Shipping over $48', logoBg: '#111827', logoColor: '#FFF' },
    { name: 'YesStyle Beauty', price: '19.18', url: '', variant: '50ml', stock: 'In Stock', shipping: 'Standard Shipping', logoBg: '#FF6F61', logoColor: '#FFF' },
    { name: 'StyleKorean', price: '23.00', url: '', variant: '50ml', stock: 'In Stock', shipping: 'Global Dispatch', logoBg: '#E31B23', logoColor: '#FFF' },
  ]);

  // Key Ingredients
  const [ingredients, setIngredients] = useState([
    { name: '', description: '', tagColor: 'var(--brand-rose)' },
    { name: '', description: '', tagColor: 'var(--brand-sage)' },
    { name: '', description: '', tagColor: '#3B82F6' },
  ]);

  // Social Reviews
  const [reviews, setReviews] = useState([
    { platform: 'YOUTUBE' as const, badgeColor: '#FF0000', scoreSummary: '', quote: '', analysisMeta: '' },
    { platform: 'REDDIT' as const, badgeColor: '#FF4500', scoreSummary: '', quote: '', analysisMeta: '' },
    { platform: 'INSTAGRAM' as const, badgeColor: '#E1306C', scoreSummary: '', quote: '', analysisMeta: '' },
  ]);

  // Chapters V–VIII
  const [dermalScience, setDermalScience] = useState<DermalScience>({
    title: '', description: '',
    cards: [{ icon: 'flask', title: '', body: '' }, { icon: 'microscope', title: '', body: '' }],
  });
  const [buyerGuide, setBuyerGuide] = useState<BuyerGuide>({
    title: '', description: '',
    steps: [{ step: '01', title: '', desc: '' }, { step: '02', title: '', desc: '' }, { step: '03', title: '', desc: '' }],
  });
  const [applicationSteps, setApplicationSteps] = useState<ApplicationSteps>({
    title: '', description: '',
    steps: [{ label: 'STEP 1 • PREPARATION', title: '', body: '' }, { label: 'STEP 2 • APPLICATION', title: '', body: '' }, { label: 'STEP 3 • LOCK IN', title: '', body: '' }],
  });
  const [makerStory, setMakerStory] = useState<MakerStory>({
    brandDisplayName: '', story: '',
    certifications: [{ icon: 'leaf', label: '' }, { icon: 'shield', label: '' }, { icon: 'award', label: '' }, { icon: 'check', label: '' }],
    storeName: '', storeUrl: '', storeShipping: '',
    reviewTags: Array(13).fill(''),
  });

  const fillDraftIntoForm = (draft: Record<string, unknown>) => {
    if (draft.reportId) setReportId(String(draft.reportId));
    if (draft.productName) setProductName(String(draft.productName));
    if (draft.brandName) setBrandName(String(draft.brandName));
    if (draft.brandDescription) setBrandDescription(String(draft.brandDescription));
    if (draft.brandWebsite) setBrandWebsite(String(draft.brandWebsite));
    if (draft.category) setCategory(String(draft.category));
    if (draft.volume) setVolume(String(draft.volume));
    if (draft.msrpUsd) setMsrpUsd(String(draft.msrpUsd));
    if (draft.productDescription) setProductDescription(String(draft.productDescription));
    if (draft.fullInciList) setFullInciList(String(draft.fullInciList));
    if (draft.ewgStatus) setEwgStatus(String(draft.ewgStatus));
    if (draft.editorNote) setEditorNote(String(draft.editorNote));
    if (draft.ingredients && Array.isArray(draft.ingredients)) setIngredients(draft.ingredients as typeof ingredients);
    if (draft.reviews && Array.isArray(draft.reviews)) setReviews(draft.reviews as typeof reviews);
    if (draft.dermalScience) setDermalScience(draft.dermalScience as DermalScience);
    if (draft.buyerGuide) setBuyerGuide(draft.buyerGuide as BuyerGuide);
    if (draft.applicationSteps) setApplicationSteps(draft.applicationSteps as ApplicationSteps);
    if (draft.makerStory) setMakerStory(draft.makerStory as MakerStory);
  };

  // Local generate (only works on local dev server — bypasses WAF)
  const generateLocalDraft = async () => {
    if (!officialUrl) { setStatus({ type: 'error', message: 'URL을 먼저 입력해 주세요.' }); return; }
    setStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/admin/local-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: officialUrl, geminiApiKey }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed.');
      fillDraftIntoForm(data.draft);
      setStatus({ type: 'success', message: '로컬 크롤링 + AI 분석 완료! 모든 탭이 채워졌습니다. 검토 후 배포하세요.' });
    } catch (err: unknown) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : String(err) });
    }
  };

  // Cloud generate (uses Gemini Google Search — may be blocked by some stores)
  const generateCloudDraft = async () => {
    if (!officialUrl) { setStatus({ type: 'error', message: 'URL을 먼저 입력해 주세요.' }); return; }
    setStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/reports/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: officialUrl, geminiApiKey }),
      });
      const text = await res.text();
      let data: Record<string, unknown>;
      try { data = JSON.parse(text); } catch { throw new Error(`Invalid server response: ${text.slice(0, 200)}`); }
      if (!res.ok || !data.success) throw new Error(String(data.error) || 'Failed.');
      fillDraftIntoForm(data.draft as Record<string, unknown>);
      setStatus({ type: 'success', message: 'AI Draft 생성 완료! 검토 후 배포하세요.' });
    } catch (err: unknown) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : String(err) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) { setStatus({ type: 'error', message: 'Admin Access Token을 입력해 주세요.' }); return; }
    setStatus({ type: 'loading' });

    const activeMalls = malls.filter((m) => m.price && m.url && parseFloat(m.price) > 0);
    const minPrice = activeMalls.length > 0 ? Math.min(...activeMalls.map((m) => parseFloat(m.price))) : 999;

    const priceMatrixPayload = activeMalls.map((m) => ({
      platformName: m.name, priceUsd: parseFloat(m.price) || 0, buyUrl: m.url,
      variantOption: m.variant, stockStatus: m.stock, shippingInfo: m.shipping,
      logoBg: m.logoBg, logoColor: m.logoColor,
      isLowest: parseFloat(m.price) === minPrice,
      discountText: parseFloat(m.price) < parseFloat(msrpUsd)
        ? `${Math.round((1 - parseFloat(m.price) / parseFloat(msrpUsd)) * 100)}% OFF`
        : undefined,
    }));

    const payload = {
      adminToken, reportId, publishDate, isActiveDaily,
      fullInciList, ewgStatus, editorNote,
      product: {
        name: productName, brandName, brandDescription, brandWebsite,
        category, description: productDescription, volume,
        msrpUsd: parseFloat(msrpUsd) || 0,
        dermalScience, buyerGuide, applicationSteps, makerStory,
      },
      priceMatrix: priceMatrixPayload,
      keyIngredients: ingredients,
      socialReviews: reviews,
    };

    try {
      const res = await fetch('/api/reports/create', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.error || 'Failed to submit.');
      setStatus({ type: 'success', message: `Edition #${reportId} D1 데이터베이스에 성공적으로 배포됐습니다!` });
    } catch (err: unknown) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : String(err) });
    }
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'basic', label: '1. Basic Info & Ingredients' },
    { id: 'malls', label: '2. Shopping Malls' },
    { id: 'editorial', label: '3. Editorial & Reviews' },
    { id: 'chapters', label: '4. Chapters V–VIII' },
  ];

  return (
    <div style={{ maxWidth: '1040px', margin: '40px auto', padding: '0 20px', fontFamily: 'var(--font-pretendard)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Daily Magazine
        </Link>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--brand-obsidian)', color: '#FFF', borderRadius: '8px', fontWeight: 800, fontSize: '1.2rem' }}>B</div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Bichae Daily Intelligence</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Curation Admin Console &amp; DB Content Generator</p>
        </div>
      </div>

      {/* Auth Strip */}
      <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Lock size={20} color="var(--brand-rose)" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Admin Token</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DB 쓰기 권한 인증 토큰을 입력하세요.</div>
        </div>
        <input
          type="password" placeholder="bichae2026"
          value={adminToken} onChange={(e) => setAdminToken(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.85rem', width: '220px', fontWeight: 700 }}
        />
      </div>

      {/* AI Draft Generator */}
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--brand-rose)" /> AI 초안 자동 생성
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          공식몰 URL을 붙여넣고 생성 버튼을 누르면 모든 탭이 자동으로 채워집니다.
          <strong style={{ color: 'var(--brand-rose)' }}> 로컬 크롤링</strong>은 WAF 차단 없이 직접 접속하여 정확도가 높습니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="공식 상품 페이지 URL (e.g. https://dalba.co.kr/goods/goods_view.php?goodsNo=1000000094)"
            value={officialUrl} onChange={(e) => setOfficialUrl(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.875rem', width: '100%' }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Local crawl button — primary */}
            <button
              type="button" onClick={generateLocalDraft}
              style={{ padding: '11px 22px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-rose)', color: '#FFF', fontSize: '0.875rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(128,0,32,0.15)' }}
            >
              <Laptop size={16} /> 로컬 크롤링 + AI 생성 (권장)
            </button>

            {/* Cloud generate button — secondary */}
            <button
              type="button" onClick={generateCloudDraft}
              style={{ padding: '11px 22px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-obsidian)', color: '#FFF', fontSize: '0.875rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Sparkles size={16} /> Cloud AI 생성 (Gemini Search)
            </button>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Gemini API Key:</span>
              <input
                type="password" placeholder="서버에 없을 경우 입력"
                value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.8rem', width: '280px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Toast */}
      {status.type !== 'idle' && (
        <div style={{
          padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
          background: status.type === 'success' ? 'rgba(3,199,90,0.08)' : status.type === 'error' ? 'rgba(128,0,32,0.06)' : 'var(--bg-card)',
          border: status.type === 'success' ? '1px solid #03C75A' : status.type === 'error' ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
          color: status.type === 'success' ? '#03C75A' : status.type === 'error' ? 'var(--brand-rose)' : 'var(--text-primary)',
        }}>
          {status.type === 'success' && <CheckCircle2 size={20} />}
          {status.type === 'error' && <ShieldAlert size={20} />}
          {status.type === 'loading' && <div style={{ width: '20px', height: '20px', border: '2px solid var(--border-subtle)', borderTopColor: 'var(--brand-rose)', borderRadius: '50%', animation: 'spin 1s linear infinite', flexShrink: 0 }} />}
          <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>
            {status.type === 'loading' ? 'AI 분석 중... 잠시만 기다려 주세요.' : status.message}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', marginBottom: '28px', gap: '4px' }}>
        {tabs.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
            style={{ padding: '11px 18px', fontSize: '0.825rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-1px', background: 'none', border: 'none', color: activeTab === tab.id ? 'var(--brand-rose)' : 'var(--text-muted)', borderBottom: activeTab === tab.id ? '2px solid var(--brand-rose)' : '2px solid transparent' }}
          >{tab.label}</button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>

        {/* TAB 1: BASIC */}
        {activeTab === 'basic' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={fieldStyle}><label style={labelStyle}>Edition ID</label><input style={inputStyle} value={reportId} onChange={(e) => setReportId(e.target.value)} required /></div>
              <div style={fieldStyle}><label style={labelStyle}>Publish Date</label><input style={inputStyle} value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required /></div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '26px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700 }}>
                  <input type="checkbox" checked={isActiveDaily} onChange={(e) => setIsActiveDaily(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--brand-rose)' }} />
                  오늘의 데일리 리포트로 설정
                </label>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={fieldStyle}><label style={labelStyle}>Product Name</label><input style={inputStyle} value={productName} onChange={(e) => setProductName(e.target.value)} required /></div>
              <div style={fieldStyle}><label style={labelStyle}>Brand Name</label><input style={inputStyle} value={brandName} onChange={(e) => setBrandName(e.target.value)} required /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                  {['Sun Care', 'Essence & Serum', 'Moisturizer', 'Toner & Mist', 'Hair Care'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={fieldStyle}><label style={labelStyle}>Volume</label><input style={inputStyle} value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
              <div style={fieldStyle}><label style={labelStyle}>MSRP (USD)</label><input type="number" step="0.01" style={inputStyle} value={msrpUsd} onChange={(e) => setMsrpUsd(e.target.value)} /></div>
            </div>

            <div style={fieldStyle}><label style={labelStyle}>Brand Website URL</label><input style={inputStyle} value={brandWebsite} onChange={(e) => setBrandWebsite(e.target.value)} /></div>
            <div style={fieldStyle}><label style={labelStyle}>Brand Description</label><textarea rows={3} style={textareaStyle} value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} /></div>
            <div style={fieldStyle}><label style={labelStyle}>Product Description</label><textarea rows={3} style={textareaStyle} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required /></div>

            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Key Ingredients</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ingredients.map((ing, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '12px', padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)' }}>
                    <div style={fieldStyle}><label style={labelStyle}>Ingredient {i + 1}</label><input style={inputStyle} value={ing.name} onChange={(e) => { const u = [...ingredients]; u[i] = { ...u[i], name: e.target.value }; setIngredients(u); }} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Efficacy Description</label><input style={inputStyle} value={ing.description} onChange={(e) => { const u = [...ingredients]; u[i] = { ...u[i], description: e.target.value }; setIngredients(u); }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MALLS */}
        {activeTab === 'malls' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>URL이 비어있거나 가격이 0인 항목은 저장 시 제외됩니다. 최저가는 자동으로 계산됩니다.</p>
            {malls.map((mall, i) => (
              <div key={mall.name} style={{ padding: '20px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
                <div style={{ display: 'inline-flex', padding: '5px 12px', borderRadius: '4px', background: mall.logoBg, color: mall.logoColor, fontSize: '0.75rem', fontWeight: 800, marginBottom: '14px' }}>{mall.name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div style={fieldStyle}><label style={labelStyle}>Price (USD)</label><input type="number" step="0.01" style={inputStyle} value={mall.price} onChange={(e) => { const u = [...malls]; u[i] = { ...u[i], price: e.target.value }; setMalls(u); }} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>Variant</label><input style={inputStyle} value={mall.variant} onChange={(e) => { const u = [...malls]; u[i] = { ...u[i], variant: e.target.value }; setMalls(u); }} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>Stock Status</label><input style={inputStyle} value={mall.stock} onChange={(e) => { const u = [...malls]; u[i] = { ...u[i], stock: e.target.value }; setMalls(u); }} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>Shipping</label><input style={inputStyle} value={mall.shipping} onChange={(e) => { const u = [...malls]; u[i] = { ...u[i], shipping: e.target.value }; setMalls(u); }} /></div>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Buy URL</label><input style={inputStyle} placeholder="https://" value={mall.url} onChange={(e) => { const u = [...malls]; u[i] = { ...u[i], url: e.target.value }; setMalls(u); }} /></div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: EDITORIAL */}
        {activeTab === 'editorial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={fieldStyle}><label style={labelStyle}>EWG Status</label><input style={inputStyle} value={ewgStatus} onChange={(e) => setEwgStatus(e.target.value)} /></div>
            <div style={fieldStyle}><label style={labelStyle}>Editor&apos;s Note</label><textarea rows={6} style={textareaStyle} value={editorNote} onChange={(e) => setEditorNote(e.target.value)} required /></div>
            <div style={fieldStyle}><label style={labelStyle}>Full INCI List</label><textarea rows={5} style={textareaStyle} value={fullInciList} onChange={(e) => setFullInciList(e.target.value)} required /></div>

            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Social Consensus Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map((rev, i) => (
                  <div key={rev.platform} style={{ padding: '18px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
                    <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '4px', background: rev.badgeColor, color: '#FFF', fontSize: '0.72rem', fontWeight: 800, marginBottom: '12px' }}>{rev.platform}</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                      <div style={fieldStyle}><label style={labelStyle}>Source / User</label><input style={inputStyle} value={rev.scoreSummary} onChange={(e) => { const u = [...reviews]; u[i] = { ...u[i], scoreSummary: e.target.value }; setReviews(u); }} /></div>
                      <div style={fieldStyle}><label style={labelStyle}>Metrics</label><input style={inputStyle} value={rev.analysisMeta} onChange={(e) => { const u = [...reviews]; u[i] = { ...u[i], analysisMeta: e.target.value }; setReviews(u); }} /></div>
                    </div>
                    <div style={fieldStyle}><label style={labelStyle}>Quote</label><textarea rows={2} style={textareaStyle} value={rev.quote} onChange={(e) => { const u = [...reviews]; u[i] = { ...u[i], quote: e.target.value }; setReviews(u); }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHAPTERS V–VIII */}
        {activeTab === 'chapters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Chapter V — Dermal Science */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Chapter V — Dermal Science</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={fieldStyle}><label style={labelStyle}>섹션 타이틀</label><input style={inputStyle} value={dermalScience.title} onChange={(e) => setDermalScience({ ...dermalScience, title: e.target.value })} /></div>
                <div style={fieldStyle}><label style={labelStyle}>설명 (1-2문장)</label><textarea rows={2} style={textareaStyle} value={dermalScience.description} onChange={(e) => setDermalScience({ ...dermalScience, description: e.target.value })} /></div>
                {dermalScience.cards.map((card, i) => (
                  <div key={i} style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Card {i + 1}</div>
                    <div style={fieldStyle}><label style={labelStyle}>성분명 / 타이틀</label><input style={inputStyle} value={card.title} onChange={(e) => { const u = [...dermalScience.cards]; u[i] = { ...u[i], title: e.target.value }; setDermalScience({ ...dermalScience, cards: u }); }} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>효능 설명</label><textarea rows={3} style={textareaStyle} value={card.body} onChange={(e) => { const u = [...dermalScience.cards]; u[i] = { ...u[i], body: e.target.value }; setDermalScience({ ...dermalScience, cards: u }); }} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter VI — Buyer Guide */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Chapter VI — Buyer Guide</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={fieldStyle}><label style={labelStyle}>타이틀</label><input style={inputStyle} value={buyerGuide.title} onChange={(e) => setBuyerGuide({ ...buyerGuide, title: e.target.value })} /></div>
                <div style={fieldStyle}><label style={labelStyle}>서브 설명</label><input style={inputStyle} value={buyerGuide.description} onChange={(e) => setBuyerGuide({ ...buyerGuide, description: e.target.value })} /></div>
                {buyerGuide.steps.map((step, i) => (
                  <div key={i} style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)' }}>Step {step.step}</div>
                    <div style={fieldStyle}><label style={labelStyle}>기준 타이틀</label><input style={inputStyle} value={step.title} onChange={(e) => { const u = [...buyerGuide.steps]; u[i] = { ...u[i], title: e.target.value }; setBuyerGuide({ ...buyerGuide, steps: u }); }} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>설명</label><textarea rows={2} style={textareaStyle} value={step.desc} onChange={(e) => { const u = [...buyerGuide.steps]; u[i] = { ...u[i], desc: e.target.value }; setBuyerGuide({ ...buyerGuide, steps: u }); }} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter VII — Application Steps */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Chapter VII — Application Clinic</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={fieldStyle}><label style={labelStyle}>타이틀</label><input style={inputStyle} value={applicationSteps.title} onChange={(e) => setApplicationSteps({ ...applicationSteps, title: e.target.value })} /></div>
                <div style={fieldStyle}><label style={labelStyle}>서브 설명</label><input style={inputStyle} value={applicationSteps.description} onChange={(e) => setApplicationSteps({ ...applicationSteps, description: e.target.value })} /></div>
                {applicationSteps.steps.map((step, i) => (
                  <div key={i} style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-rose)' }}>{step.label}</div>
                    <div style={fieldStyle}><label style={labelStyle}>스텝 타이틀</label><input style={inputStyle} value={step.title} onChange={(e) => { const u = [...applicationSteps.steps]; u[i] = { ...u[i], title: e.target.value }; setApplicationSteps({ ...applicationSteps, steps: u }); }} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>스텝 설명</label><textarea rows={3} style={textareaStyle} value={step.body} onChange={(e) => { const u = [...applicationSteps.steps]; u[i] = { ...u[i], body: e.target.value }; setApplicationSteps({ ...applicationSteps, steps: u }); }} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter VIII — The Maker */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Chapter VIII — The Maker</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={fieldStyle}><label style={labelStyle}>브랜드 표시명 (e.g. d&apos;Alba — 달바 글로벌)</label><input style={inputStyle} value={makerStory.brandDisplayName} onChange={(e) => setMakerStory({ ...makerStory, brandDisplayName: e.target.value })} /></div>
                <div style={fieldStyle}><label style={labelStyle}>브랜드 스토리 (2-3문장)</label><textarea rows={3} style={textareaStyle} value={makerStory.story} onChange={(e) => setMakerStory({ ...makerStory, story: e.target.value })} /></div>

                <div>
                  <label style={labelStyle}>인증 배지 4개</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {makerStory.certifications.map((cert, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select value={cert.icon} onChange={(e) => { const u = [...makerStory.certifications]; u[i] = { ...u[i], icon: e.target.value }; setMakerStory({ ...makerStory, certifications: u }); }} style={{ ...inputStyle, width: '100px', flexShrink: 0 }}>
                          {['leaf', 'shield', 'award', 'check'].map((ic) => <option key={ic}>{ic}</option>)}
                        </select>
                        <input style={inputStyle} placeholder={`인증 ${i + 1}`} value={cert.label} onChange={(e) => { const u = [...makerStory.certifications]; u[i] = { ...u[i], label: e.target.value }; setMakerStory({ ...makerStory, certifications: u }); }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={fieldStyle}><label style={labelStyle}>공식 스토어명</label><input style={inputStyle} value={makerStory.storeName} onChange={(e) => setMakerStory({ ...makerStory, storeName: e.target.value })} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>공식 스토어 URL</label><input style={inputStyle} value={makerStory.storeUrl} onChange={(e) => setMakerStory({ ...makerStory, storeUrl: e.target.value })} /></div>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>배송 정보</label><input style={inputStyle} value={makerStory.storeShipping} onChange={(e) => setMakerStory({ ...makerStory, storeShipping: e.target.value })} /></div>

                <div>
                  <label style={labelStyle}>리뷰 태그 (13개, 각 줄에 하나)</label>
                  <textarea
                    rows={7} style={textareaStyle}
                    value={makerStory.reviewTags.join('\n')}
                    onChange={(e) => setMakerStory({ ...makerStory, reviewTags: e.target.value.split('\n') })}
                    placeholder={'💧 30-Hour Moisture Lock\n✨ Pink Radiance Tone-Up\n...'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginTop: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {activeTab !== 'basic' && (
              <button type="button" onClick={() => setActiveTab(['basic', 'malls', 'editorial', 'chapters'][['basic', 'malls', 'editorial', 'chapters'].indexOf(activeTab) - 1] as TabId)}
                style={{ padding: '11px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'none', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
                ← 이전
              </button>
            )}
            {activeTab !== 'chapters' && (
              <button type="button" onClick={() => setActiveTab(['basic', 'malls', 'editorial', 'chapters'][['basic', 'malls', 'editorial', 'chapters'].indexOf(activeTab) + 1] as TabId)}
                style={{ padding: '11px 20px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                다음 → <Sparkles size={14} />
              </button>
            )}
          </div>

          {activeTab === 'chapters' && (
            <button type="submit" disabled={status.type === 'loading'}
              style={{ padding: '12px 32px', borderRadius: 'var(--radius-sm)', background: status.type === 'loading' ? 'var(--text-muted)' : 'var(--brand-rose)', color: '#FFF', fontWeight: 800, fontSize: '0.9rem', cursor: status.type === 'loading' ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(128,0,32,0.25)' }}>
              <Save size={18} /> {status.type === 'loading' ? 'D1 배포 중...' : 'D1에 배포하기'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
