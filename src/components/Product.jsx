import Section from './Section';
import ProductHeader from './ProductHeader';
import WidgetExample from '../assets/WidgetExample.svg';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { inViewProps, inViewVariants } from '../data/variants';

export default function Product({ className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 200]);

  const isMobile = window.innerWidth <= 760;

  return (
    <Section
      id='product'
      className={'text-start position-relative ' + className}
    >
      <div style={{ display: 'flex' }}>
        <ProductHeader
          style={{
            marginRight: 'auto',
            marginBottom: 50,
            maxWidth: 800,
          }}
          title='Interactive Sommelier'
        >
          <p>
            A window that can be embedded into an app or website to guide
            customers in making the right wine purchase. Customers can ask
            questions to find the right wine to pair with a meal or for a
            particular occasion. The suggested wines are from the retailer's
            portfolio, so in addition to its accessibility, the AI sommelier is
            the perfect sales driver.
          </p>
        </ProductHeader>
      </div>
      <motion.div {...inViewProps} variants={inViewVariants}>
        <img src={WidgetExample} style={{ height: isMobile ? 500 : '' }} />
      </motion.div>

      {/* <div className='position-relative' style={{paddingLeft: 550, paddingTop:100}}>
        <img src={WineStoreWF} />
        <motion.img
          style={{ y, position: 'absolute', top: 60, left: 0 }}
          src={WidgetWF}
        />
      </div> */}
    </Section>
  );
}
