import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function LogoLink({ img }) {
  return (
    <motion.div
      href={img.href}
      onClick={() => {
        window.open(img.href, '_blank');
      }}
      target='_blank'
      style={{
        marginInline: 8,
        maxHeight: 40,
        height: 40,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        border: '1px solid #a0a0a0',
        // background: '#FAF7F2',
        padding: '16px 16px',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        style={{
          width: img.width,
          height: img.height,
          filter: 'brightness(0)',
        }}
      />
      <BsArrowRight style={{ marginLeft: 8 }} size={'2em'} color={'#000000'} />
    </motion.div>
  );
}
