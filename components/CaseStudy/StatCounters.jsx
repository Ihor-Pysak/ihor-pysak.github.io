'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';
import Counter from '../ui/Counter';

const items = [
  { k: 'Surfaces owned end-to-end', v: 11 },
  { k: 'Languages delivered (NL / EN)', v: 2 },
  { k: 'Years of full-stack practice', v: 5 },
];

export default function StatCounters() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 rounded-[var(--r-lg)] border border-[var(--hair)] bg-[var(--bg-2)]/40 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={it.k}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, ease, delay: i * 0.05 }}
          className={`p-6 md:p-7 ${i < items.length - 1 ? 'border-b md:border-b-0 md:border-r border-[var(--hair)]' : ''}`}
        >
          <div className="text-[clamp(32px,3.4vw,48px)] font-medium tracking-tight leading-none text-[var(--ink)]">
            <Counter to={it.v} />
          </div>
          <div className="mt-3 mono text-[11px] tracking-[0.1em] uppercase text-[var(--mute)]">{it.k}</div>
        </motion.div>
      ))}
    </div>
  );
}
