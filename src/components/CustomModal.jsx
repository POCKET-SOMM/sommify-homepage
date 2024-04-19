import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useDimensions } from '../hooks';

export default function CustomModal({ isOpen, close, children, style }) {
  const { sm } = useDimensions();

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={100}
      preventScroll={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: 10,
          padding: sm ? 25 : 50,
          border: 'none',
          maxWidth: '96vw',
          boxSizing: 'border-box',
          width: 860,
          // height: 800,
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          position: 'relative',
          overflow: 'visible',
          ...style,
        },
      }}
    >
      <motion.button
        animate={{
          background: '#000000a0',
        }}
        whileHover={{
          background: '#000000f0',
        }}
        style={{
          position: 'absolute',
          top: '-3.5em',
          right: 0,
          borderRadius: 99,
          background: '#000000a0',
          color: '#fff',
          padding: '10px 20px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          border: 'none',
          cursor: 'pointer !important',
          backdropFilter: 'blur(12px)',
          zIndex: 999,
        }}
        onClick={close}
      >
        Cancel{' '}
        <CgClose
          style={{
            marginLeft: 6,
          }}
        />
      </motion.button>
      {children}
    </Modal>
  );
}
