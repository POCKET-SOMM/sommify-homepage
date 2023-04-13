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
import CodePane from './CodePane';

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

const jsCodeBlock = `// Mount the widget using the Sommify.mount function
Sommify.mount("widget-element",  // id of the div in your html.index file
{ 
  url: "https://your-backend-call", // call to your backend serving as a proxy to the Sommify API
  theme: "original", // "minimal" | "night" | "flat" | "sharp" | ... or pass custom options via an object
  size: "desktop", // "mobile"
});`;

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
                  color: '#fffffff0'
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
      <motion.div
        variants={inViewVariants}
        style={{ flex: 1, paddingBottom: 50 }}
      >
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
          Integration
        </h4>
        <h1>Implement in under an hour</h1>
      </motion.div>
      <br />
      <br />
      <Step i={1} img={icon1} title='Create an account'>
        <p className='mb-5'>
          Go to our{' '}
          <a
            href='https://portal.sommify.ai'
            className='clickable'
            onClick
            style={{ color: colors.primary, textDecoration: 'none' }}
          >
            portal
          </a>{' '}
          and register as a member. Once you activate your account you are able
          to login using your email and password.
        </p>
        {/* <Button
          border
          onClick={() => window.open('https://portal.sommify.ai', '_blank')}
        >
          Register
        </Button> */}
      </Step>
      <Step i={2} img={icon2} title='Upload your wines'>
        <p className='mb-5'>
          Upload your wines into our digital wine cellar using an excel, CSV or
          JSON file. We provide templates or you can opt for a freeform upload.
          We will process your wines and you will receive an email notification
          once they are ready.
        </p>
      </Step>
      <Step i={3} img={icon3} title='Start using our widget'>
        <p className='mb-5'>
          Once the wines have been processed you receive an email and you can go
          to the settings page to retrieve your API key to populate your website
          or app. Simple.
        </p>

        <br />

        <CodePane
          examples={[
            {
              language: 'html',
              title: 'index.html',
              code: codeBlock,
            },
            {
              language: 'js',
              title: 'script.js',
              code: jsCodeBlock,
            },
          ]}
        />
      </Step>
      <Step img={icon4} i={4} title='Customize'>
        <p className='mb-5'>
          You are able to customize the widget to match your brand identity and
          add language support to the languages you need to serve your customers
          best.
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
