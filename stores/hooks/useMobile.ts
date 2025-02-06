import { useContext } from 'react';
import { MobileContext } from '../mobile.provider';

const useMobile = () => {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error('useMobile não pode ser usado fora do MobileProvider');
  }

  return context;
};

export default useMobile;
