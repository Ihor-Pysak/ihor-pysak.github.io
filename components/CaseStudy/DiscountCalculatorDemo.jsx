'use client';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../../lib/motion';

// Tiers: grams → discount percent
const TIERS = [
  { at: 1000, pct: 2,  label: '1 kg'  },
  { at: 2000, pct: 5,  label: '2 kg'  },
  { at: 4000, pct: 10, label: '4 kg'  },
];
const UNIT_PRICE = 8.40; // €/g

function currentTier(grams) {
  let cur = { pct: 0, label: '—', at: 0 };
  for (const t of TIERS) if (grams >= t.at) cur = t;
  return cur;
}
function nextTier(grams) {
  return TIERS.find((t) => grams < t.at) ?? null;
}

export default function DiscountCalculatorDemo() {
  const [grams, setGrams] = useState(1400);

  const subtotal = grams * UNIT_PRICE / 1000 * 1000; // keeps math readable; really grams*UNIT
  const raw = grams * UNIT_PRICE;
  const tier = useMemo(() => currentTier(grams), [grams]);
  const next = useMemo(() => nextTier(grams), [grams]);
  const savings = raw * (tier.pct / 100);
  const total = raw - savings;

  const progressTo = next ? Math.min(100, (grams / next.at) * 100) : 100;
  const tierProgress = (i) => grams >= TIERS[i].at;

  return (
    <div className="relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-6 md:p-7 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="absolute top-5 right-5 mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        Live component
      </div>

      <div className="mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">Volume pricing</div>
      <h4 className="mt-1 text-[20px] font-medium tracking-tight text-[var(--ink)]">Staffelkorting</h4>

      {/* Current tier pill */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={tier.pct}
            initial={{ scale: 0.9, opacity: 0, y: 6 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] border ${
              tier.pct > 0
                ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30'
                : 'bg-[var(--bg-3)] text-[var(--mute)] border-[var(--hair-2)]'
            }`}
          >
            <span className="mono tracking-[0.08em]">{tier.pct > 0 ? `${tier.pct}%` : '0%'} off</span>
            {tier.pct > 0 && <span className="text-[11px] opacity-80">at {tier.label}</span>}
          </motion.div>
        </AnimatePresence>
        {next && (
          <span className="mono text-[11px] text-[var(--mute)]">
            {(next.at - grams).toLocaleString()} g to {next.pct}% at {next.label}
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="mt-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)]">Quantity</div>
            <div className="mt-0.5 text-[22px] font-medium tracking-tight text-[var(--ink)] tabular-nums">
              {grams.toLocaleString()} <span className="text-[14px] text-[var(--mute)]">g</span>
            </div>
          </div>
          <div className="text-right">
            <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)]">Unit</div>
            <div className="mt-0.5 mono text-[13px] text-[var(--ink-2)]">€{UNIT_PRICE.toFixed(2)} / g</div>
          </div>
        </div>

        <div className="relative h-10 select-none">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-[var(--bg-3)] border border-[var(--hair)]" />
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)]"
            style={{ width: `${(grams / 5000) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Tier ticks */}
          {TIERS.map((t, i) => {
            const left = (t.at / 5000) * 100;
            const reached = tierProgress(i);
            return (
              <div key={t.at} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
                <div className={`w-px h-3 -translate-x-1/2 ${reached ? 'bg-[var(--accent)]' : 'bg-[var(--hair-2)]'}`} />
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 mono text-[10px] whitespace-nowrap ${reached ? 'text-[var(--accent)]' : 'text-[var(--mute)]'}`}>
                  {t.pct}%
                </div>
              </div>
            );
          })}
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Quantity in grams"
          />
          {/* thumb */}
          <motion.div
            className="slider-thumb absolute top-1/2 w-5 h-5 rounded-full pointer-events-none"
            style={{ left: `calc(${(grams / 5000) * 100}% - 10px)`, translateY: '-50%' }}
          />
        </div>
      </div>

      {/* Receipt */}
      <div className="mt-10 rounded-[var(--r-md)] border border-[var(--hair-2)] bg-[var(--bg-3)]/50 p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-[var(--ink-2)]">Subtotal</span>
          <span className="mono text-[14px] tabular-nums text-[var(--ink-2)]">€{raw.toFixed(2)}</span>
        </div>
        <AnimatePresence>
          {tier.pct > 0 && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <div className="mt-2 flex items-baseline justify-between text-[var(--accent)]">
                <span className="text-[13px]">Tier discount ({tier.pct}%)</span>
                <span className="mono text-[14px] tabular-nums">− €{savings.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-4 pt-4 border-t border-[var(--hair)] flex items-baseline justify-between">
          <span className="text-[14px] text-[var(--ink)]">Total</span>
          <div className="flex items-baseline gap-3">
            <AnimatePresence>
              {tier.pct > 0 && (
                <motion.span
                  key={`strike-${tier.pct}`}
                  initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                  className="mono text-[13px] text-[var(--mute)] line-through tabular-nums"
                >
                  €{raw.toFixed(2)}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              key={total.toFixed(2)}
              initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease }}
              className="text-[26px] font-medium tracking-tight tabular-nums text-[var(--ink)]"
            >
              €{total.toFixed(2)}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
