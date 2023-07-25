import partners, { earlyAdopters } from '../data/partners';
import { motion } from 'framer-motion';

export default function Partners() {
  return (
    <div
      className='d-flex flex-column justify-content-center align-items-start py-5'
      style={{ background: '#f0f2f4', paddingInline: '10%' }}
    >
      <div className='d-flex flex-column flex-grow-1 align-items-center w-100 mb-5'>
        <div className='my-5'>
          <h4>Supported by</h4>
        </div>
        <div
          className='d-flex flex-wrap justify-content-start'
          style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
        >
          {partners.map(({ pLogo, height, link }, i) => (
            <div
              className='d-flex justify-content-center align-items-center'
              key={'partner_' + i}
              style={{ flexBasis: '25%', minWidth: '25%', height: 120 }}
            >
              <motion.img
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
                className='mx-5 clickable'
                src={pLogo}
                onClick={() => window.open(link, '_blank')}
                animate={{
                  filter: 'brightness(0)',
                }}
                whileHover={{
                  filter: 'brightness(1)',
                  scale: 1.02,
                }}
                style={{
                  maxWidth: '70%',
                  //   maxHeight: 25,
                  height: `calc(${height} * 0.65)`,
                  // filter: 'brightness(0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='d-flex flex-column flex-grow-1 align-items-center w-100'>
        <div className='my-5'>
          <h4>Early adopters</h4>
        </div>
        <div
          className='d-flex flex-wrap justify-content-start w-100'
          style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
        >
          {earlyAdopters.map(({ pLogo, height, link }, i) => (
            <div
              className='d-flex justify-content-center align-items-center position-relative'
              key={'partner_' + i}
              style={{ flexBasis: '25%', minWidth: '25%', height: 120 }}
            >
              {/* <div className='position-absolute font-weight-600' style={{fontSize: 14}}>
                EARLY ADOPTER
              </div> */}
              <motion.img
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
                className='mx-5 clickable'
                src={pLogo}
                onClick={() => window.open(link, '_blank')}
                animate={
                  {
                    //   filter: 'brightness(0)',
                  }
                }
                whileHover={{
                  //   filter: 'brightness(1)',
                  scale: 1.02,
                }}
                style={{
                  maxWidth: '70%',
                  //   maxHeight: 25,
                  height: `calc(${height} * 0.65)`,
                  // filter: 'brightness(0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
