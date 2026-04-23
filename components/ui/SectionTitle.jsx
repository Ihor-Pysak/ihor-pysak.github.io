'use client';
import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/utils';

export default function SectionTitle({ children, className = '', as = 'h2' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    el.classList.add('pending');
    const reveal = () => {
      el.classList.remove('pending');
      el.classList.add('in');
    };

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);

    // Safety net: reveal after 1.5s regardless
    const fallback = setTimeout(reveal, 1500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref} className={`mask-reveal ${className}`}>
      {children}
    </Tag>
  );
}
