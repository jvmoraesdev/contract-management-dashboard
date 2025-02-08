'use client';

import { ChildrenProps, LoadingStateProps } from '@/interfaces/general.inteface';
import React, { createContext, useEffect, useState } from 'react';
import useMounted from './hooks/useMounted';
import LoadingOverlay from '@/components/shared/LoadingOverlay';

export const LoadingContext = createContext<LoadingStateProps | undefined>(undefined);

const LoadingProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isMounted]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
