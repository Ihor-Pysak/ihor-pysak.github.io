'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { ease } from '../../lib/motion';

function Counter({ to, suffix = '', prefix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease });
    const unsub = mv.on('change', (v) => setVal(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to]);
  const display = Number.isInteger(to) ? Math.round(val) : val.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const items = [
  { k: 'Surfaces owned end-to-end', v: 11, suffix: '' },
  { k: 'Languages delivered (NL / EN)', v: 2, suffix: '' },
  { k: 'Integration jobs running', v: 6, suffix: '+' },
  { k: 'Years of full-stack practice', v: 5, suffix: '' },
];

export default function StatCounters() {
  return (
    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 rounded-[var(--r-lg)] border border-[var(--hair)] bg-[var(--bg-2)]/40 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={it.k}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, ease, delay: i * 0.05 }}
          className={`p-6 md:p-7 ${i % 2 === 0 ? 'border-r border-[var(--hair)]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[var(--hair)]' : ''} ${i === 3 ? '' : 'md:border-r md:border-[var(--hair)]'}`}
        >
          <div className="text-[clamp(32px,3.4vw,48px)] font-medium tracking-tight leading-none text-[var(--ink)]">
            <Counter to={it.v} suffix={it.suffix} />
          </div>
          <div className="mt-3 mono text-[11px] tracking-[0.1em] uppercase text-[var(--mute)]">{it.k}</div>
        </motion.div>
      ))}
    </div>
  );
}
