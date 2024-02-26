import React, { useEffect, useState } from 'react';
import './App.scss';
import colors from './data/colors';
import { CustomView } from 'react-device-detect';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  SiCrunchbase,
  SiInstagram,
  SiLinkedin,
  SiOpenai,
} from 'react-icons/si';
import useWindowDimensions from './hooks';
import { Icon, Logo } from './assets';
import ContactUs from './components/ContactUs';
import Button from './components/Button';
import { inViewVariants, inViewVariantsX } from './data/variants';
import JumpCard from './components/JumpCard';
import Section from './components/Section';
import partners from './data/partners';
import Navigation from './components/Navigation';
import Pricing from './components/Pricing';
import Product from './components/Product';
import Integrate from './components/Integrate';
import WidgetShowcase from './components/WidgetShowcase';
import { ChatWidget } from 'react-sommify-widget';
import { CgClose, CgLink } from 'react-icons/cg';
import Partners from './components/Partners';
import AisleVisual from './components/AisleVisual';
import Library from './assets/illustrations/library.svg';
import CodePane from './components/CodePane';
import UseCases from './components/UseCases';
import APIShowcase from './components/APIShowcase';
import { BsExclamationLg } from 'react-icons/bs';

import Dots from './assets/background/dots.svg';
import { FiChrome } from 'react-icons/fi';
import { ImChrome } from 'react-icons/im';
import ChromeScreen from './assets/chrome1.png';
import RecipeWebsite from './assets/RecipeWebsite.png';

