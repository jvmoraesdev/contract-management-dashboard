import { useContext } from 'react';
import { ContractsContext } from '../contracts.provider';

const useContracts = () => {
  const context = useContext(ContractsContext);

  if (!context) {
    throw new Error('useContracts cannot be used outside the ContarctsProvider component');
  }

  return context;
};

export default useContracts;
