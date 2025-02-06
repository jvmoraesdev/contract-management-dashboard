import { Status, Type } from '@/interfaces/contracts.interface';

export const getStatusName = (status: Status[], statusId: number) => {
  return status.find((s) => s.id === statusId)?.name || '';
};

export const getTypeName = (types: Type[], typeId: number) => {
  return types.find((t) => t.id === typeId)?.name || '';
};

export const getStatusStyle = (statusId: number) => {
  const styles = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-red-100 text-red-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-orange-100 text-orange-800'
  };
  return styles[statusId as keyof typeof styles] || '';
};
