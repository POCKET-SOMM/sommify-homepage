import React from 'react';
import { Image } from 'react-bootstrap';
import { CircleFlag } from 'react-circle-flags';
import countries from '../../data/countries';
import { isBrowser } from 'react-device-detect';
import placeholder from '../../assets/bottle.png';

const tastes = ['acidic', 'bodied', 'sweet', 'tannic'];

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

const wineOrigin = (wine) => {
  return (
    <>
      <CircleFlag
        countryCode={countries[wine.country]?.toLowerCase()}
        height='11'
        style={{ marginRight: '4px' }}
      />
      {wine.region}
      {wine.subregion ? ', ' + wine.subregion : ''} {wine.year ? wine.year : ''}
    </>
  );
};

const wineTypeRow = (wine) => {
  return [
    capitalizeFirstLetter(wine?.type),
    ...wine.grapes?.map((grape) => capitalizeFirstLetter(grape)),
  ].join(', ');

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
    .join(' • ');
};

const Row = ({ children }) => (
  <div
    style={{
      // flex: 1,
      textAlign: 'start',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // display: 'flex',
      alignItems: 'center',
      color: '#707070',
      fontSize: '0.75em',
      lineHeight: '1.1em',
    }}
  >
    {children}
  </div>
);

export default function WineContent({ wine, hovered = false, ...props }) {
  return (
    <div
      {...props}
      id='wine-content'
      className='d-flex'
      style={{ height: '100%', fontSize: '0.9em' }}
    >
      <div className='center-content'>
        <Image
          alt='wine-img'
          className='nodrag py-2'
          style={{
            float: 'left',
            display: 'inline-block',
            paddingRight: '6px',
            transform: hovered ? 'scale(1.05)' : '',
            transition: 'transform 0.3s',
            maxHeight: 'calc(4.3em)',
          }}
          // height='100%'
          src={imageLink(wine.url)}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = placeholder;
          }}
        />
      </div>
      <div
        className='text-truncate'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{ maxWidth: isBrowser ? '300px' : '50vw', fontSize: '0.8em' }}
          className='d-block w-100 text-start hover-underline text-truncate font-weight-600'
        >
          {wine.title.replaceAll('-', ' ')}
        </span>
        <Row>{wineOrigin(wine)}</Row>
        <Row>{wineTypeRow(wine)}</Row>
        <Row>{wineQualsCollapsed(wine)}</Row>
      </div>
    </div>
  );
}
