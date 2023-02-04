import React, { Suspense } from 'react';
import './App.scss';
import Team, { GetToKnowUs } from './components/Team';
import Widget from './components/Widget';
import colors from './data/colors';
import {
  isMobile,
  MobileView,
  BrowserView,
  CustomView,
  isBrowser,
} from 'react-device-detect';
import wall from './assets/wall_bg.jpg';
import kitchen from './assets/background/kitchen.jpg';
// const kitchen = React.lazy(() => import('./assets/background/kitchen.jpg'));

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { SiCrunchbase, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import useWindowDimensions from './hooks';
import { rgb } from './helpers';
import LoadableImage from './components/Image';
import { Icon, Image, Logo } from './assets';
import { GoArrowDown } from 'react-icons/go';
import ContactUs from './components/ContactUs';
import { CgArrowRight, CgChevronRight } from 'react-icons/cg';
import Button from './components/Button';
import StackedImages from './components/StackedImages';
import {
  inView,
  inViewProps,
  inViewVariants,
  inViewVariantsX,
} from './data/variants';
import ScrollBadge from './components/ScrollBadge';
// import { staticFile, Video } from 'remotion';

const MARGIN = '20vh';
const NAV_HEIGHT = '10vh';

const Section = ({ children, style, className, ...props }) => (
  <motion.div
    {...props}
    {...inViewProps}
    style={{
      width: '100%',
      paddingBlock: MARGIN,
      paddingInline: '10vw',
      minHeight: `calc(100vh)`,
      ...style,
    }}
    className={'d-flex justify-content-center ' + className}
  >
    {children}
  </motion.div>
);

const NavButton = ({ nav, nextScroll, ...props }) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (
        latest >= nav.scroll - 0.1 * height &&
        (latest < nextScroll - 0.1 * height || nextScroll === undefined)
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
        color: hovered || active ? 'rgb(0,0,0)' : 'rgba(0,0,0, 0.35)',
      }}
      className={`d-flex justify-content-center align-items-center clickable text-center mx-4 `}
      onClick={() => window.scrollTo(0, nav.scroll - 0.1 * height, 'smooth')}
      style={{
        height: '100%',
        fontWeight: 600,
        fontSize: isBrowser ? '1em' : '.65em',
        color: active ? colors.primary : 'black',
        position: 'relative',
        flex: isBrowser ? '' : 1,
      }}
    >
      {nav.title}
      {/* {active && (
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
      )} */}
    </motion.div>
  );
};

const Navigation = ({ ...props }) => {
  const { width, height } = useWindowDimensions();
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 0.1 * height) {
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
            background: headerScrolled
              ? 'rgb(256,256,256)'
              : 'rgba(0, 0, 0, 0)',
            color: headerScrolled ? 'rgb(0,0,0)' : 'rgb(256,256,256)',
          }}
          className={
            'd-flex flex-column w-100 position-fixed justify-content-center ' +
            (headerScrolled && 'shaded')
          }
          style={{
            backgroundColor: colors.beige,
            zIndex: 9999,
            height: NAV_HEIGHT,
          }}
        >
          <div className='d-flex justify-content-center'>
            <img
              style={{ height: '3vh', paddingLeft: '4vw', paddingRight: '1vw' }}
              src={Logo.FullMaroon}
            />
          </div>
        </motion.div>
      </CustomView>
      <CustomView condition={width >= 1300}>
        <motion.div
          className='d-flex justify-content-center align-items-center'
          transition={{ delay: 0.3 }}
          animate={{
            background: headerScrolled
              ? 'rgba(256,256,256, 1)'
              : 'rgba(256,256,256, 0)',
            transition: { type: 'tween' },
            // color: headerScrolled ? 'rgb(0,0,0)' : 'rgb(256,256,256)',
          }}
          style={{
            width: '100vw',
            height: NAV_HEIGHT,
            position: 'fixed',
            top: 0,
            zIndex: 5,
          }}
        >
          <motion.div
            key='top-bar'
            style={{
              width: '100vw',
              height: '10vh',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 0,
            }}
            className={'px-4 ' + (headerScrolled && 'shaded')}
          >
            <div
              className='d-flex align-items-center h-100 position-relative'
              style={{ maxWidth: '1920px', margin: 'auto' }}
            >
              <AnimatePresence>
                <img
                  style={{
                    height: '1.5em',
                    paddingLeft: '4vw',
                    paddingRight: '1vw',
                    position: 'absolute',
                  }}
                  src={Logo.FullMaroon}
                />
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                  {[
                    { title: 'demo', scroll: 0 },
                    { title: 'product', scroll: 1.1 * height },
                    { title: 'how', scroll: height * 2.5 },
                    { title: 'team', scroll: height * 4.1 },
                    { title: 'contact', scroll: height * 4.7 },
                  ].map((nav, i, navs) => (
                    <NavButton
                      key={'nav_' + nav.title}
                      nav={nav}
                      nextScroll={navs?.[i + 1]?.scroll}
                    />
                  ))}
                </div>
                <Button
                  variant='secondary'
                  className='position-absolute'
                  style={{
                    right: '4vw',
                  }}
                  onClick={() => {
                    window.open('https://portal.sommify.ai/auth/login');
                  }}
                >
                  Go to portal
                </Button>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </CustomView>
    </>
  );
};

