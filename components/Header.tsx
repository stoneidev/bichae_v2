'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Moon, Sun, FlaskConical, Info } from 'lucide-react';

export default function Header() {
  // Starts false on the server; the effect reconciles with the theme the
  // anti-FOUC script (in layout.tsx) already applied before hydration.
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the theme the anti-FOUC script already committed to the DOM so the
    // toggle icon matches reality after hydration.
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
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
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
            <div className="header-logo-subtitle">
              Daily K-Beauty Science &amp; Pricing
            </div>
          </div>
        </Link>

        {/* Navigation & Action Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Link to About Page */}
          <Link 
            href="/about" 
            style={{ 
              fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', 
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: 'var(--radius-full)', transition: 'all 0.2s'
            }}
          >
            <Info size={16} /> <span className="header-nav-link-label">How It Works</span>
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
            {mounted && isDark ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#6B7280" />}
          </button>

          <span
            style={{
              padding: '8px 16px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-obsidian)', color: '#FFF',
              fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: 'var(--shadow-sm)', whiteSpace: 'nowrap'
            }}
          >
            <FlaskConical size={15} color="var(--brand-rose)" />
            <span className="header-cta-label">Independently Reviewed</span>
          </span>
        </div>

      </div>
    </header>
  );
}
