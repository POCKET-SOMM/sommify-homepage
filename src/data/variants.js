export const inViewProps = {
  initial: 'offscreen',
  whileInView: 'onscreen',
  viewport: { once: true, amount: 0.8 },
};

export const inViewVariants = {
  offscreen: {
    opacity: 0,
    y: '10vh',
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      //   delay: 0.3,
      type: 'tween',
    },
  },
};

export const inViewVariantsX = {
  offscreen: {
    opacity: 0,
    x: '-10vh',
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      //   delay: 0.3,
      type: 'tween',
    },
  },
};

export const inView = ({ direction = 'x', i = 0 }) => ({
  offscreen: { [direction]: '10vh', opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.05,
      type: 'tween',
    },
  },
});
