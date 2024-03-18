import React from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, left, callToAction }) {
  const [hover, setHover] = React.useState(false);

  const primaryColor = '#d11174';

  return (
    <motion.div
      className='button-container'
      style={{
        position: 'relative',
        width: callToAction ? 160 : 150,
        height: callToAction ? 36 : 32,
      }}
    >
      {callToAction && (
        <motion.div
          animate={{
            width: '60%',
            left: hover ? '40%' : '50%',
          }}
          transition={{
            type: 'tween',
            duration: 0.3,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            margin: 'auto',
            //   width: '100%',
            height: '20%',
            background: primaryColor,
            borderRadius: 999,
            zIndex: 0,
            opacity: 0.5,
            filter: 'blur(12px)',
          }}
        />
      )}
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        animate={{
          background: callToAction
            ? `linear-gradient(90deg, #D6D7D9 50%, ${primaryColor} 100%)`
            : '#D6D7D9',
          color: '#000000a0',
          //   boxShadow: '0px 0px 0px 0px ' + primaryColor,
        }}
        whileHover={{
          background: callToAction
            ? `linear-gradient(90deg, #D6D7D9 0%, ${primaryColor} 0%)`
            : '#D6D7D9',
          color: primaryColor,
          //   boxShadow: '0px 0px 20px -7px ' + primaryColor,
        }}
        transition={{
          color: { delay: 0.1 },
          //   boxShadow: { delay: 0.2 },
          duration: 0.33,
        }}
        style={{
          borderRadius: 999,
          display: 'inline-block',
          padding: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <button
          className='call-to-action'
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 1,
            left: 1,
            width: 'calc(100%)',
            height: 'calc(100%)',
            // padding: '10px 20px',
            border: 'none',
            // outline: '6px solid #ffffff70',
            borderRadius: 999,
            cursor: 'pointer !important',
            fontSize: callToAction ? 15 : 14,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'inherit',
          }}
          onClick={onClick}
        >
          {left && (
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HiArrowLeft
                style={{ marginRight: 15, color: primaryColor }}
                size='1.25em'
              />
            </motion.div>
          )}
          {children}{' '}
          {!left && (
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HiArrowRight
                style={{ marginLeft: 15, color: primaryColor }}
                size='1.25em'
              />
            </motion.div>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
