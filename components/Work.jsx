'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, revealProps, fadeUp, stagger } from '../lib/motion';
import SectionTitle from './ui/SectionTitle';

const JOBS = [
  {
    when: 'Mar 2026 — present', mode: 'Hybrid',
    role: 'E-commerce Solution Architect & Full-Stack Developer',
    co: 'Holigram', loc: 'Groningen, NL',
    p: 'Owns the technical stack end-to-end: custom Shopify storefront, checkout-layer logic, Node/TypeScript back-office integrations, and B2B email engineering.',
    current: true,
  },
  {
    when: 'May 2022 — Apr 2026', mode: 'Freelance',
    role: 'Freelance Web Developer',
    co: 'Self-employed', loc: 'Dutch SMB clients',
    p: 'Business websites, Laravel applications, hand-coded responsive landing pages for Dutch small- and mid-sized businesses.',
  },
  {
    when: 'Jan 2022 — May 2022', mode: 'On-site',
    role: 'Fullstack PHP Developer',
    co: 'Tabelaofert.pl Sp. z o.o.', loc: 'Poland',
    p: 'UI redesigns and new features on a Polish real-estate platform — PHP backend and customer-facing frontend.',
  },
  {
    when: 'Nov 2021 — Dec 2021', mode: 'On-site',
    role: 'Fullstack Intern',
    co: 'Modern Expo', loc: 'Lutsk, Ukraine',
    p: 'Internal Laravel web application — first production codebase, full-stack exposure end-to-end.',
  },
];

export default function Work() {
  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-[var(--hair)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div {...revealProps} variants={stagger(0.05)} className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
            <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--mute)]">Experience</div>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-8">
            <SectionTitle className="text-[clamp(32px,4.4vw,56px)] font-medium tracking-tight leading-[1.04] text-[var(--ink)]">
              Five years, three countries,<br />one trajectory.
            </SectionTitle>
          </motion.div>
        </motion.div>

        <div className="border-t border-[var(--hair)]">
          {JOBS.map((j, i) => (
            <motion.div
              key={j.when}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.04 }}
              className="group grid grid-cols-12 gap-4 md:gap-6 py-8 border-b border-[var(--hair)] relative"
            >
              <div className="col-span-12 md:col-span-3">
                <div className="mono text-[11px] tracking-[0.1em] text-[var(--ink-2)]">{j.when}</div>
                <div className="mt-1 mono text-[10px] uppercase tracking-[0.14em] text-[var(--mute)]">{j.mode}</div>
                {j.current && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[var(--good)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                    Current
                  </span>
                )}
              </div>
              <div className="col-span-12 md:col-span-9">
                <h3 className="text-[clamp(20px,2vw,26px)] font-medium tracking-tight text-[var(--ink)] leading-[1.2]">
                  {j.role}
                </h3>
                <div className="mt-1 text-[14px] text-[var(--ink-2)]">
                  <span className="text-[var(--ink)]">{j.co}</span>
                  <span className="text-[var(--mute)]"> · {j.loc}</span>
                </div>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.6] text-[var(--ink-2)]">{j.p}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected other */}
        <motion.div {...revealProps} variants={fadeUp} className="mt-14">
          <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--mute)] mb-4">Selected other work</div>
          <a
            href="https://lym-bouw.nl" target="_blank" rel="noopener"
            className="group flex items-baseline justify-between py-5 border-t border-[var(--hair)] border-b hover:bg-[var(--bg-2)]/40 px-2 -mx-2 rounded-md transition-colors"
          >
            <div>
              <span className="text-[18px] text-[var(--ink)] tracking-tight">lym-bouw.nl</span>
              <span className="ml-3 text-[13px] text-[var(--mute)]">Dutch construction company — full design + build, responsive</span>
            </div>
            <span className="text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
