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

const teamMembers = [
  {
    image: jacobImg,
    name: 'Jacob Pichna',
    title: 'Co-founder, CEO',
    linked: 'https://www.linkedin.com/in/pichna/',
    countries: ['fi'],
  },
  {
    image: tomasImg,
    name: 'Tomas Bedej',
    title: 'Co-Founder, UX & AI',
    linked: 'https://www.linkedin.com/in/bedej/',
    countries: ['sk'],
  },
  {
    image: julieImg,
    name: 'Julie Dupouy',
    title: 'Wine Expert',
    linked: 'https://www.linkedin.com/in/julie-dupouy-50305925/',
    website: 'https://www.juliedupouy.com/',
    countries: ['fr'],
  },
  {
    image: williamImg,
    name: 'William Brach',
    title: 'Co-founder, AI',
    linked: 'https://www.linkedin.com/in/william-brach-4a20b6213/',
    countries: ['sk'],
  },
  {
    image: jurajImg,
    name: 'Juraj Bedej',
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
          title={'Email us at:'}
          content={'jacob@sommify.ai'}
          icon={<SiMinutemailer size='60%' />}
        />
        <ContactRow
          title={
            <span>
              Check out our{' '}
              <a
                className='clickable'
                onClick={() => {
                  window.open('https://www.linkedin.com/company/sommifyai');
                }}
              >
                Linkedin
              </a>
              .
            </span>
          }
          // content={'partner@sommify.ai'}
          icon={<SiLinkedin size='60%' />}
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
                Crunchbase
              </a>
              .
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
    className='d-flex flex-column'
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
    <Fade appear in={!props.loading}>
      <img
        style={{ width: '100%' }}
        alt={`${member.image}`}
        src={member.image}
      />
    </Fade>
    <span
      className='text-center py-2'
      style={{
        float: 'left',
        padding: '10px',
        verticalAlign: 'text-center',
      }}
    >
      <b>{member.name}</b>
      <br />
      <span>{member.title}</span> <br />
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

export default function Team({ ...props }) {
  return (
    <div className={isMobile ? 'd-flex flex-column' : 'd-flex'}>
      {isMobile && (
        <div
          className='d-flex flex-column justify-content-center align-items-center text-center'
          style={{ flex: 1, float: 'left', paddingBlock: '10vh' }}
        >
          <h1 className='d-block' style={{ fontWeight: 700 }}>
            Meet the team
          </h1>
          <h3 style={{ fontWeight: 300 }}>
            Our core team is <b>made-for-measure</b> for this project with
            strong investor backing.
          </h3>
          {/* <GetToKnowUs /> */}
        </div>
      )}

      <div style={{ flex: 1, float: 'left' }}>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            style={{
              width: isMobile ? '50%' : '33%',
              display: 'inline-block',
              padding: '1%',
            }}
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {!isMobile && (
        <div style={{ flex: 1, float: 'left', padding: '10vh 5vw' }}>
          <h1 className='d-block' style={{ fontWeight: 700 }}>
            Meet the team
          </h1>
          <h4 style={{ fontWeight: 300 }}>
            Our core team is{' '}
            <b style={{ color: colors.primaryLight, fontSize: 'italic' }}>
              made-for-measure
            </b>{' '}
            for this project with strong investor backing.
          </h4>

          <GetToKnowUs />
        </div>
      )}
    </div>
  );
}
