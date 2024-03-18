import BulletPoint from './components/BulletPoint';
import Section from './components/Section';
import Button from './components/Button';
import bg from './assets/stripe.mp4';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Modal from 'react-modal';
import ContactUs from './components/ContactUs';
import CalendarButton from './components/CalendarButton';
import Tesco from './assets/tesco.svg';
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

function App() {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const { sm, md, lg } = useDimensions();

  useEffect(() => {
    var vid = document.getElementById('vid');
    vid.addEventListener('timeupdate', function () {
      if (this.currentTime >= 20.0) {
        this.currentTime = 0.0;
      }
    });
  }, []);

  return (
    <div id='content'>
      <div
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
              // bottom: 0,
              // borderRadius: 999,
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
      </div>

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
        companies sell wine through{' '}
        <span style={{ color: '#8a939d' }}>memorable experiences</span>
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

      <Section title='What are the problems sommify is solving?'>
        <BulletPoint>
          72% of customers would <b>pay more</b> for wine if it were exactly
          paired to their needs
        </BulletPoint>
        <BulletPoint>
          Because of a <b>lack of information</b>, 80% of customers buy wine
          based on the label or price
        </BulletPoint>
        <BulletPoint>
          54% of wine consumers are <b>afraid to ask questions</b> they want
          about wine
        </BulletPoint>
      </Section>
      <Section title='Why work with sommify on solving the problems?'>
        <div
          style={{
            padding: '16px 0px',
            // border: '1px solid #000000',
            borderRadius: 6,
            display: 'inline-flex',
            marginInline: 20,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            // width: '100%',
            // boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={Tesco}
            alt=''
            width={'auto'}
            height={26}
            style={{
              filter: 'invert(1)',
            }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 24,
              fontSize: 14,
              opacity: 0.6,
            }}
          >
            more coming soon...
          </div>

          {/* <div style={{ display: 'flex', position: 'relative' }}>
            {[1, 2].map((i) => (
              <div
                style={{
                  border: '1px dashed #ffffff',
                  width: 100,
                  height: 50,
                  borderRadius: 9,
                  marginLeft: 24,
                  filter: 'blur(5px)',
                }}
              ></div>
            ))}

            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: '#50555a',
              }}
            >
              more coming soon...
            </span>
          </div> */}
        </div>

        <BulletPoint>
          We are trusted by <b>Tesco</b> and other technological pioneers in the
          industry
        </BulletPoint>
        <BulletPoint>
          Our AI is built on <b>20+ years of wine expertise</b> of Julie Dupouy,
          a world-class sommelier
        </BulletPoint>
        <BulletPoint>
          50%+ <b>higher average bottle cost</b> added to cart through our
          solution than store average during pilots
        </BulletPoint>
        <BulletPoint>
          95% of the 1k+ people we have interviewed in the 🇳🇱 Netherlands, 🇺🇸 US
          and 🇬🇧 UK would <b>like our solutions</b> to be a part of their
          purchase experience
        </BulletPoint>
        <BulletPoint>
          <b>1+mil wine-food pairings</b> already done for our customers
        </BulletPoint>
        <BulletPoint>
          <b>60k wines</b> and 1.5mil recipes were used to train the AI
        </BulletPoint>
        <BulletPoint>
          Backed by investors like <b>Heino Group</b> with a focus on the food &
          drink industry
        </BulletPoint>
      </Section>
      <Section title='What sommify currently does to solve the problems'>
        <BulletPoint>
          <b>🤖 Automate pairing:</b> We pair your wines to your meals/recipes
          and vice versa
        </BulletPoint>
        <BulletPoint>
          <b>⚡ Data generation:</b> We analyze your wines and we liven them up
          with data we know customers need to make purchase decisions
        </BulletPoint>
        <BulletPoint>
          <b>🔎 Help customers find the right wine:</b> They can ask questions
          like <i>“wine for pasta alla norma for under 20€ from France”</i> and
          get wines suggested from your portfolio
        </BulletPoint>
        <BulletPoint dehighlight>
          We also build unique customer experiences for enterprise
        </BulletPoint>
      </Section>
      <Section title='Engage with us'>
        <BulletPoint>
          <b>💬 Discuss:</b> Speak with us by{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDialogueOpen(true);
            }}
          >
            contacting us
          </mark>{' '}
          or{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBookingOpen(true);
            }}
          >
            setting up a call
          </mark>
        </BulletPoint>
        <BulletPoint>
          <b>💰 Refer:</b> Warm intro to get 20% of deal value by{' '}
          <mark
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setDialogueOpen(true);
            }}
          >
            contacting us
          </mark>{' '}
        </BulletPoint>
        <BulletPoint>
          <b>🕹️ Try:</b> Check out our{' '}
          <a href='https://playground.sommify.ai' target='_blank'>
            demo page
          </a>
        </BulletPoint>
      </Section>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: 50,
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
      </div>

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
