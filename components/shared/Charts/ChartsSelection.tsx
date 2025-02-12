'use client';

import { ContractExpirationChart } from './ContractExpirationChart';
import React, { useEffect, useState } from 'react';
import useContracts from '@/stores/hooks/useContracts';
import {
  mapContractsToExpirationData,
  mapContractsToStatusData,
  mapContractsToTypeData
} from '@/utils/chartData';
import { ChartData } from '@/interfaces/chats.interface';
import { ContractStatusChart } from './ContractStatusChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

export default function ChartsSection(): React.ReactElement {
  const { t } = useTranslation('');

  const { contracts, status, type } = useContracts();
  const [expirationDate, setExpirationDate] = useState<ChartData[]>([]);
  const [statusData, setStatusData] = useState<ChartData[]>([]);
  const [typeData, setTypeData] = useState<ChartData[]>([]);

  useEffect(() => {
    setExpirationDate(mapContractsToExpirationData(contracts));
    setStatusData(mapContractsToStatusData(contracts, status));
    setTypeData(mapContractsToTypeData(contracts, type));
  }, [contracts, status, type]);

  return (
    <>
      <div className="md:hidden">
        <Tabs defaultValue="expiration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expiration">{t('charts.expiration')}</TabsTrigger>
            <TabsTrigger value="distribution">{t('charts.distribution')}</TabsTrigger>
          </TabsList>
          <TabsContent value="expiration">
            <ContractExpirationChart barsChartData={expirationDate} />
          </TabsContent>
          <TabsContent value="distribution">
            <ContractStatusChart statusData={statusData} typeData={typeData} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-2">
        <ContractExpirationChart barsChartData={expirationDate} />
        <ContractStatusChart statusData={statusData} typeData={typeData} />
      </div>
    </>
  );
}
