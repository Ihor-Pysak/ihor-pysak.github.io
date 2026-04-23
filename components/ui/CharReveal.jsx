'use client';
import React, { useLayoutEffect, useRef } from 'react';

export default function CharReveal({ text, delay = 0, stagger = 0.035, className = '' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chars = root.querySelectorAll('.char');
    chars.forEach((el, i) => {
      el.style.animationDelay = `${delay + i * stagger}s`;
      requestAnimationFrame(() => el.classList.add('in'));
    });
  }, [text, delay, stagger]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="char" aria-hidden="true">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
