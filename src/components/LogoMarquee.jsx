import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const ELEMENT_WIDTH = 200;
const ELEMENT_HEIGHT = 100;
const ELEMENT_MARGIN = 8;

export default function LogoMarquee({ elements = [] }) {
  return (
    <Marquee
      pauseOnHover={false}
      speed={30}
      gradient={true}
      gradientWidth={50}
      autoFill={true}
      style={{
        height: ELEMENT_HEIGHT,
        overflowY: 'hidden',
        marginBottom: 28,
      }}
    >
      {elements.map((element, index) => (
        <motion.div
          key={index + '_element'}
          initial={false}
          animate={{
            filter: 'grayscale(1)',
            opacity: 0.3,
          }}
          whileHover={{ filter: 'grayscale(0)', opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          style={{
            width: ELEMENT_WIDTH,
            height: ELEMENT_HEIGHT,
            // marginRight: ELEMENT_MARGIN,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: element.href ? 'pointer' : 'default',
          }}
        >
          <a href={element.href} target='_blank'>
            <img
              src={element.src}
              alt={element.alt}
              height={element.height}
              style={{
                height: element.height,
                marginBottom: element.marginBottom ? element.marginBottom : 0,
              }}
            />
          </a>
        </motion.div>
      ))}
    </Marquee>
  );
}
