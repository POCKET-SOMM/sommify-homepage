import Highlight from 'react-highlight';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CodePane({ examples, ...props }) {
  const [selected, setSelected] = useState(examples[0].title);

  return (
    <div
      className='d-flex flex-column position-relative'
      style={{
        width: '100%',
        background: '#282c34',
        borderRadius: 12,
        marginBottom: 120,
      }}
    >
      <div
        className='w-100 d-flex align-items-center'
        style={{
          borderBottom: '1px solid #ffffff20',
          color: '#ffffff4a',
        }}
      >
        <div className='d-flex' style={{ padding: 13 }}>
          {[1, 2, 3].map(() => (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#ffffff4a',
                marginRight: 5,
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: 14 }} className='d-flex'>
          {examples.map((example) => (
            <motion.div
              key={'example_' + example.title}
              animate={{
                color: selected === example.title ? '#ffffff' : '#ffffff60',
              }}
              whileHover={{
                color: '#ffffff',
              }}
              className='clickable mx-3 position-relative h-100'
              onClick={() => setSelected(example.title)}
            >
              {example.title}
              {selected === example.title && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='position-absolute w-100'
                  style={{
                    height: 2,
                    bottom: -9,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                  }}
                ></motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className='px-4 py-3 font-mono'>
        <Highlight
          className={examples.find((e) => e.title === selected).language}
        >
          {examples.find((e) => e.title === selected).code}
        </Highlight>
      </div>
    </div>
  );
}
