'use client';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../../lib/motion';

const VARIANTS = [
  { id: 'a', label: 'Jar · 1 g',   price:  9.50, stock: 'High'    },
  { id: 'b', label: 'Jar · 2 g',   price: 18.00, stock: 'High'    },
  { id: 'c', label: 'Jar · 5 g',   price: 42.50, stock: 'Limited' },
  { id: 'd', label: 'Jar · 10 g',  price: 80.00, stock: 'Out'     },
];

const STOCK_COLOR = {
  High:    'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  Limited: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  Out:     'bg-rose-400/15 text-rose-300 border-rose-400/30',
};

export default function ProductCardDemo() {
  const [variant, setVariant] = useState('b');
  const [qty, setQty] = useState(2);
  const [added, setAdded] = useState(false);

  const v = useMemo(() => VARIANTS.find((x) => x.id === variant), [variant]);
  const total = (v.price * qty).toFixed(2);
  const outOfStock = v.stock === 'Out';

  const handleAdd = () => {
    if (outOfStock) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-3 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="absolute top-3 right-3 mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        Live component
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnail */}
        <div className="relative w-full md:w-48 aspect-square md:aspect-auto rounded-[var(--r-md)] overflow-hidden bg-gradient-to-br from-[var(--bg-3)] to-[var(--bg-2)] border border-[var(--hair)] flex items-center justify-center">
          <motion.div
            key={variant}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="relative w-24 h-28 rounded-[10px] border border-[var(--hair-2)] bg-gradient-to-b from-[#1a1a20] to-[#0e0e12] flex flex-col items-center justify-center"
            style={{ boxShadow: '0 10px 30px -10px rgba(139,123,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' }}
          >
            <div className="w-14 h-1 rounded-full bg-[var(--accent)]/60 mb-2" />
            <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">{v.label}</div>
          </motion.div>
          <span className={`absolute top-2 left-2 mono text-[9px] tracking-[0.14em] uppercase border px-2 py-0.5 rounded-full ${STOCK_COLOR[v.stock]}`}>
            {v.stock === 'Out' ? 'Sold out' : v.stock === 'Limited' ? 'Low stock' : 'In stock'}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">SKU · HG-0421</div>
          <h4 className="mt-1 text-[20px] font-medium tracking-tight text-[var(--ink)]">Reserve Bloem · Selectie ’26</h4>
          <div className="mt-1 text-[13px] text-[var(--ink-2)]">Private catalogue · B2B only</div>

          {/* Variants */}
          <div className="mt-4">
            <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)] mb-2">Choose size</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {VARIANTS.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setVariant(x.id)}
                  className={`relative rounded-[8px] border px-2.5 py-2 text-left transition-all ${
                    variant === x.id
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)]'
                      : 'border-[var(--hair-2)] bg-[var(--bg-3)]/50 text-[var(--ink-2)] hover:border-[var(--mute-2)]'
                  }`}
                >
                  <div className="text-[12px]">{x.label.split('·')[1]?.trim()}</div>
                  <div className="mono text-[10px] text-[var(--mute)] mt-0.5">€{x.price.toFixed(2)}</div>
                  {variant === x.id && (
                    <motion.span layoutId="card-variant-dot" className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + total */}
          <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)] mb-1.5">Quantity</div>
              <div className="inline-flex items-center rounded-[8px] border border-[var(--hair-2)] bg-[var(--bg-3)]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-[var(--ink-2)] hover:text-[var(--ink)]">−</button>
                <span className="mono w-8 text-center text-[13px] text-[var(--ink)]">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="px-3 py-1.5 text-[var(--ink-2)] hover:text-[var(--ink)]">+</button>
              </div>
            </div>
            <div className="text-right">
              <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)]">Total</div>
              <motion.div
                key={`${variant}-${qty}`}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease }}
                className="mt-0.5 text-[28px] font-medium tracking-tight tabular-nums text-[var(--ink)]"
              >
                €{total}
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className={`mt-5 group relative overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-medium transition-all ${
              outOfStock
                ? 'bg-[var(--bg-3)] text-[var(--mute)] cursor-not-allowed'
                : 'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 hover:shadow-[var(--shadow-accent)]'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="ok"
                  initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="flex items-center justify-center gap-2">
                  ✓ Added to cart
                </motion.span>
              ) : (
                <motion.span key="add"
                  initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="flex items-center justify-center gap-2">
                  {outOfStock ? 'Sold out' : <>Add to cart<span>→</span></>}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
