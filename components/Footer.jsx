'use client';
import React from 'react';

function LighthouseBadge() {
  const cells = [
    ['PERF', '100'],
    ['A11Y', '100'],
    ['BEST', '100'],
    ['SEO', '100'],
  ];
  return (
    <div className="inline-flex items-stretch rounded-md border border-[var(--hair-2)] overflow-hidden mono text-[10px] tracking-[0.14em] uppercase">
      <div className="px-2 py-1.5 bg-[var(--bg-3)] text-[var(--ink-2)] border-r border-[var(--hair-2)]">Lighthouse</div>
      {cells.map(([l, v], i) => (
        <div
          key={l}
          className={`flex items-center gap-1.5 px-2 py-1.5 ${
            i < cells.length - 1 ? 'border-r border-[var(--hair-2)]' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)]" />
          <span className="text-[var(--mute)]">{l}</span>
          <span className="text-[var(--ink)]">{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--hair)] py-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-wrap gap-4 justify-between items-center mono text-[11px] tracking-[0.1em] uppercase text-[var(--mute)]">
        <div>© Ihor Pysak · MMXXVI</div>
        <LighthouseBadge />
        <a
          href="https://github.com/Igor-Pysak"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--ink-2)] transition-colors"
        >
          github.com/Igor-Pysak ↗
        </a>
      </div>
    </footer>
  );
}
