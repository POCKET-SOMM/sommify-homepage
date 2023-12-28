import { useEffect, useState } from 'react';
import { CustomView, isBrowser } from 'react-device-detect';
import colors from '../data/colors';
import useWindowDimensions from '../hooks';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Logo } from '../assets';
import Button from './Button';
import { FiChrome } from 'react-icons/fi';

const NAV_HEIGHT = '100px';

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
        color: hovered ? 'rgb(0,0,0)' : 'rgba(0,0,0, 0.35)',
      }}
      className={`d-flex justify-content-center align-items-center clickable text-center mx-4 `}
      onClick={() => {
        const target = document.getElementById(nav.id);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      style={{
        height: '100%',
        fontWeight: 600,
        fontSize: 16,
        position: 'relative',
        flex: isBrowser ? '' : 1,
      }}
    >
      {nav.title}
    </motion.div>
  );
};

export default function Navigation({ ...props }) {
  const { width, height } = useWindowDimensions();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScroll, setPrevScroll] = useState(0);
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > prevScroll) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }

    setPrevScroll(latest);

    if (latest > 0.1 * height) {
      setHeaderScrolled(true);
    } else {
      setHeaderScrolled(false);
    }
  });

  return (
    <motion.div
      className='d-flex justify-content-center align-items-center'
      transition={{
        duration: 0.2,
        y: {
          type: 'tween',
          duration: 0.25,
          ease: 'easeInOut',
        },
      }}
      animate={{
        background: headerScrolled
          ? 'rgba(256,256,256,0.8)'
          : 'rgba(256,256,256,0)',
        backdropFilter: headerScrolled ? 'blur(10px)' : 'blur(0px)',
        color: headerScrolled ? 'rgb(0,0,0)' : 'rgb(256,256,256)',
        y: navHidden ? `-${NAV_HEIGHT}` : 0,
      }}
      style={{
        width: '100vw',
        height: NAV_HEIGHT,
        position: 'fixed',
        top: 0,
        zIndex: 5,
      }}
    >
      <CustomView condition={width < 1300}>
        <div
          className='d-flex justify-conent-center align-items-center'
          style={{ borderBottom: '1px solid' }}
        >
          <img
            style={{
              height: '2em',
            }}
            src={Logo.FullMaroon}
          />
        </div>
      </CustomView>
      <CustomView condition={width >= 1300}>
        <div
          style={{
            display: 'flex',
            width: 1300,
            margin: 'auto',
            // maxWidth: 1200,
            paddingInline: 64,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              className='clickable'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              style={{ height: '1.8em' }}
              src={Logo.FullMaroon}
            />
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            {[
              { title: 'welcome', id: 'demo', scroll: 0 },
              { title: 'product', id: 'product', scroll: 0.9 * height },
              { title: 'integration', id: 'how', scroll: height * 1.8 },
              { title: 'pricing', id: 'pricing', scroll: height * 3.1 },
              { title: 'contact', id: 'contact', scroll: height * 4.1 },
            ].map((nav, i, navs) => (
              <NavButton
                key={'nav_' + nav.title}
                nav={nav}
                nextScroll={navs?.[i + 1]?.scroll}
              />
            ))}
          </div>
          <div
            className='d-inline-flex justify-content-end'
            style={{ flex: 1 }}
          >
            {/* <motion.div
              style={{
                height: '100%',
                fontWeight: 600,
                fontSize: 15,
                position: 'relative',
                flex: isBrowser ? '' : 1,
                color: 'black',
                marginLeft: 20,
              }}
            >
              <FiChrome size={20} /> add to chrome — it's free
            </motion.div> */}
            <Button
              border
              borderless
              variant='secondary'
              onClick={() => {
                window.open('https://chromewebstore.google.com/detail/sommify-find-the-perfect/omffejpmkjeibjphgccejljppddmplha');
              }}
            >
              {/* Go to portal */}
              <FiChrome size={20} /> add to chrome
            </Button>
          </div>
        </div>
      </CustomView>
    </motion.div>
  );
}
