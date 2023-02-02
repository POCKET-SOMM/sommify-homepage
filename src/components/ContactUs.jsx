import axios from 'axios';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { CgCheckO } from 'react-icons/cg';
import colors from '../data/colors';

export default function ContactUs({ ...props }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');

  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);

  const [status, setStatus] = useState('IDLE');
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    hidden: { opacity: 0, y: '5vh' },
  };

  const handleSendMessage = () => {
    setStatus('PENDING');
    axios
      .post('https://api.sommify.ai/user/contact', {
        subject,
        contact,
        message,
      })
      .then((res) => {
        setStatus('SUCCESS');
      })
      .catch((err) => {
        setStatus('FAILED');
      });
  };

  return (
    <motion.div
      id='contact-us'
      className='px-5 d-flex flex-column'
      ref={ref}
      animate={controls}
      initial='hidden'
      variants={variants}
      style={{
        width: '40%',
        maxWidth: '1240px',
        minWidth: '428px',
        paddingBlock: '14vh 10vh',
        borderRadius: '2em',
        left: 0,
        right: 0,
        margin: 'auto',
        color: 'black',
      }}
    >
      <div className='d-flex justify-content-center text-center'>
        <h1 style={{ fontWeight: 700, fontSize: '3.3em' }}>Open a dialogue</h1>
      </div>
      <div className='d-flex w-100 flex-grow-1'>
        <Form className='p-2' style={{ flex: 1 }}>
          <AnimatePresence>
            <div
              key='contact-us-form'
              className='d-flex flex-column h-100 position-relative'
            >
              {status === 'SUCCESS' && (
                <div
                  // style={{ flex: 1 }}
                  className='h-100 w-100 d-flex justify-content-center align-items-center position-absolute'
                >
                  <motion.div
                    className='text-secondary d-flex flex-column justify-content-center align-items-center text-center'
                    initial={{ y: '3em', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <CgCheckO size='6em' className='mb-4' />
                    <h4>MESSAGE SENT</h4>
                  </motion.div>
                </div>
              )}
              <motion.div
                animate={{ opacity: status === 'SUCCESS' ? 0 : 1 }}
                exit={{ opacity: 0, position: 'fixed' }}
                transition={{ duration: 0.4 }}
              >
                <div className='p-2'>
                  <Form.Label>SUBJECT</Form.Label>
                  <Form.Control
                    value={subject}
                    onChange={handleSubjectChange}
                    placeholder='What is this message about?'
                    className='w-100'
                  />
                </div>
                <div className='p-2 d-flex flex-column' style={{ flex: 1 }}>
                  <Form.Label>MESSAGE</Form.Label>
                  <Form.Control
                    value={message}
                    onChange={handleMessageChange}
                    as='textarea'
                    rows={3}
                    className='w-100 py-3'
                    placeholder='Your message...'
                    style={{ resize: 'none', height: '8em' }}
                  />
                </div>
                <div className='p-2 mb-3'>
                  <Form.Label>CONTACT</Form.Label>
                  <Form.Control
                    value={contact}
                    onChange={handleContactChange}
                    className='w-100'
                    placeholder='How to reach you?'
                  />
                </div>
                <div className='p-2 d-flex justify-content-center'>
                  <Button
                    disabled={!subject || !message || !contact}
                    variant='secondary'
                    onClick={handleSendMessage}
                    className='p-3 font-weight-600 text-white'
                    style={{ borderRadius: '999px', width: '15em' }}
                  >
                    {status === 'PENDING' ? (
                      <Spinner animation='border' size='sm' />
                    ) : (
                      'SEND'
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </Form>
      </div>
    </motion.div>
  );
}
