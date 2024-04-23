import { FaBars, FaBook, FaChevronRight, FaPhone } from 'react-icons/fa';
import { useDimensions } from '../hooks';
import Button2 from './Button2';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header({ bookACall }) {
  const { sm } = useDimensions();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{
        background: open ? '#ffffff30' : '#ffffff00',
        // background blur
        backdropFilter: open ? 'blur(12px)' : 'blur(0px)',
      }}
      className='header'
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        top: '3vw',
        margin: 'auto',
        boxSizing: 'border-box',
        paddingInline: sm ? 20 : 0,
        // justifyContent: 'space-between',
        marginBottom: sm ? 100 : 190,
        borderRadius: 10,
        color: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 70,
          alignItems: 'center',
        }}
      >
        <motion.img
          src='logo.svg'
          style={{
            width: sm ? 110 : 130,
            marginRight: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open('https://sommify.ai', '_self');
          }}
        />
        {!sm && (
          <Button2 transparent onClick={bookACall}>
            {/* <FaRegCalendar style={{ marginRight: '.5em', fontSize: '0.9em' }} /> */}
            Book a call
            <FaPhone style={{ marginLeft: '.5em', fontSize: '0.9em' }} />
            {/* <FaChevronRight style={{ marginLeft: '.5em', fontSize: '0.9em' }} /> */}
          </Button2>
        )}
        {!sm && (
          <Button2
            transparent
            onClick={() => {
              window.open('https://docs.sommify.ai', '_blank');
            }}
          >
            Read docs
            <FaChevronRight style={{ marginLeft: '.5em', fontSize: '0.9em' }} />
          </Button2>
        )}
        {!sm && (
          <Button2
            primary
            onClick={() =>
              window.open('https://playground.sommify.ai', '_blank')
            }
          >
            Try our tech{' '}
            <FaChevronRight style={{ marginLeft: '.5em', fontSize: '0.9em' }} />
          </Button2>
        )}

        {sm && (
          <FaBars
            color='#fff'
            size='1.4em'
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          />
        )}
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          height: open ? 'auto' : 0,
          paddingBlock: open ? 20 : 0,
        }}
        style={{
          width: '100%',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 3,
          //   paddingTop: 10,
          //   paddingBottom: 16,

          //   non-interactable
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <span
          onClick={bookACall}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Book a call{' '}
          <FaChevronRight style={{ marginLeft: 'auto', fontSize: '0.9em' }} />
        </span>
        <span
          onClick={() => {
            window.open('https://playground.sommify.ai', '_blank');
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Try our tech{' '}
          <FaChevronRight style={{ marginLeft: 'auto', fontSize: '0.9em' }} />
        </span>
      </motion.div>
    </motion.div>
  );
}
