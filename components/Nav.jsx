'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ease } from '../lib/motion';

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ['rgba(10,10,12,0)', 'rgba(10,10,12,0.72)']);
  const border = useTransform(scrollY, [0, 80], ['rgba(30,30,36,0)', 'rgba(30,30,36,1)']);

  return (
    <motion.header
      style={{ background: bg, borderBottom: '1px solid', borderBottomColor: border, backdropFilter: 'blur(12px)' }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <motion.a
          href="#top"
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex items-center gap-2 text-[13px] tracking-tight"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_2px_rgba(139,123,255,0.7)]" />
          <span className="font-medium">Ihor Pysak</span>
          <span className="text-[var(--mute)] hidden sm:inline">— Solution Architect</span>
        </motion.a>

        <motion.ul
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
          className="hidden md:flex items-center gap-7 text-[13px] text-[var(--ink-2)]"
        >
          {[
            ['Work', '#case'],
            ['Products', '#ralice'],
            ['Experience', '#experience'],
            ['Skills', '#skills'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <motion.li
              key={href}
              variants={{ hidden: { opacity: 0, y: -4 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
            >
              <a href={href} className="hover:text-[var(--ink)] transition-colors">{label}</a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          href="mailto:ihor@holigram.nl"
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          whileHover={{ y: -1 }}
          className="group inline-flex items-center gap-2 text-[13px] rounded-full border border-[var(--hair-2)] bg-[var(--bg-3)]/60 pl-3.5 pr-2 py-1.5 hover:border-[var(--accent)]/50 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
          Available
          <span className="ml-1 text-[var(--mute)] group-hover:text-[var(--ink)]">→</span>
        </motion.a>
      </nav>
    </motion.header>
  );
}
