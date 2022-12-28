import './App.scss';
import AboutUs from './components/AboutUs';
import Guide from './components/Guide';
import Team from './components/Team';
import Widget from './components/Widget';
import colors from './data/colors';
import logo from './assets/logo_white.png';
import bgImage from './assets/bg.jpg';
import bgImage2 from './assets/bg2.jpg';
import { CgAirplane } from 'react-icons/cg';
import { SiCrunchbase, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import { Button } from 'react-bootstrap';

export const Logo = ({ fontSize }) => (
  <div style={{ color: colors.primary, fontSize }} className='d-flex px-2'>
    <div className='h-100' style={{ fontWeight: 600 }}>
      SOMMIFY
    </div>
    <div
      className='h-100'
      style={{ color: colors.primary, fontWeight: 300, opacity: 0.33 }}
    >
      AI.
    </div>
  </div>
);

function App() {
  const ContactRow = ({ icon, title, content }) => (
    <div className='d-flex px-2' style={{ flex: 1 }}>
      <div
        className='d-flex justify-content-center align-items-center rounded-circle'
        style={{
          width: '50px',
          height: '50px',
          background: '#e5e5e5',
          color: '#404040',
        }}
      >
        {icon}
      </div>
      <div className='d-flex flex-column text-start mx-3'>
        <div
          className='d-flex align-items-center'
          style={{ fontWeight: 600, flex: 1 }}
        >
          {title}
        </div>
        {content && <div style={{ flex: 1 }}>{content}</div>}
      </div>
    </div>
  );

  return (
    <div className='d-flex flex-column'>
      <div style={{ backgroundImage: 'url(' + bgImage2 + ')' }}>
        <div
          className='d-flex justify-content-center align-items-center position-relative py-4'
          style={{
            color: '#252525',
            marginLeft: 200,
            marginRight: 200,
          }}
        >
          <Logo fontSize='40px' />
        </div>
        <div
          className='d-flex w-100 justify-content-between'
          style={{
            paddingInline: '200px',
            height: '85vh',
          }}
        >
          <div className='d-flex justify-content-center align-items-center'>
            <div>
              <h1 style={{ fontWeight: 700 }}>
                The <span className='text-primary'>AI</span> sommelier.
              </h1>
              <h3 style={{ fontWeight: 300 }}>
                Making quality pairings accessible
              </h3>
            </div>
          </div>
          <div className='d-flex flex-column' style={{ height: '100%' }}>
            <div
              style={{ flex: 1 }}
              className='d-flex justify-content-center align-items-center'
            >
              <div
                style={{
                  width: '450px',
                  background: 'white',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '20px 20px 40px -5px #00000025',
                  color: '#202020',
                }}
              >
                <Widget />
              </div>
            </div>
          </div>
        </div>
        <div
          className='d-flex justify-content-center align-items-center'
          style={{
            padding: '25px 200px 200px 200px',
            width: '100%',
            color: '#f0f0f0',
          }}
        >
          <div
            className='text-start overflow-hidden'
            style={{
              width: '100%',
              background: colors.primary,
              color: colors.primaryLight,
              borderRadius: '20px',
              padding: 100,
            }}
          >
            <h1 className='my-5' style={{ fontWeight: 700 }}>
              Get to know us
            </h1>
            <div className='w-100 mb-5 mt-2 d-flex justify-content-center align-items-center'>
              <ContactRow
                title={'Email us at:'}
                content={'jacob@sommify.ai'}
                icon={<SiMinutemailer size={30} />}
              />
              <ContactRow
                title={
                  <span>
                    Check out our{' '}
                    <a
                      className='clickable'
                      onClick={() => {
                        window.open(
                          'https://www.linkedin.com/company/sommifyai'
                        );
                      }}
                    >
                      Linkedin.
                    </a>
                  </span>
                }
                // content={'partner@sommify.ai'}
                icon={<SiLinkedin size={30} />}
              />
              <ContactRow
                title={
                  <span>
                    Check out our{' '}
                    <a
                      className='clickable'
                      onClick={() => {
                        window.open(
                          'https://www.crunchbase.com/organization/sommifyai'
                        );
                      }}
                    >
                      Crunchbase.
                    </a>
                  </span>
                }
                // content={'partner@sommify.ai'}
                icon={<SiCrunchbase size={30} />}
              />
            </div>
          </div>
        </div>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{
            padding: '25px 200px 200px 200px',
            width: '100%',
          }}
        >
          <h1 className='mb-5' style={{ fontSize: '50px' }}>
            What we do
          </h1>
          <p style={{ fontSize: '24px', lineHeight: '40px' }}>
            We are creating an <b>artificial intelligence sommelier</b> making
            quality pairings accessible. The AI somm is built on the world-class
            wine knowledge of Julie Dupouy and it will be packaged as an API.
            The API will be able to populate meals on apps and websites with the
            right wines or their silhouettes. To find out how we can{' '}
            <b>sommify</b> your digital wine experience, download our deck.
          </p>
          <div className='py-5'>
            <Button
              size='lg'
              variant='secondary'
              onClick={() => {
                window.open(
                  'https://drive.google.com/file/d/1kFP_qyReKTbxi7sNvFlfTNxcD0pVrvPu/view?usp=sharing'
                );
              }}
              style={{
                letterSpacing: 5,
                fontWeight: 600,
                padding: '20px 40px',
                color: '#f0f0f0',
              }}
            >
              <span style={{ fontWeight: 300 }}>GO TO</span> DECK
            </Button>
          </div>
        </div>
      </div>
      <div
        className='d-flex p-5'
        style={{
          width: '100%',
          background: '#252525',
          color: 'white',
        }}
      >
        <Team />
      </div>
      <div
        className='d-flex justify-content-center align-items-center text-center flex-column'
        style={{
          background: 'black',
          width: '100%',
          height: '300px',
          color: '#707070',
        }}
      >
        <span className='d-block'>Design by tomas@sommify.ai </span>
        <span className='d-block' style={{ fontWeight: 600, fontSize: 20 }}>
          {' '}
          [ACTUAL DESIGN PENDING]
        </span>
      </div>
    </div>
  );
}

export default App;
