import './App.scss';
import Team from './components/Team';
import Widget from './components/Widget';
import colors from './data/colors';
import { Button } from 'react-bootstrap';
import { isMobile, MobileView, BrowserView } from 'react-device-detect';
import wave from './assets/wave.svg';
import waveTop from './assets/wave_top.svg';
import wall from './assets/wall_bg.jpg';

import kitchen from './assets/background/kitchen.jpg';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiCrunchbase, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import useWindowDimensions from './hooks';
import logo from './assets/logo/logo_white.svg';

const MARGIN = '10vh';
const NAV_HEIGHT = '10vh';

export const Logo = ({ ...props }) => (
  <div
    style={{ fontSize: '2.4rem' }}
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

const Navigation = ({ ...props }) => {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 300 || (isMobile && window.scrollY > 50)) {
      setHeaderScrolled(true);
    } else {
      setHeaderScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <motion.div
      className='d-flex justify-content-center align-items-center header'
      animate={{
        background: headerScrolled
          ? 'rgba(256,256,256,0.95)'
          : 'rgba(256,256,256,0)',
        color: headerScrolled ? 'rgb(0,0,0)' : 'rgb(256,256,256)',
      }}
      style={{
        width: '100vw',
        height: NAV_HEIGHT,
        position: 'fixed',
        top: 0,
        zIndex: 9999,
      }}
    >
      <Logo />
    </motion.div>
  );
};

const TitleHeading = () => (
  <div className='d-flex justify-content-center align-items-center'>
    <div>
      <h1 style={{ fontWeight: 700 }}>
        The <span className='text-primary'>AI</span> sommelier.
      </h1>
      <h3 style={{ fontWeight: 300 }}>Making quality pairings accessible</h3>
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
      fontSize: '1.5rem'
    }}
  >
    <div className='flex-grow-1 d-flex h-100 justify-content-center align-items-center'>
      <img src={logo} style={{width:'8vw', opacity: 0.4}} />
    </div>
    <div className='flex-grow-1 d-flex flex-column h-100 justify-content-center' style={{opacity: 0.4}}>
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
    <h1 className='mb-5'>What we do</h1>
    <p style={{ fontSize: '1.35rem' }}>
      We are creating an <b>artificial intelligence sommelier</b> making quality
      pairings accessible. The AI somm is built on the world-class wine
      knowledge of Julie Dupouy and it will be packaged as an API. The API will
      be able to populate meals on apps and websites with the right wines or
      their silhouettes. To find out how we can <b>sommify</b> your digital wine
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
      <MobileView>
        <div
          style={{
            background: '#fae5d7',
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
                'linear-gradient(#fae5d7, rgba(0,0,0,0) 25%), url(' +
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
      </MobileView>
      <BrowserView>
        <Navigation />
        <div>
          <Section
            style={{
              // marginTop: NAV_HEIGHT,
              color: '#f0f0f0',
              background:
                'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(' +
                kitchen +
                ')',
              backgroundSize: 'cover',
              // filter: 'brightness(0.5)',
            }}
            className='d-flex justify-content-between position-relative'
          >
            <img
              src={waveTop}
              style={{
                transform: 'rotate(180deg)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
              }}
            />
            <TitleHeading />
            <Widget />
          </Section>

          <div
            className='w-100 d-flex'
            style={{
              background: '#f0f0f0',
              height: '70vh',
              // borderBottom: '20px solid #252525',
              // borderTop: '20px solid #252525',
            }}
          >
            {['Epic', 'Awesome', 'Fast'].map((emblem) => (
              <div className='d-flex justify-content-center align-items-center flex-grow-1'>
                {emblem}
              </div>
            ))}
          </div>

          <Section
            className='flex-column text-center position-relative'
            style={{
              background: 'url(' + wall + ')',
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
          }}
        >
          <Team />
        </Section>

        <Footer />
      </BrowserView>
    </div>
  );
}

export default App;
