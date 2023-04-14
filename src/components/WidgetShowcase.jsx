import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { inViewVariants } from '../data/variants';
import { Widget } from 'react-sommify-widget';
import { CircleFlag } from 'react-circle-flags';

export default function WidgetShowcase({ ...props }) {
  const [selected, setSelected] = React.useState('en');
  const anim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, position: 'absolute' },
    transition: { duration: 0.5, ease: 'easeInOut', type: 'tween' },
  };

  return (
    <motion.div variants={inViewVariants} className='d-flex flex-column'>
      <div className='p-4 d-flex justify-content-center align-items-center user-select-none'>
        {['en', 'fr', 'de'].map((lang) => (
          <motion.div
            initial={false}
            animate={{
              opacity: selected === lang ? 1 : 0.3,
              scale: selected === lang ? 1.25 : 1,
            }}
            whileHover={{
              opacity: selected === lang ? 1 : 0.5,
              scale: selected === lang ? 1.25 : 1.05,
            }}
            style={{
              borderRadius: '50%',
              marginInline: 7,
              width: 26,
              height: 26,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            transition={{
              type: 'spring',
              border: { type: 'tween' },
              duration: 0.25,
            }}
          >
            <CircleFlag
              style={{ width: 20, height: 20 }}
              className='mx-2 clickable'
              onClick={() => setSelected(lang)}
              countryCode={lang === 'en' ? 'uk' : lang}
            />
          </motion.div>
        ))}
      </div>
      <div
        style={{ borderRadius: 18, background: '#ffffff' }}
        className='shaded'
      >
        <AnimatePresence>
          {selected === 'en' && (
            <motion.div {...anim} key={'widget_en'}>
              <Widget theme='flat' localization='en' />
            </motion.div>
          )}
          {selected === 'fr' && (
            <motion.div {...anim} key={'widget_fr'}>
              <Widget theme='flat' localization='fr' />
            </motion.div>
          )}
          {selected === 'de' && (
            <motion.div {...anim} key={'widget_de'}>
              <Widget theme='flat' localization='de' />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
