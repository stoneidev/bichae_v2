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
            <p style={{ fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.6, maxWidth: '300px' }}>
              Unbiased, daily science-backed K-Beauty reports, real-time global price intelligence, and ingredient safety verification.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '16px' }}>Supported Platforms</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: '#9CA3AF' }}>
              <li>• Stylevana Global</li>
              <li>• Olive Young Global</li>
              <li>• StyleKorean</li>
              <li>• YesStyle Beauty</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '16px' }}>Legal & Compliance</h4>
            <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.6 }}>
              <strong>FTC Affiliate Disclosure:</strong> Bichae v2 contains affiliate links. We may earn a small commission when you purchase through our links at zero extra cost to you. All ingredient analyses and price metrics are independent.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: '#9CA3AF' }}>
          <div>© 2026 BICHAE v2. Built with Next.js & Cloudflare Pages.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Curated with <Heart size={14} color="#E07A5F" fill="#E07A5F" /> for K-Beauty Lovers Worldwide
          </div>
        </div>

      </div>
    </footer>
  );
}
