import { ContractWithId, Status } from '@/interfaces/contracts.interface';
import { ChartData } from '@/interfaces/chats.interface';

/**
 * Mapeia contratos para dados de expiração nos próximos 6 meses.
 */
export function mapContractsToExpirationData(contracts: ContractWithId[]): ChartData[] {
  const today = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(today.getMonth() + 6);

  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  };

  contracts.forEach((contract) => {
    const endDate = new Date(contract.endDate);

    if (endDate >= today && endDate <= sixMonthsFromNow) {
      const monthKey = endDate.toLocaleString('en', { month: 'short' }) as keyof typeof monthMap;
      if (monthKey in monthMap) {
        monthMap[monthKey]++;
      }
    }
  });

  return Object.entries(monthMap).map(([month, count], index) => ({
    label: month,
    value: count,
    fill: `hsl(var(--chart-${index + 1}))`
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
