'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';

export default function IntegrationDiagram() {
  const labels = ['products', 'inventory', 'orders'];
  return (
    <div className="relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)] p-8 md:p-10 overflow-hidden">
      <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label="Integration pipeline diagram">
        <defs>
          <linearGradient id="pipeA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pipeB" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Box A */}
        <g>
          <rect x="20" y="50" width="180" height="120" rx="10" fill="var(--bg-3)" stroke="var(--hair-2)" />
          <text
            x="110"
            y="90"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="Geist, sans-serif"
            fontSize="14"
            fontWeight="500"
          >
            Back-office
          </text>
          <text
            x="110"
            y="110"
            textAnchor="middle"
            fill="var(--mute)"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            letterSpacing="1.4"
          >
            SOURCE OF TRUTH
          </text>
          <circle cx="110" cy="140" r="4" fill="var(--good)" />
          <text x="122" y="144" fill="var(--ink-2)" fontFamily="Geist Mono, monospace" fontSize="10">
            live
          </text>
        </g>

        {/* Box B */}
        <g>
          <rect x="400" y="50" width="180" height="120" rx="10" fill="var(--bg-3)" stroke="var(--hair-2)" />
          <text
            x="490"
            y="90"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="Geist, sans-serif"
            fontSize="14"
            fontWeight="500"
          >
            Storefront
          </text>
          <text
            x="490"
            y="110"
            textAnchor="middle"
            fill="var(--mute)"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            letterSpacing="1.4"
          >
            SHOPIFY · B2B
          </text>
          <circle cx="490" cy="140" r="4" fill="var(--good)" />
          <text x="502" y="144" fill="var(--ink-2)" fontFamily="Geist Mono, monospace" fontSize="10">
            live
          </text>
        </g>

        {/* Pipes */}
        <line x1="200" y1="90" x2="400" y2="90" stroke="var(--hair-2)" strokeWidth="1" />
        <line x1="200" y1="130" x2="400" y2="130" stroke="var(--hair-2)" strokeWidth="1" />

        {/* Animated dots on A → B */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ab-${i}`}
            r="3"
            fill="var(--accent)"
            cx={200}
            cy={90}
            animate={{ cx: [200, 400] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: i * 0.7 }}
          />
        ))}
        {/* Animated dots on B → A */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`ba-${i}`}
            r="3"
            fill="var(--accent)"
            cx={400}
            cy={130}
            animate={{ cx: [400, 200] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: 1 + i * 1.1 }}
          />
        ))}

        {/* Labels */}
        <text
          x="300"
          y="80"
          textAnchor="middle"
          fill="var(--ink-2)"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          letterSpacing="1.2"
        >
          products · inventory →
        </text>
        <text
          x="300"
          y="150"
          textAnchor="middle"
          fill="var(--ink-2)"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          letterSpacing="1.2"
        >
          ← orders · state
        </text>

        {/* Scheduler pill */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <rect x="245" y="180" width="110" height="26" rx="13" fill="var(--bg-2)" stroke="var(--hair-2)" />
          <text
            x="300"
            y="197"
            textAnchor="middle"
            fill="var(--accent)"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            letterSpacing="1.4"
          >
            cron · webhooks
          </text>
        </motion.g>
      </svg>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {labels.map((l) => (
          <span
            key={l}
            className="mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--hair-2)] text-[var(--ink-2)]"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
