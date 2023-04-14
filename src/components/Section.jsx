import { motion } from 'framer-motion';
import { inViewProps } from '../data/variants';
import useWindowDimensions from '../hooks';

export default function Section({ children, style, className, ...props }) {
  const { width, height } = useWindowDimensions();

  const paddingTop = width <= 760 ? '17vh' : '13vh';
  const paddingBottom = width <= 760 ? '5vh' : '7vh';

  return (
    <motion.div
      {...props}
      {...inViewProps}
      className='w-100 position-relative section'
    >
      {/* <img
        className='position-absolute'
        src={pattern}
        style={{ top: 0, right: 0, height: '100%' }}
        // style={{ postition: 'absolute', background: `url(${pattern})` }}
      /> */}
      <div
        style={{
          paddingTop,
          paddingBottom,
          paddingInline: 24,
          maxWidth: 1200,
          // minHeight: width > 760 ? `calc(100vh)` : '',
          margin: 'auto',
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
    </motion.div>
  );
}
