import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CodePane from './CodePane';

const useCases = [
  {
    title: 'Interacting',
    description:
      'Like our interactive sommelier you are able to build a solution for your app, website or in-store tablet for example to get our AI sommelier to suggest your wines based on your customers’ queries. Example use case is a retailer offering their customers in-store advice to buy the right wine with the meal they are planning to make with a tablet mounted in the wine section.',
  },
  {
    title: 'Populating',
    description:
      'Do you have a recipe site or are you a food box company? Using our AI you can populate your meals with wines, either from your selection or we can offer you a partner who will then pay you for the customers you bring them. Example use case is a retailer having wines from their selection, the same way they have ingredients of the meals attached.',
  },
  {
    title: 'Smart home',
    description:
      'We can enhance the kitchen and wine cellar technology of smart homes by suggesting wines that the person already has or that they can buy to complement the meal they are going to have right from the smart home platform. Example use case a person is going to cook a carbonara and can check which of the wines in their cellar would be best to open with the meal.',
  },
  {
    title: 'Anything else',
    description:
      'Don’t let our creativity be a barrier for you, there are for sure many other ways to use our API. We also love any new ideas and will gladly collaborate and work on new ways to make wine easy.',
  },
  //   { title: 'Enhancing Culinary Education' },
  //   { title: 'Restaurant Menus' },
  //   { title: 'Wine Retailer Assistance' },
];

export default function UseCases({ ...props }) {
  const [selected, setSelected] = useState(0);
  const selectedUseCase = useCases[selected];

  return (
    <div className='p-5 mt-5'>
      {/* <h5>Get Inspired</h5> */}
      <div
        className='w-100 d-flex justify-content-center'
        style={{ marginBottom: 100 }}
      >
        {useCases.map(({ img }, i) => (
          <motion.div
            // layout
            animate={{
              //   width: i === selected ? 120 : 70,
              opacity: i === selected ? 1 : 0.3,
            }}
            whileHover={{
              opacity: 1,
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              marginRight: 10,
            }}
          >
            <div
              style={{
                background: '#f0f5fa',
                width: 60,
                height: 60,
                padding: 10,
                borderRadius: 6,
              }}
              onClick={() => setSelected(i)}
            >
              <img className='w-100 h-100' src={''} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'block', transition: { delay: 0.2 } }}
          exit={{ opacity: 0, display: 'none' }}
          key={'use_case_' + selected}
          transition={{
            duration: 0.2,
            display: { delay: 0.2 },
            type: 'tween',
            ease: 'easeInOut',
          }}
          className='w-100'
        >
          <div className='d-flex justify-content-between'>
            <div
              style={{
                minWidth: 200,
                height: 200,
                borderRadius: 12,
                padding: 20,
                background: '#f0f5fa',
                marginRight: 60,
              }}
            >
              <img className='w-100 h-100' src={''} />
            </div>
            <div style={{ flex: 1, minHeight: 400 }}>
              {/* <h5 style={{ color: '#a51c5e', fontWeight: 600 }}>USE CASE</h5> */}
              <div
                className='mb-4'
                style={{ fontWeight: 700, fontSize: '2.3rem' }}
              >
                {selectedUseCase.title}
              </div>
              <p>{selectedUseCase.description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}