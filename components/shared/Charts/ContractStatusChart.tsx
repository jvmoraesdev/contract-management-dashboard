'use client';

import { ChartCardContainer } from '@/components/shared/Charts/ChartCardContainer';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import React, { useState } from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';
import useMobile from '@/stores/hooks/useMobile';
import { Button } from '@/components/ui/button';
import { RefreshCcwDot } from 'lucide-react';

const statusPieChartConfig = {
  contracts: {
    label: 'Contracts'
  },
  active: {
    label: 'Ativo',
    color: 'hsl(var(--chart-1))'
  },
  expired: {
    label: 'Expirado',
    color: 'hsl(var(--chart-2))'
  },
  pendingRenewal: {
    label: 'Pendente de Renovação',
    color: 'hsl(var(--chart-3))'
  },
  nearingExpiration: {
    label: 'Próximo ao Vencimento',
    color: 'hsl(var(--chart-4))'
  }
} satisfies ChartConfig;

const typesPieChartConfig = {
  contracts: {
    label: 'Contracts'
  },
  service: {
    label: 'Serviço',
    color: 'hsl(var(--chart-1))'
  },
  supply: {
    label: 'Fornecimento',
    color: 'hsl(var(--chart-2))'
  },
  consulting: {
    label: 'Consultoria',
    color: 'hsl(var(--chart-3))'
  },
  IT: {
    label: 'TI',
    color: 'hsl(var(--chart-4))'
  }
} satisfies ChartConfig;

export const ContractStatusChart: React.FC<ChartDataProps> = ({ statusData, typeData }) => {
  const [chartType, setChartType] = useState<'status' | 'type'>('status');
  const { isMobile } = useMobile();

  return (
    <ChartCardContainer
      title={chartType === 'status' ? 'Distribuição por Status' : 'Distribuição por Tipo'}
      labelConfig={chartType === 'status' ? statusPieChartConfig : typesPieChartConfig}
      action={
        <Button
          className="h-8 w-8"
          variant="outline"
          onClick={() => setChartType(chartType === 'status' ? 'type' : 'status')}
        >
          <RefreshCcwDot size={16} strokeWidth={2.0} />
        </Button>
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
              paddingTop: '10px'
            }}
            formatter={(value) => <span className="text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCardContainer>
  );
};
