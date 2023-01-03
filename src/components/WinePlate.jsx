import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import colors from '../data/colors';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import WineContent from './WineContent';

export default function WinePlate({ wine, disabled, height }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        borderColor: hovered ? colors.primaryRgb : 'rgb(245,245,245)',
      }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      exit={{ height: 0, opacity: 0 }}
      className='overflow-hidden position-relative py-2 mb-1 w-100 rounded'
      style={{ border: '1px solid' }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? colors.primaryRgb : 'rgb(245,245,245)',
          color: hovered ? 'rgb(256,256,256)' : 'rgb(50,50,50)',
        }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='px-2 py-1'
        style={{
          fontWeight: 600,
          fontSize: '0.9em',
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
          <span style={{ display: 'block' }}>€{wine['price']}</span>
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