const ExtendingButton = ({ children, bg = colors.blue, ...props }) => {
  const DIM = 60;
  const [hover, setHover] = useState(false);
  return (
    <div
      className='clickable'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <motion.div
        key='button-text'
        className='d-flex justify-content-center align-items-center position-relative'
        animate={{
          color: hover ? 'rgb(256,256,256)' : 'rgb(0,0,0)',
        }}
        style={{ marginLeft: DIM + 10, left: 0, height: DIM }}
      >
        <motion.div
          className='shaded position-absolute d-flex justify-content-center align-items-center'
          animate={{ width: hover ? `calc(${DIM}px + 100%)` : DIM }}
          transition={{ type: 'tween' }}
          initial={{ width: DIM }}
          style={{
            left: -DIM - 10,
            height: DIM,
            background: bg,
            borderRadius: DIM / 2,
            zIndex: 1,
          }}
        >
          <CgChevronRight
            style={{ position: 'absolute', left: 9 }}
            className='text-white'
            size={DIM * 0.6}
          />
        </motion.div>
        <span style={{ zIndex: 2, paddingRight: '40px' }}>{children}</span>
      </motion.div>
    </div>
  );
};

const TitleHeading = ({ ...props }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 760;
  return (
    <motion.div
      {...props}
      variants={inViewVariantsX}
      className='d-flex justify-content-end align-items-center'
    >
      <div>
        {/* <img style={{ height: '8vh' }} src={Logo.FullWhite} /> */}
        {/* <img src={Icon.Sommelier} style={{width:'300px'}} /> */}
        {/* <h1
          className='font-weight-700 mb-0'
          style={{ fontSize: '3.2em', lineHeight: '1.2em' }}
        >
          the{' '}
          <span className='text-primary' style={{ fontSize: '1.4em' }}>
            AI
          </span>{' '}
          <br />
          sommelier.
        </h1> */}
        <br />
        <h6
          className='font-weight-300'
          style={{
            fontSize: '1em',
            letterSpacing: '.025em',
          }}
        >
          THE ARTIFICIAL INTELLIGENCE SOMMELIER
        </h6>
        <h3 style={{ fontSize: '3.4em', fontWeight: 700 }}>
          making <span className=''>pairing</span>
          <br />
          the <span className='text-fancy'>standard.</span>
        </h3>
        <div
          className={`w-100 py-4 d-flex justify-content-${
            isMobile ? 'start' : 'end'
          }`}
        >
          <ExtendingButton
            onClick={() => {
              document.getElementById('contact-us').scrollIntoView();
            }}
          >
            CONTACT US
          </ExtendingButton>
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
      background: '#151518',
      width: '100%',
      color: 'white',
      fontSize: '0.9rem',
    }}
  >
    <div
      className='d-flex flex-column justify-content-center align-items-start'
      style={{ width: '100%', maxWidth: '1620px', margin: 'auto' }}
    >
      <div className='d-flex justify-content-center align-items-start w-100 py-5'>
        <div className='d-flex flex-column mx-4'>
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
        </div>
        <div className='d-flex flex-column mx-4'>
          <h6>Products</h6>
          <span className='d-block'>
            <span
              className='clickable'
              onClick={() => {
                // window.open(
                // 'https://www.crunchbase.com/organization/sommifyai'
                // );
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
      </div>
    </div>
  </div>
);

const WhatWeDo = () => (
  <>
    <div
      className='d-flex flex-column'
      style={{
        paddingInline: '6vw',
        paddingBlock: '8vh',
        borderRadius: '3em',
        marginBottom: 'auto',
        maxWidth: '1920px',
        width: '80%',
        margin: 'auto',
      }}
    >
      <div className='d-flex align-items-start'>
        {[
          {
            label: 'accessible',
            icon: Icon.Accessible,
            subtitle: 'quality pairings made accessible for anyone anywhere',
          },
          {
            label: 'world-class',
            icon: Icon.WorldClass,
            subtitle:
              'tailored to make world-class pairings by a world-class sommelier',
          },
          {
            label: 'refreshing',
            icon: Icon.Refreshing,
            subtitle:
              'bringing a new approach for the digitally native younger consumer',
          },
        ].map((emblem) => (
          <div
            key={emblem.label}
            style={{ flex: 1 }}
            className='d-flex justify-content-center'
          >
            <img src={emblem.icon} width={'140px'} />
            <div style={{ paddingTop: '20px' }} className='text-start'>
              <h4 className='mb-2 font-weight-400'>{emblem.label}</h4>
              <h5 className='font-weight-300'>{emblem.subtitle}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const ProductHeader = ({ title, className, children, ...props }) => {
  return (
    <motion.div
      className={className}
      {...inViewProps}
      variants={inViewVariants}
      style={{ marginTop: 70 }}
    >
      <h4 className='text-primary font-weight-600'>PRODUCT</h4>
      <h1 className='font-weight-700' style={{ fontSize: '3.6em' }}>
        {title} <span style={{ fontSize: '0.85em' }}>SOMM</span>
      </h1>
      <p
        className={'py-4 ' + className}
        style={{
          width: '100%',
          fontSize: '1.1em',
        }}
      >
        {children}
      </p>
    </motion.div>
  );
};

const StaticSommColumn = ({ className }) => (
  <div className={'d-flex flex-column h-100 ' + className} style={{ flex: 1 }}>
    <ProductHeader className='text-end' title='Static'>
      Our static SOMM populates the website or app with the correct wines that
      match the meal. The SOMM gives a traditional, premium and adventurous
      pairing. The customer is then able to click the wine he likes out of the
      three and it redirects them to the URL where they can purchase the wine.
    </ProductHeader>
    <div
      className='d-flex justify-content-center align-items-center position-relative'
      style={{ flex: 1 }}
    >
      <StackedImages
        absolute
        style={{ width: '140%', maxWidth: '1920px', right: 0, top: 0 }}
        direction='bottom-left'
        xMargin='calc(-1 * min(8vw, 40px))'
        yMargin='calc(min(8vw, 40px))'
        images={[Image.StaticSomm]}
      />
    </div>
  </div>
);

const InteractiveSommColumn = ({ className }) => (
  <div className={'d-flex flex-column h-100 ' + className} style={{ flex: 1 }}>
    <div
      className='d-flex justify-content-start align-items-start'
      style={{ flex: 1 }}
    >
      <StackedImages
        style={{
          width: '100%',
          maxWidth: '420px',
          background:
            'linear-gradient(90deg, rgba(242,189,249,1) 0%, rgba(129,129,228,1) 100%)',
          zIndex: 1,
        }}
        xMargin='calc(min(8vw, 40px))'
        yMargin='calc(min(8vw, 40px))'
        images={[Image.InteractiveSomm]}
      />
    </div>
    <ProductHeader className='text-start' title='Interactive'>
      <span>
        The consumer is able to type in what they are eating, either using
        ingredients or typing in the recipe name. Using the tags or recipe the
        SOMM gives a number of wines that pair well with the meal. By clicking
        the wines it redirects the consumer to the URL where they are able to
        purchase the wine.
      </span>
    </ProductHeader>
  </div>
);

const Product = ({ ...props }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <CustomView condition={width < 760}>
        <div className='d-flex flex-column'>
          <InteractiveSommColumn className='flex-column-reverse' />
          <StaticSommColumn />
        </div>
      </CustomView>
      <CustomView condition={width >= 760}>
        <div
          className='d-flex h-100 w-100'
          style={{ maxWidth: '2440px', margin: 'auto' }}
        >
          <StaticSommColumn />
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '4%' }}
          />
          <div
            style={{
              borderRadius: '10px',
              width: '8px',
              background: '#000000aa',
            }}
          />
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '4%' }}
          />
          <InteractiveSommColumn />
        </div>
      </CustomView>
    </>
  );
};

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
          <Section id='widget-screen' style={{ minHeight: '' }}>
            <div className='d-flex flex-column' style={{ height: '100%' }}>
              <div
                style={{ flex: 1 }}
                className='d-flex justify-content-center align-items-center position-relative'
              >
                <ScrollBadge top={25} popUpDisabled />
                <Widget />
              </div>
            </div>
          </Section>
          <Section className='py-3'>
            <InteractiveSommColumn className='flex-column-reverse' />
          </Section>
          <Section className='py-3' style={{ minHeight: '90vh' }}>
            <StaticSommColumn />
          </Section>
          <Section style={{ paddingBlock: 0, minHeight: '' }} className='py-0'>
            <ContactUs />
          </Section>
          <Footer />
        </div>
      </CustomView>
      <CustomView condition={width >= 760}>
        <div className='position-relative'>
          <Navigation />
          <div>
            <Section
              style={{
                // marginTop: NAV_HEIGHT,
                color: 'black',
                // background: colors.beige,
                minHeight: '80vh',
                paddingInline: '0vw',
                background:
                  'linear-gradient(253deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 41%, rgba(248,248,248,1) 100%)',
              }}
              className='d-flex justify-content-center align-items-center position-relative text-end'
            >
              <div style={{ flex: 1 }}>
                <TitleHeading style={{ zIndex: 1 }} />
              </div>
              <div style={{ width: '6vw' }} />
              <motion.div
                {...inViewProps}
                style={{ flex: 1 }}
                variants={inViewVariants}
                className='position-relative'
              >
                <ScrollBadge />
                <Widget />
              </motion.div>
            </Section>

            <Section
              className='d-flex flex-column py-4'
              style={{
                background: '#e8e5e2',
                minHeight: '20vh',
              }}
            >
              <h5 className='d-flex justify-content-center align-items-center font-weight-600 mb-5'>
                SUPPORTED BY
              </h5>
              <div
                className='d-flex justify-content-center align-items-center'
                // style={{ flex: 1 }}
              >
                {[
                  {
                    pLogo: Logo.Heino,
                    height: '27px',
                    link: 'https://heino.fi',
                  },
                  {
                    pLogo: Logo.Gorilla,
                    height: '40px',
                    link: 'https://gorillacapital.fi',
                  },
                  {
                    pLogo: Logo.Silta,
                    height: '42px',
                    link: 'https://siltahouse.com',
                  },
                  {
                    pLogo: Logo.MFS,
                    height: '43px',
                    link: 'https://www.microsoft.com/en-us/startups',
                  },
                  {
                    pLogo: Logo.inQb,
                    height: '38px',
                    link: 'https://www.inqb.sk/sk',
                  },
                  {
                    pLogo: Logo.Boost,
                    height: '38px',
                    link: 'https://boostturku.com',
                  },
                  {
                    pLogo: Logo.NewCo,
                    height: '44px',
                    link: 'https://newcohelsinki.fi',
                  },
                ].map(({ pLogo, height, link }, i) => (
                  <div style={{ flex: 1 }}>
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
                        height: `calc(${height} * 0.8)`,
                        // filter: 'brightness(0)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Section
              className='text-center position-relative'
              style={{
                // background: '#fff9f2',
                background:
                  'linear-gradient(120deg, rgba(237,233,227,1) 0%, rgba(255,253,250,1) 65%, rgba(246,239,231,1) 100%)',
                minHeight: '60vh',
              }}
            >
              <Product />
            </Section>

            <Section>
              <div
                style={{ maxWidth: '1920px' }}
                id='yoyo'
                className='w-100 h-100 d-flex flex-column justify-content-start align-items-center'
              >
                <h1 className='font-weight-700' style={{ fontSize: '3em' }}>
                  Control it all using our{' '}
                  <span
                    style={{ fontSize: '0.85em' }}
                    className='text-primary clickable'
                    onClick={() =>
                      window.open('https://portal.sommify.ai/auth/login')
                    }
                  >
                    PORTAL
                  </span>
                </h1>
                <div className='w-100 p-5 d-flex justify-content-center'>
                  <div
                    className='d-flex flex-column px-5'
                    style={{ width: '600px' }}
                  >
                    <div style={{ width: '80%' }}>
                      {[
                        {
                          title: 'Create an account',
                          text: (
                            <span>
                              Go to our portal and become a member. Once you
                              activate your account and pay for your
                              subscription you are able to login using your
                              email and set password.
                              <br />
                            </span>
                          ),
                        },
                        {
                          title: 'Upload your wines',
                          text: (
                            <span>
                              Upload your wines into our digital wine cellar
                              using an excel, CSV or JSON file. You are able to
                              use a template we provide or a freeform upload.
                            </span>
                          ),
                        },
                        {
                          title: 'Start using the API',
                          text: (
                            <span>
                              Once the wines have been processed you receive an
                              email and you can go to the settings page to
                              retrieve your API to populate your website or app.
                              Simple.
                            </span>
                          ),
                        },
                      ].map(({ title, text }, i) => (
                        <div
                          className='position-relative'
                          style={{ marginBottom: '13vh' }}
                        >
                          <h3 variants={inView({ i })}>
                            <span
                              className='text-primary position-absolute'
                              style={{
                                fontSize: '6em',
                                opacity: 0.1,
                                top: -80,
                                left: -50,
                              }}
                            >
                              {i + 1}
                            </span>
                            &nbsp;{title}
                          </h3>
                          <p>{text}</p>
                        </div>
                      ))}
                      <div className='w-100 d-flex justify-content-center'>
                        <Button
                          className='my-2 p-3 px-5 font-weight-600 text-white'
                          style={{ fontSize: '1.2em', borderRadius: 999 }}
                          onClick={() =>
                            window.open(
                              'https://portal.sommify.ai/auth/login',
                              '_blank'
                            )
                          }
                        >
                          TRY IT OUT
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='position-relative'
                    style={{
                      flex: 1,
                    }}
                  >
                    <StackedImages
                      style={{
                        height: '918px',
                        width: '1620px',
                        background:
                          'linear-gradient(90deg, rgba(255,250,252,1) 0%, rgba(255,212,223,1) 100%)',
                      }}
                      absolute
                      direction='bottom-right'
                      yMargin='40px'
                      xMargin='75px'
                      images={[Image.SS2, Image.SS3]}
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              className='flex-column text-center position-relative p-0'
              style={{
                background: '#ffffff',
                minHeight: '40vh',
                marginBottom: '5vh',
              }}
            >
              <WhatWeDo />
              <img
                src={Image.WaveBeige}
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: '-5vh',
                  left: 0,
                }}
              />
            </Section>
          </div>

          <Section
            className='position-relative py-0'
            style={{
              background: '#fff9f2',
              color: 'black',
              paddingTop: 0,
              paddingInline: '5vw',
              minHeight: '',
            }}
          >
            <Team />
          </Section>

          <Section
            className='position-relative flex-column p-0'
            style={{ minHeight: '', background: '#ffffff' }}
          >
            <img
              src={Image.WaveBlack}
              style={{
                width: '100vw',
                position: 'absolute',
                // height: '10vh',
                top: -1,
                transform: 'rotate(180deg)',
                left: 0,
              }}
            />
            <div style={{ flex: 1, background: colors.primary }} />
            {/* <img className='w-100 position-absolute' src={Image.WaveBlack} /> */}
            {/* <div style={{ flex: 0.4, background: '#151518' }} /> */}
            <ContactUs />
          </Section>

          <Footer />
        </div>
      </CustomView>
    </div>
  );
}

export default App;
