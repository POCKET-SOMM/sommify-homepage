import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import colors from '../../data/colors';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import WineContent from './WineContent';

export default function WinePlate({ wine, disabled, height }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 'auto',
        borderColor: hovered ? 'rgb(220,220,220)' : 'rgb(256,256,256)',
      }}
      transition={{
        height: {
          ease: 'easeInOut',
          duration: 0.3,
        },
        opacity: { ease: 'easeInOut', delay: 0.05, duration: 0.25 },
      }}
      exit={{ height: 0, opacity: 0 }}
      className='overflow-hidden position-relative w-100 rounded clickable'
      style={{
        border: '1px solid',
        fontSize: '1.1em',
        overflow: 'hidden',
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        window.open(wine.url, '_blank');
      }}
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? 'rgb(220,220,220)' : 'rgb(245,245,245)',
          color: 'rgb(50,50,50)',
        }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='px-2'
        style={{
          fontWeight: 600,
          fontSize: '0.8em',
          borderRadius: '3px 0px 0px 0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: '0px',
          right: '0px',
        }}
      >
        <div>
          <span style={{ display: 'block' }}>€{wine['price'].toFixed(2)}</span>
        </div>
      </motion.div>
      <div
        id='wine-basics'
        style={{
          // height,
          padding: '6px',
          display: 'flex',
        }}
      >
        <WineContent hovered={hovered} wine={wine} />
        <div style={{ flex: 1 }}></div>
      </div>
    </motion.div>
  );
}
