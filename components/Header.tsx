'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Globe, Moon, Sun, ShieldCheck } from 'lucide-react';

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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'var(--accent-gradient)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#FFF',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              BICHAE <span style={{ color: 'var(--brand-rose)', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>v2</span>
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Global K-Beauty Intelligence
            </div>
          </div>
        </div>

        {/* Global Live Ticker */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-full)',
          fontSize: '0.825rem', border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Daily Featured:</span>
          <span style={{ fontWeight: 700, color: 'var(--brand-obsidian)' }}>Beauty of Joseon Relief Sun</span>
          <span className="badge badge-trending" style={{ marginLeft: '6px' }}>#1 Trending</span>
        </div>

        {/* Action Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '10px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6B7280" />}
          </button>

          <a 
            href="https://github.com/stoneidev/bichae_v2" 
            target="_blank" 
            rel="noreferrer"
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-obsidian)', color: '#FFF',
              fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s'
            }}
          >
            <ShieldCheck size={16} color="var(--brand-rose)" />
            Verified Report #042
          </a>
        </div>

      </div>
    </header>
  );
}
