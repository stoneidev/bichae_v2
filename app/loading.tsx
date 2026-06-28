import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px'
    }}>
      <Loader2 className="animate-spin" style={{ width: '36px', height: '36px', color: 'var(--brand-rose)' }} />
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
        Loading Editorial Report...
      </span>
    </div>
  );
}
