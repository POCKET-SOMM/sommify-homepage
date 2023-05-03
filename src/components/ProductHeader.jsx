import useWindowDimensions from '../hooks';
import { motion } from 'framer-motion';
import { inViewProps, inViewVariants } from '../data/variants';
import colors from '../data/colors';

const ProductHeader = ({ title, className, style, children, ...props }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 760;

  return (
    <motion.div
      className={className}
      {...inViewProps}
      variants={inViewVariants}
      style={{ marginTop: 70, ...style }}
    >
      <h6 className='font-weight-500 mb-2' style={{ color: colors.primary }}>
        PRODUCT
      </h6>
      <h1>{title}</h1>
      <p
        className={'py-4 mb-4 w-100 ' + className}
        style={{
          color: '#525359',
          fontSize: '1.1em',
        }}
      >
        {children}
      </p>
    </motion.div>
  );
};

export default ProductHeader;
