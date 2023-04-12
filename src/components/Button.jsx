import { useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import colors from '../data/colors';
import { motion } from 'framer-motion';

export default function Button({
  children,
  animate = {},
  style,
  className,
  border,
  borderless,
  ...props
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      {...props}
      initial={false}
      className={'clickable position-relative font-weight-600 d-inline ' + className}
      animate={{
        border: borderless ? 'none' : `2px solid #000000`,
        color: border ? '#000000' : '#ffffff',
        background: border ? 'none' : '#000000',
        ...animate,
      }}
      style={{
        paddingBlock: '.7em',
        paddingInline: '2.4em',
        borderRadius: 10,
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {hover && (
        <CgChevronRight
          size='1.5em'
          style={{ position: 'absolute', right: 13 }}
        />
      )}
    </motion.div>
  );
}
