import { ContractWithId, Status, Type } from './contracts.interface';

export interface ContractsContextType {
  setContracts: (contracts: ContractWithId[]) => void;
  contracts: ContractWithId[];
  setStatus: (status: Status[]) => void;
  status: Status[];
  setType: (type: Type[]) => void;
  type: Type[];
}
