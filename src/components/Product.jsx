import Section from './Section';
import ProductHeader from './ProductHeader';
import WidgetExample from '../assets/WidgetExample.svg';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { inViewProps, inViewVariants } from '../data/variants';
import VideoExample from '../assets/videos/example.mp4';
import VideoExampleMobile from '../assets/videos/example_mobile.mp4';
import Iphone from '../assets/iphone14.png';

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
      {/* <motion.div {...inViewProps} variants={inViewVariants}>
        <img src={WidgetExample} style={{ height: isMobile ? 500 : '' }} />
      </motion.div> */}

      <video
        width={isMobile ? '100%' : '1150'}
        autoPlay={true}
        muted
        loop
        style={{
          borderRadius: 20,
          boxShadow: isMobile ? 'none' : '0px 0px 20px #00000025',
          maxWidth: isMobile ? 470 : 1150,
          float: isMobile ? '' : 'right',
          marginBottom: isMobile ? '' : 200,
        }}
      >
        <source
          src={isMobile ? VideoExampleMobile : VideoExample}
          type='video/mp4'
        />
      </video>

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
