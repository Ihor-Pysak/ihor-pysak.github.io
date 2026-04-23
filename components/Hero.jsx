'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, stagger } from '../lib/motion';

export default function Hero() {
  const container = stagger(0.07, 0.1);
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative">
        <motion.div initial="hidden" animate="show" variants={container} className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <span className="mono text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">Groningen · NL</span>
              <span className="w-8 h-px bg-[var(--hair-2)]" />
              <span className="mono text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">2026</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-medium tracking-tight text-[clamp(48px,8vw,120px)] leading-[0.92] text-[var(--ink)]"
              style={{ fontFeatureSettings: '"ss01","cv11","ss03"' }}
            >
              Ihor<br />
              Pysak<span className="text-[var(--accent)]">.</span>
            </motion.h1>

            <motion.div variants={item} className="mt-4 text-[13px] text-[var(--mute)]">
              <span className="mono">Ігор Писак</span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 max-w-[54ch] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-[var(--ink-2)]"
            >
              E-commerce Solution Architect &amp; Full-Stack Developer. I architect and ship
              <span className="text-[var(--ink)]"> B2B e-commerce systems end-to-end</span> — storefronts, custom apps,
              checkout-layer logic, and the integration pipelines that keep inventory and orders in sync between
              back-office systems and the store.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:ihor@holigram.nl"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] px-5 py-2.5 text-[13px] font-medium hover:brightness-110 transition-all hover:shadow-[var(--shadow-accent)]"
              >
                ihor@holigram.nl
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="https://linkedin.com/in/ihor-pysak"
                target="_blank" rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--hair-2)] px-5 py-2.5 text-[13px] text-[var(--ink-2)] hover:border-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
              >
                LinkedIn
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--mute)] ml-2">
                Open to select freelance
              </span>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.96, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.2 } } }}
              className="relative aspect-[4/5] rounded-[var(--r-lg)] overflow-hidden border border-[var(--hair-2)] bg-[var(--bg-2)]"
            >
              <img
                src="/ihor-photo.jpg"
                alt="Ihor Pysak"
                className="w-full h-full object-cover grayscale-[0.15] contrast-[1.05]"
                style={{ filter: 'saturate(0.9)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-2)]">
                <span>Groningen</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)]" />
                  Active
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
