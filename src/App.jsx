import React from 'react';
import './App.scss';
import colors from './data/colors';
import { CustomView } from 'react-device-detect';
import { motion } from 'framer-motion';
import { SiCrunchbase, SiLinkedin } from 'react-icons/si';
import useWindowDimensions from './hooks';
import { Icon } from './assets';
import ContactUs from './components/ContactUs';
import Button from './components/Button';
import { inViewVariants, inViewVariantsX } from './data/variants';
import JumpCard from './components/JumpCard';
import { Widget } from 'react-sommify-widget';
import Section from './components/Section';
import partners from './data/partners';
import Navigation from './components/Navigation';
import Pricing from './components/Pricing';
import Product from './components/Product';
import Integrate from './components/Integrate';
import { CircleFlag } from 'react-circle-flags';
import WidgetShowcase from './components/WidgetShowcase';

const TitleHeading = ({ ...props }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 760;
  return (
    <motion.div
      {...props}
      variants={inViewVariantsX}
      className={`d-flex align-items-center ${
        isMobile ? 'justify-content-center' : ''
      }`}
    >
      <div className='pt-1'>
        <h4
          className='mb-5'
          style={{
            color: colors.black,
            fontSize: isMobile ? '3.65em' : '4.5em',
            fontWeight: 700,
          }}
        >
          Making
          <br />
          <span style={{ color: colors.primary }}>wine</span>-food
          <br />
          pairing easy.
        </h4>
        <h6
          className='font-weight-500 mb-4'
          style={{
            fontSize: '1.4em',
            color: '#4b5563',
            // letterSpacing: '.025em',
          }}
        >
          Drive retail wine sales using the AI sommelier
        </h6>
        <h6
          className='font-weight-400 mb-0'
          style={{
            fontSize: '1.1em',
            color: '#4b5563',
            opacity: 0.45,
            maxWidth: 500,
          }}
        >
          Built on the wine knowledge of Julie Dupouy, world-class sommelier
          with 20+ years of experience.
        </h6>
        <div
          className={`d-flex pt-5 justify-space-between align-items-center ${
            isMobile && 'flex-column'
          }`}
        >
          <Button
            style={{
              width: isMobile ? 160 : 180,
              marginRight: isMobile ? 0 : 15,
              marginBottom: isMobile ? 10 : 0,
            }}
            onClick={() => {
              window.open('https://portal.sommify.ai', '_blank');
            }}
          >
            Register
          </Button>
          <Button
            border
            style={{
              width: isMobile ? 160 : 180,
            }}
            onClick={() => {
              const target = document.getElementById('contact');
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <div
    id='footer'
    // className='bg-secondary'
    style={{
      background: '#131921',
      width: '100%',
      color: 'white',
      fontSize: '0.9rem',
    }}
  >
    <div
      className='d-flex flex-column justify-content-center align-items-start'
      style={{ width: '100%', maxWidth: 1200, margin: 'auto' }}
    >
      <div className='d-flex justify-content-center align-items-start w-100 py-5'>
        {/* <div className='d-flex flex-column mx-4'>
          <h6>Company</h6>
          <span className='d-block'>
            <span
              className='clickable'
              onClick={() => {
                window.open(
                  'https://drive.google.com/file/d/1kFP_qyReKTbxi7sNvFlfTNxcD0pVrvPu/view'
                );
              }}
            >
              Deck
            </span>
          </span>
        </div> */}
        <div className='d-flex flex-column mx-4'>
          <h6>Products</h6>
          <span className='d-block'>
            <span
              className='clickable'
              onClick={() => {
                window.open('https://portal.sommify.ai', '_blank');
              }}
            >
              Dashboard
            </span>
          </span>
        </div>
        <div className='d-flex flex-column mx-4'>
          <h6>Socials</h6>
          <span className='d-block'>
            <SiCrunchbase />{' '}
            <span
              className='clickable'
              onClick={() => {
                window.open(
                  'https://www.crunchbase.com/organization/sommifyai'
                );
              }}
            >
              Crunchbase
            </span>
          </span>
          <span className='d-block'>
            <SiLinkedin />{' '}
            <span
              className='clickable'
              onClick={() => {
                window.open('https://www.linkedin.com/company/sommifyai');
              }}
            >
              Linkedin
            </span>
          </span>
        </div>
      </div>
      <div
        style={{ fontSize: '.9em' }}
        className='w-100 py-4 d-flex justify-content-center'
      >
        <b>PocketSomm Oy 2021-2023</b>&nbsp;•&nbsp;
        <span
          onClick={() => {
            window.open(
              'https://drive.google.com/file/d/1ANL8N4lXOqdFQbZ8Mc1J4Q2OTL6LnTBI/view?usp=sharing',
              '_blank'
            );
          }}
          className='clickable'
        >
          Privacy policy
        </span>
        &nbsp;•&nbsp;
        <span
          onClick={() => {
            window.open('https://icons8.com', '_blank');
          }}
          className='clickable'
        >
          Icons8
        </span>
      </div>
    </div>
  </div>
);

const WhatWeDo = () => (
  <>
    <div
      className='d-flex flex-column py-4 pb-5'
      style={{
        marginBottom: 'auto',
        maxWidth: '1920px',
        width: '90%',
        margin: 'auto',
      }}
    >
      <div className='d-flex align-items-start'>
        {[
          {
            title: 'accessible',
            icon: Icon.Accessible,
            text: 'quality pairings made accessible for anyone anywhere',
          },
          {
            title: 'world-class',
            icon: Icon.WorldClass,
            text: 'tailored to make world-class pairings by a world-class sommelier',
          },
          {
            title: 'refreshing',
            icon: Icon.Refreshing,
            text: 'bringing a new approach for the digitally native younger consumer',
          },
        ].map((jcProps, i) => (
          <JumpCard key={'jc_' + i} {...jcProps} />
        ))}
      </div>
    </div>
  </>
);

function App() {
  const { width, height } = useWindowDimensions();

  return (
    <div style={{ overflowX: 'hidden', width: '100vw', position: 'relative' }}>
      <CustomView id='mobile-view' condition={width < 760}>
        <Navigation />
        <div
          className='position-absolute'
          style={{
            width: 1600,
            transform: 'rotate(-45deg)',
            margin: 'auto',
            height: 1600,
            background: '#fbfbfb',
          }}
        />
        <div style={{ overflowX: 'hidden' }}>
          <Section id='widget-screen' className='text-center position-relative'>
            <TitleHeading />
            {/* <div className='d-flex flex-column p-4 mb-4 justify-space-between align-items-center'>
              <Button
                onClick={() => {
                  window.open('https://portal.sommify.ai', '_blank');
                }}
                className='mb-3'
                style={{ width: 150 }}
              >
                Register
              </Button>
              <Button
                onClick={() => {
                  const target = document.getElementById('contact');
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                border
                style={{ width: 150 }}
              >
                Contact Us
              </Button>
            </div> */}
            <div className='pt-5 w-100 d-flex justify-content-center'>
              <WidgetShowcase />
              {/* <motion.div
                style={{ borderRadius: 18, background: '#ffffff' }}
                variants={inViewVariants}
                className='shaded'
              >
                <Widget theme='flat' size='mobile' />
              </motion.div> */}
            </div>
          </Section>
          <Product className='text-center' />

          <Pricing className='text-center' />

          <ContactUs />
        </div>
        <Footer />
      </CustomView>
      <CustomView id='desktop-view' condition={width >= 760}>
        <div className='position-relative w-100'>
          <Navigation />

          <Section
            background='linear-gradient(253deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 41%, rgba(248,248,248,1) 100%)'
            className='d-flex align-items-start justify-content-between position-relative'
            id='demo'
            style={{ paddingTop: '26vh' }}
          >
            <TitleHeading style={{ width: '45vw' }} />
            <WidgetShowcase />
          </Section>

          <Product />
          <Integrate />
          <Pricing />
          <ContactUs />

          <div
            className='d-flex justify-content-center align-items-center py-5'
            style={{ background: '#f0f2f4', paddingInline: '25%' }}
          >
            {partners.map(({ pLogo, height, link }, i) => (
              <div key={'partner_' + i} style={{ flex: 1 }}>
                <motion.img
                  variants={{
                    offscreen: { y: '10vh', opacity: 0 },
                    onscreen: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: 0.3 + i * 0.05,
                        type: 'tween',
                      },
                    },
                  }}
                  className='mx-5 clickable'
                  src={pLogo}
                  onClick={() => window.open(link, '_blank')}
                  animate={{
                    filter: 'brightness(0)',
                  }}
                  whileHover={{
                    filter: 'brightness(1)',
                    scale: 1.02,
                  }}
                  style={{
                    maxWidth: '60%',
                    maxHeight: 35,
                    // height: `calc(${height} * 0.8)`,
                    // filter: 'brightness(0)',
                  }}
                />
              </div>
            ))}
          </div>

          <Footer />
        </div>
      </CustomView>
    </div>
  );
}

export default App;
