import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CodePane from './CodePane';

const requestCode = `const response = await fetch(
    'https://api.wineapi.live/graphql',
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    
        // Replace with your API key
        apiKey: API_KEY,
    },
    body: JSON.stringify({}),
    }
);`;

const responseCode = `{
    "data": {
      "wine": {
          "id": "5f9d88b9-1cc9-4d4d-8b1a-8c2f1d1b2c2b",
          "name": "Château Margaux",
          "vintage": 2015,
          "color": "Red",
    
          // ...
      }
    }
}`;

const endpoints = [
  {
    path: 'recipe',
    description: 'Get a wine recommendation based on a recipe',
  },
  {
    path: 'text',
    description: 'Get a wine recommendation based on a user prompt',
  },
  {
    path: 'url',
    description: 'Get a wine recommendation based on a URL of a recipe',
  },
];

export default function APIShowcase({}) {
  const [selected, setSelected] = useState(endpoints[0].path);

  return (
    <div className='p-5 d-flex'>
      <div
        className='d-flex flex-column justify-content-start align-items-center px-5'
        // style={{ flex: 1 }}
      >
        {endpoints.map(({ path }) => (
          <motion.div
            key={'endpoint_' + path}
            onClick={() => setSelected(path)}
            animate={{
              opacity: path === selected ? 1 : 0.3,
            }}
            whileHover={{
              opacity: 1,
            }}
            className='d-flex justify-content-center align-items-center font-mono'
            style={{
              background: '#f0f5fa',
              borderRadius: 12,
              height: 100,
              width: 400,
              marginBottom: 24,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            https://api.sommify.ai/sommelier/{path}
          </motion.div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, display: 'none' }}
            animate={{
              opacity: 1,
              display: 'block',
              transition: { delay: 0.2 },
            }}
            exit={{ opacity: 0, display: 'none' }}
            key={'endpoint_example_' + selected}
            transition={{
              duration: 0.2,
              display: { delay: 0.2 },
              type: 'tween',
              ease: 'easeInOut',
            }}
          >
            <CodePane
              examples={[
                {
                  code: requestCode,
                  language: 'js',
                  title: 'Example Request',
                },
                {
                  code: responseCode,
                  language: 'json',
                  title: 'Example Response',
                },
              ]}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
