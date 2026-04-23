'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ease, revealProps, fadeUp, stagger } from '../lib/motion';

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 border-t border-[var(--hair)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div {...revealProps} variants={stagger(0.05)}>
          <motion.div variants={fadeUp} className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">
            Get in touch
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-6 text-[clamp(48px,8vw,120px)] font-medium tracking-tight leading-[0.94] text-[var(--ink)]">
            Let&apos;s build<br />
            <span className="text-[var(--ink-2)]">something well-made</span><span className="text-[var(--accent)]">.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-12 gap-4">
            {[
              ['Email',       'ihor@holigram.nl',            'mailto:ihor@holigram.nl'],
              ['Phone · NL',  '+31 6 18 92 89 58',            'tel:+31618928958'],
              ['Phone · UA',  '+380 96 965 30 50',            'tel:+380969653050'],
              ['LinkedIn',    'in/ihor-pysak',                'https://linkedin.com/in/ihor-pysak'],
            ].map(([k, v, href], i) => (
              <motion.a
                key={k}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                className="col-span-6 md:col-span-3 group rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)]/40 p-5 hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--mute)]">{k}</div>
                <div className="mt-3 text-[15px] text-[var(--ink)] break-all">{v}</div>
                <div className="mt-4 text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors">→</div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
