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
            A window on your site into which your customer is able to type in
            the meal they are going to eat either using the ingredients or the
            recipe title. Using this input the sommelier offers wines to pair
            with the meal right from your wine portfolio. The customer clicks
            the wine they like and get redirected to buy it.
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
