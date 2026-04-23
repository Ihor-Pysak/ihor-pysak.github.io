'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ease } from '../lib/motion';
import { useUA } from './providers/UAProvider';
import { prefersReducedMotion } from '../lib/utils';
import CharReveal from './ui/CharReveal';
import Magnetic from './ui/Magnetic';

export default function Hero() {
  const { on: uaOn } = useUA();
  const photoRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const ps = useMotionValue(1);
  const srx = useSpring(rx, { damping: 22, stiffness: 220 });
  const sry = useSpring(ry, { damping: 22, stiffness: 220 });
  const sps = useSpring(ps, { damping: 22, stiffness: 220 });

  const onPhotoMove = (e) => {
    if (prefersReducedMotion()) return;
    const el = photoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    ry.set(mx * 6);
    rx.set(-my * 4);
    ps.set(1.02);
  };
  const onPhotoLeave = () => {
    rx.set(0);
    ry.set(0);
    ps.set(1);
  };

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">Groningen · NL</span>
              <span className="w-8 h-px bg-[var(--hair-2)]" />
              <span className="mono text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">2026</span>
            </div>

            <h1 className="font-medium tracking-tight text-[clamp(48px,8vw,120px)] leading-[0.92]">
              {uaOn ? (
                <>
                  <CharReveal text="Ігор" delay={0} />
                  <br />
                  <CharReveal text="Писак" delay={0.25} />
                  <span className="acc-pulse text-[var(--accent)]">.</span>
                  <div className="mt-4 text-[18px] mono text-[var(--mute)]">Ihor Pysak</div>
                </>
              ) : (
                <>
                  <CharReveal text="Ihor" delay={0} />
                  <br />
                  <CharReveal text="Pysak" delay={0.22} />
                  <span className="acc-pulse text-[var(--accent)]">.</span>
                </>
              )}
            </h1>

            {!uaOn && (
              <div className="mt-4 text-[13px] text-[var(--mute)]">
                <span className="mono">Ігор Писак</span>
              </div>
            )}

            <p className="mt-8 max-w-[54ch] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-[var(--ink-2)]">
              E-commerce Solution Architect &amp; Full-Stack Developer. I architect and ship{' '}
              <span className="text-[var(--ink)]">B2B e-commerce systems end-to-end</span> — storefronts, custom apps,
              checkout-layer logic, and the integration pipelines that keep inventory and orders in sync between
              back-office systems and the store.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Magnetic>
                <a
                  href="mailto:ihor@holigram.nl"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] px-5 py-2.5 text-[13px] font-medium hover:brightness-110 transition-all hover:shadow-[var(--shadow-accent)]"
                >
                  ihor@holigram.nl
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://linkedin.com/in/ihor-pysak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--hair-2)] px-5 py-2.5 text-[13px] text-[var(--ink-2)] hover:border-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
                >
                  LinkedIn
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </Magnetic>
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--mute)] ml-2 whitespace-nowrap">
                Open to select freelance
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <motion.div
              ref={photoRef}
              onMouseMove={onPhotoMove}
              onMouseLeave={onPhotoLeave}
              style={{ rotateX: srx, rotateY: sry, scale: sps, transformPerspective: 1000 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[var(--r-lg)] overflow-hidden border border-[var(--accent)]/30 bg-[var(--bg-2)] photo-vignette"
            >
              {/* Using a plain <img> keeps this simple for a static export; next/image would also work */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ihor-photo.jpg"
                alt="Ihor Pysak"
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.02) saturate(0.98)' }}
              />
              <div className="absolute bottom-3 left-3 right-3 z-[3] flex items-center justify-between mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-2)]">
                <span>Groningen</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)]" />
                  Active
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
