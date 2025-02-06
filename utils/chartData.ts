import { ContractWithId, Status } from '@/interfaces/contracts.interface';
import { ChartData } from '@/interfaces/chats.interface';

/**
 * Mapeia contratos para dados de expiração nos próximos 6/12 meses.
 */
export function mapContractsToExpirationData(contracts: ContractWithId[]): ChartData[] {
  const today = new Date();
  const currentMonth = today.getMonth();

  // Inicializa um array com os próximos 12 meses
  const nextMonths = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(currentMonth + i);
    return date.toLocaleString('en', { month: 'short' });
  });

  const monthMap: Record<string, number> = {};
  nextMonths.forEach((month) => {
    monthMap[month] = 0;
  });

  contracts.forEach((contract) => {
    const endDate = new Date(contract.endDate);
    const monthsAhead =
      (endDate.getFullYear() - today.getFullYear()) * 12 + (endDate.getMonth() - today.getMonth());

    if (monthsAhead >= 0 && monthsAhead < 12) {
      const monthKey = endDate.toLocaleString('en', { month: 'short' });
      if (monthKey in monthMap) {
        monthMap[monthKey]++;
      }
    }
  });

  return nextMonths.map((month, index) => ({
    label: month,
    value: monthMap[month],
    fill: `hsl(var(--chart-${(index % 12) + 1}))`
  }));
}

/**
 * Mapeia contratos para dados de status.
 */
export function mapContractsToStatusData(
  contracts: ContractWithId[],
  status: Status[]
): ChartData[] {
  const statusMap = new Map<number, number>();

  contracts.forEach((contract) => {
    statusMap.set(contract.status, (statusMap.get(contract.status) || 0) + 1);
  });

  return status.map(({ id, name }) => ({
    label: name,
    value: statusMap.get(id) || 0
  }));
}

/**
 * Mapeia contratos para dados de tipo.
 */
export function mapContractsToTypeData(contracts: ContractWithId[], types: Status[]): ChartData[] {
  const typeMap = new Map<number, number>();

  contracts.forEach((contract) => {
    typeMap.set(contract.type, (typeMap.get(contract.type) || 0) + 1);
  });

  return types.map(({ id, name }) => ({
    label: name,
    value: typeMap.get(id) || 0
  }));
}
