import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JumpCard({ icon, title, text, ...props }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={title}
      style={{
        flex: 1,
        // background: 'white',
        borderRadius: '2em',
        height: '25vh',
        background:
          'linear-gradient(90deg, rgba(242,189,249,1) 0%, rgba(129,129,228,1) 100%)',
      }}
      className='mx-2 position-relative'
    >
      <motion.div
        animate={{ x: hover ? 5 : 0, y: hover ? 5 : 0 }}
        style={{
          borderRadius: '2em',
          background: 'white',
          width: 'calc(100% - 0px)',
          height: 'calc(100% - 0px)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 'auto',
          boxShadow: hover
            ? '0 0 7px -2px rgba(0, 0, 0, 0.2)'
            : '0 0 0 rgba(256,256,256,0)',
        }}
        transition={{ duration: 0.2, type: 'tween' }}
        className={
          'clickable position-absolute d-flex justify-content-center px-4 py-5 align-items-center '
        }
      >
        <img src={icon} width={'140px'} />
        <div style={{ paddingTop: '20px' }} className='text-start'>
          <h4 className='mb-2 font-weight-600'>{title}</h4>
          <h6 className='font-weight-400'>{text}</h6>
        </div>
      </motion.div>
    </div>
  );
}
