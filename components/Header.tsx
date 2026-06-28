'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, ShieldCheck, Info } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        
        {/* Brand Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'var(--accent-gradient)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#FFF',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              BICHAE <span style={{ color: 'var(--brand-rose)', fontSize: '1.1rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>v2</span>
            </span>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Daily K-Beauty Science & Price Matrix
            </div>
          </div>
        </a>

        {/* Navigation & Action Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Link to About Page */}
          <a 
            href="/about" 
            style={{ 
              fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', 
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: 'var(--radius-full)', transition: 'all 0.2s'
            }}
          >
            <Info size={16} /> About Science
          </a>

          <button 
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '8px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#6B7280" />}
          </button>

          <a 
            href="https://github.com/stoneidev/bichae_v2" 
            target="_blank" 
            rel="noreferrer"
            style={{
              padding: '8px 16px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-obsidian)', color: '#FFF',
              fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: 'var(--shadow-sm)', textDecoration: 'none'
            }}
          >
            <ShieldCheck size={15} color="var(--brand-rose)" />
            Verified #042
          </a>
        </div>

      </div>
    </header>
  );
}
