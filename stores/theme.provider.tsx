'use client';

import { ThemeColors, ThemeColorStateProps, ThemeMode } from '@/interfaces/theme.interface';
import { useTheme } from 'next-themes';
import { ThemeProviderProps } from 'next-themes';
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMounted from './hooks/useMounted';
import setGlobalColorTheme from '@/lib/theme-colors';

export const ThemeContext = createContext<ThemeColorStateProps>({} as ThemeColorStateProps);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isMounted = useMounted();

  const getSavedThemeColor = (): ThemeColors => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('themeColor') as ThemeColors;
      return savedColor || 'default';
    }
    return 'default';
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor());
  const { theme: themeMode, setTheme: setThemeMode } = useTheme();

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('themeColor', themeColor);
      setGlobalColorTheme(themeMode as 'light' | 'dark', themeColor);
    }
  }, [themeColor, themeMode, isMounted]);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
        themeMode: themeMode as ThemeMode,
        setThemeMode: setThemeMode as Dispatch<SetStateAction<ThemeMode>>
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
