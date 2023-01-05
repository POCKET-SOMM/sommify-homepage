import React, { Suspense } from 'react';
import './App.scss';
import Team from './components/Team';
import Widget from './components/Widget';
import colors from './data/colors';
import { Button } from 'react-bootstrap';
import {
  isMobile,
  MobileView,
  BrowserView,
  CustomView,
  isBrowser,
} from 'react-device-detect';
import wave from './assets/wave.svg';
import waveTop from './assets/wave_top.svg';
import wall from './assets/wall_bg.jpg';
import kitchen from './assets/background/kitchen.jpg';
// const kitchen = React.lazy(() => import('./assets/background/kitchen.jpg'));

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { SiCrunchbase, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import useWindowDimensions from './hooks';
import logo from './assets/logo/logo_white.svg';
import { rgb } from './assets/helpers';
import LoadableImage from './components/Image';

const MARGIN = '10vh';
const NAV_HEIGHT = '10vh';

export const Logo = ({ ...props }) => (
  <div
    style={{ fontSize: '2.4rem', zIndex: 4 }}
    className='d-flex px-2 font-cursive user-select-none'
  >
    <div className='h-100'>sommify</div>
    <div className='h-100' style={{ color: colors.primary }}>
      .ai
    </div>
  </div>
);

const Section = ({ children, style, className, ...props }) => (
  <div
    {...props}
    style={{
      width: '100%',
      paddingBottom: MARGIN,
      paddingInline: '10vw',
      minHeight: `calc(100vh)`,
      ...style,
    }}
    className={'d-flex justify-content-center align-items-center ' + className}
  >
    {children}
  </div>
);

const NavButton = ({ nav, ...props }) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (
        latest >= nav.scroll - 0.1 * height &&
        latest < nav.scroll + 0.9 * height
      )
        setActive(true);
      else setActive(false);
    });
  }, []);

  return (
    <motion.div
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        color: hovered || active ? rgb(colors.primary) : 'rgb(0,0,0)',
      }}
      className={`font-smooth d-flex justify-content-${
        isBrowser ? 'start' : 'center'
      } align-items-center clickable text-center`}
      onClick={() => window.scrollTo(0, nav.scroll - 0.1 * height, 'smooth')}
      style={{
        // paddingTop: '1em',
        marginLeft: isBrowser ? '4em' : '',
        height: '100%',
        fontWeight: 500,
        letterSpacing: '.2em',
        fontSize: isBrowser ? '.8em' : '.65em',
        color: active ? colors.primary : 'black',
        position: 'relative',
        flex: isBrowser ? '' : 1,
      }}
    >
      {nav.title}
      {active && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 2,
            background: colors.primary,
          }}
          layoutId='underline_nav'
        />
      )}
    </motion.div>
  );
};

