import colors from '../data/colors';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';

export default function ExtendingButton({
  children,
  bg = colors.blue,
  ...props
}) {
  const DIM = 60;
  const [hover, setHover] = useState(false);
  return (
    <div
      className='clickable'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <motion.div
        key='button-text'
        className='d-flex justify-content-center align-items-center position-relative'
        animate={{
          color: hover ? 'rgb(256,256,256)' : 'rgb(0,0,0)',
        }}
        style={{ marginLeft: DIM + 10, left: 0, height: DIM }}
      >
        <motion.div
          className='shaded position-absolute d-flex justify-content-center align-items-center'
          animate={{ width: hover ? `calc(${DIM}px + 100%)` : DIM }}
          transition={{ type: 'tween', duration: 0.15 }}
          initial={{ width: DIM }}
          style={{
            left: -DIM - 10,
            height: DIM,
            background: bg,
            borderRadius: DIM / 2,
            zIndex: 1,
          }}
        >
          <CgChevronRight
            style={{ position: 'absolute', left: 9 }}
            className='text-white'
            size={DIM * 0.6}
          />
        </motion.div>
        <span style={{ zIndex: 2, paddingRight: '40px' }}>{children}</span>
      </motion.div>
    </div>
  );
}
