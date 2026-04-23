'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTheme } from './providers/ThemeProvider';

const NAV_ITEMS = [
  ['Work', 'case'],
  ['Products', 'ralice'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Contact', 'contact'],
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useEffect(() => scrollY.on('change', (v) => setSolid(v > 40)), [scrollY]);
  const active = useActiveSection(NAV_ITEMS.map(([, id]) => id));
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        background: solid ? 'color-mix(in srgb, var(--bg) 72%, transparent)' : 'transparent',
        borderBottom: `1px solid ${solid ? 'var(--hair)' : 'transparent'}`,
        backdropFilter: 'blur(14px)',
        transition: 'background 240ms ease, border-color 240ms ease',
      }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-[13px]">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_2px_rgba(94,234,212,0.55)]" />
          <span className="font-medium">Ihor Pysak</span>
          <span className="text-[var(--mute)] hidden sm:inline">— Solution Architect</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-[13px] text-[var(--ink-2)]">
          {NAV_ITEMS.map(([l, id]) => (
            <li key={l} className="relative px-3 py-2">
              <a
                href={`#${id}`}
                className={`transition-colors ${active === id ? 'text-[var(--ink)]' : 'hover:text-[var(--ink)]'}`}
              >
                {l}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--accent)]"
                  transition={{ type: 'spring', damping: 30, stiffness: 380 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--hair-2)] bg-[var(--bg-3)]/60 hover:border-[var(--ink-2)]/50 transition-colors"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
          <a
            href="mailto:ihor@holigram.nl"
            className="group inline-flex items-center gap-2 text-[13px] rounded-full border border-[var(--hair-2)] bg-[var(--bg-3)]/60 pl-3.5 pr-2 py-1.5 hover:border-[var(--accent)]/50 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
            Available
            <span className="ml-1 text-[var(--mute)] group-hover:text-[var(--ink)]">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
