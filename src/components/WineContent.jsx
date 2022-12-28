import React from 'react';
import { Image } from 'react-bootstrap';
import { CircleFlag } from 'react-circle-flags';
import countries from '../data/countries';
import colors from '../data/colors';

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
        height='11'
        style={{ marginRight: '5px' }}
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
      flex: 1,
      textAlign: 'start',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'flex',
      alignItems: 'center',
      fontSize: '10px',
      color: '#202020',
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
      style={{ maxWidth: '300px', height: '100%' }}
    >
      <div className='center-content'>
        <Image
          alt='wine-img'
          className='nodrag py-2'
          style={{
            float: 'left',
            transform: hovered ? 'scale(1.1)' : '',
            transition: 'transform 0.3s',
            display: 'inline-block',
            paddingRight: '6px',
          }}
          height='100%'
          src={imageLink(wine.link)}
        />
      </div>
      <div
        className='text-xxs text-truncate'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{ maxWidth: '300px', fontSize: '12px' }}
          className='d-block w-100 text-start hover-underline clickable text-truncate'
          onClick={() => {
            window.open(wine.url, '_blank');
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
