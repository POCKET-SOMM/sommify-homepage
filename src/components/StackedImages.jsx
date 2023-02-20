import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function StackedImages({
  style,
  images,
  direction = 'bottom-left',
  xMargin = '30px',
  yMargin = '30px',
  absolute = false,
  ...props
}) {
  const yDirection = direction.endsWith('top') ? -1 : 1;
  const xDirection = direction.startsWith('left') ? -1 : 1;
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div
      {...props}
      ref={ref}
      className={absolute ? 'position-absolute' : 'position-relative'}
      style={{
        borderRadius: '2.5em',
        zIndex: 3,
        background:
          'linear-gradient(90deg, rgba(129,129,228,1) 0%, rgba(242,189,249,1) 100%)',
        ...style,
      }}
    >
      {images?.map((image, i) => (
        <motion.img
          key={String(image) + '_' + i}
          className={
            `w-100 shaded ` +
            (absolute && images.length > 1 ? 'position-absolute' : '')
          }
          src={image}
          style={{ borderRadius: '2.5em', zIndex: 4 + i }}
          animate={controls}
          initial='hidden'
          variants={{
            visible: {
              opacity: 1,
              y: `calc(${yDirection} * ${yMargin} * ${i + 1})`,
              x: `calc(${xDirection} * ${xMargin} * ${i + 1})`,
              transition: { duration: 0.75, delay: 0.3, type: 'tween' },
            },
            hidden: { opacity: 0, y: 0, x: 0 },
          }}
        />
      ))}
    </div>
  );
}
