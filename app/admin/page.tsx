'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Save, Lock, CheckCircle2, ArrowLeft, Sparkles, ShieldAlert
} from 'lucide-react';

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'malls' | 'editorial'>('basic');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });
  const [officialUrl, setOfficialUrl] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // 1. Basic Info & Ingredients
  const [reportId, setReportId] = useState('046');
  const [publishDate, setPublishDate] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });
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

  // 2. 5 Shopping Malls
  const [malls, setMalls] = useState([
    { name: 'Amazon US Official Store', price: '13.00', url: '', variant: '50ml Single', stock: 'Prime Fulfillment', shipping: 'Free Prime Shipping', logoBg: '#FF9900', logoColor: '#000' },
    { name: 'Olive Young Global', price: '23.80', url: '', variant: '50ml Special Twin Pack', stock: 'Official Partner', shipping: 'DHL Express 3-5 Days', logoBg: '#99E334', logoColor: '#000' },
    { name: 'Stylevana Global', price: '18.99', url: '', variant: '50ml Twin Pack (2ea)', stock: 'In Stock', shipping: 'Free Shipping over $48', logoBg: '#111827', logoColor: '#FFF' },
    { name: 'YesStyle Beauty', price: '19.18', url: '', variant: '50ml Twin Pack Duo', stock: 'In Stock', shipping: 'Standard Shipping', logoBg: '#FF6F61', logoColor: '#FFF' },
    { name: 'StyleKorean', price: '23.00', url: '', variant: '50ml Twin Pack (2ea)', stock: 'In Stock', shipping: 'Global Dispatch', logoBg: '#E31B23', logoColor: '#FFF' }
  ]);

  // 3. Key Ingredients (3 items default)
  const [ingredients, setIngredients] = useState([
    { name: 'Madagascar Centella Asiatica (98,000ppm)', description: 'Harvested from untouched Madagascan micro-climates, this pure 98,000ppm extract calms UV redness and heals micro-inflammation.', tagColor: 'var(--brand-rose)' },
    { name: 'Hyalu-Cica Golden Ratio Bio-Complex', description: 'A proprietary synergistic combination of multi-molecular Hyaluronic Acid and Centella Asiatica that quenches deep hydration.', tagColor: 'var(--brand-sage)' },
    { name: 'Baby Green 7 Sprout Extracts', description: 'A nutrient-dense botanical complex derived from Broccoli, Alfalfa, and Wheat Sprout that defends skin cells.', tagColor: '#3B82F6' }
  ]);

  // 4. Social Consensus Reviews (3 items default)
  const [reviews, setReviews] = useState([
    { platform: 'YOUTUBE' as const, badgeColor: '#FF0000', scoreSummary: 'Consensus: 4.9 / 5.0', quote: '"If you hate traditional chemical sunscreens because they feel oily or sting your eyes, this is the absolute holy grail."', analysisMeta: 'Analyzed across 140+ video reviews' },
    { platform: 'REDDIT' as const, badgeColor: '#FF4500', scoreSummary: 'r/AsianBeauty • u/sunscreen_obsessed', quote: '"Absorbs in 10 seconds, leaves no white cast, and sits under foundation like a luxury moisturizer."', analysisMeta: '+1,650 upvotes' },
    { platform: 'INSTAGRAM' as const, badgeColor: '#E1306C', scoreSummary: 'Trending Tag #kbeautysunscreen', quote: '"The twin pack is such an incredible deal. Perfect hydrating sunscreen for daily morning routines."', analysisMeta: '62k Tagged Posts' }
  ]);

  const handleMallChange = (index: number, field: string, value: string) => {
    const updated = [...malls];
    updated[index] = { ...updated[index], [field]: value };
    setMalls(updated);
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleReviewChange = (index: number, field: string, value: string) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    setReviews(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminToken) {
      setStatus({ type: 'error', message: 'Please enter the Admin Access Token.' });
      return;
    }

    setStatus({ type: 'loading' });

    // Find the lowest price to set isLowest flag
    const validMalls = malls.map((m) => ({ ...m, parsedPrice: parseFloat(m.price) || 999 }));
    const minPrice = Math.min(...validMalls.map((m) => m.parsedPrice));

    const priceMatrixPayload = malls.map((m) => ({
      platformName: m.name,
      priceUsd: parseFloat(m.price) || 0,
      buyUrl: m.url || '#',
      variantOption: m.variant,
      stockStatus: m.stock,
      shippingInfo: m.shipping,
      logoBg: m.logoBg,
      logoColor: m.logoColor,
      isLowest: parseFloat(m.price) === minPrice,
      discountText: parseFloat(m.price) < parseFloat(msrpUsd) 
        ? `${Math.round((1 - (parseFloat(m.price) / parseFloat(msrpUsd))) * 100)}% OFF`
        : undefined
    }));

    const payload = {
      adminToken,
      reportId,
      publishDate,
      isActiveDaily,
      fullInciList,
      ewgStatus,
      editorNote,
      product: {
        name: productName,
        brandName,
        brandDescription,
        brandWebsite,
        category,
        description: productDescription,
        volume,
        msrpUsd: parseFloat(msrpUsd) || 0,
        priceMatrix: priceMatrixPayload // pass price matrix in to help calculate lowest in createReportInDb
      },
      priceMatrix: priceMatrixPayload,
      keyIngredients: ingredients,
      socialReviews: reviews
    };

    try {
      const response = await fetch('/api/reports/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit the report.');
      }

      setStatus({ type: 'success', message: `Edition #${reportId} has been successfully generated and deployed to the D1 Database!` });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  const loadDraft = async () => {
    try {
      setStatus({ type: 'loading' });
      const res = await fetch('/admin-draft.json');
      if (!res.ok) {
        throw new Error('No active AI Draft found. Please ask Antigravity to generate one first.');
      }
      const data = await res.json();
      
      if (data.reportId) setReportId(data.reportId);
      if (data.productName) setProductName(data.productName);
      if (data.brandName) setBrandName(data.brandName);
      if (data.brandDescription) setBrandDescription(data.brandDescription);
      if (data.brandWebsite) setBrandWebsite(data.brandWebsite);
      if (data.category) setCategory(data.category);
      if (data.volume) setVolume(data.volume);
      if (data.msrpUsd) setMsrpUsd(data.msrpUsd);
      if (data.productDescription) setProductDescription(data.productDescription);
      if (data.fullInciList) setFullInciList(data.fullInciList);
      if (data.ewgStatus) setEwgStatus(data.ewgStatus);
      if (data.editorNote) setEditorNote(data.editorNote);
      
      if (data.ingredients && Array.isArray(data.ingredients)) {
        setIngredients(data.ingredients);
      }
      if (data.reviews && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
      
      setStatus({ type: 'success', message: 'Latest AI Draft successfully loaded! Review sections then proceed.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  const generateDraftFromUrl = async () => {
    if (!officialUrl) {
      setStatus({ type: 'error', message: 'Please enter the Official Store URL first.' });
      return;
    }
    
    setStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/reports/generate-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: officialUrl, geminiApiKey })
      });
      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        throw new Error(`Server returned invalid response (HTML page). This usually indicates a scraper timeout or API error: ${resText.slice(0, 150)}...`);
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate AI draft.');
      }
      
      const draft = data.draft;
      if (draft.reportId) setReportId(draft.reportId);
      if (draft.productName) setProductName(draft.productName);
      if (draft.brandName) setBrandName(draft.brandName);
      if (draft.brandDescription) setBrandDescription(draft.brandDescription);
      if (draft.brandWebsite) setBrandWebsite(draft.brandWebsite);
      if (draft.category) setCategory(draft.category);
      if (draft.volume) setVolume(draft.volume);
      if (draft.msrpUsd) setMsrpUsd(draft.msrpUsd);
      if (draft.productDescription) setProductDescription(draft.productDescription);
      if (draft.fullInciList) setFullInciList(draft.fullInciList);
      if (draft.ewgStatus) setEwgStatus(draft.ewgStatus);
      if (draft.editorNote) setEditorNote(draft.editorNote);
      
      if (draft.ingredients && Array.isArray(draft.ingredients)) {
        setIngredients(draft.ingredients);
      }
      if (draft.reviews && Array.isArray(draft.reviews)) {
        setReviews(draft.reviews);
      }
      
      setStatus({ type: 'success', message: 'AI Draft successfully compiled and filled in the form fields! Review, adjust shopping malls, and publish.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'var(--font-pretendard)' }}>
      {/* Header Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Daily Magazine
        </Link>
      </div>

      {/* Admin Panel Logo Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--brand-obsidian)', color: '#FFF', borderRadius: '8px', fontWeight: 800, fontSize: '1.2rem', border: '1px solid var(--border-subtle)' }}>
          B
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Bichae Daily Intelligence</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Curation Admin Console &amp; DB Content Generator</p>
        </div>
      </div>

      {/* Access Token & Draft Action Banner */}
      <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Lock size={20} color="var(--brand-rose)" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Admin Verification &amp; AI Drafts</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter token to authorize DB writes, or load the latest pre-compiled AI product draft.</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={loadDraft}
            style={{
              padding: '10px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-obsidian)', color: '#FFF',
              fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', border: '1px solid var(--border-subtle)',
              display: 'inline-flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Sparkles size={14} /> Load AI Draft
          </button>
          <input
            type="password"
            placeholder="Access token (e.g. bichae2026)"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.85rem', width: '200px', fontWeight: 700 }}
          />
        </div>
      </div>

      {/* AI Real-time Draft Generator Section */}
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--brand-rose)" /> AI Curation Draft Generator (AI 초안 실시간 추출)
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Paste a Korean official store product link. The system will crawl the page, translate key details to luxury English editorial styling, and auto-populate all tabs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Paste official product page URL (e.g. https://dalba.co.kr/goods/...)"
              value={officialUrl}
              onChange={(e) => setOfficialUrl(e.target.value)}
              style={{ flex: 1, minWidth: '300px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
            <button
              type="button"
              onClick={generateDraftFromUrl}
              style={{
                padding: '12px 24px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-rose)', color: '#FFF',
                fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.15)'
              }}
            >
              <Sparkles size={16} /> Generate AI Draft
            </button>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gemini API Key (Optional if configured on server):</span>
            <input
              type="password"
              placeholder="AI Studio API Key (AI Key가 서버에 없으면 여기에 입력)"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.8rem', width: '350px' }}
            />
            <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--brand-rose)', fontWeight: 700, textDecoration: 'underline' }}>Get Free API Key</a>
          </div>
        </div>
      </div>

      {/* Notification Toast Alert */}
      {status.type !== 'idle' && (
        <div style={{
          padding: '16px 24px', borderRadius: 'var(--radius-md)', marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '12px',
          background: status.type === 'success' ? 'rgba(3, 199, 90, 0.08)' : status.type === 'error' ? 'rgba(128, 0, 32, 0.06)' : 'var(--bg-card)',
          border: status.type === 'success' ? '1px solid #03C75A' : status.type === 'error' ? '1px solid var(--brand-rose)' : '1px solid var(--border-subtle)',
          color: status.type === 'success' ? '#03C75A' : status.type === 'error' ? 'var(--brand-rose)' : 'var(--text-primary)'
        }}>
          {status.type === 'success' && <CheckCircle2 size={20} />}
          {status.type === 'error' && <ShieldAlert size={20} />}
          {status.type === 'loading' && <div className="loading-spinner" style={{ width: '20px', height: '20px', border: '2px solid var(--border-subtle)', borderTopColor: 'var(--brand-rose)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />}
          <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
            {status.type === 'loading' ? 'Processing queries to D1 database...' : status.message}
          </div>
        </div>
      )}

      {/* Tabs Row */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', marginBottom: '32px', gap: '8px' }}>
        {[
          { id: 'basic', label: '1. Basic Info & Ingredients' },
          { id: 'malls', label: '2. 5 Shopping Malls (Prices & URLs)' },
          { id: 'editorial', label: '3. Editorial & Social reviews' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as 'basic' | 'malls' | 'editorial')}
            style={{
              padding: '12px 20px', fontSize: '0.85rem', fontWeight: 800, color: activeTab === tab.id ? 'var(--brand-rose)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--brand-rose)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-1px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
        
        {/* TAB 1: BASIC INFO */}
        {activeTab === 'basic' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Report / Edition ID</label>
                <input type="text" value={reportId} onChange={(e) => setReportId(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Publish Date</label>
                <input type="text" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }} required />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '32px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <input type="checkbox" checked={isActiveDaily} onChange={(e) => setIsActiveDaily(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--brand-rose)' }} />
                  Make featured daily report today (오늘의 데일리 리포트 지정)
                </label>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '8px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Product Name</label>
                <input type="text" placeholder="e.g. Madagascar Centella Hyalu-Cica Water-Fit Sun Serum 50ml" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Brand Name</label>
                <input type="text" placeholder="e.g. SKIN1004 (스킨1004)" value={brandName} onChange={(e) => setBrandName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <option value="Sun Care">Sun Care</option>
                  <option value="Essence &amp; Serum">Essence &amp; Serum</option>
                  <option value="Moisturizer">Moisturizer</option>
                  <option value="Toner &amp; Mist">Toner &amp; Mist</option>
                  <option value="Hair Care">Hair Care</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Volume</label>
                <input type="text" placeholder="e.g. 50ml Twin Pack (2ea)" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>MSRP (Retail Price USD)</label>
                <input type="number" step="0.01" placeholder="e.g. 25.00" value={msrpUsd} onChange={(e) => setMsrpUsd(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Brand Story Website URL</label>
              <input type="text" placeholder="e.g. Naver Store link or official website" value={brandWebsite} onChange={(e) => setBrandWebsite(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Brand Description Summary</label>
              <textarea placeholder="Write a short summary about the manufacturer heritage..." value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} style={{ width: '100%', height: '80px', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Product description</label>
              <textarea placeholder="Write a brief product detail outline..." value={productDescription} onChange={(e) => setProductDescription(e.target.value)} style={{ width: '100%', height: '80px', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }} required />
            </div>

            {/* Key Ingredients Sub-form */}
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Key Ingredients &amp; Bio-Actives</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {ingredients.map((ing, i) => (
                  <div key={i} style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Ingredient Name</label>
                      <input type="text" value={ing.name} onChange={(e) => handleIngredientChange(i, 'name', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700 }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Scientific Efficacy / Description</label>
                      <input type="text" value={ing.description} onChange={(e) => handleIngredientChange(i, 'description', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHOPPING MALLS */}
        {activeTab === 'malls' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>5 Global K-Beauty Retailers</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Input target price, checkout buy links, and details. The system automatically computes the lowest discount badge.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {malls.map((mall, i) => (
                <div key={mall.name} style={{ padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', background: mall.logoBg, color: mall.logoColor, fontSize: '0.75rem', fontWeight: 800 }}>
                      {mall.name}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Target Price (USD)</label>
                      <input type="number" step="0.01" value={mall.price} onChange={(e) => handleMallChange(i, 'price', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700 }} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Variant Option text</label>
                      <input type="text" value={mall.variant} onChange={(e) => handleMallChange(i, 'variant', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Stock / Availability Status</label>
                      <input type="text" value={mall.stock} onChange={(e) => handleMallChange(i, 'stock', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Shipping Details</label>
                      <input type="text" value={mall.shipping} onChange={(e) => handleMallChange(i, 'shipping', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Direct Buy URL (Affiliate link is highly recommended)</label>
                    <input type="text" placeholder="https://" value={mall.url} onChange={(e) => handleMallChange(i, 'url', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} required />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EDITORIAL & SOCIAL */}
        {activeTab === 'editorial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>EWG Status Statement</label>
              <input type="text" value={ewgStatus} onChange={(e) => setEwgStatus(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Editor&apos;s Note (Luxury Journal Review story)</label>
              <textarea placeholder="Write a premium review of the product formulation, feels, and skincare experience..." value={editorNote} onChange={(e) => setEditorNote(e.target.value)} style={{ width: '100%', height: '140px', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Full INCI Ingredients List</label>
              <textarea placeholder="Paste full raw INCI ingredients comma-separated text..." value={fullInciList} onChange={(e) => setFullInciList(e.target.value)} style={{ width: '100%', height: '120px', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }} required />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '12px 0' }} />

            {/* Social Consensus reviews inputs */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', borderLeft: '3px solid var(--brand-rose)', paddingLeft: '10px' }}>Social Consensus (Reddit, YouTube, Instagram)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.map((rev, i) => (
                  <div key={rev.platform} style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFF', background: rev.badgeColor, padding: '4px 10px', borderRadius: '4px' }}>
                        {rev.platform}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Source / User name</label>
                        <input type="text" value={rev.scoreSummary} onChange={(e) => handleReviewChange(i, 'scoreSummary', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700 }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Metrics / Meta summary</label>
                        <input type="text" value={rev.analysisMeta} onChange={(e) => handleReviewChange(i, 'analysisMeta', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Viral Quote</label>
                      <textarea value={rev.quote} onChange={(e) => handleReviewChange(i, 'quote', e.target.value)} style={{ width: '100%', height: '70px', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'inherit', resize: 'vertical' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Submit Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px', marginTop: '32px' }}>
          {activeTab !== 'basic' && (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'editorial' ? 'malls' : 'basic')}
              style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'none', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Previous Section
            </button>
          )}

          {activeTab !== 'editorial' ? (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'basic' ? 'malls' : 'editorial')}
              style={{ padding: '12px 28px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-obsidian)', color: '#FFF', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Continue Next <Sparkles size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status.type === 'loading'}
              style={{
                padding: '12px 36px', borderRadius: 'var(--radius-sm)',
                background: status.type === 'loading' ? 'var(--text-muted)' : 'var(--brand-rose)',
                color: '#FFF', fontWeight: 800, fontSize: '0.9rem',
                cursor: status.type === 'loading' ? 'not-allowed' : 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 14px rgba(128, 0, 32, 0.25)'
              }}
            >
              <Save size={18} /> {status.type === 'loading' ? 'Deploying to D1...' : 'Generate & Deploy Edition'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
