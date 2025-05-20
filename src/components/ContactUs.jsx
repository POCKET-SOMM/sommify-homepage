import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CgAirplane, CgCheck, CgCheckO, CgClose, CgMail } from 'react-icons/cg';
import { RotatingLines } from 'react-loader-spinner';
import { TbMailX, TbMailCheck } from 'react-icons/tb';
import Button2 from './Button2';
import { useDimensions } from '../hooks';
import Button from './Button';

export default function ContactUs({ open, ...props }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');

  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);

  const [status, setStatus] = useState('IDLE');
  const disabled = !subject || !message || !contact || status === 'PENDING';

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    hidden: { opacity: 0, y: '5vh' },
  };

  const { sm, md, lg } = useDimensions();

  useEffect(() => {
    // reset form
    if (open) {
      setSubject('');
      setMessage('');
      setContact('');
      setStatus('IDLE');
    }
  }, [open]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (disabled) return;

    setStatus('PENDING');

    // // temporary - simulate sending message
    // setTimeout(() => {
    //   setStatus('SUCCESS');
    // }, 2000);

    fetch('https://api.sommify.ai/user/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        contact,
        message,
      }),
    })
      .then((res) => {
        setStatus('SUCCESS');
      })
      .catch((err) => {
        setStatus('FAILED');
      });
  };

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        // paddingBlock: '14vh 10vh',
        borderRadius: '2em',
        marginInline: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}
      >
        <h2 style={{ margin: 0, fontSize: sm || md ? '1.5em' : '2rem' }}>
          Open a dialogue
        </h2>
      </div>

      <p>
        We are always open to new ideas, suggestions, and feedback. Reach out to
        us by either filling out the following form or sending a message to one
        of our founders{' '}
        <a
          style={{
            cursor: 'pointer',
          }}
          href='mailto:jacob@sommify.ai'
        >
          jacob@sommify.ai
        </a>{' '}
        and we will get back to you as soon as possible.
      </p>

      <form
        style={{
          width: '100%',
          margin: 'auto',
          position: 'relative',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(e);
        }}
        {...props}
      >
        <AnimatePresence>
          {status === 'FAILED' && (
            <div
              style={{
                position: 'absolute',
                top: 60,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                initial={{ y: '3em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <TbMailX size='4em' />
                <span style={{ opacity: 0.7, marginTop: 20 }}>
                  Sending failed
                </span>
              </motion.div>
            </div>
          )}
          {status === 'SUCCESS' && (
            <div
              style={{
                position: 'absolute',
                top: 60,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                initial={{ y: '3em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <TbMailCheck size='4em' />
                <span style={{ opacity: 0.7, marginTop: 20 }}>
                  Message sent
                </span>
              </motion.div>
            </div>
          )}
          <motion.div
            animate={{
              opacity: status === 'IDLE' || status === 'PENDING' ? 1 : 0,
            }}
            exit={{ opacity: 0, position: 'fixed' }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%' }}
          >
            <label>Subject</label>
            <input
              value={subject}
              onChange={handleSubjectChange}
              placeholder='What is this message about?'
              className='w-100'
            />
            <label>Message</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows={3}
              className='w-100 py-3'
              placeholder='Your message...'
              style={{ resize: 'none', height: '8em' }}
            />
            <label>Contact</label>
            <input
              value={contact}
              onChange={handleContactChange}
              className='w-100'
              placeholder='How to reach you?'
            />
            <div className='flex justify-end items-center w-full pt-6'>
              <Button disabled={disabled} style={{ width: 150 }} type='submit'>
                {status === 'PENDING' ? (
                  <div className='flex items-center'>
                    <RotatingLines
                      visible={true}
                      height='12'
                      width='12'
                      strokeColor='black'
                      strokeWidth='5'
                      animationDuration='0.75'
                      ariaLabel='rotating-lines-loading'
                      wrapperStyle={{}}
                      wrapperClass=''
                    />{' '}
                    <span style={{ marginLeft: 6 }}>Sending</span>
                  </div>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CgMail style={{ marginRight: 6, fontSize: '1.25em' }} />{' '}
                    Send message
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}
