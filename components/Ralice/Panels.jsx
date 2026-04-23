'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';

// ── Helpers
export function toPath(arr, w = 44, h = 14, pad = 1) {
  if (!arr || arr.length === 0) return '';
  const max = Math.max(...arr), min = Math.min(...arr);
  const step = w / (arr.length - 1);
  return arr
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)}`)
    .join(' ');
}

export function areaPath(arr, w, h, pad = 1) {
  const line = toPath(arr, w, h, pad);
  return `${line} L ${w} ${h} L 0 ${h} Z`;
}

// ── Card wrapper for consistency
export function Panel({ title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">{title}</div>}
          {subtitle && <div className="mono text-[9px] text-[var(--mute-2)] mt-0.5">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// PRODUCTS
// ══════════════════════════════════════════════════════════════════════

const PRODUCT_ROWS = [
  { p: 'Stroopwafel 500g',    rev: '€12,400', units: 820,  trend: 'up',   spark: [3, 4, 5, 5, 6, 7, 7, 8, 9, 10, 11, 12] },
  { p: 'Lavendel honing',     rev: '€9,140',  units: 610,  trend: 'up',   spark: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10] },
  { p: 'Kaas-assortiment XL', rev: '€8,220',  units: 240,  trend: 'flat', spark: [6, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6] },
  { p: 'Thee-sampler',        rev: '€6,780',  units: 1140, trend: 'down', spark: [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4] },
  { p: 'Noord-koffie 1kg',    rev: '€5,910',  units: 380,  trend: 'up',   spark: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9] },
  { p: 'Glühwein-pakket',     rev: '€4,220',  units: 95,   trend: 'up',   spark: [1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 9, 11] },
];

const TREND_GLYPH = { up: '↗', flat: '→', down: '↘' };

const STOCK_ACTUAL = [480, 460, 440, 425, 398, 370, 345, 320];
const STOCK_FORECAST = [320, 295, 270, 248, 225, 205, 188, 170];

const AFFINITY = [
  { a: 'Stroopwafel 500g',    b: 'Lavendel honing',   p: 78 },
  { a: 'Thee-sampler',        b: 'Koekjes-mix',       p: 64 },
  { a: 'Noord-koffie 1kg',    b: 'Filters 100st',     p: 59 },
  { a: 'Kaas-assortiment XL', b: 'Crackers artisan',  p: 52 },
  { a: 'Glühwein-pakket',     b: 'Kruidnoten 250g',   p: 47 },
];

const CATEGORIES = [
  { name: 'Snoepgoed',     vals: [2, 3, 3, 4, 5, 6, 7, 8, 9, 11] },
  { name: 'Dranken',       vals: [4, 5, 5, 6, 6, 7, 7, 8, 9, 9] },
  { name: 'Zuivel',        vals: [6, 6, 7, 6, 7, 6, 7, 8, 7, 8] },
  { name: 'Koffie & Thee', vals: [3, 4, 4, 5, 6, 6, 7, 8, 9, 10] },
];

export function ProductsPanel() {
  const stockW = 260, stockH = 72, stockPad = 4;
  const allStock = [...STOCK_ACTUAL, ...STOCK_FORECAST];
  const smax = Math.max(...allStock) * 1.1, smin = 0;
  const toXY = (v, i, total) => [
    stockPad + (i * (stockW - stockPad * 2)) / (total - 1),
    stockH - stockPad - ((v - smin) / (smax - smin)) * (stockH - stockPad * 2),
  ];
  const actualPts = STOCK_ACTUAL.map((v, i) => toXY(v, i, 16));
  const forecastPts = STOCK_FORECAST.map((v, i) => toXY(v, i + 8, 16));
  const actualPath = actualPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const lastActual = actualPts[actualPts.length - 1];
  const forecastPath = `M ${lastActual[0]} ${lastActual[1]} ` + forecastPts.map((p) => `L ${p[0]} ${p[1]}`).join(' ');
  const thresholdY = stockH - stockPad - ((200 - smin) / (smax - smin)) * (stockH - stockPad * 2);
  const actualFill = `${actualPath} L ${lastActual[0]} ${stockH} L ${actualPts[0][0]} ${stockH} Z`;

  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12 md:col-span-7" title="Top products · revenue" subtitle="Last 90 days">
        <div className="grid gap-[2px] mb-1.5 mono text-[8px] text-[var(--mute-2)]" style={{ gridTemplateColumns: '1fr 64px 44px 56px' }}>
          <span>Product</span><span className="text-right">Revenue</span><span className="text-right">Units</span><span className="text-right">Trend</span>
        </div>
        {PRODUCT_ROWS.map((r, i) => (
          <motion.div
            key={r.p}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: i * 0.04 }}
            className="grid items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
            style={{ gridTemplateColumns: '1fr 64px 44px 56px' }}
          >
            <span className="text-[10px] text-[var(--ink-2)] truncate">{r.p}</span>
            <span className="mono text-[10px] tabular-nums text-[var(--ink)] text-right">{r.rev}</span>
            <span className="mono text-[10px] tabular-nums text-[var(--mute)] text-right">{r.units}</span>
            <div className="flex items-center justify-end gap-1.5">
              <span className={`mono text-[10px] ${r.trend === 'up' ? 'text-[var(--good)]' : r.trend === 'down' ? 'text-rose-400' : 'text-[var(--mute)]'}`}>
                {TREND_GLYPH[r.trend]}
              </span>
              <svg viewBox="0 0 44 14" className="w-[44px] h-[14px]">
                <path d={toPath(r.spark)} stroke="var(--accent)" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </motion.div>
        ))}
        <div className="mt-2 mono text-[9px] text-[var(--mute)]">
          Top 6 of 142 SKUs · <span className="text-[var(--accent)]">€46.7k</span> total revenue
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-5" title="Stock forecast" subtitle="Solid = actual, dashed = predicted">
        <svg viewBox={`0 0 ${stockW} ${stockH}`} className="w-full" style={{ height: stockH }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={stockW} y1={stockH * f} y2={stockH * f} stroke="var(--hair)" strokeWidth="0.5" strokeDasharray="2 3" />
          ))}
          <line x1="0" x2={stockW} y1={thresholdY} y2={thresholdY} stroke="rgba(244,100,100,0.5)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={stockW - 4} y={thresholdY - 3} textAnchor="end" fill="rgba(244,100,100,0.8)" fontSize="7" fontFamily="Geist Mono, monospace">
            reorder · 200
          </text>
          <line x1={lastActual[0]} x2={lastActual[0]} y1="0" y2={stockH} stroke="var(--hair-2)" strokeWidth="0.5" strokeDasharray="1 2" />
          <motion.path d={actualFill} fill="url(#stockFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
          <motion.path d={actualPath} stroke="var(--accent)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease }} />
          <motion.path d={forecastPath} stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="3 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease, delay: 0.5 }} />
          <circle cx={lastActual[0]} cy={lastActual[1]} r="2" fill="var(--accent)" />
        </svg>
        <div className="mt-1 flex justify-between mono text-[7px] text-[var(--mute-2)]">
          <span>W1</span><span>W4</span><span>W8</span><span>W12</span><span>W16</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="mono text-[9px] text-rose-300">4 products below threshold</span>
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-6" title="Affinity matrix" subtitle="Top co-purchase patterns">
        {AFFINITY.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: i * 0.04 }}
            className="flex items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
          >
            <span className="mono text-[9px] text-[var(--ink-2)] px-1.5 py-0.5 rounded border border-[var(--hair-2)] bg-[var(--bg-2)]/50 whitespace-nowrap">{a.a}</span>
            <span className="mono text-[10px] text-[var(--accent)]">→</span>
            <span className="mono text-[9px] text-[var(--ink-2)] px-1.5 py-0.5 rounded border border-[var(--hair-2)] bg-[var(--bg-2)]/50 whitespace-nowrap">{a.b}</span>
            <span className="ml-auto mono text-[9px] text-[var(--mute)] tabular-nums">{a.p}%</span>
          </motion.div>
        ))}
        <div className="mt-2 mono text-[9px] text-[var(--mute)]">5 of 34 patterns · min 3 orders</div>
      </Panel>

      <Panel className="col-span-12 md:col-span-6" title="Demand trend · category" subtitle="Last 10 weeks, normalized">
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease, delay: i * 0.06 }}
              className="rounded border border-[var(--hair)] bg-[var(--bg-2)]/50 p-2"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="mono text-[8px] tracking-[0.1em] uppercase text-[var(--ink-2)]">{c.name}</span>
                <span className="mono text-[8px] text-[var(--mute-2)]">+{8 + i * 3}%</span>
              </div>
              <svg viewBox="0 0 100 30" className="w-full h-[32px]" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`catFill-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath(c.vals, 100, 30, 2)} fill={`url(#catFill-${i})`} />
                <path d={toPath(c.vals, 100, 30, 2)} stroke="var(--accent)" strokeWidth="1.2" fill="none" />
              </svg>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// CUSTOMERS
