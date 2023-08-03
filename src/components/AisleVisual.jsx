import Aisle from '../assets/illustrations/aisle_wall.svg';
import Person from '../assets/illustrations/aisle_person.svg';
import { useScroll, motion, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { inViewProps, inViewVariants } from '../data/variants';

export default function AisleVisual({ ...props }) {
  const ref = useRef(null);

  // scrollYProgress is a value between 0 and 1, where 0 is the top of the page and 1 is the bottom
  // useTransform takes a value and maps it to another value
  // in this case, we map scrollYProgress from 0 to 1 to -200 to 200
  // so when scrollYProgress is 0, y will be -200
  // and when scrollYProgress is 1, y will be 200
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 325]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.75]);
  const x = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    console.log(y);
  }, [y]);

  return (
    <motion.div
      key='aisle-visual'
      {...inViewProps}
      ref={ref}
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        position: 'relative',
        // paddingTop: 12,
        height: 500,
      }}
    >
      <motion.div variants={inViewVariants} style={{ position: 'relative' }}>
        <motion.img src={Aisle} style={{ height: 410 }} />
        <motion.img
          key='aisle-person'
          src={Person}
          style={{
            y,
            x,
            scale,
            height: 410,
            position: 'absolute',
            left: '35%',
            top: 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
