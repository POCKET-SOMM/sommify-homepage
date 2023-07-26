import Button from './Button';
import Section from './Section';

import icon1 from '../assets/isometric_icons/iso_user.svg';
import icon2 from '../assets/isometric_icons/iso_upload.svg';
import icon3 from '../assets/isometric_icons/iso_widget.svg';
import icon4 from '../assets/isometric_icons/iso_setting.svg';
import { Icon3d } from '../assets';
import { motion } from 'framer-motion';
import { CgLink } from 'react-icons/cg';
import { inViewProps, inViewVariants } from '../data/variants';
import colors from '../data/colors';
import CodePane from './CodePane';

const codeBlock = `<head>
  <-- Import the sommify script before the closing tag of the head element -->
  <script src="https://elements.sommify.ai/js/v1"></script>
</head>`;

const jsCodeBlock = `// create a widget instance
const widget = Sommify.createWidget({
  apiKey: 'YOUR_API_KEY',             // your API key
  currency: 'EUR',                    // the currency to display prices in
  limit: 4,                           // limit the amount of wines to show
  triggerRadius: 50,                  // the radius in pixels from the trigger element
  triggerPosition: 'bottom-rigth',    // the position of the trigger element
  blockerVisible: true,               // show the blocker element

  // define mobile specific behavior
  mobile: {
    fullscreen: true,
  },
});

widget.onAddToCart((wine) => {
  // add logic to execute when add to cart button is clicked
});

// mount the widget using the mount method
widget.mount();`;

const Step = ({ title, children, rightAlign, style, img, i }) => (
  <motion.div
    {...inViewProps}
    key={'integration_step_' + i}
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
            width: 90,
            height: 90,
            background: '#f8fafc',
            border: '2px solid #f8fafc',
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
            width={55}
            variants={inViewVariants}
            key={'integration_step_img_' + i}
          />
          <div
            style={{
              position: 'absolute',
              width: 25,
              height: 25,
              borderRadius: 4,
              fontWeight: 600,
              background: '#282c34',
              color: 'white',
              top: 35,
              left: -18,
              fontSize: '0.95rem',
              transform: 'rotate(45deg)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transform: 'rotate(-45deg)',
                color: '#fffffff0',
              }}
            >
              {i}
            </div>
          </div>
        </div>
        {i <= 3 && (
          <div style={{ width: 2, flex: 1, background: '#f0f2f4' }}></div>
        )}
      </div>
    )}
    <motion.div
      variants={inViewVariants}
      key={'integration_step_text_' + i}
      style={{ flex: 1, paddingBottom: 50 }}
    >
      <h4>{title}</h4>
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

export default function Integrate({ ...props }) {
  return (
    <Section id='how'>
      <motion.div {...inViewProps} variants={inViewVariants}>
        <h6 className='font-weight-500 mb-2' style={{ color: colors.primary }}>
          INTEGRATION
        </h6>
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
          best. Additionally, you can create custom categories for the sommelier
          to generate like local or seasonal wines.
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