// ══════════════════════════════════════════════════════════════════════

const SIMILAR = [
  { n: 'Atelier Kroon',    pct: 82 },
  { n: 'Zuivelhof Meijer', pct: 74 },
  { n: 'Bakkerij Smit',    pct: 68 },
  { n: 'Studio Noord',     pct: 55 },
  { n: 'Winkel De Gouden', pct: 48 },
];

const TIMELINE_ORDERS = [
  { m: 0, sz: 0.6 }, { m: 1, sz: 0.9 }, { m: 2, sz: 0.5 }, { m: 3, sz: 1.0 },
  { m: 4, sz: 0.7 }, { m: 6, sz: 0.8 }, { m: 7, sz: 0.6 }, { m: 9, sz: 1.0 },
  { m: 10, sz: 0.7 }, { m: 11, sz: 0.9 },
];

const MINI_COHORT = [
  [100, 87, 79, 72, 67, 62, 58, 55],
  [100, 85, 77, 70, 64, 59, 55, null],
  [100, 88, 80, 73, 68, 62, null, null],
  [100, 83, 75, 68, 62, null, null, null],
  [100, 89, 81, 74, null, null, null, null],
  [100, 86, 78, null, null, null, null, null],
];

export function CustomersPanel() {
  const clvActual = 'M 0 52 L 16 48 L 32 43 L 48 38 L 64 33 L 80 28 L 96 24';
  const clvPred = 'M 96 24 L 120 20 L 144 17 L 168 14 L 192 11 L 216 9 L 240 7 L 264 5 L 288 3';
  const clvBand = 'M 96 24 L 120 16 L 144 12 L 168 9 L 192 6 L 216 4 L 240 2 L 264 1 L 288 0 L 288 6 L 264 9 L 240 12 L 216 15 L 192 18 L 168 21 L 144 24 L 120 27 L 96 30 Z';

  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12 md:col-span-4" title="Churn risk distribution" subtitle="115 active customers">
        <div className="mt-2 flex h-5 rounded-[3px] overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(84 / 115) * 100}%` }} transition={{ duration: 0.7, ease }}
            className="bg-emerald-400/60 flex items-center justify-center mono text-[8px] text-[var(--accent-ink)]">84 LOW</motion.div>
          <motion.div initial={{ width: 0 }} animate={{ width: `${(19 / 115) * 100}%` }} transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="bg-amber-400/60 flex items-center justify-center mono text-[8px] text-[var(--accent-ink)]">19 MID</motion.div>
          <motion.div initial={{ width: 0 }} animate={{ width: `${(12 / 115) * 100}%` }} transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="bg-rose-400/70 flex items-center justify-center mono text-[8px] text-white">12 HIGH</motion.div>
        </div>
        <div className="mt-3 flex gap-4 mono text-[9px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-400/60" /><span className="text-[var(--mute)]">Low</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-400/60" /><span className="text-[var(--mute)]">Mid</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-rose-400/70" /><span className="text-[var(--mute)]">High</span></span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="mono text-[9px] text-rose-300">12 high-risk · contact before end of month</span>
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-4" title="CLV projection" subtitle="24-month horizon">
        <svg viewBox="0 0 288 60" className="w-full h-[60px]" preserveAspectRatio="none">
          {[15, 30, 45].map((y) => <line key={y} x1="0" x2="288" y1={y} y2={y} stroke="var(--hair)" strokeWidth="0.5" strokeDasharray="2 3" />)}
          <line x1="96" x2="96" y1="0" y2="60" stroke="var(--hair-2)" strokeWidth="0.5" strokeDasharray="1 2" />
          <motion.path d={clvBand} fill="var(--accent)" fillOpacity="0.12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
          <motion.path d={clvActual} stroke="var(--accent)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease }} />
          <motion.path d={clvPred} stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="3 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease, delay: 0.5 }} />
          <circle cx="96" cy="24" r="2" fill="var(--accent)" />
        </svg>
        <div className="mt-1 flex justify-between mono text-[7px] text-[var(--mute-2)]">
          <span>0m</span><span>6m</span><span>12m</span><span>18m</span><span>24m</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="mono text-[9px] text-[var(--accent)]">+38% projected</span>
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-4" title="Cohort retention" subtitle="6 cohorts × 8 weeks">
        <div className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mono text-[7px] text-[var(--mute-2)] text-center">W{i}</div>
          ))}
        </div>
        {MINI_COHORT.map((row, ri) => (
          <div key={ri} className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            {row.map((v, ci) =>
              v == null ? (
                <div key={ci} className="rounded-[2px] border border-dashed border-[var(--hair-2)]" style={{ aspectRatio: '1 / 1', maxHeight: 18 }} />
              ) : (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease, delay: (ri * 8 + ci) * 0.01 }}
                  className="rounded-[2px]"
                  style={{ background: `rgba(94, 234, 212, ${0.08 + (v / 100) * 0.85})`, aspectRatio: '1 / 1', maxHeight: 18 }}
                />
              )
            )}
          </div>
        ))}
        <div className="mt-2 mono text-[9px] text-[var(--mute)]">4-week avg <span className="text-[var(--accent)]">63%</span></div>
      </Panel>

      <Panel className="col-span-12 md:col-span-7" title="Customer deep-dive" subtitle="Currently selected">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] mono text-[10px] flex items-center justify-center">BK</span>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-[var(--ink)]">Brouwerij Kort</div>
            <div className="mono text-[9px] text-[var(--mute-2)]">Groningen · customer since Mar 2023</div>
          </div>
          <span className="mono text-[8px] tracking-[0.06em] uppercase text-center rounded-full border bg-emerald-400/15 text-emerald-300 border-emerald-400/30" style={{ padding: '3px 8px' }}>low</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[['CLV', '€14,200'], ['Orders', '42'], ['Avg interval', '18d'], ['Last order', '6d ago']].map(([l, v]) => (
            <div key={l} className="rounded border border-[var(--hair)] bg-[var(--bg-2)]/50 px-2 py-1.5">
              <div className="mono text-[8px] text-[var(--mute-2)] tracking-[0.1em] uppercase">{l}</div>
              <div className="mono text-[12px] text-[var(--ink)] tabular-nums">{v}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mono text-[8px] text-[var(--mute-2)] tracking-[0.1em] uppercase mb-1">Purchase timeline · 12 months</div>
          <div className="relative h-6 rounded border border-[var(--hair)] bg-[var(--bg-2)]/30 px-2">
            <div className="absolute inset-x-2 top-1/2 h-px bg-[var(--hair-2)]" />
            {TIMELINE_ORDERS.map((o, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.05 }}
                className="absolute top-1/2 rounded-full bg-[var(--accent)]"
                style={{
                  left: `calc(${(o.m / 11) * 100}% + 0px)`,
                  width: 4 + o.sz * 6,
                  height: 4 + o.sz * 6,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.5 + o.sz * 0.5,
                }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between mono text-[7px] text-[var(--mute-2)]">
            <span>Apr &apos;25</span><span>Jul</span><span>Oct</span><span>Jan &apos;26</span><span>Apr &apos;26</span>
          </div>
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-5" title="Similar customers" subtitle="By purchase pattern">
        {SIMILAR.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: i * 0.06 }}
            className="grid items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
            style={{ gridTemplateColumns: '1fr 90px 36px' }}
          >
            <span className="text-[10px] text-[var(--ink-2)] truncate">{s.n}</span>
            <div className="h-1.5 rounded-full bg-[var(--hair-2)]/60 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.06 }}
                className="h-full bg-[var(--accent)]"
              />
            </div>
            <span className="mono text-[10px] tabular-nums text-[var(--ink-2)] text-right">{s.pct}%</span>
          </motion.div>
        ))}
        <div className="mt-2 mono text-[9px] text-[var(--mute)]">Ranked · 5 of 112</div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// REORDERS