const TitleHeading = ({ ...props }) => {
  const { width } = useWindowDimensions();

  const fontSize = width > 1025 ? 72 : width > 760 ? 62 : 48;
  const isMobile = width <= 760;
  const isTablet = width <= 1200;

  return (
    <motion.div
      {...props}
      variants={inViewVariantsX}
      style={{ flex: 1 }}
      className={`d-flex position-relative align-items-center ${
        isTablet ? 'justify-content-center text-center' : ''
      }`}
    >
      <div style={{ paddingTop: 12 }}>
        <h4
          className='mb-5'
          style={{
            color: colors.black,
            fontSize,
          }}
        >
          Making&nbsp;<span style={{ color: colors.primary }}>wine</span>
          <br />
          easy.
        </h4>
        <h6
          className='font-weight-500 mb-4'
          style={{
            fontSize: '1.4em',
            color: '#4b5563',
            // letterSpacing: '.025em',
          }}
        >
          Grow your wine sales using the AI sommelier.
        </h6>
        <h6
          className='font-weight-400 mb-0'
          style={{
            fontSize: '1.2em',
            color: '#4b5563',
            opacity: 0.45,
            maxWidth: 500,
          }}
        >
          Built on the wine knowledge of Julie Dupouy, a world-class sommelier
          with 20+ years of experience.
        </h6>
        <div
          className={`d-flex pt-5 ${
            isTablet ? 'justify-content-center' : 'justify-content-start'
          } align-items-center ${isMobile && 'flex-column'}`}
        >
          <Button
            style={{
              width: isMobile ? 160 : 180,
              marginRight: isMobile ? 0 : 15,
              marginBottom: isMobile ? 10 : 0,
            }}
            onClick={() => {
              // window.open('https://portal.sommify.ai', '_blank');
              window.Widget.open();
            }}
          >
            Try demo
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
        {/* <div
          style={{
            width: '100%',
            marginTop: 25,
            display: 'flex',
          }}
        >
          <Button border borderless>
            <FiChrome size={20} /> Try our chrome extension!
          </Button>
        </div> */}
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const { width } = useWindowDimensions();

  return (
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
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {width > 800 && <img src={Logo.MFS} style={{ height: 80 }} />}
          </div>
          <div className='d-flex flex-column mx-4'>
            <h6>Products</h6>
            <span className='d-block'>
              <span
                className='clickable'
                onClick={() => {
                  window.open(
                    'https://chat.openai.com/g/g-auTVns5NJ-elizabeth-master-sommelier',
                    '_blank'
                  );
                }}
              >
                Elizabeth (GPTs demo)
              </span>
            </span>
            <span className='d-block'>
              <span
                className='clickable'
                onClick={() => {
                  window.open(
                    'https://chromewebstore.google.com/detail/sommify-find-the-perfect/omffejpmkjeibjphgccejljppddmplha',
                    '_blank'
                  );
                }}
              >
                WinePair (Chrome extension)
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
            <span className='d-block'>
              <SiInstagram />{' '}
              <span
                className='clickable'
                onClick={() => {
                  window.open('https://www.instagram.com/sommify.ai/');
                }}
              >
                Instagram
              </span>
            </span>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div
          style={{ fontSize: '.9em' }}
          className='w-100 py-4 d-flex justify-content-center'
        >
          <b>PocketSomm Oy 2021-{new Date().getFullYear()}</b>&nbsp;•&nbsp;
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
};

function App() {
  const { width, height } = useWindowDimensions();
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [widgetVisible, setWidgetVisible] = useState(true);

  // track scroll position
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest === 0 || latest <= 0.9 * height) {
        {
          setWidgetVisible(true);
          setWidgetOpen(false);
        }
      } else setWidgetVisible(false);
    });
  }, []);

  const paddingTop = height >= 760 ? 240 : 180;

  return (
    <div
      style={{
        overflowX: 'hidden',
        width: '100vw',
        position: 'relative',
        // background: '#fff',
      }}
    >
      <CustomView id='mobile-view' condition={width < 760}>
        <div
          className='w-100 d-flex justify-content-center align-items-center'
          style={{
            height: 60,
            // position: 'fixed',
            // top: 0,
            // left: 0,
            zIndex: 999,
            background: 'white',
            // boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <img src={Logo.FullMaroon} style={{ height: 26, marginTop: 4 }} />
        </div>
        {/* <Navigation /> */}
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
          </Section>

          <div style={{ background: '#f5f6f8', marginTop: '20vh' }}>
            <Section style={{ paddingBottom: '12vh' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <h6
                    style={{
                      color: colors.primary,
                    }}
                  >
                    B2C PRODUCT
                  </h6>
                  <h2>sommifyAI for Chrome</h2>
                  <p>
                    Get the sommify extension for any Chrome browser and get
                    wine recommendations on any recipe page.
                  </p>
                  <br />
                  <br />
                  <div className='d-flex justify-content-center'>
                    <Button
                      onClick={() => {
                        window.open(
                          'https://chromewebstore.google.com/detail/sommify-find-the-perfect/omffejpmkjeibjphgccejljppddmplha'
                        );
                      }}
                      style={{ padding: '16px 36px', fontSize: 14 }}
                    >
                      Add to Chrome - it's free!
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <img
                    src={ChromeScreen}
                    style={{
                      width: '95%',
                      margin: 'auto',
                      marginTop: 100,
                      // boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                      // background: 'white',
                    }}
                  />
                </div>
              </div>
            </Section>
          </div>

          <Product className='text-center' />

          <Pricing className='text-center' />

          <ContactUs />
        </div>
        <Footer />
      </CustomView>
      <CustomView id='desktop-view' condition={width >= 760}>
        <div className='position-relative w-100'>
          {/* <AnimatePresence>
            {widgetVisible || (
              <motion.div
                key='chat-bot-button'
                className='clickable'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
                style={{
                  position: 'fixed',
                  bottom: 30,
                  right: 30,
                  height: 50,
                  width: 50,
                  borderRadius: '50%',
                  backgroundColor: colors.primary,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999,
                  color: 'white',
                }}
                whileHover={{ scale: 0.98 }}
                onClick={() => setWidgetOpen(!widgetOpen)}
              >
                {widgetOpen ? (
                  <CgClose size={24} />
                ) : (
                  <img
                    style={{ width: '90%', height: '90%' }}
                    src={Logo.SocialsWhite}
                  />
                )}
              </motion.div>
            )}

            {widgetOpen && !widgetVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                style={{
                  position: 'fixed',
                  bottom: 110,
                  right: 30,
                  zIndex: 9999,
                }}
                key='chat-bot-widget'
                id='chat-bot-widget'
              >
                <ChatWidget key='chat-bot' upwards />
              </motion.div>
            )}
          </AnimatePresence> */}

          <Navigation />

          <Section
            background='linear-gradient(253deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 41%, rgba(248,248,248,1) 100%)'
            className='d-flex align-items-start justify-content-between position-relative'
            id='demo'
            style={{ paddingTop }}
          >
            <TitleHeading />
            {/* {widgetVisible && <WidgetShowcase />} */}
            {width > 1200 && (
              <AisleVisual />
              // <motion.div
              //   style={{
              //     flex: 1,
              //     display: 'flex',
              //     justifyContent: 'end',
              //     alignItems: 'center',
              //     // paddingTop: 12,
              //     height: 500,
              //   }}
              // >
              //   <img src={Illustration} style={{ height: 410 }} />
              // </motion.div>
            )}
          </Section>

          {/* <Partners /> */}
          <Product />
          <Integrate />

          <Section>
            <div className='w-100 d-flex'>
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ flex: 1 }}
              >
                <img src={Library} style={{ width: 450 }} />
              </div>

              <div className='p-4' style={{ flex: 1 }}>
                <span
                  className='mb-2'
                  style={{
                    color: '#a0a5aa',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                  }}
                >
                  Don't need the visuals?
                </span>
                <h1>Get creative with the API</h1>
                <p>
                  The basis of our solution is an API of our AI sommelier that
                  can be used in many many ways and below we highlight a few
                  possible use cases. There are many ways to make wine easy.
                </p>
              </div>
            </div>
            <UseCases />

            {/* <APIShowcase /> */}
          </Section>

          <Pricing />
          <ContactUs />
          {/* 
          <div
            style={{
              background: '#f9fbfd',
              marginTop: '14vh',
              // marginBottom: '14vh',
            }}
          >
            <Section style={{ paddingBottom: '30vh' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <h6
                    style={{
                      color: colors.primary,
                    }}
                  >
                    B2C PRODUCT
                  </h6>
                  <h2>sommifyAI for Chrome</h2>
                  <p>
                    Get the sommify extension for any Chrome browser and get
                    wine recommendations on any recipe page.
                  </p>
                  <br />
                  <br />
                  <Button
                    onClick={() => {
                      window.open(
                        'https://chromewebstore.google.com/detail/sommify-find-the-perfect/omffejpmkjeibjphgccejljppddmplha'
                      );
                    }}
                    style={{ padding: '16px 36px', fontSize: 14 }}
                  >
                    Add to Chrome - it's free!
                  </Button>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <img
                    src={ChromeScreen}
                    style={{
                      width: 620,
                      padding: 10,
                      borderRadius: 20,
                      // boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                      // background: 'white',
                      left: 50,
                      top: -170,
                      position: 'absolute',
                    }}
                  />
                </div>
              </div>
            </Section>
          </div> */}

          <div className='py-5' style={{ background: '#a5a8ab' }}>
            <div
              className='d-flex justify-content-center align-items-center '
              style={{ maxWidth: 1200, margin: 'auto' }}
            >
              {partners.map(({ logo, height, link }, i) => (
                <div key={'partner_' + i} style={{ flex: 1, minWidth: 0 }}>
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
                    src={logo}
                    onClick={() => window.open(link, '_blank')}
                    animate={{
                      filter: 'brightness(0)',
                      // black to white
                    }}
                    whileHover={{
                      filter: 'brightness(1)',
                      scale: 1.02,
                    }}
                    style={{
                      // maxWidth: '60%',
                      // maxHeight: 35,
                      height: `calc(${height} * 0.5)`,
                      // filter: 'brightness(0)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </CustomView>
    </div>
  );
}

export default App;
