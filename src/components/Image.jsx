import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadableImage({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = url;
    });

  useEffect(() => {
    loadImage(src)
      .then((img) => {
        setLoaded(true);
        // console.log('loaded');
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div {...props}>
      <AnimatePresence>
        {loaded && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.33, type: 'ease' }}
            className='w-100 h-100'
            src={src}
            alt={alt}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
