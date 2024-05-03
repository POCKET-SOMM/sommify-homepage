import BulletPoint from './components/BulletPoint';
import Section from './components/Section';
import Button from './components/Button';
import bg from './assets/stripe.mp4';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Modal from 'react-modal';
import ContactUs from './components/ContactUs';
import CalendarButton from './components/CalendarButton';

import Polygon from './assets/polygon.svg';
import Button2 from './components/Button2';
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendar,
  FaVideo,
} from 'react-icons/fa';
import { useDimensions } from './hooks';
import Header from './components/Header';
import ModalBooking from './components/ModalBooking';
import ModalContactUs from './components/ModalContactUs';
import { BsArrowRight } from 'react-icons/bs';
import LogoLink from './components/LogoLink';
import Carousel from './components/Carousel';

import press from './data/press';
import partners from './data/partners';

function App() {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const { sm, md, lg } = useDimensions();

  // useEffect(() => {
  //   var vid = document.getElementById('vid');
  //   vid.addEventListener('timeupdate', function () {
  //     if (this.currentTime >= 20.0) {
  //       this.currentTime = 0.0;
  //     }
  //   });
  // }, []);

  return (
    <div id='content'>
      {/* <div
        style={{
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          height: sm ? '45vh' : '50vh',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <video
          id='vid'
          autoPlay
          muted
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            filter: 'hue-rotate(50deg) brightness(1.2)',
          }}
        >
          <source src={bg} type='video/mp4' />
        </video>
        <img
          src={Polygon}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
        />
        {sm ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              background:
                'linear-gradient(180deg, rgba(256, 256, 256, 0) 50%, rgba(256, 256, 256, 1) 95%)',
              width: '100%',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              bottom: -300,
              left: '15%',
              width: 1200,
              background: 'white',
              height: 600,
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
        )}
      </div> */}

      <Header
        bookACall={() => {
          setBookingOpen(true);
        }}
      />
      <h1
        style={{
          fontWeight: 600,
          lineHeight: 1.25,
          marginBottom: '1.6em',
          marginTop: sm ? '20vh' : 250,
        }}
      >
        {/* We have built an  */}
        {!sm ? 'AI sommelier helping ' : 'Helping '}
        companies sell wine through memorable experiences
      </h1>
      {/* <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          marginBottom: 100,
        }}
      >
        <Button>Try our tech</Button>
      </div> */}

      <Section title='What are the problems* sommify is solving?'>
        <BulletPoint>
          72% of customers would <b>pay more</b> for wine if it were exactly
          paired to their needs
        </BulletPoint>
        <BulletPoint>
          80% of customers buy wine based on the label or price because of a{' '}
          <b>lack of information</b>
        </BulletPoint>
        <BulletPoint>
          54% of wine consumers are <b>afraid to ask</b> questions they want
          about wine
        </BulletPoint>
      </Section>
      <Section title='Why work with sommify on solving the problems?'>
        <Carousel elements={[...partners, ...partners]} />

        {/* <div
          style={{
            padding: '16px 0px',
            borderRadius: 6,
            display: 'inline-flex',
            flexWrap: 'wrap',
            marginInline: 20,
            marginBottom: 16,
            // maxHeight: 50,
            overflowY: 'hidden',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          {[
            { src: Tesco, alt: '', width: 'auto', height: 26 },
            { src: Edamam, alt: '', width: 'auto', height: 32 },
            { src: WinePlanet, alt: '', width: 'auto', height: 60 },
          ].map((img, i) => (
            <div
              style={{
                width: 180,
                height: 60,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                filter: 'brightness(0)'
              }}
            >
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                style={{
                  width: img.width,
                  height: img.height,
                }}
              />
            </div>
          ))}
        </div> */}

        <BulletPoint list>
          We are trusted by <b>Tesco</b> and other technological pioneers in the
          industry
        </BulletPoint>
        <BulletPoint list>
          Our AI is built on <b>20+ years of wine expertise</b> of Julie Dupouy,
          a world-class sommelier
        </BulletPoint>
        <BulletPoint list>
          50%+ <b>higher average bottle price</b> sold through our solution than
          store average during pilots
        </BulletPoint>
        <BulletPoint list>
          95% of the 1k+ people that have tested our solution would{' '}
          <b>like our solutions</b> to be a part of their purchase experience
        </BulletPoint>
        <BulletPoint list>
          <b>1+mil wine-food pairings</b> already done for our customers
        </BulletPoint>
        <BulletPoint list>
          Backed by investors like <a href='https://heino.fi'>Heino Group</a>{' '}
          with a focus on the food & drink industry
        </BulletPoint>
      </Section>
      <Section title='How is sommify solving the problems?'>
        <BulletPoint>
          <b>Automate pairing:</b> We pair your wines to your meals/recipes and
          vice versa
        </BulletPoint>
        <BulletPoint>
          <b>Data generation:</b> We analyze your wines and give you data to
          optimize search and offer information about what you are selling
        </BulletPoint>
        <BulletPoint>
          <b>Help customers find the right wine:</b> They can ask questions like{' '}
          <i>“wine for pasta alla norma for under 20€ from France”</i> and get
          wines suggested from your portfolio
        </BulletPoint>
        <BulletPoint>
          We also build unique custom experiences for enterprise customers
        </BulletPoint>
      </Section>
      <Section title='Engage with us'>
        <BulletPoint>
          <b>Reach out:</b>{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDialogueOpen(true);
            }}
          >
            Contact us
          </mark>{' '}
          or{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBookingOpen(true);
            }}
          >
            set up a call
          </mark>
        </BulletPoint>
        <BulletPoint>
          <b>Refer:</b> Introduce us to someone who needs our solution for a
          deal cut
        </BulletPoint>
        <BulletPoint>
          <b>Try:</b> Check out our solutions on the{' '}
          <a href='https://playground.sommify.ai' target='_blank'>
            demo page
          </a>
        </BulletPoint>
      </Section>

      <Section title='As seen on'>
        <Carousel elements={press} />
      </Section>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: 50,
          maxWidth: 644,
        }}
      >
        <Button2
          onClick={() => {
            window.open('https://docs.sommify.ai', '_blank');
          }}
          primary
        >
          <FaChevronLeft style={{ marginRight: 6 }} />
          Read docs
        </Button2>
        <Button2
          primary
          onClick={() => {
            window.open('https://playground.sommify.ai', '_blank');
          }}
        >
          Try our tech <FaChevronRight style={{ marginLeft: 6 }} />
        </Button2>
      </div> */}

      <Footer />

      <ModalContactUs
        isOpen={dialogueOpen}
        close={() => setDialogueOpen(false)}
      />

      <ModalBooking
        isOpen={bookingOpen}
        close={() => {
          setBookingOpen(false);
        }}
      />

      <CalendarButton />
    </div>
  );
}

export default App;
