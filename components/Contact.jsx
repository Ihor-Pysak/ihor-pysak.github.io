'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../lib/motion';
import SectionTitle from './ui/SectionTitle';

function ContactCell({ label, value, href, copyValue, idx }) {
  const [copied, setCopied] = useState(false);

  const onCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(copyValue || value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: idx * 0.04 }}
      className="col-span-6 md:col-span-3 group relative rounded-[var(--r-lg)] border border-[var(--hair-2)] bg-[var(--bg-2)]/40 p-5 hover:border-[var(--accent)]/50 transition-colors"
    >
      <div className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--mute)] flex items-center justify-between">
        <span>{label}</span>
        <AnimatePresence mode="wait">
          {!copied ? (
            <motion.button
              key="k"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCopy}
              aria-label={`Copy ${label}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded border border-[var(--hair-2)] text-[9px] text-[var(--mute)] hover:text-[var(--accent)] hover:border-[var(--accent)]"
            >
              ⌘C
            </motion.button>
          ) : (
            <motion.span
              key="ok"
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 4, opacity: 0 }}
              className="px-1.5 py-0.5 rounded border border-[var(--accent)] text-[9px] text-[var(--accent)]"
            >
              ✓ copied
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="mt-3 block text-[15px] break-all hover:text-[var(--accent)] transition-colors"
      >
        {value}
      </a>
      <div className="mt-4 text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors">→</div>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 border-t border-[var(--hair)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">Get in touch</div>
        <SectionTitle className="mt-6 text-[clamp(48px,8vw,120px)] font-medium tracking-tight leading-[0.94]">
          Let&apos;s build<br />
          <span className="text-[var(--ink-2)]">something well-made</span>
          <span className="acc-pulse inline-block text-[var(--accent)]">.</span>
        </SectionTitle>
        <div className="mt-6 md:mt-7 mono text-[12px] tracking-[0.14em] uppercase text-[var(--mute)]">
          Reply within 24 hours · Based in Groningen · Open to freelance alongside current role
        </div>
        <div className="mt-7 grid grid-cols-12 gap-4">
          <ContactCell label="Email" value="ihor@holigram.nl" href="mailto:ihor@holigram.nl" copyValue="ihor@holigram.nl" idx={0} />
          <ContactCell label="Phone · NL" value="+31 6 18 92 89 58" href="tel:+31618928958" copyValue="+31618928958" idx={1} />
          <ContactCell label="Phone · UA" value="+380 96 965 30 50" href="tel:+380969653050" copyValue="+380969653050" idx={2} />
          <ContactCell label="LinkedIn" value="in/ihor-pysak" href="https://linkedin.com/in/ihor-pysak" copyValue="https://linkedin.com/in/ihor-pysak" idx={3} />
        </div>
      </div>
    </section>
  );
}
