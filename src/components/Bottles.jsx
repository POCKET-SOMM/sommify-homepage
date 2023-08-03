import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { inViewProps, inViewVariants } from '../data/variants';
import WineBottles from '../assets/background/bottles.webp';

export default function Bottles() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <motion.div
      {...inViewProps}
      variants={inViewVariants}
      style={{ flex: 1 }}
      className='position-relative'
    >
      <motion.img
        // initial={{ y: 0 }}
        // animate={{ y: scrollY }}
        // transition={{ type: 'spring', damping: 20 }}
        src={WineBottles}
        style={{
          objectFit: 'contain',
          height: 500,
          position: 'absolute',
          y,
          top: -100,
          left: -100,
        }}
      />
    </motion.div>
  );
}
