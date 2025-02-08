/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContractWithId } from '@/interfaces/contracts.interface';

export const calculateTotalContractsValue = (contracts: ContractWithId[]): number => {
  return contracts.reduce((total, contract) => total + contract.value, 0);
};

export const calculateActiveContractsValue = (contracts: ContractWithId[]): number => {
  return contracts
    .filter((contract) => contract.status === 1)
    .reduce((total, contract) => total + contract.value, 0);
};

export const calculateExpiringContractsCount = (contracts: ContractWithId[]): number => {
  return contracts.filter((contract) => contract.status === 4).length;
};

export const calculateContractsGrowth = (contracts: ContractWithId[]): number => {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  const currentMonthContracts = contracts.filter(
    (contract) => new Date(contract.startDate).getMonth() === currentMonth
  ).length;

  const lastMonthContracts = contracts.filter(
    (contract) => new Date(contract.startDate).getMonth() === lastMonth
  ).length;

  if (lastMonthContracts === 0) return 100;

  return ((currentMonthContracts - lastMonthContracts) / lastMonthContracts) * 100;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

export const getMetrics = (contracts: ContractWithId[]) => {
  const totalValue = calculateTotalContractsValue(contracts);
  const expiringCount = calculateExpiringContractsCount(contracts);

  const activeValue = calculateActiveContractsValue(contracts);
  const growth = calculateContractsGrowth(contracts);

  return {
    totalContracts: contracts.length,
    activeContracts: contracts.filter((contract) => contract.status === 1).length,
    expiringSoon: expiringCount,
    totalValue: totalValue,
    //Mocked values
    activeContractsChange: 5.1,
    totalContractsChange: 8.2,
    expiringSoonChange: -2.4,
    totalValueChange: 12.5
  };
};
