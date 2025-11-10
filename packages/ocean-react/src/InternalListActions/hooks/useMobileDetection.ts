import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '../constants';

const useMobileDetection = (withMobileMode: boolean): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(withMobileMode && window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [withMobileMode]);

  return isMobile;
};

export default useMobileDetection;
