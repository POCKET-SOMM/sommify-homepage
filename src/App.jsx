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
  FaCaretDown,
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
import Dropdown from './components/Dropdown';
import { LuLogOut } from 'react-icons/lu';
import LogoScroller from './components/LogoScroller';
import LogoMarquee from './components/LogoMarquee';

import AgentBackground from './assets/product/AgentBackground.jpg';
import AgentGenerate from './assets/product/AgentGenerate.png';
import AgentBrowse from './assets/product/AgentBrowse.png';

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
      <div className='w-full'>
        <h1
          style={{
            lineHeight: 1.25,
            marginBottom: '1.4em',
            marginTop: sm ? '20vh' : 250,
            marginInline: 'auto',
          }}
        >
          {/* We built an
          <br /> */}
          AI sommelier for wine sales.
        </h1>
      </div>

      {/* <div className='flex justify-center mb-8'>
        <div className='p-1 rounded-full bg-slate-50 flex gap-1'>
          <div className='cursor-pointer h-12 w-36 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center font-medium'>
            Distributor
          </div>
          <div className='cursor-pointer hover:bg-slate-100 h-12 w-36 rounded-full flex items-center justify-center font-medium'>
            Retail
          </div>
        </div>
      </div>

      <div className='w-full bg-red-100 rounded-xl overflow-hidden mb-24 relative flex h-[600px]'>
        <div className='bg-slate-50 w-[400px] top-0 left-0 flex flex-col items-start justify-center p-12'>
          <span className='text-3xl font-[450] mb-10 mt-auto'>Agent</span>
          <p className='text-xl font-[450] mb-24'>
            Sell wines smarter with automated pairing
          </p>
          <span className='text-base font-[450] flex items-center gap-4 p-3 px-5 rounded-full bg-slate-100 mx-auto mt-auto'>
            Visit platform <FaChevronRight className='text-xs' />
          </span>
        </div>
        <div className='flex-1 h-full bg-red-200 relative'>
          <img
            src={AgentBackground}
            className='absolute h-full w-full object-cover z-0'
          />

          <div className='w-full h-full absolute flex items-center justify-center z-10'>
            <img
              src={AgentBrowse}
              className='h-5/6 rounded-lg absolute shadow-xl'
              style={{ transform: 'translate(-100px, -30px)' }}
            />
            <img
              src={AgentGenerate}
              className='h-4/5 rounded-lg absolute shadow-xl border border-slate-100'
              style={{ transform: 'translate(100px, 30px)' }}
            />
          </div>
        </div>
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
          <b>Custom</b> AI experiences are available for enterprise clients
        </BulletPoint>
      </Section>
      <Section title='Why work with sommify?'>
        {/* <Carousel elements={[...partners, ...partners]} /> */}
        <LogoMarquee elements={[...partners, ...partners]} />

        <BulletPoint list>
          We are trusted by <b>Tesco</b> and other technological pioneers in the
          industry
        </BulletPoint>
        <BulletPoint list>
          Our AI is built on over <b>20 years of wine expertise</b> of{' '}
          <a href='https://www.juliedupouy.com/' target='_blank'>
            Julie Dupouy
          </a>
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
        {/* <Carousel elements={press} /> */}
        <LogoMarquee elements={press} />
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
