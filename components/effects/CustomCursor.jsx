'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/utils';

export default function CustomCursor() {
  const [hoverKind, setHoverKind] = useState('default'); // default | link | grab
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (coarse) return;

    document.documentElement.classList.add('custom-cursor');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      if (!t || !t.closest) {
        setHoverKind('default');
        return;
      }
      if (t.closest('[data-cursor="grab"]')) setHoverKind('grab');
      else if (t.closest('a, button, [data-cursor="link"]')) setHoverKind('link');
      else setHoverKind('default');
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  const size = hoverKind === 'link' ? 36 : hoverKind === 'grab' ? 28 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[200] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ width: size, height: size, x: -size / 2, y: -size / 2 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="rounded-full border border-[var(--accent)] bg-[var(--accent)]/15"
      />
    </motion.div>
  );
}
