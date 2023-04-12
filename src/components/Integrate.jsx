import Button from './Button';
import Section from './Section';

import icon1 from '../assets/isometric_icons/iso_user.png';
import icon2 from '../assets/isometric_icons/iso_upload.png';
import icon3 from '../assets/isometric_icons/iso_widget.png';
import icon4 from '../assets/isometric_icons/iso_setting.png';
import { motion } from 'framer-motion';
import { CgLink } from 'react-icons/cg';
import { inViewProps, inViewVariants } from '../data/variants';
import Highlight from 'react-highlight';
import colors from '../data/colors';

const codeBlock = `<head>
  <-- Import minified react -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <-- Import the sommify script -->
  <script src="https://pocketsommstorage.blob.core.windows.net/bundles/sommify-v1.js"></script>
</head>
<body>
  <-- Create a div with an id -->
  <div id="widget-element"></div>
</body>`;

export default function Integrate({ ...props }) {
  const Step = ({ title, children, rightAlign, style, img, i }) => (
    <motion.div
      {...inViewProps}
      style={{
        display: 'flex',
        width: '80%',
        // float: rightAlign ? 'right' : 'left',
        marginLeft: rightAlign ? 'auto' : 0,
        textAlign: rightAlign ? 'end' : 'start',
        ...style,
      }}
    >
      {!rightAlign && (
        <div
          className='d-flex flex-column align-items-center'
          style={{ paddingRight: 50 }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: '#fafafa',
              border: '2px solid #f0f0f0',
              borderRadius: '50%',
              // fontSize: '3rem',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.img
              src={img}
              style={{ filter: 'brightness(0)' }}
              width={60}
              variants={inViewVariants}
            />
            <div
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                borderRadius: 4,
                fontWeight: 600,
                background: '#282c34',
                color: 'white',
                top: 30,
                left: -23,
                fontSize: '1.05rem',
                transform: 'rotate(45deg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  transform: 'rotate(-45deg)',
                }}
              >
                {i}
              </div>
            </div>
          </div>
          {i <= 3 && (
            <div style={{ width: 2, flex: 1, background: '#f0f0f0' }}></div>
          )}
        </div>
      )}
      <motion.div variants={inViewVariants} style={{ flex: 1, minHeight: 350 }}>
        <h2>{title}</h2>
        {children}
      </motion.div>
      {rightAlign && (
        <div style={{ paddingLeft: 50 }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: '#bbb',
              borderRadius: 10,
            }}
          ></div>
        </div>
      )}
    </motion.div>
  );

  return (
    <Section id='how'>
      <motion.div {...inViewProps} variants={inViewVariants}>
        <h4 className='font-weight-600 mb-2' style={{ color: colors.primary }}>
          Guide
        </h4>
        <h1>Integrate in 30 minutes</h1>
      </motion.div>
      <br />
      <br />
      <Step i={1} img={icon1} title='Create an account'>
        <p className='mb-5'>
          Go to our portal and become a member. Once you activate your account
          and pay for your subscription you are able to login using your email
          and set password. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Laborum perspiciatis perferendis aut voluptate doloribus, cum
          sapiente ipsa porro quibusdam alias deleniti ex dolores, deserunt eum
          eius nam iusto et delectus!
        </p>
        <Button
          border
          onClick={() => window.open('https://portal.sommify.ai', '_blank')}
        >
          Register
        </Button>
      </Step>
      <Step i={2} img={icon2} title='Upload your wines'>
        <p className='mb-5'>
          Upload your wines into our digital wine cellar using an excel, CSV or
          JSON file. You are able to use a template we provide or a freeform
          upload. We will process your wines and you will receive an email
          notification once they are ready.
        </p>
      </Step>
      <Step i={3} img={icon3} title='Start using our widget'>
        <p className='mb-5'>
          Once the wines have been processed you receive an email and you can go
          to the settings page to retrieve your API to populate your website or
          app. Simple. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Perspiciatis cumque quae adipisci non? Beatae in amet itaque quam,
          aliquam natus molestias a. Eius ex fuga molestiae, perferendis dolorem
          assumenda officia.
        </p>

        <br />

        <div
          className='d-flex flex-column position-relative'
          style={{
            width: '100vh',
            background: '#282c34',
            borderRadius: 12,
            marginBottom: 120,
          }}
        >
          <div
            className='w-100 d-flex'
            style={{ borderBottom: '1px solid #ffffff20', padding: 10 }}
          >
            {[1, 2, 3].map(() => (
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: '#ffffff4a',
                  marginRight: 5,
                }}
              />
            ))}
          </div>

          <div className='px-4 font-mono'>
            <Highlight className='html'>{codeBlock}</Highlight>
          </div>
        </div>
      </Step>
      <Step img={icon4} i={4} title='Customize'>
        <p className='mb-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          dolor quisquam modi non nobis praesentium neque, quae ullam magnam
          repudiandae debitis, rem fuga vitae quia accusamus, iure repellendus
          vero rerum.
        </p>
        <Button
          onClick={() => {
            window.open('https://docs.sommify.ai', '_blank');
          }}
          border
        >
          <CgLink /> Visit docs
        </Button>
      </Step>
    </Section>
  );
}
