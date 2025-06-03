import { useState } from 'react';
import Footer from './components/Footer';
import CalendarButton from './components/CalendarButton';
import { FaChevronRight } from 'react-icons/fa';
import { useDimensions } from './hooks';
import Header from './components/Header';
import ModalBooking from './components/ModalBooking';
import ModalContactUs from './components/ModalContactUs';
import partners from './data/partners';
import LogoMarquee from './components/LogoMarquee';

import AgentBackground from './assets/product/AgentBackground2.jpg';
import AgentGenerate from './assets/product/AgentGenerate.png';
import AgentBrowse from './assets/product/AgentBrowse.png';
import Avatar from './assets/product/Avatar.png';
import WineBottle from './assets/product/WineBottle.webp';

import Laurel from './assets/emoji/laurel.png';
import Brick from './assets/emoji/brick.png';
import Rocket from './assets/emoji/rocket.png';
import Spyglass from './assets/emoji/spyglass.png';
import Briefcase from './assets/emoji/briefcase.png';
import { MdArrowOutward } from 'react-icons/md';
import { FaCheck, FaLinkedin } from 'react-icons/fa6';
import Button from './components/Button';
import Button2 from './components/Button2';
import ButtonFlat from './components/ButtonFlat';
import { AnimatePresence, delay, motion } from 'framer-motion';
import press from './data/press';
import WordRoller from './components/WordRoller';
import { ReactTyped } from 'react-typed';
import StepLadder from './components/StepLadder';

const words = [
  'scalable',
  'data-driven',
  'increased',
  'expert',
  'easy',
  'automated',
  '10x',
];

const ModeSwitcher = ({ key, mode, setMode }) => {
  return (
    <div className='p-1 rounded-full bg-slate-50 text-slate-600 flex gap-1 relative'>
      {/* Active background with layout animation */}
      <motion.div
        // layout
        layoutId={key}
        className='absolute rounded-full bg-white border border-slate-100 shadow-sm'
        initial={false}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1], // easeInOut
        }}
        style={{
          width: '9rem', // w-36
          height: '3rem', // h-12
          top: '0.25rem',
          left: mode === 'distributor' ? '0.25rem' : 'calc(9rem + 0.5rem)',
        }}
      />

      {/* Distributor button */}
      <div
        className={`cursor-pointer h-12 w-36 rounded-full flex items-center justify-center font-medium z-10 ${
          mode === 'distributor' ? 'text-slate-800' : 'hover:text-slate-800'
        }`}
        onClick={() => setMode('distributor')}
      >
        Distributor
      </div>

      {/* Retail button */}
      <div
        className={`cursor-pointer h-12 w-36 rounded-full flex items-center justify-center font-medium z-10 ${
          mode === 'retail' ? 'text-slate-800' : 'hover:text-slate-800'
        }`}
        onClick={() => setMode('retail')}
      >
        Retail
      </div>
    </div>
  );
};

