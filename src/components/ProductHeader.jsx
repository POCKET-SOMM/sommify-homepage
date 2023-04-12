import useWindowDimensions from '../hooks';
import { motion } from 'framer-motion';
import { inViewProps, inViewVariants } from '../data/variants';

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
      <h4 className='text-primary font-weight-600 mb-2'>Product</h4>
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
