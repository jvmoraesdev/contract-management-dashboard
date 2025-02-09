import contractsApi from '@/api/contractsApi';
import { Contract, ContractWithId, Status, Type } from '@/interfaces/contracts.interface';
import { Response } from '@/interfaces/general.interface';

export const getAllContracts = async (): Promise<ContractWithId[]> => {
  try {
    return await contractsApi.getAllContracts();
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const getContractByID = async (id: string): Promise<ContractWithId> => {
  try {
    return contractsApi.getContractByID(id);
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const createContract = async (contract: Contract): Promise<ContractWithId> => {
  try {
    return contractsApi.createContract(contract);
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const updateContract = async (contract: ContractWithId): Promise<ContractWithId> => {
  try {
    return await contractsApi.updateContract(contract);
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const deleteContractByID = async (id: string): Promise<string> => {
  try {
    const response = await contractsApi.deleteContractByID(id);
    return response.message;
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const getAllContractsStatus = async (): Promise<Status[]> => {
  try {
    return await contractsApi.getAllContractsStatus();
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};

export const getAllContractsTypes = async (): Promise<Type[]> => {
  try {
    return await contractsApi.getAllContractsTypes();
  } catch (err) {
    const error = err as Response;
    throw error.message;
  }
};
