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
        AI sommelier for wine sales
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

      <Section title='What solutions does sommify offer?'>
        <BulletPoint list>
          <a href='https://playground.sommify.ai' target='_blank'>
            For retailers
          </a>{' '}
          we increase sales through accessibility (chatbots, avatars, automated
          wine-food pairing and data enhancement)
        </BulletPoint>
        <BulletPoint list>
          <a href='https://roadshow.sommify.ai' target='_blank'>
            For distributors
          </a>{' '}
          we scale wine sales teams 10x by automating offer creation
        </BulletPoint>
        <BulletPoint list>
          <b>Custom</b> AI experiences are available for enterprise clients.
        </BulletPoint>
      </Section>
      <Section title='Why work with sommify?'>
        <Carousel elements={[...partners, ...partners]} />

        <BulletPoint list>
          We are trusted by <b>Tesco</b> and other technological pioneers in the
          industry
        </BulletPoint>
        <BulletPoint list>
          Our AI is built on over <b>20 years of wine expertise</b> of{' '}
          <a href='https://www.juliedupouy.com/'>Julie Dupouy</a>
        </BulletPoint>
        <BulletPoint list>
          Proven ROI e.g. <b>40% conversion</b> of Tesco recipe shoppers into
          wine purchasers and <b>50%+ higher average bottle price</b> sold
          through our solution than store average during pilots
        </BulletPoint>
        <BulletPoint list>
          Backed by <b>investors with a food & drink focus</b> like{' '}
          <a href='https://heino.fi'>Heino Group</a>{' '}
        </BulletPoint>
      </Section>
      {/* <Section title='How is sommify solving the problems?'>
        <BulletPoint>
          <b>Automate pairing:</b> We pair your wines to your meals/recipes and
          vice versa
        </BulletPoint>
        <BulletPoint>
          <b>Data generation:</b> We analyze your wines and give you data to
          optimize search and offer information about what you are selling
        </BulletPoint>
        <BulletPoint>
          <b>Help customers find the right wine:</b> Combining our world-class
          AI sommelier, an LLM and your store’s inventory we have built the
          ultimate advisor chat for your online or in-store experience
        </BulletPoint>
        <BulletPoint>
          We also build unique custom experiences for enterprise customers
        </BulletPoint>
      </Section> */}
      <Section title='Engage with us'>
        <BulletPoint>
          <b>Explore</b> our{' '}
          <a href='https://playground.sommify.ai' target='_blank'>
            retailer
          </a>{' '}
          or{' '}
          <a href='https://roadshow.sommify.ai' target='_blank'>
            distributor
          </a>{' '}
          demos and share your feedback.
        </BulletPoint>
        <BulletPoint>
          <b>Adopt</b> our technology and become a customer by{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBookingOpen(true);
            }}
          >
            booking a call
          </mark>{' '}
          or{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDialogueOpen(true);
            }}
          >
            contacting us
          </mark>
        </BulletPoint>
        <BulletPoint>
          <b>Partner</b> with us to enhance your digital offering, we also offer
          revenue share models.
        </BulletPoint>
        <BulletPoint>
          <b>Refer:</b>{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDialogueOpen(true);
            }}
          >
            Introduce us
          </mark>{' '}
          to someone who needs our solution for a deal cut
        </BulletPoint>
      </Section>

      <Section title='Featured in'>
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
