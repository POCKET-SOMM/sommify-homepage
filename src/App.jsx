import './App.scss';
import React, { useEffect, useState } from 'react';
import Body from './components/Body';
import { Card, Carousel } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PairingTool from './components/PairingTool/PairingTool';

const MAIN_COLOR = '#e7154e'
const SECONDARY_COLOR = '#fce3ee'
export const MAIN_COLOR_DEP = '#80183b'

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log(window.location)

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])

  let isMobile = (width < 768);
  let isTablet = (width >= 768 && width < 1024)
  let isDesktop = !isMobile && !isTablet
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  let mobileStyle = {
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100 - 100px)',
    borderWidth: '0px',
    padding: '2px'
  }
  let tabletStyle = {
    width: '80%',
    height: 'calc(var(--vh, 1vh) * 100 - 120px)',
    borderWidth: '0px',
    padding: '10px'
  }
  let desktopStyle = {
    marginTop: '100px',
    width: '500px',
    padding: '10px',

    zIndex: 3,
    position: 'absolute',
    left: '0px',
    right: '0px',
    marginLeft: '55%',
    // marginRight: 'auto'
  }

  const captionStyle = {
    zIndex: 4,
    position: 'absolute',
    width: '400px',
    height: '300px',
    top: '300px',
    left: '300px'
  }

  const getDeviceStyle = () => {
    if (isMobile)
      return mobileStyle
    if (isTablet)
      return tabletStyle
    return desktopStyle
  }

  return (
    <div className="App">
      <div id="body-logo"
        style={{
          // marginBottom: isMobile ? '20px' : '40px',
          height: '80px',
          backgroundColor: MAIN_COLOR_DEP,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={e => { window.location.replace('/') }}
      >
        <img
          style={{ objectFit: 'cover' }}
          href="/"
          className="clickable nodrag"
          src="PocketSomm.LOGO.svg"
          width="200px"
          height="80px">
        </img>
      </div>
      <Router basename='/'>
        <Routes>
          <Route path="/" element={
            isDesktop ? <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Card
                  className="mainBody"
                  style={{
                    marginTop: isMobile ? '20px' : '40px',
                    ...getDeviceStyle()
                  }}
                >
                  <Body isMobile={isMobile || isTablet} screenWidth={width} />
                </Card>
                <img
                  width={200}
                  src='try_our_demo.png'
                  style={{ position: 'absolute', zIndex: 5, marginLeft: '580px', marginTop: '30px' }}></img>
              </div>

              <div style={{ width: '100%', height: 'calc(100vh - 80px)', position: 'absolute', zIndex: 2, background: '#3b3e4f', opacity: '0.85' }} />
              <Carousel indicatorLabels={[1, 2, 3]} style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
                <Carousel.Item>
                  <img
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'calc(100vh - 80px)'
                    }}
                    // className="w-100 h-100"
                    src="homecook.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption style={captionStyle}>
                    <h3>Home Cooking</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ objectFit: 'cover', width: '100%', height: 'calc(100vh - 80px)' }}
                    // className="w-100 h-100"
                    src="restaurant.jpg"
                    alt="Second slide"
                  />

                  <Carousel.Caption style={captionStyle}>
                    <h3>Restaurants</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    style={{ objectFit: 'cover', width: '100%', height: 'calc(100vh - 80px)' }}
                    // className="w-100 h-100"
                    src="delivery.jpg"
                    alt="Third slide"
                  />

                  <Carousel.Caption style={captionStyle}>
                    <h3>Food Delivery</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div> : <Card
              className="mainBody"
              style={{
                marginTop: isMobile ? '20px' : '40px',
                ...getDeviceStyle()
              }}
            >
              <Body isMobile={isMobile || isTablet} screenWidth={width} />
            </Card>
          } />

          <Route path="/pairing" element={
            <PairingTool />
          }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
