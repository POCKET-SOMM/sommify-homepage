import Section from './Section';
import { motion } from 'framer-motion';
import Button from './Button';
import { useState } from 'react';
import { CgCheck } from 'react-icons/cg';
import { inViewProps, inViewVariants } from '../data/variants';
import colors from '../data/colors';
import { HiSparkles } from 'react-icons/hi';

export default function Pricing({ className }) {
  const [selected, setSelected] = useState(-1);

  return (
    <Section id='pricing' className={className}>
      <motion.div
        {...inViewProps}
        variants={inViewVariants}
        className='w-100 d-flex flex-column justify-content-center text-center'
      >
        <h1>Pricing</h1>
        <p className='mb-5 m-auto' style={{ width: '70%', minWidth: 300 }}>
          We offer two different plans depending on your need and size. We
          believe in offering a trial period so you can be sure that we impact
          your business positively.
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
          // {
          //   title: 'Small early bird',
          //   value: 300,
          //   text: 'Our interactive sommelier for 1,000s of customers.',
          //   traits: [
          //     'Widget & API access',
          //     'Portal access',
          //     'For 1,000s of monthly users',
          //   ],
          // },
          {
            title: 'Early Adopter',
            value: <span>1 month trial</span>,
            text: 'Our interactive sommelier for any amount of customers.',
            traits: [
              'Widget & API access',
              'Unlimited users',
              'Monitoring of success',
              'Nominal set up fee',
              'Usage-based pricing post trial',
            ],
          },
          {
            title: 'Enterprise',
            value: "Let's talk",
            text: 'A custom solution using our artificial intelligence sommelier.',
            traits: [
              'Option for piloting',
              'Customizing the solution',
              'Widget & API access',
              'Unlimited users',
              'Post-pilot pricing based on usage',
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
                background: '#fafbfc',
                // border: '2px solid #f0f2f4',
                minWidth: 325,
                color: colors.black,
              }}
            >
              <div className='w-100 py-1 pt-5 text-center'>
                <h4
                  className='font-weight-600 mb-0'
                  style={{ fontSize: '1.05rem', color: colors.primary }}
                >
                  {title}
                </h4>
              </div>
              <div
                className='w-100 text-center mb-4 font-weight-700 d-flex justify-content-center align-items-center'
                style={{ fontSize: '3.2rem', height: 65, color: '#282c34' }}
              >
                <span style={{ fontSize: '0.6em' }}>{value}</span>
              </div>

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
              <div className='m-auto' />
              <div className='py-4 pb-5 d-flex justify-content-center'>
                <Button
                  borderless
                  onClick={() => {
                    const target = document.getElementById('contact');
                    target.scrollIntoView({ behavior: 'smooth' });
                    // window.open(
                    //   'https://sommify.notion.site/Drive-sales-through-accessibility-w-sommifyAI-1ddeab3ad8d847a1a3b21683ad254941',
                    //   '_blank'
                    // );
                  }}
                  animate={
                    i == selected
                      ? { color: '#555', background: '#eee' }
                      : { color: '#333', background: '#f0f2f4' }
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
