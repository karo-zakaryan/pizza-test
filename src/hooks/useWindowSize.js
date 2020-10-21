import { useState, useEffect } from 'react';

import useEventListener from './useEventListener';

const useWindowSize = () => {
  const getSize = () => ({
    width: undefined,
    height: undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  const resizeHandler = () => {
    if (window && window.innerWidth && window.innerHeight) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEventListener('resize', resizeHandler);

  useEffect(() => {
    resizeHandler();
  }, []);

  const isMobile = windowSize.width < 577;
  const isTablet = windowSize.width >= 577 && windowSize.width < 768;
  const isLargeTablet = windowSize.width >= 768 && windowSize.width <= 1024;
  const isDesktop = windowSize.width > 1024;

  return { isMobile, isTablet, isLargeTablet, isDesktop };
};

export default useWindowSize;
