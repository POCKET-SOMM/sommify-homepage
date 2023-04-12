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
    <Section className={'text-start position-relative ' + className}>
      <div style={{ display: 'flex' }}>
        <ProductHeader
          style={{
            marginRight: 'auto',
            marginBottom: 50,
            maxWidth: 800,
          }}
          title='Interactive Sommelier'
        >
          <span>
            The consumer is able to type in what they are eating, either using
            ingredients or typing in the recipe name. Using the tags or recipe
            the SOMM gives a number of wines that pair well with the meal. By
            clicking the wines it redirects the consumer to the URL where they
            are able to purchase the wine.
          </span>
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
