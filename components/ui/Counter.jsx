'use client';
import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';
import { ease } from '../../lib/motion';

export default function Counter({ to, suffix = '', duration = 1.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease });
    const u = mv.on('change', (v) => setVal(v));
    return () => {
      c.stop();
      u();
    };
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}
