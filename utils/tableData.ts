import { Status, Type } from '@/interfaces/contracts.interface';

export const getStatusName = (status: Status[], statusId: number) => {
  return status.find((s) => s.id === statusId)?.name || '';
};

export const getTypeName = (types: Type[], typeId: number) => {
  return types.find((t) => t.id === typeId)?.name || '';
};

export const getStatusStyle = (statusId: number) => {
  const styles: Record<number, { backgroundColor: string; color: string }> = {
    1: { backgroundColor: '#dcfce7', color: '#166534' }, // green
    2: { backgroundColor: '#fee2e2', color: '#991b1b' }, // red
    3: { backgroundColor: '#fef9c3', color: '#854d0e' }, // yellow
    4: { backgroundColor: '#ffedd5', color: '#9a3412' } // orange
  };
  return styles[statusId] || { backgroundColor: '#f3f4f6', color: '#374151' };
};
