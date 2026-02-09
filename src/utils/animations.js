/* ============================================================
   HEAVY HELVETICA — Framer Motion Variants & Presets
   Curtain reveals, spring physics, staggered entrances.
   ============================================================ */

/**
 * Page-level clipPath curtain reveal.
 * Enter: inset wipes from bottom to top (content revealed).
 * Exit: inset wipes from top to bottom (content concealed).
 */
export const pageVariants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  animate: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
};

/**
 * Transition config for page-level animations.
 * Uses the brand's custom spring-like cubic-bezier.
 */
export const pageTransition = {
  duration: 0.6,
  ease: [0.34, 1.56, 0.64, 1],
};

/**
 * Reusable spring config for physical interactions.
 * Snappy but not jarring — 300 stiffness, 30 damping.
 */
export const springPreset = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/**
 * Fade-up variant for element entrances.
 * Elements translate from 24px below and fade in.
 */
export const fadeUp = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 1, 1],
    },
  },
};

/**
 * Stagger container variant.
 * Children animate in sequence with 80ms gaps.
 */
export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Fade-in variant (no y offset). Subtle opacity entrance.
 */
export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.0, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Scale-in variant for product images / cards.
 */
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

/**
 * Slide-in from left variant.
 */
export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};
