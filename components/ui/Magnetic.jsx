'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/utils';

export default function Magnetic({
  children,
  strength = 0.18,
  maxX = 4,
  maxY = 4,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.3 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.3 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const clamp = (v, m) => Math.max(-m, Math.min(m, v));
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 0.9 + 40;
      if (dist < radius) {
        x.set(clamp(dx * strength, maxX));
        y.set(clamp(dy * strength, maxY));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, maxX, maxY, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
