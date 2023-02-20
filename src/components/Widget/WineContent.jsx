import React from 'react';
import { Image } from 'react-bootstrap';
import { CircleFlag } from 'react-circle-flags';
import countries from '../../data/countries';
import { isBrowser } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import placeholder from '../../assets/bottle.png';

const tastes = ['acidic', 'bodied', 'sweet', 'tannic'];

const loadingAnimation = {
  animate: {
    opacity: [0.08, 0.15, 0.15, 0.08],
    transition: {
      repeat: Infinity,
      duration: 1.4,
      ease: 'easeOut',
      type: 'keyframes',
    },
  },
  exit: { opacity: 0 },
};

function capitalizeFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const stringToList = (str) => {
  return str
    .match(RegExp(/(?:'([^,]+)'|"([^,]+)")/g))
    .map((e) => e.slice(1, -1));
};

const imageLink = (link) => {
  let productNumber = link.split('/')[5];
  let productName = link.split('/')[6];
  return `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${productNumber}/${productName}.jpg`;
};

const wineOrigin = (wine, loading) => {
  return (
    <div className='d-flex align-items-center h-100'>
      {!loading && (
        <CircleFlag
          countryCode={countries[wine.country]?.toLowerCase()}
          style={{ marginRight: '4px', height: '.8em' }}
        />
      )}
      {wine.region}
      {wine.subregion ? ', ' + wine.subregion : ''} {wine.year ? wine.year : ''}
    </div>
  );
};

const wineTypeRow = (wine) => {
  return [
    wine?.type
      .split(', ')
      .map((t) => capitalizeFirstLetter(t))
      .join(', '),
    wine.grapes?.map((grape) => capitalizeFirstLetter(grape)).join(', '),
  ]
    .filter((s) => s)
    .join(' • ');

  // if (wine.typeL1 !== undefined) {
  //   return ['typeL1', 'typeL2', 'typeL3']
  //     .filter((t) => wine[t])
  //     .map((type) => capitalizeFirstLetter(wine[type]))
  //     .join(' • ');
  // }
  // return capitalizeFirstLetter(wine.type);
};

const wineQualsCollapsed = (wine) => {
  return tastes
    .map((taste) => wine[taste + 'Taste'])
    .filter((taste) => taste)
    .map((t) => capitalizeFirstLetter(t))
    .join(' • ');
};

const Row = ({ loading, children, ...props }) => (
  <motion.div
    className='position-relative'
    animate={{ color: loading ? '#70707000' : '#707070ff' }}
    style={{
      // flex: 1,
      textAlign: 'start',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // display: 'flex',
      alignItems: 'center',
      // color: '#707070',
      fontSize: '0.75em',
      lineHeight: '1.3em',
      height: '1.3em',
    }}
  >
    {loading && (
      <motion.div
        className='w-100 position-absolute'
        {...loadingAnimation}
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          margin: 'auto',
          height: '80%',
          borderRadius: '.3em',
          background: 'black',
        }}
      />
    )}
    {children}
  </motion.div>
);

export default function WineContent({
  wine,
  loading,
  hovered = false,
  ...props
}) {
  return (
    <div
      {...props}
      id='wine-content'
      className='d-flex'
      style={{ height: '100%', fontSize: '0.9em' }}
    >
      <motion.div className='center-content position-relative'>
        <AnimatePresence>
          <motion.img
            alt='wine-img'
            className='nodrag py-2'
            animate={{ opacity: loading ? 0 : 1 }}
            style={{
              float: 'left',
              display: 'inline-block',
              paddingRight: '6px',
              transform: hovered ? 'scale(1.05)' : '',
              transition: 'transform 0.3s',
              width: 'calc(3.8em)',
              height: 'calc(5.1em)',
            }}
            src={imageLink(wine.url)}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = placeholder;
            }}
          />
          {loading && (
            <motion.img
              alt='wine-img'
              className='nodrag py-2 position-absolute'
              {...loadingAnimation}
              style={{
                top: -6,
                left: 0,
                paddingRight: '6px',
                transform: hovered ? 'scale(1.05)' : '',
                transition: 'transform 0.3s',
                width: 'calc(4.1em)',
                height: 'calc(6em)',
              }}
              src={placeholder}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div
        className='text-truncate'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <motion.span
          animate={{ color: loading ? '#00000000' : '#000000ff' }}
          style={{ maxWidth: isBrowser ? '300px' : '50vw', fontSize: '0.8em' }}
          className='d-block w-100 text-start hover-underline text-truncate font-weight-600 mt-1 position-relative'
        >
          {wine.title.replaceAll('-', ' ')}
          {loading && (
            <motion.div
              className='w-100 position-absolute'
              {...loadingAnimation}
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                margin: 'auto',
                height: '80%',
                borderRadius: '.3em',
                background: 'black',
              }}
            />
          )}
        </motion.span>
        <Row loading={loading}>{wineOrigin(wine, loading)}</Row>
        <Row loading={loading}>{wineTypeRow(wine)}</Row>
        <Row loading={loading}>{wineQualsCollapsed(wine)}</Row>
      </div>
    </div>
  );
}
