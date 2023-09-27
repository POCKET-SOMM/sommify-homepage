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
            A popup chat box that can be embedded into any website or app to
            make wine choices for your customers easy. Your customers will have
            the option to ask questions to find the right wine. The suggested
            wines are from your portfolio. Also available as an API if you want
            to build your own visuals.
            <br />
            <br />
            <span style={{ color: '#a51c5e', fontWeight: 500 }}>
              Check out the video below to see how it works.
            </span>
          </p>
        </ProductHeader>
      </div>
      {/* <motion.div {...inViewProps} variants={inViewVariants}>
        <img src={WidgetExample} style={{ height: isMobile ? 500 : '' }} />
      </motion.div> */}

      <video
        width={isMobile ? '100%' : '1150'}
        autoPlay={true}
        muted={true}
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
