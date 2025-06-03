import {
  FaBars,
  FaBook,
  FaBookOpen,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarPlus,
  FaCaretDown,
  FaChevronRight,
  FaPhone,
  FaRegCalendar,
} from 'react-icons/fa';
import { useDimensions } from '../hooks';
import Button2 from './Button2';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Logo from '../assets/logo.svg';
import { IoCalendarNumber } from 'react-icons/io5';
import { SiGooglemeet } from 'react-icons/si';
import {
  LuBookOpen,
  LuCalendar,
  LuCalendarDays,
  LuContainer,
  LuLogOut,
} from 'react-icons/lu';
import Dropdown from './Dropdown';
import { VscBook, VscCalendar, VscProject } from 'react-icons/vsc';
import {
  HiMiniBookOpen,
  HiMiniCalendar,
  HiMiniCalendarDays,
} from 'react-icons/hi2';
import { HiBookOpen } from 'react-icons/hi';
import ButtonFlat from './ButtonFlat';

const retailerProducts = [
  {
    name: 'Chat',
    icon: '💬',
    description: 'Let the user chat with an AI',
    href: 'https://playground.sommify.ai/products/chat',
  },
  {
    name: 'Plus',
    icon: '🍇',
    description: 'Enhance your data',
    href: 'https://playground.sommify.ai/products/plus',
  },
  {
    name: 'Pair',
    icon: '🧀',
    description: 'Pair recipes and wines',
    href: 'https://playground.sommify.ai/products/pair',
  },
];

export default function Header({ bookACall }) {
  const { sm, lg } = useDimensions();
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
        maxWidth: 1100,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        margin: 'auto',
        boxSizing: 'border-box',
        paddingInline: lg ? 0 : 24,
        // justifyContent: 'space-between',
        marginBottom: sm ? 100 : 190,
        borderRadius: 10,
        color: '#ffffff',
      }}
    >
      <div className='flex w-full h-16 items-center gap-2'>
        <motion.img
          src={Logo}
          style={{
            width: sm ? 110 : 130,
            marginRight: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open('https://sommify.ai', '_self');
          }}
        />

        <ButtonFlat variant='transparent' onClick={bookACall}>
          Talk to a founder
        </ButtonFlat>

        {/* {!sm && (
          <Button2 transparent onClick={bookACall}>
            <LuCalendarDays className='mr-1 text-base' />
            Book a call
          </Button2>
        )} */}
        {/* {!sm && (
          <Button2
            transparent
            onClick={() => {
              window.open('https://docs.sommify.ai', '_blank');
            }}
          >
            <LuBookOpen className='mr-1 text-base' />
            Read docs
          </Button2>
        )} */}
        {/* {!sm && (
          <Dropdown
            menuContent={
              <div className='flex flex-col min-w-[140px] justify-stretch'>
                <div className='text-xs text-slate-500 font-medium px-2 py-1'>
                  For distributors
                </div>

                <a
                  href='https://roadshow.sommify.ai'
                  target='_blank'
                  className='px-2 py-1 flex items-center text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-md cursor-pointer truncate'
                >
                  <i className='mr-2'>📈</i>
                  <span>Agent</span>
                  <span className='text-slate-400 ml-1 font-normal pr-4'>
                    - Rapid offer generation
                  </span>
                  <FaChevronRight className='text-slate-300 text-xs ml-auto' />
                </a>

                <div className='text-xs text-slate-500 font-medium px-2 py-1 mt-2'>
                  For retailers
                </div>

                {retailerProducts.map((product) => (
                  <a
                    href={product.href}
                    target='_blank'
                    className='px-2 py-1.5 flex items-center text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-md cursor-pointer truncate'
                  >
                    <i className='mr-2'>{product.icon}</i>
                    <span>{product.name}</span>
                    <span className='text-slate-400 ml-1 font-normal pr-4'>
                      - {product.description}
                    </span>
                    <FaChevronRight className='text-slate-300 text-xs ml-auto' />
                  </a>
                ))}
              </div>
            }
            className='px-3 cursor-pointer flex h-8 rounded-md items-center justify-center text-black text-sm font-medium'
          >
            <LuContainer className='mr-2 text-base' />
            Try products
            <FaCaretDown className='ml-2' />
          </Dropdown>
        )} */}
        {/* {sm && (
          <FaBars
            size='1.4em'
            style={{
              cursor: 'pointer',
              color: '#00050a',
              minWidth: 40,
            }}
            onClick={() => {
              setOpen(!open);
            }}
          />
        )} */}
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
