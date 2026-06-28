'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Boundary Error caught:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px'
    }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'var(--brand-rose-light)', color: 'var(--brand-rose)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
      }}>
        <AlertTriangle size={28} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
        Temporary Connection Interruption
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '460px', marginBottom: '24px', lineHeight: 1.6 }}>
        We encountered a temporary edge network delay while loading this section. Please try refreshing the view.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 24px', borderRadius: 'var(--radius-full)',
          background: 'var(--brand-rose)', color: '#FFF', fontWeight: 700,
          fontSize: '0.875rem', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '8px'
        }}
      >
        <RefreshCw size={16} /> Reload Page Section
      </button>
    </div>
  );
}