// ══════════════════════════════════════════════════════════════════════

const INTERVAL_HIST = [4, 12, 26, 34, 18, 6];
const PREDICTIONS = [
  { n: 'Brouwerij Kort',   date: 'Apr 29', conf: 92 },
  { n: 'Atelier Kroon',    date: 'Apr 30', conf: 87 },
  { n: 'Studio Noord',     date: 'May 1',  conf: 74 },
  { n: 'Zuivelhof Meijer', date: 'May 2',  conf: 68 },
  { n: 'Bakkerij Smit',    date: 'May 2',  conf: 61 },
];
const BASKET = [
  { a: 'Stroopwafel 500g',    b: 'Lavendel honing',   p: 82 },
  { a: 'Thee-sampler',        b: 'Koekjes-mix',       p: 71 },
  { a: 'Glühwein-pakket',     b: 'Kruidnoten 250g',   p: 64 },
  { a: 'Noord-koffie 1kg',    b: 'Filters 100st',     p: 58 },
  { a: 'Kaas-assortiment XL', b: 'Crackers artisan',  p: 49 },
];
const TEAM = [
  { t: 'rep:lara', v: 48200 },
  { t: 'rep:ben',  v: 39400 },
  { t: 'rep:sam',  v: 31800 },
  { t: 'rep:kai',  v: 22600 },
];

