'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../lib/motion';
import { ProductsPanel, CustomersPanel, ReordersPanel } from './Ralice/Panels';

// ──────────────────────── Shared mock data ────────────────────────

const COHORTS = [
  { label: "Jun '25", vals: [100, 86, 78, 71, 66, 61, 57, 54, 51, 49, 47, 45] },
  { label: "Jul '25", vals: [100, 84, 76, 70, 63, 58, 54, 51, 48, 45, 43, null] },
  { label: "Aug '25", vals: [100, 88, 80, 72, 67, 62, 57, 53, 50, 47, null, null] },
  { label: "Sep '25", vals: [100, 82, 74, 68, 62, 56, 52, 48, 45, null, null, null] },
  { label: "Oct '25", vals: [100, 89, 81, 74, 68, 63, 58, 54, null, null, null, null] },
  { label: "Nov '25", vals: [100, 87, 78, 72, 66, 60, 55, null, null, null, null, null] },
  { label: "Dec '25", vals: [100, 85, 76, 69, 62, 55, null, null, null, null, null, null] },
  { label: "Jan '26", vals: [100, 92, 84, 76, null, null, null, null, null, null, null, null] },
];

const CUSTOMERS = [
  { n: 'Brouwerij Kort',    i: 'BK', clv: '€14,200', risk: 'low',  spark: [4, 5, 5, 6, 7, 6, 8, 9, 9, 10, 11, 12] },
  { n: 'Atelier Kroon',     i: 'AK', clv: '€9,840',  risk: 'low',  spark: [3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10] },
  { n: 'Zuivelhof Meijer',  i: 'ZM', clv: '€7,620',  risk: 'mid',  spark: [6, 7, 6, 5, 5, 4, 5, 5, 4, 5, 4, 4] },
  { n: 'Bakkerij Smit',     i: 'BS', clv: '€6,410',  risk: 'low',  spark: [2, 3, 4, 4, 5, 5, 6, 5, 6, 7, 7, 8] },
  { n: 'Winkel De Gouden',  i: 'WG', clv: '€5,290',  risk: 'high', spark: [8, 7, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2] },
  { n: 'Studio Noord',      i: 'SN', clv: '€4,150',  risk: 'mid',  spark: [5, 5, 4, 5, 4, 5, 4, 4, 5, 4, 4, 5] },
];

const RISK_STYLE = {
  low:  'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  mid:  'bg-amber-400/15 text-amber-300 border-amber-400/30',
  high: 'bg-rose-400/15 text-rose-300 border-rose-400/30',
};

