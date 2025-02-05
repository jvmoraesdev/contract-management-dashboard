export interface ContractWithId {
  id: string;
  name: string;
  clientOrSupplier: string;
  startDate: Date;
  endDate: Date;
  status: number;
  value: number;
  type: number;
}

export type Contract = Omit<ContractWithId, 'id'>;

export interface BaseEntity {
  id: number;
  name: string;
}

export type Status = BaseEntity;
export type Type = BaseEntity;
