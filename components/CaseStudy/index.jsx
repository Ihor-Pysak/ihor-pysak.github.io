'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, revealProps, fadeUp, stagger } from '../../lib/motion';
import StatCounters from './StatCounters';
import ProductCardDemo from './ProductCardDemo';
import DiscountCalculatorDemo from './DiscountCalculatorDemo';
import ShippingRulesDemo from './ShippingRulesDemo';
import IntegrationDiagram from './IntegrationDiagram';
import ShippedList from './ShippedList';

export default function CaseStudy() {
  return (
    <section id="case" className="relative py-28 md:py-40">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Intro */}
        <motion.div {...revealProps} variants={stagger(0.07)} className="grid grid-cols-12 gap-6 md:gap-10">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
            <div className="sticky top-28">
              <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">Featured engagement</div>
              <div className="mt-5 flex items-center gap-2 text-[13px] text-[var(--mute)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)]" />
                Mar 2026 — present
              </div>
              <div className="mt-2 text-[13px] text-[var(--mute)]">Solution Architect &amp; Full-Stack</div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-8">
            <h2 className="text-[clamp(32px,4.4vw,64px)] font-medium tracking-tight leading-[1.02] text-[var(--ink)]">
              Holigram.<br />
              <span className="text-[var(--ink-2)]">A private Dutch B2B wholesale platform,</span>
              <span className="text-[var(--mute)]"> owned end-to-end.</span>
            </h2>
            <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.6] text-[var(--ink-2)]">
              Login-gated, invite-only storefront serving registered Dutch businesses. I own the technical stack end-to-end — a
              custom Shopify storefront, checkout-layer logic, Node/TypeScript back-office integrations, and B2B email engineering.
            </p>
          </motion.div>
        </motion.div>

        <StatCounters />

        {/* Live demo 1 */}
        <motion.div {...revealProps} variants={stagger(0.06)} className="mt-28 grid grid-cols-12 gap-6 md:gap-10">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)]">Live component · 01</div>
            <h3 className="mt-4 text-[clamp(26px,3vw,40px)] font-medium tracking-tight leading-[1.1] text-[var(--ink)]">
              Horizontal product card, rebuilt for wholesale buying.
            </h3>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--ink-2)] max-w-[42ch]">
              On-card variant selection, real-time price × quantity math, a colored stock indicator, and add-to-cart without a page redirect.
              The card to your right is the real thing — pick a variant, change the quantity.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {['Liquid', 'JavaScript', 'AJAX Cart API', 'CSS Grid'].map((t) => (
                <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--hair-2)] text-[var(--ink-2)]">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7">
            <ProductCardDemo />
          </motion.div>
        </motion.div>

        {/* Live demo 2 */}
        <motion.div {...revealProps} variants={stagger(0.06)} className="mt-28 grid grid-cols-12 gap-6 md:gap-10">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7 order-2 md:order-1">
            <DiscountCalculatorDemo />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5 order-1 md:order-2">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)]">Live component · 02</div>
            <h3 className="mt-4 text-[clamp(26px,3vw,40px)] font-medium tracking-tight leading-[1.1] text-[var(--ink)]">
              Volume-discount engine with live tier snapping.
            </h3>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--ink-2)] max-w-[42ch]">
              Tiered discounts (2 / 5 / 10 %) calculated client-side, announced with an animated badge and a strikethrough
              on the original price. Drag the slider — the tier snaps in on threshold.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {['JavaScript', 'Liquid', 'Metafields', 'Framer Motion'].map((t) => (
                <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--hair-2)] text-[var(--ink-2)]">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Live demo 3 — Shipping rules */}
        <motion.div {...revealProps} variants={stagger(0.06)} className="mt-28 grid grid-cols-12 gap-6 md:gap-10">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)]">Live component · 03</div>
            <h3 className="mt-4 text-[clamp(26px,3vw,40px)] font-medium tracking-tight leading-[1.1] text-[var(--ink)]">
              Shipping rules that explain themselves.
            </h3>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--ink-2)] max-w-[42ch]">
              Cart-weight sliders drive a cascade of rules — free-shipping thresholds, category surcharges, regional pricing —
              each evaluating in sequence with a visible pass / fail state. This is how the real checkout behaves;
              the calculation below is the same logic, slightly simplified.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {['JavaScript', 'ShipMagic', 'ERP rules', 'React'].map((t) => (
                <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--hair-2)] text-[var(--ink-2)]">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7">
            <ShippingRulesDemo />
          </motion.div>
        </motion.div>

        {/* Integration diagram */}
        <motion.div {...revealProps} variants={stagger(0.06)} className="mt-28 grid grid-cols-12 gap-6 md:gap-10 items-center">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <div className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--mute)]">Integration · 04</div>
            <h3 className="mt-4 text-[clamp(26px,3vw,40px)] font-medium tracking-tight leading-[1.1] text-[var(--ink)]">
              Pipelines that keep two systems honest.
            </h3>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--ink-2)] max-w-[42ch]">
              Scheduled Node/TypeScript jobs sync products, inventory and orders between the back-office system and the storefront.
              Without them, the catalogue drifts and stock numbers lie.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7">
            <IntegrationDiagram />
          </motion.div>
        </motion.div>

        <ShippedList />
      </div>
    </section>
  );
}
