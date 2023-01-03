import React from 'react';
import { Image } from 'react-bootstrap';
import { CircleFlag } from 'react-circle-flags';
import countries from '../data/countries';
import colors from '../data/colors';
import { isBrowser } from 'react-device-detect';

const tastes = ['acidic', 'bodied', 'sweet', 'tannic'];

const qualities = {
  bodied: 'Bodied',
  tannic: 'Tannic',
  sweet: 'Sweet',
  acid: 'Crisp',
};

const qualitiesB = {
  bodied: 'Light',
  tannic: 'Smooth',
  sweet: 'Dry',
  acid: 'Soft',
};

function capitalizeFirstLetter(string) {
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
  let reg_list = stringToList(wine['region']);
  let index = reg_list.indexOf(wine['country']);
  if (index > -1) {
    reg_list.splice(index, 1);
  }
  return (
    <span>
      <CircleFlag
        countryCode={countries[wine['country']]?.toLowerCase()}
        style={{ marginRight: '5px', height: '1em' }}
      />
      {reg_list.join(', ')} {wine['year'] ? wine['year'] : ''}
    </span>
  );
};

const wineTypeRow = (wine) => {
  return capitalizeFirstLetter(wine['type']);
};

const wineQualsCollapsed = (wine) => {
  return Object.keys(qualities)
    .map((qual) =>
      wine[qual] >= 3
        ? `${qualities[qual]}`
        : wine[qual] === 0
        ? `${qualitiesB[qual]}`
        : ''
    )
    .filter((e) => e)
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
      color: '#202020',
      fontSize: '0.8em',
      lineHeight: '1.1em'
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
          className='nodrag mx-2'
          style={{
            transform: hovered ? 'scale(1.1)' : '',
            transition: 'transform 0.3s',
            display: 'inline-block',
            height: 'calc(4em)',
          }}
          src={imageLink(wine.link)}
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
          style={{ maxWidth: isBrowser ? '300px' : '50vw', fontSize: '0.9em' }}
          className='d-block w-100 text-start hover-underline clickable text-truncate'
          onClick={() => {
            window.open(wine.link, '_blank');
          }}
        >
          <b>{wine.name.replaceAll('-', ' ')}</b>
        </span>
        <Row>{wineOrigin(wine)}</Row>
        <Row>{wineTypeRow(wine)}</Row>
        <Row>{wineQualsCollapsed(wine)}</Row>
      </div>
    </div>
  );
}
