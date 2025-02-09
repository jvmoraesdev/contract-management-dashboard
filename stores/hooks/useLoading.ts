import { useContext } from 'react';
import { LoadingContext } from '../loading.provider';

const useloading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading não pode ser usado fora do loadingProvider');
  }

  return context;
};

export default useloading;