function toSpark(arr, w = 44, h = 14) {
  const max = Math.max(...arr), min = Math.min(...arr);
  const step = w / (arr.length - 1);
  return arr
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - ((v - min) / (max - min || 1)) * (h - 2) - 1}`)
    .join(' ');
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
function dayHourVal(d, h) {
  const business = Math.exp(-Math.pow((h - 13) / 4.4, 2));
  const weekday = d <= 4 ? 1 : 0.35;
  const noise = ((Math.sin(d * 2.3 + h * 0.7) + 1) / 2) * 0.3;
  return Math.max(0, Math.min(1, business * weekday + noise * 0.35));
}

// SVG paths for the Revenue chart (360×56) and CLV projection (288×60)
const REV_CUR = 'M 0 42 L 36 38 L 72 33 L 108 28 L 144 24 L 180 20 L 216 16 L 252 12 L 288 10 L 324 8 L 360 6';
const REV_PRV = 'M 0 46 L 36 44 L 72 40 L 108 38 L 144 36 L 180 34 L 216 32 L 252 30 L 288 28 L 324 27 L 360 26';
const CLV_ACTUAL = 'M 0 50 L 12 46 L 24 42 L 36 38 L 48 34 L 60 30 L 72 26';
const CLV_PRED = 'M 72 26 L 96 22 L 120 19 L 144 16 L 168 13 L 192 11 L 216 9 L 240 7 L 264 5 L 288 4';
const CLV_BAND = 'M 72 26 L 96 20 L 120 16 L 144 12 L 168 9  L 192 6  L 216 4  L 240 2  L 264 1  L 288 0  L 288 8  L 264 10 L 240 13 L 216 16 L 192 19 L 168 22 L 144 24 L 120 26 L 96 28 L 72 30 Z';

// ──────────────────────── SALES panel ────────────────────────

function SalesPanel() {
  return (
    <>
      {/* ROW 1 — Revenue */}
      <div className="mt-4 rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3">
        <div className="flex items-baseline justify-between">
          <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">Revenue</div>
          <div className="mono text-[9px] text-[var(--mute)]">
            vs. prev 90d · <span className="text-[var(--good)]">+18.4%</span>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex flex-col justify-between mono text-[8px] text-[var(--mute-2)] py-0.5" style={{ height: 56 }}>
            <span>€100k</span><span>€66k</span><span>€33k</span><span>€0</span>
          </div>
          <svg viewBox="0 0 360 56" className="flex-1 h-14" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[14, 28, 42].map((y) => (
              <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="var(--hair)" strokeWidth="0.5" strokeDasharray="2 3" />
            ))}
            <motion.path d={REV_PRV} stroke="var(--mute-2)" strokeWidth="1" fill="none" strokeDasharray="2 3"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
            <motion.path d={`${REV_CUR} L 360 56 L 0 56 Z`} fill="url(#revFill)"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} />
            <motion.path d={REV_CUR} stroke="var(--accent)" strokeWidth="1.6" fill="none"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease, delay: 0.1 }} />
          </svg>
        </div>
        <div className="mt-1 ml-11 flex justify-between mono text-[8px] text-[var(--mute-2)]">
          {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* ROW 2 — 3 sub-blocks */}
      <div className="mt-4 grid grid-cols-12 gap-3">
        {/* LEFT · Cohort retention */}
        <div className="col-span-12 md:col-span-5 rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">Cohort retention</div>
              <div className="mono text-[9px] text-[var(--mute-2)] mt-0.5">Month × weeks since signup</div>
            </div>
          </div>
          <div className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: '44px repeat(12, 1fr)' }}>
            <div />
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mono text-[7px] text-[var(--mute-2)] text-center">W{i}</div>
            ))}
          </div>
          {COHORTS.map((c, ri) => (
            <div key={c.label} className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: '44px repeat(12, 1fr)' }}>
              <div className="mono text-[8px] text-[var(--ink-2)] flex items-center">{c.label}</div>
              {c.vals.map((v, ci) => {
                if (v == null) {
                  return (
                    <div key={ci} className="rounded-[2px] border border-dashed border-[var(--hair-2)]"
                      style={{ aspectRatio: '1 / 1', maxHeight: 18 }} />
                  );
                }
                const op = 0.05 + (v / 100) * 0.95;
                return (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease, delay: (ri * 12 + ci) * 0.006 }}
                    className="rounded-[2px] flex items-center justify-center mono tabular-nums"
                    style={{
                      background: `rgba(94, 234, 212, ${op})`,
                      aspectRatio: '1 / 1',
                      maxHeight: 18,
                      fontSize: 6.5,
                      color: op > 0.55 ? 'var(--accent-ink)' : 'var(--ink-2)',
                    }}
                  >
                    {v}
                  </motion.div>
                );
              })}
            </div>
          ))}
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="text-[22px] font-medium tracking-tight leading-none">63%</div>
              <div className="mono text-[9px] text-[var(--mute)] mt-1">avg 4-week retention</div>
            </div>
            <div className="flex items-center gap-[2px]">
              <span className="mono text-[8px] text-[var(--mute-2)]">0%</span>
              {[0.1, 0.25, 0.45, 0.65, 0.9].map((o) => (
                <div key={o} className="w-3 h-2 rounded-[1px]" style={{ background: `rgba(94, 234, 212, ${o})` }} />
              ))}
              <span className="mono text-[8px] text-[var(--mute-2)]">100%</span>
            </div>
          </div>
        </div>

        {/* MIDDLE · Top customers */}
        <div className="col-span-12 md:col-span-4 rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3">
          <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)] mb-2">Top customers · CLV</div>
          <div className="grid gap-[2px] mb-1.5 mono text-[8px] text-[var(--mute-2)]"
            style={{ gridTemplateColumns: '1fr 56px 44px 50px' }}>
            <span>Customer</span><span className="text-right">CLV</span><span className="text-center">Risk</span><span />
          </div>
          {CUSTOMERS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, x: -4 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease, delay: i * 0.04 }}
              className="grid items-center gap-2 py-1.5 border-b border-[var(--hair)] last:border-b-0"
              style={{ gridTemplateColumns: '1fr 56px 44px 50px' }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="shrink-0 w-4 h-4 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] mono text-[8px] flex items-center justify-center">
                  {c.i}
                </span>
                <span className="text-[10px] text-[var(--ink-2)] truncate">{c.n}</span>
              </div>
              <span className="mono text-[10px] tabular-nums text-[var(--ink)] text-right">{c.clv}</span>
              <span
                className={`mono text-[8px] tracking-[0.06em] uppercase text-center rounded-full border ${RISK_STYLE[c.risk]}`}
                style={{ padding: '3px 8px' }}
              >
                {c.risk}
              </span>
              <svg viewBox="0 0 44 14" className="w-full h-[14px]">
                <path d={toSpark(c.spark)} stroke="var(--accent)" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>
          ))}
          <div className="mt-2 mono text-[9px] text-[var(--mute)]">
            <span className="text-rose-300">12 churn-risk</span>
            <span className="text-[var(--mute-2)]"> · </span>
            <span className="text-amber-300">3 overdue reorders</span>
          </div>
        </div>

        {/* RIGHT · CLV projection */}
        <div className="col-span-12 md:col-span-3 rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3">
          <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">Customer LTV</div>
          <div className="mono text-[9px] text-[var(--mute-2)] mt-0.5">24-month projection</div>
          <div className="mt-2 flex gap-1.5">
            <div className="flex flex-col justify-between mono text-[7px] text-[var(--mute-2)] py-0.5" style={{ height: 60 }}>
              <span>€30k</span><span>€15k</span><span>€0</span>
            </div>
            <svg viewBox="0 0 288 60" className="flex-1 h-[60px]" preserveAspectRatio="none">
              {[15, 30, 45].map((y) => (
                <line key={y} x1="0" x2="288" y1={y} y2={y} stroke="var(--hair)" strokeWidth="0.5" strokeDasharray="2 3" />
              ))}
              <line x1="72" x2="72" y1="0" y2="60" stroke="var(--hair-2)" strokeWidth="0.5" strokeDasharray="1 2" />
              <motion.path d={CLV_BAND} fill="var(--accent)" fillOpacity="0.12"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} />
              <motion.path d={CLV_ACTUAL} stroke="var(--accent)" strokeWidth="1.6" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} />
              <motion.path d={CLV_PRED} stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="3 2"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease, delay: 0.6 }} />
              <circle cx="72" cy="26" r="2" fill="var(--accent)" />
            </svg>
          </div>
          <div className="mt-1 ml-[26px] flex justify-between mono text-[7px] text-[var(--mute-2)]">
            <span>0</span><span>6</span><span>12</span><span>18</span><span>24</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="mono text-[9px] text-[var(--accent)]">+38% projected</span>
          </div>
        </div>
      </div>

      {/* ROW 3 — Day × hour heatmap */}
      <div className="mt-4 rounded-[var(--r-md)] border border-[var(--hair)] bg-[var(--bg-3)]/40 p-3">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <div className="mono text-[9px] tracking-[0.14em] uppercase text-[var(--mute)]">Day × Hour · Order volume</div>
            <div className="mono text-[9px] text-[var(--mute-2)] mt-0.5">Last 90 days · 2,104 orders</div>
          </div>
          <div className="flex items-center gap-[2px]">
            <span className="mono text-[8px] text-[var(--mute-2)]">fewer</span>
            {[0.08, 0.22, 0.4, 0.6, 0.85].map((o) => (
              <div key={o} className="w-2.5 h-2 rounded-[1px]" style={{ background: `rgba(94, 234, 212, ${o})` }} />
            ))}
            <span className="mono text-[8px] text-[var(--mute-2)]">more</span>
          </div>
        </div>
        <div className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: '28px repeat(24, 1fr)' }}>
          <div />
          {Array.from({ length: 24 }).map((_, h) => (
            <div key={h} className="mono text-[7px] text-[var(--mute-2)] text-center">{h % 6 === 0 ? h : ''}</div>
          ))}
        </div>
        {DAYS.map((d, di) => (
          <div key={d} className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: '28px repeat(24, 1fr)' }}>
            <div className="mono text-[8px] text-[var(--ink-2)] flex items-center">{d}</div>
            {Array.from({ length: 24 }).map((_, h) => {
              const v = dayHourVal(di, h);
              return (
                <motion.div
                  key={h}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, ease, delay: (di * 24 + h) * 0.003 }}
                  className="rounded-[1px]"
                  style={{ background: `rgba(94, 234, 212, ${0.05 + v * 0.85})`, aspectRatio: '1 / 1', maxHeight: 11 }}
                />
              );
            })}
          </div>
        ))}
        <div className="mt-2 mono text-[9px] text-[var(--mute)]">
          Peak: <span className="text-[var(--accent)]">Tue–Thu, 11am–3pm</span> · 68% of weekly volume
        </div>
      </div>
    </>
  );
}

// ──────────────────────── Tabs ────────────────────────

function RaliceTabs() {
  const [tab, setTab] = useState('sales');
  const TABS = [
    ['sales', 'Sales'],
    ['products', 'Products'],
    ['customers', 'Customers'],
    ['reorders', 'Reorders'],
  ];

  return (
    <>
      <div className="mt-3 flex items-center gap-4 text-[11px] mono tracking-[0.14em] uppercase">
        {TABS.map(([id, l]) => {
          const on = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative pb-1.5 cursor-pointer transition-colors ${
                on ? 'text-[var(--ink)]' : 'text-[var(--mute)] hover:text-[var(--ink-2)]'
              }`}
            >
              {l}
              {on && (
                <motion.span
                  layoutId="ralice-tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-[var(--accent)]"
                  transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease }}
        >
          {tab === 'sales' && <SalesPanel />}
          {tab === 'products' && <ProductsPanel />}
          {tab === 'customers' && <CustomersPanel />}
          {tab === 'reorders' && <ReordersPanel />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// ──────────────────────── Dashboard frame ────────────────────────

function RaliceMock() {
  return (
    <div className="relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-4 md:p-6 shadow-[var(--shadow-card)]">
      {/* Top bar */}
      <div className="flex items-center gap-2 pb-3 border-b border-[var(--hair)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <span className="mono text-[11px] tracking-[0.14em] text-[var(--ink)]">ralice.app</span>
        <span className="ml-3 mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">Analytics suite</span>
        <span className="ml-auto mono text-[10px] tracking-[0.14em] uppercase text-[var(--mute)]">Q1 2026</span>
      </div>
      <RaliceTabs />
    </div>
  );
}

// ──────────────────────── Section ────────────────────────

export default function Ralice() {
  const infoRows = [
    ['Type', 'Full-stack · solo'],
    ['Scope', 'Architecture → Deploy'],
    ['Status', 'Pre-launch · Shopify App Store'],
    ['Domain', 'ralice.app'],
    ['Codebase', 'React Router v7 · Rust · Supabase'],
  ];

  const techTags = ['Shopify App', 'React Router v7', 'Rust Shopify Function', 'Supabase', 'Polaris', 'SVG charts'];

  return (
    <section id="ralice" className="relative py-28 md:py-36 border-t border-[var(--hair)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">
          Personal product · Pre-launch
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-[clamp(48px,8vw,120px)] font-medium tracking-tight leading-[0.92]">
              Ralice<span className="inline-block text-[var(--accent)]">.</span>
            </h2>
            <div className="mt-4 text-[17px] text-[var(--ink-2)]">
              A B2B Wholesale Suite for Shopify. Solo. Architecture to deploy.
            </div>
            <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.6] text-[var(--ink-2)]">
              Quick order forms, one-click reorder, order templates, and tag-based customer pricing enforced at checkout via a Rust Shopify Function.
              Plus a four-tab analytics suite with cohort retention, CLV prediction, churn scoring, and market-basket analysis — charts hand-rolled in SVG, no chart library.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {techTags.map((t) => (
                <span key={t} className="chip mono text-[11px] rounded-full border border-[var(--hair-2)] text-[var(--ink-2)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-4 md:p-5">
              {infoRows.map(([k, v], i, a) => (
                <div
                  key={k}
                  className={`flex items-baseline justify-between gap-3 py-2.5 ${
                    i < a.length - 1 ? 'border-b border-[var(--hair)]' : ''
                  }`}
                >
                  <span className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--mute)] shrink-0">{k}</span>
                  <span className="text-[13px] text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard mock */}
        <div className="mt-14 md:mt-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <RaliceMock />
            <div
              className="absolute -inset-10 -z-10 rounded-[var(--r-xl)] pointer-events-none"
              style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(94, 234, 212, 0.15), transparent 70%)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
