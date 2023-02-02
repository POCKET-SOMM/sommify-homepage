import { CgGlobeAlt } from 'react-icons/cg';
import { SiCrunchbase, SiLinkedin, SiTwitter } from 'react-icons/si';
import colors from '../data/colors';
import LoadableImage from './Image';
import useWindowDimensions from '../hooks';
import { inViewVariants } from '../data/variants';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    image: 'https://pocketsommstorage.blob.core.windows.net/images/Jacob.png',
    name: 'Jacob Pichna',
    bg: colors.secondaryLight,
    title: 'Co-founder, CEO',
    linked: 'https://www.linkedin.com/in/pichna/',
    countries: ['fi'],
  },
  {
    image: 'https://pocketsommstorage.blob.core.windows.net/images/Tomas.png',
    name: 'Tomas Bedej',
    bg: colors.primaryLight,
    title: 'Co-Founder, UX & AI',
    linked: 'https://www.linkedin.com/in/bedej/',
    countries: ['sk'],
  },
  {
    image: 'https://pocketsommstorage.blob.core.windows.net/images/Julie.png',
    name: 'Julie Dupouy',
    bg: colors.secondaryLight,
    title: 'Wine Expert',
    linked: 'https://www.linkedin.com/in/julie-dupouy-50305925/',
    website: 'https://www.juliedupouy.com/',
    countries: ['fr'],
  },
  {
    image: 'https://pocketsommstorage.blob.core.windows.net/images/William.png',
    name: 'William Brach',
    bg: colors.primaryLight,
    title: 'Co-founder, AI',
    linked: 'https://www.linkedin.com/in/william-brach-4a20b6213/',
    countries: ['sk'],
  },
  {
    image: 'https://pocketsommstorage.blob.core.windows.net/images/Juraj.png',
    name: 'Juraj Bedej',
    bg: colors.secondaryLight,
    title: 'Full-stack & Cloud',
    linked: 'https://www.linkedin.com/in/jbedej',
    countries: ['sk'],
  },
];

export const GetToKnowUs = ({ ...props }) => {
  const ContactRow = ({ icon, title, content }) => (
    <div
      className='d-flex flex-column text-center justify-content-center align-items-center my-4'
      style={{ flex: 1, fontSize: '1.1rem' }}
    >
      <div className='d-flex justify-content-center align-items-center rounded-circle'>
        {icon}
      </div>
      <div className='d-flex flex-column mx-3'>
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
    <div
      className='text-center overflow-hidden'
      style={{
        width: '100%',
      }}
    >
      <div className={`w-100 d-flex justify-content-center`}>
        <ContactRow
          // content={'jacob@sommify.ai'}
          icon={<SiTwitter size='60%' />}
        />
        <ContactRow
          title={
            <span>
              <a
                className='clickable'
                onClick={() => {
                  window.open('https://www.linkedin.com/company/sommifyai');
                }}
              >
                Linkedin
              </a>
            </span>
          }
          // content={'partner@sommify.ai'}
          icon={<SiLinkedin size='60%' />}
        />
        <ContactRow
          title={
            <span>
              <a
                className='clickable'
                onClick={() => {
                  window.open(
                    'https://www.crunchbase.com/organization/sommifyai'
                  );
                }}
              >
                Crunchbase
              </a>
            </span>
          }
          icon={<SiCrunchbase size='60%' />}
        />
      </div>
    </div>
  );
};

const MemberCard = ({ member, width, i, ...props }) => (
  <motion.div
    variants={{
      offscreen: { y: '10vh', opacity: 0 },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.3 + i * 0.05,
          type: 'tween',
        },
      },
    }}
    className='d-flex flex-column shaded'
    style={{
      // border: '1px solid black',
      backgroundColor: 'white',
      borderRadius: '.5em',
      float: 'right',
      color: '#202020',
      overflow: 'hidden',
      width,
      marginInline: '10px',
    }}
  >
    <div className='w-100 h-100' style={{ background: member.bg, height: '' }}>
      <div style={{ marginTop: '100%', float: 'left' }}></div>
      <LoadableImage
        style={{ width: '100%', float: 'left' }}
        alt={`${member.image}`}
        src={member.image}
      />
    </div>
    <span
      className='text-center py-2'
      style={{
        float: 'left',
        padding: '10px',
        verticalAlign: 'text-center',
      }}
    >
      <span style={{ fontWeight: 500 }}>{member.name}</span>
      <br />
      <span style={{ fontSize: '0.7em' }}>{member.title}</span> <br />
      <SiLinkedin
        onClick={(e) => {
          window.open(member.linked);
        }}
        className='clickable'
      />
      {member.website ? (
        <CgGlobeAlt
          onClick={(e) => {
            window.open(member.website);
          }}
          className='clickable'
          style={{ marginLeft: '5px' }}
        />
      ) : null}
    </span>
  </motion.div>
);

const TeamHeading = () => {
  return (
    <motion.div
      key='team_heading'
      variants={inViewVariants}
      className='d-flex flex-column justify-content-center align-items-center text-start'
      style={{ flex: 1, float: 'left', paddingBlock: '10vh' }}
    >
      <div className='d-flex flex-column px-5'>
        <h1 style={{ fontSize: '3.2em' }} className='d-block font-weight-700'>
          Meet the team
        </h1>
        <h4 style={{ fontWeight: 200 }}>
          Our core team is made-for-measure to change the wine industry with
          strong investor backing.
        </h4>
      </div>
      {/* {!(width < 760) && <GetToKnowUs />} */}
    </motion.div>
  );
};

export default function Team({ ...props }) {
  const { width } = useWindowDimensions();
  const MEMBER_WIDTH = width <= 1920 ? 200 : 320;

  return (
    <div
      className={width < 760 ? 'd-flex flex-column' : 'd-flex py-5'}
      style={{ width: '100%' }}
    >
      {width < 760 && <TeamHeading />}

      <div
        className='p-5 no-scrollbar'
        style={{
          flex: 1,
          overflow: 'auto',
          overflowY: 'hidden',
          direction: 'rtl',
          // boxShadow: 'inset 5px 5px 5px black'
        }}
      >
        <div
          style={{
            width: 5 * (MEMBER_WIDTH + 20) + 'px',
            boxShadow: '0 8px 6px -6px black',
          }}
        >
          {teamMembers.map((member, i) => (
            <MemberCard width={MEMBER_WIDTH} member={member} i={i} />
          ))}
        </div>
      </div>

      {!(width < 760) && (
        <motion.div className='d-flex align-items-center' style={{ flex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <TeamHeading />
          </div>
        </motion.div>
      )}
    </div>
  );
}
