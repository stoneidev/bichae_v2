'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Moon, Sun, FlaskConical, Info, Flame } from 'lucide-react';

export function HeaderWidget() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* High-Fashion Soft Launch Opening Ribbon */}
      <div style={{
        background: 'var(--brand-obsidian)', color: '#FFF', padding: '6px 16px',
        fontSize: '0.75rem', fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em',
        textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Flame size={13} color="var(--brand-rose)" fill="var(--brand-rose)" />
        <span>SOFT LAUNCH OPENING • EDITORIAL SCIENCE IN PREVIEW MODE</span>
        <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--brand-rose)', color: '#FFF', fontSize: '0.675rem', fontWeight: 800 }}>BETA</span>
      </div>

      <header className="glass-panel" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'var(--accent-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#FFF',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                BICHAE <span style={{ color: 'var(--brand-rose)', fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>v2</span>
              </span>
              <div className="header-logo-subtitle">
                Daily K-Beauty Science &amp; Pricing
              </div>
            </div>
          </Link>

          {/* Navigation & Action Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link 
              href="/about" 
              style={{ 
                fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)', 
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: 'var(--radius-full)', transition: 'all 0.2s'
              }}
            >
              <Info size={15} /> <span className="header-nav-link-label">How It Works</span>
            </Link>

            <button
              onClick={toggleTheme}
              style={{
                padding: '8px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
                color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
            >
              {mounted && isDark ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="#6B7280" />}
            </button>

            <span
              style={{
                padding: '7px 14px', borderRadius: 'var(--radius-full)',
                background: 'var(--brand-obsidian)', color: '#FFF',
                fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: 'var(--shadow-sm)', whiteSpace: 'nowrap'
              }}
            >
              <FlaskConical size={14} color="var(--brand-rose)" />
              <span className="header-cta-label">Independently Reviewed</span>
            </span>
          </div>

        </div>
      </header>
    </div>
  );
}
