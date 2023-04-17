import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { inViewVariants } from '../data/variants';
import { Widget } from 'react-sommify-widget';
import { CircleFlag } from 'react-circle-flags';
import _ from 'lodash';

const languages = [
  'en',
  'fr',
  'de',
  'it',
  'es',
  'nl',
  'fi',
  'en',
  'fr',
  'de',
  'it',
  'es',
  'nl',
  'fi',
];
const N_LANG = 5;

export default function WidgetShowcase({ ...props }) {
  const [selected, setSelected] = React.useState(0);
  const [interacted, setInteracted] = React.useState(false);
  const anim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, position: 'absolute', transition: { duration: 0 } },
    transition: { duration: 0.5, ease: 'easeInOut', type: 'tween' },
  };

  const isMobile = window.innerWidth <= 768;

  // get n languages in original order, with the middle one being the one on index i
  const getLanguages = (i, n = N_LANG) => {
    return _.range(i - ~~(n / 2), i + ~~(n / 2) + 1).map(
      (i) => languages[(i + languages.length) % languages.length]
    );
  };

  useEffect(() => {
    let index = 0;
    let interval;

    if (!interacted) {
      interval = setInterval(() => {
        if (!interacted) {
          index = (index + 1) % languages.length;
          setSelected(index);
        }
      }, 3500);

      setTimeout(() => {
        clearInterval(interval);
      }, 3500 * 7);
    } else {
      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [interacted]);

  return (
    <motion.div variants={inViewVariants} className='d-flex flex-column'>
      <div className='p-4 d-flex justify-content-center align-items-center user-select-none'>
        {getLanguages(selected).map((lang, i) => (
          <motion.div
            initial={false}
            animate={{
              opacity:
                i <= 0 || i >= N_LANG - 1
                  ? 0
                  : languages[selected] === lang
                  ? 1
                  : 0.2,
              scale: languages[selected] === lang ? 1.15 : 0.85,
              filter:
                languages[selected] === lang ? 'grayscale(0)' : 'grayscale(1)',
            }}
            layout
            key={lang}
            whileHover={
              i <= 0 || i >= N_LANG - 1
                ? {}
                : {
                    opacity: languages[selected] === lang ? 0.85 : 0.5,
                    scale: languages[selected] === lang ? 1.15 : 1.05,
                    filter: 'grayscale(0)',
                  }
            }
            style={{
              borderRadius: '50%',
              marginInline: 7,
              width: 26,
              height: 26,
              //   display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: i <= 0 || i >= N_LANG - 1 ? 'default' : 'pointer',
            }}
            transition={{
              type: 'spring',
              border: { type: 'tween' },
              duration: 0.5,
            }}
          >
            <CircleFlag
              style={{ width: 20, height: 20 }}
              className='mx-2'
              onClick={() => {
                if (i <= 0 || i >= N_LANG - 1) return;
                setSelected(
                  (selected + i - ~~(N_LANG / 2) + languages.length) %
                    languages.length
                );
                setInteracted(true);
              }}
              countryCode={lang === 'en' ? 'uk' : lang}
            />
          </motion.div>
        ))}
      </div>
      <div
        style={{ borderRadius: 18, background: '#ffffff' }}
        className='shaded'
        onClick={() => {
          setInteracted(true);
        }}
      >
        <Widget
          size={isMobile ? 'mobile' : 'desktop'}
          theme='flat'
          localization={languages[selected]}
        />
      </div>
    </motion.div>
  );
}
