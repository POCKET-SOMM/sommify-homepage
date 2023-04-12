import Section from './Section';
import { motion } from 'framer-motion';
import Button from './Button';
import { useState } from 'react';
import { CgCheck } from 'react-icons/cg';
import { inViewProps, inViewVariants } from '../data/variants';

export default function Pricing({ className }) {
  const [selected, setSelected] = useState(-1);

  return (
    <Section id='pricing' className={className}>
      <motion.div
        {...inViewProps}
        variants={inViewVariants}
        className='w-100 d-flex flex-column justify-content-center text-center'
      >
        <h1>Plans & pricing</h1>
        <p className='mb-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet optio
          nesciunt molestias rerum iure magnam autem, quia nulla. Fugiat quae
          officiis harum quia tempora minus id dignissimos sunt pariatur ipsam!
        </p>
      </motion.div>
      <div
        className='w-100 d-flex p-2'
        style={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          // borderRadius: '3em',
          // background: 'white',
        }}
      >
        {[
          {
            title: 'Small early bird',
            value: 300,
            text: 'Our interactive sommelier for 1,000s of customers.',
            traits: [
              'Widget access',
              'Dashboard access',
              '1,000s of customers',
            ],
          },
          {
            title: 'Large early bird',
            value: 900,
            text: 'Our interactive sommelier for 10,000s of customers.',
            traits: [
              'Widget access',
              'Dashboard access',
              '10,000s of customers',
            ],
          },
          {
            title: 'Enterprise',
            value: "Let's talk",
            text: 'A custom solution using our artificial intelligence sommelier.',
            traits: [
              'Widget access',
              'Dashboard access',
              'Unlimited customers',
            ],
          },
        ].map(({ title, value, text, traits }, i) => (
          <div style={{ padding: 18, flexBasis: '33%' }}>
            <motion.div
              className='px-4 w-100 h-100 clickable d-flex flex-column justify-content-center'
              {...inViewProps}
              variants={inViewVariants}
              style={{
                borderRadius: '1.5em',
                border: '2px solid #f0f0f0',
                minWidth: 325,
                background: '#fafafa',
                color: '#555',
              }}
            >
              <div className='w-100 py-1 pt-5 text-center'>
                <h4
                  className='font-weight-600 mb-0 text-primary'
                  style={{ fontSize: '1.05rem' }}
                >
                  {title}
                </h4>
              </div>
              <div
                className='w-100 text-center mb-4 font-weight-700 d-flex justify-content-center align-items-center'
                style={{ fontSize: '3.2rem', height: 65, color: '#282c34' }}
              >
                {title !== 'Enterprise' && (
                  <span
                    style={{
                      fontSize: '0.6em',
                      fontWeight: 600,
                      marginRight: '.15em',
                    }}
                  >
                    €
                  </span>
                )}
                <span style={{ fontSize: title === 'Enterprise' && '0.6em' }}>
                  {value}
                </span>
              </div>
              <div className='m-auto' />

              <div className='px-4'>
                {traits.map((text, j) => (
                  <motion.div
                    className='d-flex justify-content-start align-items-center py-3 font-weight-400'
                    animate={{
                      borderColor:
                        i == selected
                          ? 'rgba(256,256,256,0.1)'
                          : 'rgba(0,0,0,0.1)',
                    }}
                    style={{
                      borderBottom: '1px solid',
                      borderTop: j == 0 ? '1px solid' : 'none',
                      fontSize: '0.8em',
                    }}
                  >
                    <CgCheck size='1.6em' />
                    &nbsp;{text}
                  </motion.div>
                ))}
              </div>
              <div className='py-4 pb-5 d-flex justify-content-center'>
                <Button
                  borderless
                  onClick={() => {
                    const target = document.getElementById('contact');
                    target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  animate={
                    i == selected
                      ? { color: '#555', background: '#eee' }
                      : { color: '#333', background: '#f0f0f0' }
                  }
                  style={{
                    borderRadius: 10,
                    fontSize: '0.9em',
                    letterSpacing: 2,
                  }}
                >
                  LEARN MORE
                </Button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