const Navigation = ({ ...props }) => {
  const { width, height } = useWindowDimensions();
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 0.8 * height || (width < 760 && window.scrollY > 50)) {
      setHeaderScrolled(true);
    } else {
      setHeaderScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <>
      <CustomView condition={width < 1300}>
        <motion.div
          animate={{
            background: headerScrolled ? 'rgb(256,256,256)' : rgb(colors.beige),
            color: headerScrolled ? 'rgb(0,0,0)' : 'rgb(256,256,256)',
          }}
          className='d-flex flex-column w-100 position-fixed py-2'
          style={{ backgroundColor: colors.beige, zIndex: 9999 }}
        >
          <div className='d-flex justify-content-center'>
            <Logo />
          </div>
        </motion.div>
      </CustomView>
      <CustomView condition={width >= 1300}>
        <div
          className='d-flex justify-content-center align-items-center header text-black'
          transition={{ delay: 0.3 }}
          style={{
            width: '100vw',
            height: NAV_HEIGHT,
            position: 'fixed',
            top: 0,
            zIndex: 2,
          }}
        >
          <AnimatePresence initial={false}>
            {!headerScrolled && (
              <motion.img
                key='top-wave'
                src={waveTop}
                initial={{ opacity: 1, height: 0 }}
                animate={{ opacity: 1, height: '14vh' }}
                exit={{ opacity: 1, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  transform: 'rotate(180deg)',
                  top: '9vh',
                  left: 0,
                  width: '100vw',
                  height: '14vh',
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>

          <motion.div
            key='top-bar'
            style={{
              width: '100vw',
              height: '10vh',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 0,
              background: colors.beige,
            }}
            className='px-4'
          >
            <div
              className='d-flex align-items-center h-100'
              style={{ width: '60%' }}
            >
              <div style={{ color: 'white' }}>
                <Logo />
              </div>
              <AnimatePresence>
                <div className='d-flex flex-grow-1 justify-content-start align-items-center'>
                  {[
                    { title: 'DEMO', scroll: 0 },
                    { title: 'OUR OFFERING', scroll: height },
                    { title: 'WHAT WE DO', scroll: height * 2 },
                    { title: 'TEAM', scroll: height * 3 },
                  ].map((nav) => (
                    <NavButton key={'nav_' + nav.title} nav={nav} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CustomView>
    </>
  );
};

const TitleHeading = ({ ...props }) => (
  <div {...props} className='d-flex justify-content-center align-items-center'>
    <div>
      <h1 style={{textShadow: '.1em .1em .1em #00000025'}}>
        The <span className='text-primary'>AI</span> sommelier.
      </h1>
      <h3 style={{fontWeight: 300, textShadow: '.1em .1em .1em #00000025'}}>Making quality pairings accessible</h3>
    </div>
  </div>
);

const Footer = () => (
  <div
    id='footer'
    className='d-flex justify-content-center align-items-start text-start'
    style={{
      background: '#202020',
      width: '100%',
      height: '50vh',
      color: 'white',
      fontSize: '1.5rem',
    }}
  >
    <div className='flex-grow-1 d-flex h-100 justify-content-center align-items-center'>
      <img src={logo} style={{ width: '8vw', opacity: 0.4 }} />
    </div>
    <div
      className='flex-grow-1 d-flex flex-column h-100 justify-content-center'
      style={{ opacity: 0.4 }}
    >
      <span className='d-block' style={{ fontWeight: 600 }}>
        <SiCrunchbase />{' '}
        <span
          className='clickable'
          onClick={() => {
            window.open('https://www.crunchbase.com/organization/sommifyai');
          }}
        >
          Crunchbase
        </span>
      </span>
      <span className='d-block' style={{ fontWeight: 600 }}>
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
      <span className='d-block' style={{ fontWeight: 600 }}>
        <SiMinutemailer /> jacob@sommify.ai
      </span>
    </div>
  </div>
);

const WhatWeDo = () => (
  <>
    <h1 className='mb-5 font-smooth'>What we do</h1>
    <p style={{ fontSize: '1.5rem', fontWeight: 300}}>
      We are creating an <b style={{fontWeight: 600}}>artificial intelligence sommelier</b> making quality
      pairings accessible. The AI somm is built on the world-class wine
      knowledge of Julie Dupouy and it will be packaged as an API. The API will
      be able to populate meals on apps and websites with the right wines or
      their silhouettes. To find out how we can <b style={{fontWeight: 600}}>sommify</b> your digital wine
      experience, download our deck.
    </p>
    <div className='py-5'>
      <Button
        size='lg'
        variant='primary'
        onClick={() => {
          window.open(
            'https://drive.google.com/file/d/1kFP_qyReKTbxi7sNvFlfTNxcD0pVrvPu/view?usp=sharing'
          );
        }}
        className='px-5 py-4'
        style={{
          letterSpacing: '0.5vw',
          fontWeight: 600,
          color: '#f0f0f0',
        }}
      >
        <span style={{ fontWeight: 300 }}>GO TO</span> DECK
      </Button>
    </div>
  </>
);

function App() {
  const { width, height } = useWindowDimensions();

  return (
    <div className='d-flex flex-column'>
      <CustomView condition={width < 760}>
        <div
          style={{
            background: colors.beige,
          }}
        >
          <Navigation />
          <Section className='position-relative'>
            <TitleHeading />
            <Button
              onClick={() => {
                window.scrollTo(0, height * 0.9);
              }}
              style={{ position: 'absolute', bottom: '10vh' }}
            >
              VIEW DEMO
            </Button>
          </Section>

          <Section id='widget-screen'>
            <div className='d-flex flex-column' style={{ height: '100%' }}>
              <div
                style={{ flex: 1 }}
                className='d-flex justify-content-center align-items-center'
              >
                <Widget />
              </div>
            </div>
          </Section>

          <Section
            className='flex-column text-center position-relative'
            style={{
              background:
                `linear-gradient(${colors.beige}, rgba(0,0,0,0) 25%), url(` +
                wall +
                ')',
              backgroundSize: 'cover',
              paddingTop: '10vh',
            }}
          >
            <WhatWeDo />
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                width: '100%',
                height: '10vh',
                background: `url(${wave})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                backgroundPosition: 'bottom',
              }}
            />
          </Section>
        </div>

        <Section
          style={{
            background: colors.primaryDark,
            color: 'white',
            paddingTop: 0,
            paddingInline: '0',
            borderTop: '5px solid ' + colors.primaryDark,
          }}
        >
          <Team />
        </Section>

        <Footer />
      </CustomView>
      <CustomView condition={width >= 760}>
        <div className='position-relative'>
          <Navigation />
          <div>
            <Section
              style={{
                // marginTop: NAV_HEIGHT,
                color: 'white',
                background: '#252525',
              }}
              className='d-flex justify-content-between position-relative'
            >
              <LoadableImage
                src={kitchen}
                alt='title-bg'
                className='position-absolute w-100 h-100'
                style={{ top: '10vh', left: 0, filter: 'brightness(0.75)' }}
              />
              <div
                className='w-100 h-100 position-absolute'
                style={{
                  top: '10vh',
                  left: 0,
                  background: `linear-gradient(rgba(0,0,0,0) 50%, ${rgb(
                    '#202020'
                  )})`,
                }}
              />
              <TitleHeading style={{ zIndex: 1 }} />
              <Widget />
            </Section>

            <Section
              className='w-100 d-flex'
              style={{
                background: '#f0f0f0',
                zIndex: '3 !important',
              }}
            >
              {['World-class', 'Flexible', 'Refreshing'].map((emblem) => (
                <div className='font-smooth d-flex justify-content-center align-items-center flex-grow-1'>
                  <h1>{emblem}</h1>
                </div>
              ))}
            </Section>

            <Section
              className='flex-column text-center position-relative'
              style={{
                background:
                  `linear-gradient(${rgb('#f0f0f0')}, rgba(0,0,0,0)), url(` +
                  wall +
                  ')',
                backgroundSize: 'contain',
              }}
            >
              <WhatWeDo />
              <div
                style={{
                  position: 'absolute',
                  bottom: -2,
                  width: '100%',
                  height: '20vh',
                  background: `url(${wave})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'bottom',
                }}
              />
            </Section>
          </div>

          <Section
            style={{
              background: colors.primaryDark,
              color: 'white',
              paddingTop: 0,
              borderTop: '5px solid ' + colors.primaryDark,
              paddingInline: '5vw',
            }}
          >
            <Team />
          </Section>

          <Footer />
        </div>
      </CustomView>
    </div>
  );
}

export default App;
