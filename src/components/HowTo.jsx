// import all the needed stuff
import { BsClockFill } from 'react-icons/bs';
import colors from '../data/colors';
import steps from '../data/steps';
import { inView } from '../data/variants';
import Button from './Button';
import Section from './Section';
import StackedImages from './StackedImages';
import { Image } from '../assets';

export function HowTo() {
  return (
    <Section>
      <h1 className='font-weight-700 mb-5' style={{ fontSize: '3em' }}>
        Control it all using our&nbsp;
        <span
          className='clickable'
          onClick={() => window.open('https://portal.sommify.ai/auth/login')}
        >
          portal
        </span>
      </h1>
      <div className='w-100 h-100 d-flex flex-column justify-content-start align-items-center'>
        <div className='w-100 p-5 d-flex justify-content-center'>
          <div
            style={{ color: colors.blue }}
            className='d-flex flex-column justify-content-center align-items-center'
          >
            <BsClockFill size='1.8rem' />
            <span className='font-weight-500' style={{ fontSize: '0.8rem' }}>
              30'
            </span>
          </div>
          <div className='d-flex flex-column px-5' style={{ width: '600px' }}>
            <div style={{ paddingRight: 60 }}>
              {steps.map(({ title, text }, i) => (
                <div
                  key={'step_' + i}
                  className='position-relative'
                  style={{
                    paddingLeft: 50,
                    paddingBottom: 100,
                  }}
                >
                  <div
                    className='d-flex flex-column justify-content-center align-items-center'
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: 50,
                    }}
                  >
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'white',
                        color: '#555',
                        border: '1px solid #f0f0f0',
                        fontSize: 12,
                      }}
                    >
                      <div
                        className='d-flex bg-primary justify-content-center align-items-center'
                        style={{
                          width: 6,
                          height: 6,
                          opacity: 0.9,
                          borderRadius: '50%',
                          background: 'white',
                          color: '#555',
                          border: '1px solid #f0f0f0',
                          fontSize: 12,
                        }}
                      >
                        {/* {i + 1} */}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        width: '1px',
                        backgroundColor: '#f0f0f0',
                      }}
                    ></div>
                  </div>
                  <h5 className='font-weight-500' variants={inView({ i })}>
                    {title}
                  </h5>
                  <p>{text}</p>
                </div>
              ))}
              <div className='w-100 d-flex justify-content-center'>
                <Button
                  className='my-2 p-3 px-5 font-weight-500 text-white'
                  style={{ fontSize: '1em', borderRadius: 999 }}
                  onClick={() =>
                    window.open(
                      'https://portal.sommify.ai/auth/login',
                      '_blank'
                    )
                  }
                >
                  TRY IT OUT
                </Button>
              </div>
            </div>
          </div>
          <div
            className='position-relative'
            style={{
              flex: 1,
            }}
          >
            <StackedImages
              style={{
                height: '600px',
                width: '1058px',
                // background:
                //   'linear-gradient(90deg, rgba(255,250,252,1) 0%, rgba(255,212,223,1) 100%)',
              }}
              absolute
              direction='bottom-right'
              yMargin='30px'
              xMargin='50px'
              images={[Image.SS2, Image.SS3]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
