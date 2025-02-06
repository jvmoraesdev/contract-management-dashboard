'use client';

import { ContractExpirationChart } from './ContractExpirationChart';
import React, { useEffect, useState } from 'react';
import useContracts from '@/stores/hooks/useContracts';
import { mapContractsToExpirationData, mapContractsToStatusData } from '@/utils/chartData';
import { ChartData } from '@/interfaces/chats.interface';
import { ContractStatusChart } from './ContractStatusChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ChartsSection(): React.ReactElement {
  const { contracts, status } = useContracts();
  const [expirationDate, setExpirationDate] = useState<ChartData[]>([]);
  const [statusData, setStatusData] = useState<ChartData[]>([]);

  useEffect(() => {
    setExpirationDate(mapContractsToExpirationData(contracts));
    setStatusData(mapContractsToStatusData(contracts, status));
  }, [contracts, status]);

  return (
    <>
      <div className="md:hidden">
        <Tabs defaultValue="expiration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expiration">Timeline</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>
          <TabsContent value="expiration">
            <ContractExpirationChart chartData={expirationDate} />
          </TabsContent>
          <TabsContent value="status">
            <ContractStatusChart chartData={statusData} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-2">
        <ContractExpirationChart chartData={expirationDate} />
        <ContractStatusChart chartData={statusData} />
      </div>
    </>
  );
}
