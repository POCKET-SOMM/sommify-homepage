import { useEffect, useState } from 'react';

export function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    sm: window.innerWidth < 768,
    md: window.innerWidth >= 768 && window.innerWidth < 1024,
    lg: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        sm: window.innerWidth < 768,
        md: window.innerWidth >= 768 && window.innerWidth < 1024,
        lg: window.innerWidth >= 1024,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
