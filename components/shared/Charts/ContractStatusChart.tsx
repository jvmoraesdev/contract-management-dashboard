'use client';

import { ChartCardContainer } from '@/components/shared/Charts/ChartCardContainer';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import React, { useState } from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';
import useMobile from '@/stores/hooks/useMobile';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

export const ContractStatusChart: React.FC<ChartDataProps> = ({ statusData, typeData }) => {
  const { t } = useTranslation('');
  const [chartType, setChartType] = useState<'status' | 'type'>('status');
  const { isMobile } = useMobile();

  const statusPieChartConfig = {
    contracts: {
      label: t('common.contracts')
    },
    active: {
      label: t('common.status.Ativo'),
      color: 'hsl(var(--chart-1))'
    },
    expired: {
      label: t('common.status.Expirado'),
      color: 'hsl(var(--chart-2))'
    },
    pendingRenewal: {
      label: t('common.status.Pendente de Renovação'),
      color: 'hsl(var(--chart-3))'
    },
    nearingExpiration: {
      label: t('common.status.Próximo ao Vencimento'),
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  const typesPieChartConfig = {
    contracts: {
      label: t('common.contracts')
    },
    service: {
      label: t('common.type.Serviço'),
      color: 'hsl(var(--chart-1))'
    },
    supply: {
      label: t('common.type.Fornecimento'),
      color: 'hsl(var(--chart-2))'
    },
    consulting: {
      label: t('common.type.Consultoria'),
      color: 'hsl(var(--chart-3))'
    },
    IT: {
      label: t('common.type.TI'),
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  return (
    <ChartCardContainer
      title={t('charts.distributionBy')}
      labelConfig={chartType === 'status' ? statusPieChartConfig : typesPieChartConfig}
      action={
        <Tabs
          defaultValue="status"
          onValueChange={(value) => setChartType(value as 'status' | 'type')}
        >
          <TabsList className="grid h-8 w-32 grid-cols-2">
            <TabsTrigger value="status" className="h-6">
              {t('common.status.status')}
            </TabsTrigger>
            <TabsTrigger value="type" className="h-6">
              {t('common.type.type')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartType === 'status' ? statusData : typeData}
            cx="50%"
            cy="50%"
            dataKey="value"
            nameKey="label"
            innerRadius={25}
            outerRadius={70}
            strokeWidth={1}
            labelLine={false}
          >
            {chartType === 'status'
              ? statusData?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                ))
              : typeData?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                ))}
          </Pie>
          <Legend
            layout={isMobile ? 'horizontal' : 'centric'}
            align={isMobile ? 'center' : 'right'}
            verticalAlign={isMobile ? 'bottom' : 'middle'}
            iconType="square"
            iconSize={10}
            wrapperStyle={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              gap: '0.5rem',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
              paddingTop: '10px',
              paddingBottom: isMobile ? '10px' : '0px'
            }}
            formatter={(value) => <span className="text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCardContainer>
  );
};
