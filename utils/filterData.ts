import { ContractWithId } from '@/interfaces/contracts.interface';

export const filterContractsByDate = (
  contracts: ContractWithId[],
  startDate?: Date,
  endDate?: Date
) => {
  if (!startDate || !endDate) return contracts;

  return contracts.filter((contract) => {
    const contractStartDate = new Date(contract.startDate);
    const contractEndDate = new Date(contract.endDate);

    return (
      (contractStartDate >= startDate && contractStartDate <= endDate) ||
      (contractEndDate >= startDate && contractEndDate <= endDate) ||
      (contractStartDate <= startDate && contractEndDate >= endDate)
    );
  });
};

export const filterContractsByStatus = (contracts: ContractWithId[], statusFilter?: number) => {
  if (!statusFilter) return contracts;
  return contracts.filter((contract) => contract.status === statusFilter);
};

export const filterContractsByType = (contracts: ContractWithId[], typeFilter?: number) => {
  if (!typeFilter) return contracts;
  return contracts.filter((contract) => contract.type === typeFilter);
};

export const applyFilters = (
  contracts: ContractWithId[],
  filters: {
    dateRange?: { from: Date; to: Date };
    status?: number;
    type?: number;
  }
) => {
  let filteredContracts = [...contracts];

  if (filters.dateRange) {
    filteredContracts = filterContractsByDate(
      filteredContracts,
      filters.dateRange.from,
      filters.dateRange.to
    );
  }

  if (filters.status) {
    filteredContracts = filterContractsByStatus(filteredContracts, filters.status);
  }

  if (filters.type) {
    filteredContracts = filterContractsByType(filteredContracts, filters.type);
  }

  return filteredContracts;
};