export function ReordersPanel() {
  const maxTeam = Math.max(...TEAM.map((t) => t.v));
  const ringR = 34;
  const ringC = 2 * Math.PI * ringR;
  const ringPct = 68;

  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12 md:col-span-3" title="Reorder rate" subtitle="Rolling 30 days">
        <div className="flex items-center justify-center py-2">
          <div className="relative" style={{ width: 90, height: 90 }}>
            <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
              <circle cx="45" cy="45" r={ringR} stroke="var(--hair-2)" strokeWidth="6" fill="none" />
              <motion.circle
                cx="45" cy="45" r={ringR} stroke="var(--accent)" strokeWidth="6" fill="none" strokeLinecap="round"
                strokeDasharray={ringC}
                initial={{ strokeDashoffset: ringC }}
                animate={{ strokeDashoffset: ringC * (1 - ringPct / 100) }}
                transition={{ duration: 1.2, ease }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[22px] font-medium tabular-nums tracking-tight">{ringPct}%</span>
            </div>
          </div>
        </div>
        <div className="mono text-[9px] text-[var(--mute)] text-center">of active customers reorder within 30 days</div>
      </Panel>

      <Panel className="col-span-12 md:col-span-3" title="Avg reorder interval" subtitle="Distribution · 0–60 days">
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-[28px] font-medium tabular-nums tracking-tight">18</span>
          <span className="mono text-[10px] text-[var(--mute)]">days</span>
        </div>
        <div className="flex items-end gap-[3px] h-[36px]">
          {INTERVAL_HIST.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(v / Math.max(...INTERVAL_HIST)) * 100}%` }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="flex-1 rounded-[1px]"
              style={{ background: i === 3 ? 'var(--accent)' : 'rgba(94, 234, 212, 0.35)' }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between mono text-[7px] text-[var(--mute-2)]">
          <span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span>
        </div>
      </Panel>

      <Panel className="col-span-12 md:col-span-6" title="Predicted reorders" subtitle="Next 7 days">
        <div className="grid gap-[2px] mb-1.5 mono text-[8px] text-[var(--mute-2)]" style={{ gridTemplateColumns: '1fr 60px 90px' }}>
          <span>Customer</span><span className="text-right">Predicted</span><span className="text-right">Confidence</span>
        </div>
        {PREDICTIONS.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: i * 0.04 }}
            className="grid items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
            style={{ gridTemplateColumns: '1fr 60px 90px' }}
          >
            <span className="text-[10px] text-[var(--ink-2)] truncate">{p.n}</span>
            <span className="mono text-[10px] tabular-nums text-[var(--ink)] text-right">{p.date}</span>
            <div className="flex items-center gap-1.5 justify-end">
              <div className="w-[52px] h-1.5 rounded-full bg-[var(--hair-2)]/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.conf}%` }}
                  transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.04 }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
              <span className="mono text-[10px] tabular-nums text-[var(--ink-2)]">{p.conf}%</span>
            </div>
          </motion.div>
        ))}
      </Panel>

      <Panel className="col-span-12 md:col-span-7" title="Market-basket analysis" subtitle="Co-reorder patterns">
        {BASKET.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: i * 0.04 }}
            className="flex items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
          >
            <span className="mono text-[9px] text-[var(--ink-2)] px-1.5 py-0.5 rounded border border-[var(--hair-2)] bg-[var(--bg-2)]/50 whitespace-nowrap">{a.a}</span>
            <span className="mono text-[10px] text-[var(--accent)]">→</span>
            <span className="mono text-[9px] text-[var(--ink-2)] px-1.5 py-0.5 rounded border border-[var(--hair-2)] bg-[var(--bg-2)]/50 whitespace-nowrap">{a.b}</span>
            <span className="ml-auto mono text-[9px] text-[var(--mute)] tabular-nums whitespace-nowrap">reorders together {a.p}%</span>
          </motion.div>
        ))}
      </Panel>

      <Panel className="col-span-12 md:col-span-5" title="Team performance" subtitle="Reorder revenue · Q1 2026">
        <div className="flex items-end gap-3 h-[90px] mt-2 px-1">
          {TEAM.map((t, i) => {
            const pct = (t.v / maxTeam) * 100;
            return (
              <div key={t.t} className="flex-1 flex flex-col items-center gap-1.5 justify-end h-full">
                <span className="mono text-[9px] tabular-nums text-[var(--ink)]">€{(t.v / 1000).toFixed(1)}k</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                  className="w-full rounded-t-[2px]"
                  style={{ background: i === 0 ? 'var(--accent)' : `rgba(94, 234, 212, ${0.7 - i * 0.12})`, minHeight: 4 }}
                />
                <span className="mono text-[9px] text-[var(--mute)] whitespace-nowrap">{t.t}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 mono text-[9px] text-[var(--mute)]">
          Top rep · <span className="text-[var(--accent)]">rep:lara</span> · €48.2k
        </div>
      </Panel>
    </div>
  );
}
