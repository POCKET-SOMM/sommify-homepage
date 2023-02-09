export const inViewProps = {
  initial: 'offscreen',
  whileInView: 'onscreen',
  viewport: { once: true, amount: 0.8 },
};

export const inViewVariants = {
  offscreen: {
    opacity: 0,
    y: '5vh',
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.5,
      },
      type: 'tween',
    },
  },
};

export const inViewVariantsX = {
  offscreen: {
    opacity: 0,
    x: '-5vh',
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        duration: 0.2,
      },
      x: {
        duration: 0.5,
      },
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
      delay: 0.2 + i * 0.05,
      type: 'tween',
    },
  },
});
