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
import { VscSparkle, VscSparkleFilled } from 'react-icons/vsc';

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
        className='absolute rounded-full bg-white border border-slate-100 shadow-sm h-12 w-36 top-[3px]'
        initial={false}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1], // easeInOut
        }}
        style={{
          left: mode === 'distributor' ? '0.25rem' : 'calc(9rem + 0.5rem)',
        }}
      />

      {/* Distributor button */}
      <div
        className={`cursor-pointer h-12 w-36 rounded-full flex items-center justify-center font-medium z-10 ${mode === 'distributor' ? 'text-slate-800' : 'hover:text-slate-800'
          }`}
        onClick={() => setMode('distributor')}
      >
        Distribution
      </div>

      {/* Retail button */}
      <div
        className={`cursor-pointer h-12 w-36 rounded-full flex items-center justify-center font-medium z-10 ${mode === 'retail' ? 'text-slate-800' : 'hover:text-slate-800'
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
      title: 'Sommify Agent',
      description:
        'Assistant for your B2B wine sales team that builds the perfect offer, generates sales materials and helps your customers sell your wines.',
      subtext:
        'Built on the wine knowledge of world-class sommelier Julie Dupouy.',
      actions: [
        { label: 'Try demo', href: 'https://roadshow.sommify.ai' },
        {
          label: 'Demo video',
          // href: 'https://youtu.be/tEZ78X2Kv0Q',
          href: 'https://youtu.be/uwlT4ZjH0uM'
        },
      ],
      bg: AgentBackground,
      fg: (
        <div className='w-full h-full relative flex items-center justify-start z-10 min-h-[600px] px-16'>
          <div className='h-[500px] relative'>
            <div className='h-[500px] w-[350px] absolute top-0 left-0 rounded-xl p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'>
              <img
                src={AgentBrowse}
                className='rounded-lg shadow-xl w-full h-full'
              />
            </div>
            <div
              style={{
                transform: lg
                  ? 'translate(150px, 70px)'
                  : 'translate(120px, 50px)',
              }}
              className='rounded-xl w-[320px] absolute p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'
            >
              <img
                src={AgentGenerate}
                className='h-full shadow-xl rounded-lg'
              />
            </div>
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
          price: '€99',
          emoji: Spyglass,
          title: (
            <span className='italic'>
              First user (Admin)
            </span>
          ),

          period: '/per month',
          icon: null,
          features: [
            'Free integration',
            'No fixed term, cancel anytime',
            'Unlimited offers',
            'Unlimited material generation',
            'Custom sales presentation',
            'Custom filters',
            'Analytics',
            'Direct customer support link',
          ],
          action: {
            label: 'Try demo',
            href: 'https://roadshow.sommify.ai',
          },
        },
        {
          price: '€49',
          period: '/per month',
          emoji: Briefcase,
          title: (
            <span className='italic'>
              Every additional user
            </span>
          ),
          icon: null,
          features: [
            'Unlimited offers',
            'Unlimited material generation',
            'Order history for account',
            'Sales presentation from admin',
            'Same filters as admin',
            'Direct customer support link'
          ],
          action: {
            label: 'Try demo',
            href: 'https://roadshow.sommify.ai',
          },
          // action: {
          //   label: 'Talk to a founder',
          //   onClick: () => {
          //     setBookingOpen(true);
          //   },
          // },
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
        <div className='w-full h-full flex items-center justify-center z-10'>
          <div
            style={{
              transform: lg ? 'translate(-100px, 0px)' : 'translate(0px, 0px)',
            }}
            className='rounded-xl h-[330px] p-2 backdrop-blur-sm bg-white/40 flex items-center justify-center border border-slate-100'
          >
            <img src={Avatar} className='rounded-lg shadow-2xl h-full w-auto' />

            {lg && (
              <div className='w-[330px] text-sm flex flex-col gap-4 items-start justify-center ml-6 absolute left-[50%] top-[33%] font-[450]'>
                <div className='ml-6 p-4 px-6 rounded-[36px] rounded-tr-lg shadow-md bg-blue-600 text-white flex flex-col'>
                  {/* <span className='text-xs mb-1 font-[550]'>Customer</span> */}
                  "Can you recommend a bottle of red for my boss?"
                </div>
                <div className='mr-6 p-4 px-6 rounded-[36px] rounded-tl-lg bg-white text-slate-800 shadow-lg flex flex-col'>
                  <span className='text-xs mb-1 font-[550]'>
                    <VscSparkleFilled className='inline mr-1' />
                    Avatar
                  </span>
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
          title: (
            <span className='italic'>
              Early Adopter{' '}
              <span className='font-[550] not-italic ml-1'>Avatar</span>
            </span>
          ),

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
            AI agent for{' '}
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

      {/* <div className='flex justify-center mb-8'>
        <ModeSwitcher key='first' mode={mode} setMode={setMode} />
      </div> */}

      <div
        style={{ height: lg ? 690 : 'auto' }}
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
              className='w-full h-full flex flex-col items-start justify-center p-8 md:p-16'
            >
              <span className='text-xs font-[450] text-slate-400 mb-2 hubot-sans mt-auto'>
                PRODUCT
              </span>
              <span className='text-[28px] font-[450] mb-3'>
                {product[mode].title}
              </span>
              <p className='text-lg font-[400]'>{product[mode].description}</p>
              <p className='mt-8 font-[400] text-slate-600'>
                {/* ligthbulmb emoji:  */}
                {product[mode].subtext}
              </p>
              <div className='flex gap-2 mb-6 py-12 mt-auto w-full justify-center'>
                {product[mode].actions.map((action, index) => (
                  <a href={action.href} target='_blank'>
                    <ButtonFlat
                      key={index}
                      variant={index === 0 ? 'primary' : 'transparent'}
                      disabled={action.comingSoon}
                    // onClick={action.onClick}
                    >
                      {action.label}
                      {action.comingSoon && (
                        <div className='hubot-sans text-[8px] mt-0.5'>SOON</div>
                      )}
                    </ButtonFlat>
                  </a>
                ))}
              </div>

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
                      className='w-full relative flex items-center justify-center z-10'
                    >
                      {product[mode].fg}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
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
                className='w-full h-full relative flex items-center justify-center z-10'
              >
                {product[mode].fg}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* <div className='flex my-52 flex-wrap items-center justify-center gap-16'>
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

        {lg && (
          <div className='flex-1 flex items-center justify-center'>
            <StepLadder steps={product[mode].steps} />
          </div>
        )}
      </div> */}

      <div className='flex flex-col items-center justify-center my-52'>
        <h2>Why should you care?</h2>
        <h3>Because you gain an unfair advantage in your market.</h3>

        <div className='flex gap-5 my-16 flex-wrap items-center justify-center'>
          {[
            {
              emoji: Brick,
              title: 'Proven ROI',
              content:
                'There is a reason why we have sold exclusivity for a market; the 30+ hours saved per salesperson are easy to quantify into ROI.',
            },
            {
              emoji: Laurel,
              title: 'Ease of use',
              content:
                'Everything in the webapp is made accessible for users across the whole range of digital readiness and devices.',
            },
            // {
            //   // laurel emoji
            //   emoji: Laurel,
            //   title: 'Expertise',
            //   content: (
            //     <p>
            //       AI model is built on 20+ year experience of the world-class
            //       sommelier{' '}
            //       <a
            //         className='underline'
            //         href='https://www.juliedupouy.com'
            //         target='_blank'
            //       >
            //         Julie Dupouy
            //       </a>{' '}
            //       and backed by investors with a beverage focus like{' '}
            //       <a
            //         className='underline'
            //         href='https://heino.fi'
            //         target='_blank'
            //       >
            //         Heino Group
            //       </a>
            //       .
            //     </p>
            //   ),
            // },
            {
              emoji: Rocket,
              title: 'Low risk',
              content:
                'We offer free integrations that take less than 1h of your time, and anytime cancellation.',
            },
          ].map((item, i) => (
            <div className='w-[300px] h-[280px] border border-slate-200 shadow-sm rounded-xl flex flex-col items-center justify-start p-10'>
              {/* <span className='text-6xl mb-8'>{item.emoji}</span> */}
              <img src={item.emoji} className='h-[50px] w-[50px] mb-6' />
              <span className='text-lg font-[550] mb-6'>{item.title}</span>
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

      <div className='flex flex-col items-center justify-center my-52'>
        <h2>Simple pricing.</h2>
        <h3 className='mb-10'>Pay only for what you need, no hidden fees.</h3>

        {/* <div className='flex justify-center mb-16'>
          <ModeSwitcher key='second' mode={mode} setMode={setMode} />
        </div> */}

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
              <div className='w-[360px] max-w-[96vw] h-[450px] border border-slate-200 shadow-sm overflow-hidden rounded-xl flex flex-col items-center justify-start'>
                <div className='w-full bg-slate-50 flex items-center justify-center gap-4 h-16 border-b border-slate-200'>
                  <img src={plan.emoji} className='h-[30px] w-[30px]' />
                  <span className='font-[450]'>{plan.title}</span>
                </div>
                <div className='w-full flex flex-col items-center justify-start p-4'>
                  {/* <img src={plan.emoji} className='h-[40px] w-[40px] mb-4' /> */}
                  {/* <span className='font-[450] mb-6'>{plan.title}</span> */}
                  <p></p>
                  <div className='w-full pt-3 flex items-end justify-center gap-1'>
                    <span className='text-4xl font-[550] text-slate-800'>
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

      <div className='flex flex-col md:flex-row items-center justify-center mt-52 mb-16 bg-slate-50 rounded-xl p-8 lg:p-24 h-[60vh] md:h-52 gap-16'>
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
