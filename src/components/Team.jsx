import { CgGlobeAlt, CgMail } from 'react-icons/cg';
import { SiCrunchbase, SiLinkedin } from 'react-icons/si';
import { Fade } from 'react-bootstrap';
import tomasImg from '../assets/Tomas Cropped.png';
import jacobImg from '../assets/Jacob Cropped.png';
import julieImg from '../assets/Julie Cropped.png';
import williamImg from '../assets/William Cropped.png';
import jurajImg from '../assets/Juraj Cropped.png';
import colors from '../data/colors';
import { CircleFlag } from 'react-circle-flags';

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
    image: jurajImg,
    name: 'Juraj Bedej',
    title: 'Full-stack & Cloud',
    linked: 'https://www.linkedin.com/in/jbedej',
    countries: ['sk'],
  },
  {
    image: williamImg,
    name: 'William Brach',
    title: 'Co-founder, AI',
    linked: 'https://www.linkedin.com/in/william-brach-4a20b6213/',
    countries: ['sk'],
  },
];

export default function Team({ ...props }) {
  return (
    <>
      {/* <h2 className='mb-5'>team</h2> */}
      <div style={{ width: '50%', float: 'left' }}>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className='d-flex flex-column'
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              width: '28%',
              margin: '15px',
              height: '320px',
              float: 'left',
              color: '#202020',
              overflow: 'hidden',
              boxShadow: '10px 10px 20px -5px #000000',
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
                fontSize: '16px',
              }}
            >
              <b>{member.name}</b>
              {/* {member.countries.map((c) => (
                <CircleFlag countryCode={c} height='14px' className='mx-1' />
              ))} */}
              {/* <span className='m-2' style={{fontSize: '10px', fontWeight: 300}}>HE/HIM</span> */}
              <br />
              <span style={{ fontSize: '14px' }}>{member.title}</span> <br />
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
        ))}
      </div>

      <div style={{ width: '50%', padding: '100px 50px', float: 'left' }}>
        <span className='d-block' style={{ fontSize: '50px', fontWeight: 700 }}>
          Meet the team
        </span>
        <span style={{ fontWeight: 300, fontSize: '24px' }}>
          Our core team is{' '}
          <b style={{ color: colors.primary }}>made-for-measure</b> for this
          project with strong investor backing.
        </span>
      </div>

      {/* <br />
      <span style={{ fontStyle: 'italic' }}>let’s talk</span>
      <br />
      <div style={{ color: 'white !important' }}>
        <CgMail size={16} />
        <span className='m-2'>partner@pocketsomm.dev</span>
        <br />
        <SiLinkedin />
        <span
          style={{ textDecoration: 'underline' }}
          className='clickable m-2'
          onClick={(e) => {
            window.open('https://www.linkedin.com/company/pocketsomm');
          }}
        >
          Linkedin
        </span>
        <br />
        <SiCrunchbase />
        <span
          style={{ textDecoration: 'underline' }}
          className='clickable m-2'
          onClick={(e) => {
            window.open('https://www.crunchbase.com/organization/pocketsomm');
          }}
        >
          Crunchbase
        </span>
        <br />
      </div> */}
    </>
  );
}