function App() {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mode, setMode] = useState('distributor'); // 'distributor' or 'retail'

  const { sm, md, lg } = useDimensions();

  const product = {
    distributor: {
      title: 'Distributor Agent',
      description:
        '10x your on-trade wine sales team by automating offer and material creation',
      actions: [
        { label: 'Try demo', href: 'https://roadshow.sommify.ai' },
        {
          label: 'Demo video',
          href: 'https://www.youtube.com/watch?v=56tS1MnntOE',
        },
      ],
      bg: AgentBackground,
      fg: (
        <div className='w-full h-full absolute flex items-center justify-center z-10'>
          <div
            style={{
              transform: lg
                ? 'translate(-100px, -30px)'
                : 'translate(-50px, -30px)',
            }}
            className='rounded-xl absolute h-5/6 p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'
          >
            <img
              src={AgentBrowse}
              className='h-full rounded-lg shadow-xl'
              style={{
                // offset image by 2px (top 2px are a gray line i want gone)
                transform: 'translateY(-2px)',
              }}
            />
          </div>
          <div
            style={{
              transform: lg
                ? 'translate(100px, 30px)'
                : 'translate(100px, 30px)',
            }}
            className='rounded-xl absolute h-4/5 p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'
          >
            <img src={AgentGenerate} className='h-full shadow-xl rounded-lg' />
          </div>
        </div>
      ),
      steps: [
        'Give us your wine portfolio as a feed or file',
        'Receive your own agent domain for log in',
        'Start selling and giving us feedback',
      ],
      plans: [
        {
          price: '€350',
          emoji: Spyglass,
          title: 'Early Adopter',

          period: '/per month',
          icon: null,
          features: [
            'Unlimited wine offers',
            'Unlimited customer interactions',
            'Access to all features',
            'Dedicated support',
            'Custom integrations',
          ],
          action: {
            label: 'Try demo',
            href: 'https://roadshow.sommify.ai',
          },
        },
        {
          price: 'Custom',
          emoji: Briefcase,
          title: 'Enterprise',
          // period: 'based on usage',
          icon: null,
          features: [
            'Advanced customization',
            'Integration capabilities',
            'Any language supported',
            'Role-based analytics',
            'Trainings on use',
          ],
          action: {
            label: 'Talk to a founder',
            onClick: () => {
              setBookingOpen(true);
            },
          },
        },
      ],
    },
    retail: {
      title: 'Retail Avatar',
      description:
        'Empower your customers with personalized wine recommendations and offers',
      actions: [
        { label: 'Try demo', comingSoon: true },
        {
          label: 'Demo video',
          href: 'https://youtube.com/shorts/jA6zDVFgKQ0',
        },
      ],
      bg: AgentBackground,
      fg: (
        <div className='w-full h-full absolute flex items-center justify-center z-10'>
          <div
            style={{
              transform: lg ? 'translate(-100px, 0px)' : 'translate(0px, 0px)',
            }}
            className='rounded-xl absolute h-[50%] min-h-[400px] p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'
          >
            <img src={Avatar} className='rounded-lg shadow-2xl h-full w-auto' />

            {lg && (
              <div className='w-[380px] text-sm flex flex-col gap-4 items-start justify-center ml-6 absolute left-[55%] top-[20%] font-[450]'>
                <div className='ml-6 p-4 px-6 rounded-[36px] rounded-tr-lg border border-blue-100 bg-blue-50 text-blue-700 flex flex-col'>
                  <span className='text-xs mb-1 font-[550]'>Customer</span>
                  "Can you recommend a bottle of red for my boss?"
                </div>
                <div className='mr-6 p-4 px-6 mb-6 rounded-[36px] rounded-tl-lg shadow-md bg-blue-600 text-white flex flex-col'>
                  <span className='text-xs mb-1 font-[550]'>Avatar</span>
                  "Sure thing! Here's what I would recommend..."
                </div>

                <div className='flex p-4 w-[320px] rounded-md shadow-lg bg-white text-slate-800 items-start gap-2'>
                  <img
                    src={WineBottle}
                    className='mr-4 h-[96px] w-[40px] object-cover'
                  />

                  <div className='flex flex-col align-start h-full'>
                    <span className='text-sm font-[550]'>
                      Barossa Valley Shiraz
                    </span>
                    <span className='text-xs text-slate-500 mb-8'>
                      2017, Australia, Barossa Valley
                    </span>

                    <div className='text-sm font-[550] text-slate-800'>
                      €150.00
                    </div>
                    <div className='text-xs font-[450] text-slate-500'>
                      €200.00 / l
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <img
            src={AgentGenerate}
            className='h-4/5 rounded-lg absolute shadow-xl border border-slate-100'
            style={{ transform: 'translate(100px, 30px)' }}
          /> */}
        </div>
      ),
      steps: [
        'Give us your wine portfolio as a feed or file',
        'Receive your avatar domain or iframe',
        'Integrate into the experience you want',
      ],
      plans: [
        {
          price: '€9',
          emoji: Spyglass,
          title: 'Early Adopter',

          period: '/per hour',
          icon: null,
          features: [
            'Customizable avatar',
            'Integration cost case-by-case',
            'Any language supported',
            'Analytics included',
            'Cancel anytime',
          ],
          action: {
            label: 'Talk to a founder',
            onClick: () => {
              setBookingOpen(true);
            },
          },
        },
      ],
    },
  };

  return (
    <div id='content' className='text-slate-800'>
      <Header
        bookACall={() => {
          setBookingOpen(true);
        }}
      />
      <div className='w-full text-center mt-[30vh] mb-16 text-slate-800'>
        {lg && (
          <h1>
            AI sommelier for{' '}
            <ReactTyped
              strings={words}
              typeSpeed={100}
              className='text-slate-400'
              // className='text-blue-600'
              loop={true}
              backDelay={1000}
              backSpeed={50}
            />{' '}
            wine sales.
          </h1>
        )}
        {!lg && (
          <h1
            className='flex flex-col items-center justify-center mb-4'
            style={{ lineHeight: '1.2' }}
          >
            <span>AI sommelier for</span>
            <ReactTyped
              strings={words}
              typeSpeed={100}
              className='text-slate-400'
              // className='text-blue-600'
              loop={true}
              backDelay={1000}
              backSpeed={50}
            />
            <span>wine sales.</span>
          </h1>
        )}
      </div>

      <div className='flex justify-center mb-8'>
        <ModeSwitcher key='first' mode={mode} setMode={setMode} />
      </div>

      <div
        style={{ height: lg ? 750 : 1200 }}
        className='w-full rounded-xl overflow-hidden mb-24 relative flex justify-center bg-gradient-to-br from-slate-50 to-slate-200'
      >
        <div
          style={{
            width: lg ? 460 : '100%',
          }}
        >
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0.0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.0 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              className='w-full h-full flex flex-col items-start justify-center p-8 md:p-12'
            >
              <span className='text-xs font-[450] text-slate-400 mb-2 mt-auto hubot-sans'>
                PRODUCT
              </span>
              <span className='text-3xl font-[450] mb-3'>
                {product[mode].title}
              </span>
              <p className='text-lg font-[400] mb-24'>
                {product[mode].description}
              </p>
              {!lg && (
                <div className='flex-1 w-full relative'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={mode}
                      initial={{
                        opacity: 0.2,
                        x: -15,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.2, x: 40 }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                        // when: 'beforeChildren',
                      }}
                      className='w-full h-full absolute flex items-center justify-center z-10'
                    >
                      {product[mode].fg}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
              <div className='flex gap-2 mb-6 pt-24 mt-auto mx-auto'>
                {product[mode].actions.map((action, index) => (
                  <a href={action.href} target='_blank'>
                    <ButtonFlat
                      key={index}
                      variant={index === 0 ? 'primary' : 'transparent'}
                      // onClick={action.onClick}
                    >
                      {action.label}
                    </ButtonFlat>
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {lg && (
          <div className='flex-1 h-full relative'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={mode}
                initial={{
                  opacity: 0.2,
                  x: -15,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.2, x: 40 }}
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut',
                  // when: 'beforeChildren',
                }}
                className='w-full h-full absolute flex items-center justify-center z-10'
              >
                {product[mode].fg}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className='flex my-64 flex-wrap items-center justify-center gap-16'>
        {lg && (
          <div className='flex-1 flex items-center justify-center'>
            <StepLadder steps={product[mode].steps} />
          </div>
        )}

        <div
          className='flex flex-col justify-center items-center flex-1'
          style={{
            alignItems: lg ? 'start' : 'center',
            textAlign: lg ? 'left' : 'center',
          }}
        >
          <h2>Plug-and-play integration</h2>
          <h3 className='mb-12'>
            {mode === 'distributor' && 'Less that 1 hour of your work required'}
            {mode === 'retail' && 'Onboarding your digital sales staff is easy'}
          </h3>

          {!lg && <StepLadder steps={product[mode].steps} />}

          <div className='flex gap-2'>
            <a href='https://docs.sommify.ai' target='_blank'>
              <ButtonFlat disabled>
                Go to docs{' '}
                <div className='hubot-sans text-[8px] mt-0.5'>SOON</div>{' '}
              </ButtonFlat>
            </a>

            <ButtonFlat
              variant='empty'
              onClick={() => {
                setBookingOpen(true);
              }}
            >
              Talk to a founder
            </ButtonFlat>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center my-64'>
        <h2>Why work with us?</h2>
        <h3>Lead the future of wine with us and our partners</h3>

        <div className='flex gap-5 my-16 flex-wrap items-center justify-center'>
          {[
            {
              // laurel emoji
              emoji: Laurel,
              title: 'Expertise',
              content:
                'AI model is built on 20+ year experience of the world-class sommelier Julie Dupouy and backed by investors with a beverage focus like Heino Group.',
            },
            {
              emoji: Brick,
              title: 'Proven ROI',
              content:
                'Through pilots and partnerships we have proven to increase sales and save time. e.g. 40% conversion of Tesco recipe shoppers into wine purchasers.',
            },
            {
              emoji: Rocket,
              title: 'Future-proof',
              content:
                'The future of the wine industry will be led by those who adopt digital solutions early. Be among the innovative first movers to secure your future.',
            },
          ].map((item, i) => (
            <div className='w-[350px] h-[320px] border border-slate-200 shadow-sm rounded-xl flex flex-col items-center justify-start p-10'>
              {/* <span className='text-6xl mb-8'>{item.emoji}</span> */}
              <img src={item.emoji} className='h-[60px] w-[60px] mb-6' />
              <span className='text-xl font-[550] mb-6'>{item.title}</span>
              <span
                className='text-center font-[400]'
                style={{ lineHeight: '1.2' }}
              >
                {item.content}
              </span>
            </div>
          ))}
        </div>

        <LogoMarquee elements={[...partners, ...partners, ...partners]} />
      </div>

      <div className='flex flex-col items-center justify-center my-64'>
        <h2>Simple pricing.</h2>
        <h3 className='mb-10'>Pay only for what you need, no hidden fees.</h3>

        <div className='flex justify-center mb-16'>
          <ModeSwitcher key='second' mode={mode} setMode={setMode} />
        </div>

        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.175 }}
            className='flex gap-8 flex-wrap items-center justify-center'
          >
            {product[mode].plans.map((plan, i) => (
              <div className='w-[400px] h-[500px] border border-slate-200 shadow-sm overflow-hidden rounded-xl flex flex-col items-center justify-start'>
                <div className='w-full bg-slate-50 flex items-center justify-center gap-4 h-16 border-b border-slate-200'>
                  <img src={plan.emoji} className='h-[30px] w-[30px]' />
                  <span className='font-[450]'>{plan.title}</span>
                </div>
                <div className='w-full flex flex-col items-center justify-start p-4'>
                  {/* <img src={plan.emoji} className='h-[40px] w-[40px] mb-4' /> */}
                  {/* <span className='font-[450] mb-6'>{plan.title}</span> */}
                  <p></p>
                  <div className='w-full pt-3 flex items-end justify-center gap-1'>
                    <span className='text-2xl font-[550] text-slate-800'>
                      <span>{plan.price}</span>
                    </span>
                    <span className='font-[400] text-slate-800 text-sm mb-0.5'>
                      {plan.period}
                    </span>
                  </div>

                  {/* <span className='text-5xl font-[600] mb-1 text-slate-800'>
                  <span>{plan.price}</span>
                </span>
                <span className='font-[400] mb-10 text-slate-800'>
                  {plan.period}
                </span> */}
                </div>
                <ul className='text-left w-full flex flex-col items-start my-auto px-10'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='mb-1'>
                      <span className='w-4 h-4 rounded-full bg-slate-200 inline-flex mr-2 text-slate-800 text-xs items-center justify-center'>
                        <FaCheck />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.action.href}
                  target='_blank'
                  className='mt-auto mb-10'
                >
                  <ButtonFlat onClick={plan.action?.onClick}>
                    {plan.action.label}
                  </ButtonFlat>
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center mt-64 mb-16 bg-slate-50 rounded-xl p-8 lg:p-24 h-[60vh] md:h-52 gap-16'>
        <div className='flex-1 flex items-center '>
          <h2>Engage with us.</h2>
        </div>

        <div className='flex flex-1 flex-col md:flex-row items-stretch gap-2'>
          <ButtonFlat
            onClick={() => {
              setDialogueOpen(true);
            }}
            arrow={false}
          >
            Contact us
          </ButtonFlat>
          <ButtonFlat
            onClick={() => {
              setBookingOpen(true);
            }}
            arrow={false}
          >
            Talk to a founder
          </ButtonFlat>
          {/* <a href='https://www.linkedin.com/company/sommifyai/' target='_blank'> */}
          <ButtonFlat
            arrow={false}
            variant='empty'
            href='https://www.linkedin.com/company/sommifyai/'
          >
            <FaLinkedin className='text-lg' />
            Follow us
          </ButtonFlat>
          {/* </a> */}
        </div>
      </div>

      <LogoMarquee elements={[...press, ...press, ...press]} />

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
