'use client';

import React, { createContext, useEffect, useMemo, useState } from 'react';

interface MobileContextType {
  isMobile: boolean;
}

const MOBILE_BREAKPOINT = 768;

export const MobileContext = createContext<MobileContextType | undefined>(undefined);

const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const contextValue = useMemo(() => ({ isMobile }), [isMobile]);

  return <MobileContext.Provider value={contextValue}>{children}</MobileContext.Provider>;
};

export default MobileProvider;
