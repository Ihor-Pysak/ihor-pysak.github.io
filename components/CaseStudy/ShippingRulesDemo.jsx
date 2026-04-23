'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';

const SHIP_RULES = [
  {
    id: 1,
    label: 'Free shipping · weight ≥ 400 g',
    eval: (ctx) =>
      ctx.weight >= 400 ? { pass: true, amount: 0, note: 'weight threshold met' } : { pass: false },
  },
  {
    id: 2,
    label: 'Pre-roll basket · weight ≥ 200 g',
    eval: (ctx, prev) => {
      if (prev.find((p) => p.pass)) return { skip: true };
      return ctx.preRoll && ctx.weight >= 200
        ? { pass: true, amount: 0, note: 'pre-roll threshold met' }
        : { pass: false };
    },
  },
  {
    id: 3,
    label: 'Regional value-transport · Randstad',
    eval: (ctx, prev) => {
      if (prev.find((p) => p.pass && p.amount === 0)) return { skip: true };
      return ctx.region === 'Randstad'
        ? { pass: true, amount: 8.5, note: 'Randstad region' }
        : { pass: false };
    },
  },
  {
    id: 4,
    label: 'Regional value-transport · Noord-Brabant',
    eval: (ctx, prev) => {
      if (prev.find((p) => p.pass && p.amount === 0)) return { skip: true };
      return ctx.region === 'Noord-Brabant'
        ? { pass: true, amount: 14.0, note: 'Noord-Brabant region' }
        : { pass: false };
    },
  },
  {
    id: 5,
    label: 'International · outside NL',
    eval: (ctx, prev) => {
      if (prev.find((p) => p.pass && p.amount === 0)) return { skip: true };
      return ctx.region === 'Outside NL'
        ? { pass: true, amount: 45.0, note: 'international ship' }
        : { pass: false };
    },
  },
];

function evalRules(ctx) {
  const results = [];
  let total = 0;
  let wonBy = null;
  for (const r of SHIP_RULES) {
    const res = r.eval(ctx, results);
    results.push({ id: r.id, label: r.label, ...res });
    if (res.pass && wonBy == null) {
      wonBy = r.id;
      total += res.amount ?? 0;
    } else if (res.pass && wonBy != null && res.amount > 0) {
      total += res.amount;
    }
  }
  return { results, total, wonBy };
}

export default function ShippingRulesDemo() {
  const [weight, setWeight] = useState(320);
  const [preRoll, setPreRoll] = useState(true);
  const [region, setRegion] = useState('Randstad');
  const { results, total, wonBy } = useMemo(
    () => evalRules({ weight, preRoll, region }),
    [weight, preRoll, region]
  );
  const winner = results.find((r) => r.id === wonBy);

  return (
    <div className="relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-6 md:p-7 shadow-[var(--shadow-card)] overflow-hidden hover:border-[var(--accent)]/40 transition-colors">
      <div className="absolute top-5 right-5 mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        Live component
      </div>
      <div className="mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">Rules explorer</div>
      <h4 className="mt-1 text-[20px] font-medium tracking-tight">Shipping engine</h4>

      {/* Inputs */}
      <div className="mt-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-end justify-between mb-2">
            <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)]">Cart weight</div>
            <div className="mono text-[13px] tabular-nums text-[var(--ink)]">{weight} g</div>
          </div>
          <div className="relative h-6 select-none" data-cursor="grab">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-[var(--bg-3)] border border-[var(--hair)]" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)]"
              style={{ width: `${(weight / 1000) * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Cart weight in grams"
            />
            <div
              className="slider-thumb slider-thumb-sm absolute top-1/2 w-4 h-4 rounded-full pointer-events-none"
              style={{ left: `calc(${(weight / 1000) * 100}% - 8px)`, transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)] mb-2">Pre-roll</div>
          <button
            onClick={() => setPreRoll((v) => !v)}
            className={`w-full text-left rounded-[8px] border px-3 py-2 text-[13px] transition-all ${
              preRoll
                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)]'
                : 'border-[var(--hair-2)] bg-[var(--bg-3)]/50 text-[var(--ink-2)]'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${preRoll ? 'bg-[var(--accent)]' : 'bg-[var(--hair-2)]'}`} />
              {preRoll ? 'included' : 'not in basket'}
            </span>
          </button>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)] mb-2">Region</div>
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="custom-select appearance-none w-full rounded-[8px] border border-[var(--hair-2)] px-3 py-2 text-[13px] text-[var(--ink)] pr-9"
              aria-label="Region"
            >
              <option>Randstad</option>
              <option>Noord-Brabant</option>
              <option>Outside NL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rule cascade */}
      <div className="mt-6 border-t border-[var(--hair)]">
        {results.map((r, i) => {
          const state = r.skip ? 'skip' : r.pass ? 'pass' : 'fail';
          const dotColor =
            state === 'pass' ? 'bg-[var(--good)]' : state === 'fail' ? 'bg-rose-400/70' : 'bg-[var(--mute-2)]';
          const chipText = r.skip
            ? 'skipped'
            : r.pass
            ? r.amount === 0
              ? '€0.00'
              : `+€${r.amount.toFixed(2)}`
            : 'not met';
          const chipStyle =
            state === 'pass'
              ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30'
              : state === 'skip'
              ? 'bg-[var(--bg-3)] text-[var(--mute)] border-[var(--hair-2)]'
              : 'bg-rose-500/10 text-rose-300 border-rose-400/30';
          return (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease, delay: i * 0.06 }}
              className="flex items-center gap-3 py-3 border-b border-[var(--hair)]"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4, ease }}
                key={state}
                className={`inline-block w-2.5 h-2.5 rounded-full ${dotColor}`}
              />
              <span className="mono text-[11px] tracking-[0.04em] text-[var(--mute)] w-6">
                {String(r.id).padStart(2, '0')}
              </span>
              <span className="flex-1 text-[14px] text-[var(--ink-2)]">{r.label}</span>
              <span className={`chip mono text-[11px] tracking-[0.04em] border rounded-full ${chipStyle}`}>
                {chipText}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Final */}
      <div className="mt-5 rounded-[var(--r-md)] border border-[var(--accent)]/20 bg-[var(--bg-3)]/50 p-5 flex items-end justify-between">
        <div>
          <div className="mono text-[10px] tracking-[0.12em] uppercase text-[var(--mute)]">Shipping cost</div>
          <motion.div
            key={total.toFixed(2)}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="mt-0.5 text-[28px] font-medium tracking-tight tabular-nums"
          >
            €{total.toFixed(2)}
          </motion.div>
          <div className="mt-1 text-[12px] text-[var(--mute)]">
            {winner ? (
              <>
                Rule <span className="text-[var(--accent)] mono">{String(winner.id).padStart(2, '0')}</span> applied — {winner.note}
              </>
            ) : (
              'No rule matched'
            )}
          </div>
        </div>
        <span className="mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">Applied at checkout</span>
      </div>
    </div>
  );
}
