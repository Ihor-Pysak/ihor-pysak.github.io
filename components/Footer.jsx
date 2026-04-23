'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--hair)] py-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-wrap gap-4 justify-between items-center mono text-[11px] tracking-[0.1em] uppercase text-[var(--mute)]">
        <div>© Ihor Pysak · MMXXVI</div>
        <a href="https://github.com/Igor-Pysak" target="_blank" rel="noopener" className="hover:text-[var(--ink-2)] transition-colors">
          github.com/Igor-Pysak ↗
        </a>
        <div>Groningen · Netherlands</div>
      </div>
    </footer>
  );
}
