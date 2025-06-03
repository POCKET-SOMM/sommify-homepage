import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactTyped } from 'react-typed';

const words = [
  'scalable',
  'data-driven',
  'increased',
  'expert',
  'easy',
  'automated',
  '10x',
];

export default function WordRoller() {
  const [index, setIndex] = useState(0);

  // Advance the word every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Find the longest word for fixed width
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <h1 className='text-3xl font-semibold flex items-center space-x-2'>
      <span>AI sommelier for </span>
      <ReactTyped
        strings={words}
        typeSpeed={100}
        className='text-slate-400'
        loop={true}
        backDelay={1000}
        backSpeed={50}
      />
      {/* <span className='relative inline-block h-[1em] overflow-hidden'>
        <span className='invisible block'>{longestWord}</span>
        <AnimatePresence mode='wait'>
          <motion.span
            key={index}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5 }}
            className='absolute top-0 left-0 w-full text-slate-400'
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span> */}
      <span> wine sales.</span>
    </h1>
  );
}
