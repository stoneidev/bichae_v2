'use client';

import { useEffect } from 'react';

/**
 * Reveals elements tagged with `data-reveal` as they scroll into view by
 * adding the `is-visible` class. Honors prefers-reduced-motion (the CSS
 * shows them immediately in that case, and we reveal everything up front).
 *
 * Call once near the root of a page/section tree. Optionally stagger children
 * by setting `style={{ transitionDelay }}` on each `data-reveal` element.
 *
 * Pass a `deps` value (e.g. a loaded payload) when the reveal targets are
 * rendered after async data arrives, so the observer attaches to them.
 */
export function useReveal(deps?: unknown) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [deps]);
}
