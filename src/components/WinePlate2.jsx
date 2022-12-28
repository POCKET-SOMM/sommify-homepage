import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import colors from '../data/colors';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import WineContent from './WineContent';

export default function WinePlate({ wine, disabled }) {
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
      className='card overflow-hidden position-relative'
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={{
        width: '100%',
        marginBottom: '2px',
      }}
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? colors.primaryRgb : 'rgb(245,245,245)',
          color: hovered ? 'rgb(256,256,256)' : 'rgb(50,50,50)',
        }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        style={{
          fontWeight: 600,
          borderRadius: '0px 3px 0px 5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80px',
          height: '30px',
          position: 'absolute',
          right: '0px',
          top: '0px',
          fontSize: '12px',
        }}
      >
        <div>
          <span style={{ display: 'block' }}>€{wine['price']}</span>
        </div>
      </motion.div>
      <div
        id='wine-basics'
        style={{
          height: '80px',
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
