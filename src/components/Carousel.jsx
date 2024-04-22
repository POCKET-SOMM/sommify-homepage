import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Carousel({ elements = [1, 2, 3, 4, 5, 6] }) {
  const TICK_RATE = 7;
  const ELEMENT_WIDTH = 200;
  const ELEMENT_HEIGHT = 100;
  const ELEMENT_MARGIN = 8;

  const initialPositions = elements.map((element, index) => ({
    element,
    key: index + '_element',
    index,
  }));

  const iterate = (elements) => {
    return elements.map((element) => {
      if (element.index === elements.length - 1) {
        return {
          ...element,
          // here we also set a new key based on time
          key: Date.now() + '_element',
          index: 0,
        };
      } else {
        return {
          ...element,
          index: element.index + 1,
        };
      }
    });
  };

  const [positions, setPositions] = useState(initialPositions);

  useEffect(() => {
    const interval = setInterval(() => {
      let newPositions = iterate(positions);
      setPositions(newPositions);
    }, TICK_RATE * 1000);
    return () => clearInterval(interval);
  }, [positions]);

  //   reset positions when window gets resized or reopens (for example if window was alt-tabbed)
  useEffect(() => {
    setPositions(iterate(initialPositions));
  }, [elements]);

  //   reset positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setPositions(iterate(initialPositions));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        position: 'relative',
        height: ELEMENT_HEIGHT + 2 * ELEMENT_MARGIN,
      }}
    >
      {positions.map(({ element, key, index }) => {
        return (
          <motion.div
            // layout
            key={key}
            initial={false}
            animate={{
              left: (index - 1) * (ELEMENT_WIDTH + ELEMENT_MARGIN),
              filter: 'brightness(0)',
              opacity: 0.3,
            }}
            whileHover={{ filter: 'brightness(1)', opacity: 1 }}
            transition={{
              left: {
                duration: TICK_RATE,
                type: 'tween',
                ease: 'linear',
              },
            }}
            style={{
              position: 'absolute',
              flex: '0 0 auto',
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
                  marginBottom: element.marginBottom ? element.marginBottom : 0,
                }}
              />
            </a>
          </motion.div>
        );
      })}

      {['left', 'right'].map((dir) => (
        <div
          style={{
            height: '100%',
            position: 'absolute',
            left: dir === 'left' ? 0 : 'auto',
            right: dir === 'right' ? 0 : 'auto',
            top: 0,
            background: `linear-gradient(to ${dir}, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))`,
            width: 100,
            // no interactivity
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}
