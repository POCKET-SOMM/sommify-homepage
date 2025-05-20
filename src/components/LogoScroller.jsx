import React from 'react';
import { motion } from 'framer-motion';

const ELEMENT_WIDTH = 200;
const ELEMENT_HEIGHT = 100;
const ELEMENT_MARGIN = 8;

export default function LogoScroller({ elements = [] }) {
  console.log('elements', elements);

  return (
    <div className='scroller'>
      <div className='scroller-inner'>
        {[...Array(2)].map((_, i) => (
          <div key={i} className='scroller-track'>
            {elements.map((element, index) => (
              <motion.div
                key={index + '_element_' + i}
                initial={false}
                animate={{
                  filter: 'grayscale(1)',
                  opacity: 0.3,
                }}
                whileHover={{ filter: 'grayscale(0)', opacity: 1 }}
                transition={{
                  duration: 0.5,
                }}
                style={{
                  width: ELEMENT_WIDTH,
                  height: ELEMENT_HEIGHT,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: element.href ? 'pointer' : 'default',
                }}
              >
                <a href={element.href} target='_blank'>
                  <img
                    src={element.src}
                    alt={element.alt}
                    height={element.height}
                    style={{
                      height: element.height,
                      marginBottom: element.marginBottom
                        ? element.marginBottom
                        : 0,
                    }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
