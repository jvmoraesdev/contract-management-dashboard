'use client';

import { ContractExpirationChart } from './ContractExpirationChart';
import React, { useEffect, useState } from 'react';
import useContracts from '@/stores/hooks/useContracts';
import { mapContractsToExpirationData, mapContractsToStatusData } from '@/utils/chartData';
import { ChartData } from '@/interfaces/chats.interface';
import { ContractStatusChart } from './ContractStatusChart';

export default function ChartsSection(): React.ReactElement {
  const { contracts, status } = useContracts();
  const [expirationDate, setExpirationDate] = useState<ChartData[]>([]);
  const [statusData, setStatusData] = useState<ChartData[]>([]);

  useEffect(() => {
    setExpirationDate(mapContractsToExpirationData(contracts));
    setStatusData(mapContractsToStatusData(contracts, status));
  }, [contracts, status]);

  return (
    <div className="grid gap-4 bg-background md:grid-cols-2">
      <ContractExpirationChart chartData={expirationDate} />
      <ContractStatusChart chartData={statusData} />
    </div>
  );
}
