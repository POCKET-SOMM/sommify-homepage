import './App.scss';
import React, { useEffect, useState } from 'react';
import Body from './components/Body';
import { Card, Carousel, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PairingTool from './components/PairingTool/PairingTool';
import AboutUs from './components/AboutUs';
import DemoGuide from './components/DemoGuide';
import ContactUs from './components/ContactUs';

const MAIN_COLOR = '#e7154e'
const SECONDARY_COLOR = '#fce3ee'
export const MAIN_COLOR_DEP = '#80183b'

export const SERVER_URL = 'https://pocketsommapi.azurewebsites.net'

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const [pane, setPane] = useState('')

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
    left: '300px',
    textAlign: 'left'
  }

  const getDeviceStyle = () => {
    if (isMobile)
      return mobileStyle
    if (isTablet)
      return tabletStyle
    return desktopStyle
  }

  function Logo() {
    return (
      <img
        style={{
          objectFit: 'cover',
          position: 'absolute',
          left: '0px',
          right: '0px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        onClick={e => { window.location.replace('/') }}
        className="clickable nodrag"
        src="PocketSomm.LOGO.svg"
        width="230px"
        height="80px">
      </img>
    )
  }

  function handleNavClick(l) {
    pane === l ? setPane('') : setPane(l)
  }

  function Content() {
    if (pane === 'ABOUT US') {
      return (<AboutUs />)
    }
    if (pane === 'DEMO GUIDE') {
      return (<DemoGuide />)
    }
    if (pane === 'CONTACT US') {
      return (<ContactUs />)
    }
    return null
  }

  const CarouselItems = [
    { img: 'winestore.jpg', title: 'Online Wine Store', text: 'Selling wine online? Let PocketSomm help create the customer experience of a brick-and-mortar location with quality pairing advice.' },
    { img: 'homecook.jpg', title: 'Smart Home', text: 'Imagine a world in which you have a world-class sommelier at home advising you on which bottle from your wine cooler pairs the best with the meals possible from the ingredients in your refrigerator.' },
    { img: 'delivery.jpg', title: 'Food Delivery', text: 'Whether you are offering food boxes or delivery from restaurants PocketSomm offers the opportunity to cross-sell wine or just enhance the experience.' },
    { img: 'retail.webp', title: 'Add-On', text: 'You might already have an app or website that relates to food, like a grocery chain, where you want to enhance the customer experience or drive sales.' },
    { img: 'other.jpg', title: 'Other', text: 'The possibilities are endless; the only barriers are your imagination and local alcohol regulation...' }
  ]

  return (
    <div className="App">
      <Navbar
        className="nodrag"
        variant="dark"
        id="body-logo"
        style={{
          zIndex: 6,
          // boxShadow: '0px 11px 17px 2px rgba(0,0,0,0.45)',
          height: '80px',
          backgroundColor: MAIN_COLOR_DEP
        }}
      >
        <Nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          fontSize: '14px',
          width: '100%'
        }}>
          {
            isDesktop ? ['ABOUT US', 'DEMO GUIDE'].map(l =>
              <Nav.Item>
                <Nav.Link active={pane === l} onClick={e => { handleNavClick(l) }} style={{ width: '130px', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>{l}</Nav.Link>
              </Nav.Item>
            ) : null
          }
          <Logo />
        </Nav>
      </Navbar>

      {
        isDesktop ? <Offcanvas style={{
          width: '42%',
          backgroundColor: '#1f202b',
          borderColor: '#393b4d',
          borderRightStyle: 'solid',
          borderWidth: '1px',
          zIndex: 5,
          color: 'white',
          padding: '40px',
          textAlign: 'left',
        }} backdrop backdropClassName='custom-backdrop' scroll={true} show={pane} onHide={e => { setPane('') }}>
          <div style={{ width: '100%', height: '80px' }}></div>
          <div style={{ height: 'calc(100%)', width: '100%', overflowY: 'auto' }}>
            <Content />
          </div>
        </Offcanvas> : null
      }

      {/* <div id="dropdown-banner" style={{
        display: pane ? '' : 'none',
        position: 'absolute',
        top: '80px',
        left: '0%',
        width: '45%',
        height: 'calc(100vh - 80px)',
        backgroundColor: '#1f202b',
        borderColor: '#12131a',
        borderTopWidth: '0px',
        borderRightStyle: 'solid',
        borderWidth: '1px',
        zIndex: 5,
        color: 'white',
        padding: '40px',
        textAlign: 'left',
        overflowY: 'auto'
      }}>
        <Content />
      </div> */}
      {/* <Navbar variant="dark" style={{ fontSize: '12px', height: '26px', backgroundColor: '#171717', justifyContent:'center' }}>
        <Nav>
          <Nav.Link style={{ marginRight:'20px', width: '140px', alignItems: 'center', justifyContent: 'end', display: 'flex' }}>ABOUT US</Nav.Link>
          <Nav.Link style={{ marginLeft:'20px', width: '140px', alignItems: 'center', justifyContent: 'start', display: 'flex' }}>DEMO</Nav.Link>
        </Nav>
      </Navbar> */}
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
              <Carousel interval={8500} indicatorLabels={[1, 2, 3]} style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
                {
                  CarouselItems.map((item, i) =>
                    <Carousel.Item>
                      <div style={{
                        background: `linear-gradient(to top, rgba(59,62,79,0.8), rgba(59,62,79,0.8)), url(${item.img}) no-repeat top center`,
                        // backgroundImage: `url(${item.img})`,
                        backgroundSize: 'cover',
                        width: '100%',
                        height: 'calc(100vh - 80px)'
                      }}>

                      </div>
                      {/* <img
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: 'calc(100vh - 80px)'
                        }}
                        // className="w-100 h-100"
                        src={item.img}
                        alt={`Slide ${i}`}
                      /> */}
                      <Carousel.Caption style={captionStyle}>
                        <h3>{item.title}</h3>
                        <p style={{ fontStyle: 'italic' }}>{item.text}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                }
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
