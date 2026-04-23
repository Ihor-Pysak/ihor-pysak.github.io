'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeStrip() {
  const items = [
    'Shopify B2B', 'Storefront engineering', 'Checkout-layer logic',
    'Back-office integrations', 'Custom apps', 'Node / TypeScript',
    'Klaviyo email engineering', 'Laravel', 'Product systems',
  ];
  const row = [...items, ...items];

  return (
    <section aria-hidden="true" className="relative border-y border-[var(--hair)] py-4 overflow-hidden bg-[var(--bg-2)]/40">
      <motion.div
        className="flex gap-10 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 48 }}
      >
        {row.map((t, i) => (
          <span key={i} className="mono text-[12px] tracking-[0.14em] uppercase text-[var(--mute)] flex items-center gap-10">
            {t}
            <span className="w-1 h-1 rounded-full bg-[var(--hair-2)]" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
