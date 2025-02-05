'use client';

import { ContractsContextType } from '@/interfaces/contexts.interface';
import { ContractWithId } from '@/interfaces/contracts.interface';
import { createContext, useMemo, useState } from 'react';
import React from 'react';

export const ContractsContext = createContext<ContractsContextType | undefined>(undefined);

const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<ContractWithId[]>([]);

  const contextValue: ContractsContextType = useMemo(
    () => ({ setContracts, contracts }),
    [contracts]
  );

  return <ContractsContext.Provider value={contextValue}>{children}</ContractsContext.Provider>;
};

export default ContractsProvider;
