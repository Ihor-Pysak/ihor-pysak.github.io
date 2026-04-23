'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, revealProps, fadeUp, stagger } from '../lib/motion';
import SectionTitle from './ui/SectionTitle';

const GROUPS = [
  { k: 'Frontend',     items: ['HTML5', 'CSS3', 'JavaScript (ES5+)', 'TypeScript', 'Responsive Design', 'Shopify Liquid', 'AJAX'] },
  { k: 'Backend',      items: ['PHP', 'Laravel', 'Node.js', 'Rust', 'REST APIs', 'MySQL'] },
  { k: 'E-commerce',   items: ['Shopify theme', 'Admin / Storefront APIs', 'Shopify Functions', 'Custom Shopify apps', 'ERP integrations', 'Klaviyo', 'B2B storefronts', 'Email engineering'] },
  { k: 'Integrations', items: ['Cross-system data sync', 'Products / inventory / orders', 'Scheduled jobs', 'REST + GraphQL', 'Webhooks'] },
  { k: 'Tooling',      items: ['Git', 'VS Code', 'Figma', 'Claude Code', 'Terminal'] },
];

const LANGS = [
  ['Ukrainian', 'Native'],
  ['Russian', 'Native'],
  ['English', 'Advanced'],
  ['Dutch', 'Working · NL resident'],
  ['Polish', 'Intermediate'],
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 border-t border-[var(--hair)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div {...revealProps} variants={stagger(0.05)} className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
            <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--mute)]">Stack &amp; formation</div>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-8">
            <SectionTitle className="text-[clamp(32px,4.4vw,56px)] font-medium tracking-tight leading-[1.04] text-[var(--ink)]">
              The toolkit,<br /><span className="text-[var(--ink-2)]">honestly grouped.</span>
            </SectionTitle>
          </motion.div>
        </motion.div>

        <div className="rounded-[var(--r-lg)] border border-[var(--hair)] bg-[var(--bg-2)]/40 overflow-hidden">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.k}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.04 }}
              className={`grid grid-cols-12 gap-4 md:gap-8 p-5 md:p-7 ${i < GROUPS.length - 1 ? 'border-b border-[var(--hair)]' : ''}`}
            >
              <div className="col-span-12 md:col-span-3 mono text-[11px] tracking-[0.16em] uppercase text-[var(--mute)] pt-1">{g.k}</div>
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span key={it} className="mono text-[12px] px-3 py-1.5 rounded-full border border-[var(--hair-2)] text-[var(--ink-2)] hover:border-[var(--mute-2)] hover:text-[var(--ink)] transition-colors">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education + Languages */}
        <motion.div {...revealProps} variants={stagger(0.06)} className="mt-14 grid grid-cols-12 gap-6 md:gap-10">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-6">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)] mb-5">Education</div>
            <div className="border-t border-[var(--hair)]">
              <div className="py-5 border-b border-[var(--hair)]">
                <div className="text-[17px] text-[var(--ink)]">Lutsk National Technical University</div>
                <div className="mt-1 mono text-[11px] text-[var(--mute)] tracking-[0.06em]">Bachelor&apos;s — incomplete · Lutsk, Ukraine</div>
              </div>
              <div className="py-5 border-b border-[var(--hair)]">
                <div className="text-[17px] text-[var(--ink)]">Technical College of LNTU</div>
                <div className="mt-1 mono text-[11px] text-[var(--mute)] tracking-[0.06em]">Computer Engineering · 2017 – 2021 · Lutsk, Ukraine</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="col-span-12 md:col-span-6">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)] mb-5">Languages</div>
            <div className="border-t border-[var(--hair)]">
              {LANGS.map(([n, l]) => (
                <div key={n} className="flex items-baseline justify-between py-4 border-b border-[var(--hair)]">
                  <span className="text-[17px] text-[var(--ink)]">{n}</span>
                  <span className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--ink-2)]">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
