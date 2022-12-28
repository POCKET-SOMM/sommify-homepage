import React from 'react';
import WinePlate from './WinePlate';

function WineDisplay(wines) {
  return (
    <div className='no-scrollbar' id='wine-display' style={{ width: '100%' }}>
      {wines ? (
        wines.map((wine, i) => (
          <div
            key={`wine_display_${i}`}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              paddingBottom: i === wines.length - 1 ? '' : '10px',
            }}
          >
            {/* {WinePlate(wine)} */}
          </div>
        ))
      ) : (
        <span>No recommendations in this price range.</span>
      )}
    </div>
  );
}

export default WineDisplay;
