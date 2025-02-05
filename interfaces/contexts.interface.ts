import { ContractWithId } from './contracts.interface';

export interface ContractsContextType {
  setContracts: (contracts: ContractWithId[]) => void;
  contracts: ContractWithId[];
}
