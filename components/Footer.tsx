'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--brand-obsidian)', color: '#FFF', padding: '56px 0 28px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '36px', marginBottom: '36px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Sparkles size={16} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700 }}>BICHAE v2</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.6, maxWidth: '320px' }}>
              An authoritative, daily science-backed single-product curation service. Independent INCI verification, high-density price tracking matrix, and multi-platform consensus.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '14px' }}>Tracked Global Platforms</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              <li>• Stylevana Global</li>
              <li>• Olive Young Global</li>
              <li>• StyleKorean</li>
              <li>• YesStyle Beauty</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E5E7EB', marginBottom: '14px' }}>Editorial Disclosure</h4>
            <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.6 }}>
              <strong>Independent Science Curation:</strong> Bichae v2 does not display ad-sponsored product catalogs. Each daily product is analyzed strictly based on objective INCI formulation integrity and verified global price matrices.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: '#9CA3AF' }}>
          <div>© 2026 BICHAE v2. Built with Next.js & Cloudflare Pages.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Curated with <Heart size={14} color="#E07A5F" fill="#E07A5F" /> for K-Beauty & Science Enthusiasts
          </div>
        </div>

      </div>
    </footer>
  );
}
