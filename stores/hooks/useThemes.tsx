import { useContext } from 'react';
import { ThemeContext } from '../theme.provider';

const useThemes = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.log(context);
    throw new Error('useThemes cannot be used outside the ThemeProvider component');
  }

  return context;
};

export default useThemes;
