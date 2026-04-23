// Shared Framer Motion variants & easings.
// Import in components: `import { fadeUp, stagger, spring, ease } from '../lib/motion'`

export const ease = [0.22, 1, 0.36, 1]; // quintic-out, crafted feel
export const easeSoft = [0.4, 0, 0.2, 1];
export const spring = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 };

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease } },
};

export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const revealProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '0px 0px -10% 0px' },
};
