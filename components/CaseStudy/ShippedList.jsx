'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, revealProps, stagger } from '../../lib/motion';

const SHIPPED = [
  { n: '04', t: 'Cart page redesign', d: 'Free-shipping progress bar, live savings summary, streamlined checkout.' },
  { n: '05', t: 'Product page redesign', d: 'Breadcrumbs, category badges, metafield-driven specs with regex fallback, interactive discount calculator.' },
  { n: '06', t: 'Checkout-layer custom logic', d: 'Discount and delivery rules beyond what off-the-shelf apps allow.' },
  { n: '07', t: 'Custom shipping logic', d: 'Weight-based rules, category surcharges, regional pricing.' },
  { n: '08', t: 'Geo-restriction system', d: 'Customers in certain regions hidden from restricted products via customer tags.' },
  { n: '09', t: 'B2B email engineering', d: 'Gmail-compatible table layouts, responsive without media queries.' },
  { n: '10', t: 'Custom font delivery', d: 'TTF assets on CDN with preload chain, resolved CORS on modern themes.' },
  { n: '11', t: 'Dual-language architecture', d: 'Customer UI in Dutch, codebase in English.' },
];

export default function ShippedList() {
  return (
    <div className="mt-28">
      <motion.div
        {...revealProps}
        variants={stagger(0.04)}
        className="grid grid-cols-12 gap-6 md:gap-10 items-baseline"
      >
        <div className="col-span-12 md:col-span-4">
          <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)]">Also shipped</div>
          <h3 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-medium tracking-tight leading-[1.1] text-[var(--ink)]">
            Eight more surfaces, same codebase.
          </h3>
        </div>
        <div className="col-span-12 md:col-span-8 border-t border-[var(--hair)]">
          {SHIPPED.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.03 }}
              className="group grid grid-cols-12 gap-4 py-5 border-b border-[var(--hair)] hover:bg-[var(--bg-2)]/40 transition-colors rounded-md px-2 -mx-2"
            >
              <div className="col-span-2 md:col-span-1 mono text-[11px] tracking-[0.14em] uppercase text-[var(--mute)] pt-1">{it.n}</div>
              <div className="col-span-10 md:col-span-4 text-[16px] text-[var(--ink)] font-medium tracking-tight">{it.t}</div>
              <div className="col-span-12 md:col-span-7 text-[14px] text-[var(--ink-2)] leading-[1.55]">{it.d}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
