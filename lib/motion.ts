/** Clarity-style motion presets — slow, editorial, no bounce */

export const clarityEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: clarityEase },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: clarityEase },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

/** Child variant name for staggerContainer */
export const staggerChild = fadeUp;

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};
