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
        className={`cursor-pointer h-12 w-36 rounded-full flex items-center justify-center font-medium z-10 ${
          mode === 'distributor' ? 'text-slate-800' : 'hover:text-slate-800'
        }`}
        onClick={() => setMode('distributor')}
      >
        Distribution
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
          price: '€350',
          emoji: Spyglass,
          title: (
            <span className='italic'>
              Early Adopter{' '}
              <span className='font-[550] not-italic ml-1'>Agent</span>
            </span>
          ),

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
          title: (
            <span className='italic'>
              Enterprise{' '}
              <span className='font-[550] not-italic ml-1'>Agent</span>
            </span>
          ),
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
      {/* <div className='my-6 w-full flex items-center justify-center gap-2'>
        <svg
          width='120'
          height='auto'
          viewBox='0 0 1460 267'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M373.921 219.983C360.261 219.983 348.525 217.801 338.713 213.436C328.901 208.873 321.302 202.623 315.915 194.687C310.72 186.751 308.123 177.525 308.123 167.009H343.619C343.812 176.136 346.794 182.782 352.566 186.949C358.337 191.115 365.841 193.199 375.075 193.199C384.118 193.199 390.948 191.512 395.565 188.139C400.375 184.568 402.78 179.707 402.78 173.557C402.78 168.597 401.722 164.827 399.605 162.248C397.489 159.47 394.026 157.387 389.216 155.998C384.406 154.411 378.057 153.022 370.169 151.831C357.279 149.847 346.505 147.169 337.848 143.796C329.19 140.225 322.745 135.364 318.512 129.213C314.28 123.063 312.163 114.928 312.163 104.81C312.163 94.8894 314.761 86.2588 319.955 78.9179C325.15 71.5769 332.461 65.9224 341.888 61.9543C351.315 57.7878 362.378 55.7046 375.075 55.7046C387.389 55.7046 398.066 57.7878 407.109 61.9543C416.343 65.9224 423.462 71.6761 428.464 79.2155C433.659 86.5564 436.352 95.3854 436.545 105.702H401.048C401.048 100.147 399.894 95.683 397.585 92.3102C395.469 88.7389 392.391 86.1596 388.35 84.5724C384.31 82.9852 379.597 82.1916 374.21 82.1916C366.129 82.1916 359.78 83.9772 355.163 87.5485C350.545 90.9213 348.237 95.5838 348.237 101.536C348.237 105.901 349.391 109.472 351.7 112.25C354.201 114.829 358.145 116.912 363.532 118.5C368.919 120.087 375.845 121.476 384.31 122.666C393.545 124.055 401.529 125.84 408.263 128.023C415.189 130.205 420.961 133.181 425.578 136.951C430.196 140.522 433.659 145.086 435.967 150.641C438.469 155.998 439.719 162.545 439.719 170.283C439.719 186.155 433.659 198.456 421.538 207.186C409.61 215.718 393.737 219.983 373.921 219.983Z'
            fill='#1E293B'
          />
          <path
            d='M524.958 219.686C513.415 219.686 503.026 217.9 493.791 214.329C484.556 210.559 476.476 205.103 469.55 197.96C462.816 190.818 457.621 182.187 453.966 172.069C450.503 161.95 448.771 150.542 448.771 137.844C448.771 121.575 451.753 107.29 457.717 94.9886C463.874 82.6876 472.628 73.065 483.979 66.1208C495.33 59.1767 508.99 55.7046 524.958 55.7046C536.31 55.7046 546.603 57.5894 555.837 61.3591C565.072 65.1288 572.96 70.5849 579.502 77.7275C586.235 84.87 591.43 93.5006 595.085 103.619C598.741 113.539 600.568 124.948 600.568 137.844C600.568 153.915 597.49 168.101 591.334 180.402C585.37 192.703 576.712 202.325 565.361 209.269C554.202 216.214 540.735 219.686 524.958 219.686ZM524.67 189.032C532.558 189.032 539.484 187.147 545.448 183.378C551.412 179.41 556.03 173.656 559.3 166.117C562.571 158.379 564.206 148.955 564.206 137.844C564.206 129.511 563.244 122.17 561.321 115.821C559.589 109.274 556.992 103.818 553.529 99.4527C550.066 95.0878 545.929 91.8141 541.119 89.6317C536.31 87.4493 530.923 86.358 524.958 86.358C517.07 86.358 510.048 88.3421 503.892 92.3102C497.927 96.0798 493.31 101.834 490.039 109.571C486.769 117.111 485.133 126.535 485.133 137.844C485.133 146.177 485.999 153.617 487.731 160.164C489.655 166.513 492.348 171.87 495.811 176.235C499.274 180.402 503.411 183.576 508.22 185.759C513.223 187.941 518.706 189.032 524.67 189.032Z'
            fill='#1E293B'
          />
          <path
            d='M618.1 217.007V58.6807H653.019L654.174 88.7389H655.905C660.138 77.6283 666.679 69.3945 675.529 64.0376C684.379 58.4823 694.095 55.7046 704.676 55.7046C715.835 55.7046 725.84 58.4823 734.69 64.0376C743.54 69.5929 749.985 78.9179 754.025 92.0126H756.334C760.374 79.9099 767.108 70.8825 776.535 64.9304C785.962 58.7799 796.64 55.7046 808.568 55.7046C818.765 55.7046 827.807 57.887 835.695 62.2519C843.776 66.6168 850.125 73.6602 854.742 83.382C859.36 93.1038 861.668 106 861.668 122.071V217.007H825.595V130.106C825.595 120.186 824.537 112.051 822.42 105.702C820.304 99.1551 816.937 94.2942 812.32 91.1197C807.702 87.9453 801.834 86.358 794.716 86.358C787.02 86.358 780.383 88.3421 774.803 92.3102C769.416 96.2783 765.28 101.536 762.394 108.083C759.508 114.631 758.065 121.872 758.065 129.809V217.007H721.703V130.106C721.703 120.186 720.645 112.051 718.529 105.702C716.412 99.1551 713.046 94.2942 708.428 91.1197C704.003 87.9453 698.231 86.358 691.113 86.358C683.417 86.358 676.78 88.3421 671.2 92.3102C665.813 96.2783 661.581 101.536 658.502 108.083C655.617 114.631 654.174 121.872 654.174 129.809V217.007H618.1Z'
            fill='#1E293B'
          />
          <path
            d='M887.253 217.007V58.6807H922.172L923.327 88.7389H925.058C929.291 77.6283 935.832 69.3945 944.682 64.0376C953.532 58.4823 963.248 55.7046 973.83 55.7046C984.988 55.7046 994.993 58.4823 1003.84 64.0376C1012.69 69.5929 1019.14 78.9179 1023.18 92.0126H1025.49C1029.53 79.9099 1036.26 70.8825 1045.69 64.9304C1055.12 58.7799 1065.79 55.7046 1077.72 55.7046C1087.92 55.7046 1096.96 57.887 1104.85 62.2519C1112.93 66.6168 1119.28 73.6602 1123.9 83.382C1128.51 93.1038 1130.82 106 1130.82 122.071V217.007H1094.75V130.106C1094.75 120.186 1093.69 112.051 1091.57 105.702C1089.46 99.1551 1086.09 94.2942 1081.47 91.1197C1076.86 87.9453 1070.99 86.358 1063.87 86.358C1056.17 86.358 1049.54 88.3421 1043.96 92.3102C1038.57 96.2783 1034.43 101.536 1031.55 108.083C1028.66 114.631 1027.22 121.872 1027.22 129.809V217.007H990.856V130.106C990.856 120.186 989.798 112.051 987.682 105.702C985.566 99.1551 982.199 94.2942 977.581 91.1197C973.156 87.9453 967.385 86.358 960.266 86.358C952.57 86.358 945.933 88.3421 940.354 92.3102C934.967 96.2783 930.734 101.536 927.656 108.083C924.77 114.631 923.327 121.872 923.327 129.809V217.007H887.253Z'
            fill='#1E293B'
          />
          <path
            d='M1156.41 217.007V58.6807H1192.48V217.007H1156.41ZM1156.41 36.3602V0.0522461H1192.48V36.3602H1156.41Z'
            fill='#1E293B'
          />
          <path
            d='M1227.91 217.007V88.4413H1203.67V58.6807H1227.91V38.741C1227.91 26.0432 1231.56 16.4206 1238.88 9.87325C1246.38 3.32591 1256.86 0.0522461 1270.33 0.0522461H1296.88V26.2416H1279.85C1273.7 26.2416 1269.47 27.6304 1267.16 30.4081C1265.04 33.1857 1263.98 36.8562 1263.98 41.4195V58.6807H1294.28V88.4413H1263.98V217.007H1227.91Z'
            fill='#1E293B'
          />
          <path
            d='M1320.78 266.707V236.054H1337.8C1342.42 236.054 1346.27 235.459 1349.35 234.268C1352.43 233.078 1355.02 231.193 1357.14 228.614C1359.26 226.035 1360.99 222.761 1362.33 218.793L1370.7 196.472V213.138L1308.08 58.6807H1347.62L1379.07 149.153L1384.84 167.009H1386.29L1391.48 149.153L1421.21 58.6807H1459.59L1397.54 227.423C1394.08 237.542 1389.75 245.478 1384.56 251.232C1379.55 256.986 1373.69 260.954 1366.95 263.136C1360.41 265.517 1352.91 266.707 1344.44 266.707H1320.78Z'
            fill='#1E293B'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M157.58 218.225C217.827 218.225 266.667 169.386 266.667 109.139C266.667 48.8923 217.827 0.0527344 157.58 0.0527344C97.3337 0.0527344 48.4941 48.8923 48.4941 109.139C48.4941 169.386 97.3337 218.225 157.58 218.225ZM157.586 189.136C201.766 189.136 237.582 153.32 237.582 109.139C237.582 64.9586 201.766 29.1429 157.586 29.1429C113.405 29.1429 77.589 64.9586 77.589 109.139C77.589 153.32 113.405 189.136 157.586 189.136Z'
            fill='#1E293B'
          />
          <rect
            x='78.9863'
            y='157.624'
            width='36.3621'
            height='111.703'
            rx='18.181'
            transform='rotate(45 78.9863 157.624)'
            fill='#1E293B'
          />
          <path
            opacity='0.6'
            d='M157.584 175.799C224.248 175.799 224.248 109.135 224.248 109.135C224.248 109.135 200.007 145.494 157.584 109.135C115.162 72.7754 90.9205 109.135 90.9205 109.135C90.9205 109.135 90.9205 175.799 157.584 175.799Z'
            fill='#1E293B'
          />
          <path
            d='M157.576 175.799C90.9121 175.799 90.9121 109.135 90.9121 109.135C90.9121 109.135 115.153 145.495 157.576 109.135C199.998 72.7759 224.24 109.135 224.24 109.135C224.24 109.135 224.24 175.799 157.576 175.799Z'
            fill='#1E293B'
          />
        </svg>
      </div> */}

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

      <div className='flex my-52 flex-wrap items-center justify-center gap-16'>
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
      </div>

      <div className='flex flex-col items-center justify-center my-52'>
        <h2>Why work with us?</h2>
        <h3>Lead the future of wine with us and our partners</h3>

        <div className='flex gap-5 my-16 flex-wrap items-center justify-center'>
          {[
            {
              // laurel emoji
              emoji: Laurel,
              title: 'Expertise',
              content: (
                <p>
                  AI model is built on 20+ year experience of the world-class
                  sommelier{' '}
                  <a
                    className='underline'
                    href='https://www.juliedupouy.com'
                    target='_blank'
                  >
                    Julie Dupouy
                  </a>{' '}
                  and backed by investors with a beverage focus like{' '}
                  <a
                    className='underline'
                    href='https://heino.fi'
                    target='_blank'
                  >
                    Heino Group
                  </a>
                  .
                </p>
              ),
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
              <div className='w-[360px] max-w-[96vw] h-[400px] border border-slate-200 shadow-sm overflow-hidden rounded-xl flex flex-col items-center justify-start'>
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
