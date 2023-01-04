import { CgGlobeAlt, CgMail } from 'react-icons/cg';
import { SiCrunchbase, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import { Fade } from 'react-bootstrap';
import tomasImg from '../assets/team/Tomas Cropped-min.png';
import jacobImg from '../assets/team/Jacob Cropped-min.png';
import julieImg from '../assets/team/Julie Cropped-min.png';
import williamImg from '../assets/team/William Cropped-min.png';
import jurajImg from '../assets/team/Juraj Cropped-min.png';
import colors from '../data/colors';
import { CircleFlag } from 'react-circle-flags';
import { isMobile } from 'react-device-detect';
import LoadableImage from './Image';
import useWindowDimensions from '../hooks';

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

const GetToKnowUs = ({ ...props }) => {
  const ContactRow = ({ icon, title, content }) => (
    <div
      className='d-flex flex-column text-center justify-content-center align-items-center my-4'
      style={{ flex: 1, fontSize: '1.1rem' }}
    >
      <div
        className='d-flex justify-content-center align-items-center rounded-circle'
        style={{
          color: '#e5e5e5',
        }}
      >
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
      className='text-center overflow-hidden my-5 py-5'
      style={{
        width: '100%',
      }}
    >
      <div className={`w-100 mb-5 mt-2 d-flex justify-content-center`}>
        <ContactRow
          content={'jacob@sommify.ai'}
          icon={<SiMinutemailer size='60%' />}
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

const MemberCard = ({ member, ...props }) => (
  <div
    className='d-flex flex-column w-100'
    style={{
      backgroundColor: 'white',
      borderRadius: '2vh',
      float: 'left',
      color: '#202020',
      overflow: 'hidden',
      boxShadow: '0.5vw 0.5vw 1vw 0 #00000025',
      // border: '1px solid #a51c5e50'
    }}
  >
    <div
      className='w-100 position-relative'
      style={{ background: member.bg, height: '' }}
    >
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
  </div>
);

const TeamHeading = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center text-center'
      style={{ flex: 1, float: 'left', paddingBlock: '10vh' }}
    >
      <div className='d-flex flex-column px-5'>
        <h1 className='d-block font-smooth'>Meet the team</h1>
        <h4 style={{ fontWeight: 200 }}>
          Our core team is <b>made-for-measure</b> for this project with strong
          investor backing.
        </h4>
      </div>
      {!(width < 760) && <GetToKnowUs />}
    </div>
  );
};

export default function Team({ ...props }) {
  const { width, height } = useWindowDimensions();
  return (
    <div className={width < 760 ? 'd-flex flex-column' : 'd-flex'}>
      {width < 760 && <TeamHeading />}

      <div style={{ flex: 1, float: 'left' }}>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            style={{
              width: width < 760 ? '50%' : '33%',
              display: 'inline-block',
              padding: '1%',
            }}
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {!(width < 760) && <TeamHeading />}
    </div>
  );
}
