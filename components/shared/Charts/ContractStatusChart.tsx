'use client';

import { ChartCardContainer } from '@/components/shared/Charts/ChartCardContainer';
import { Cell, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import React from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';

const pieChartConfig = {
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ContractStatusChart: React.FC<ChartDataProps> = ({ chartData }) => {
  return (
    <ChartCardContainer title="Contract Status Control" labelConfig={pieChartConfig}>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          strokeWidth={2}
          labelLine={false}
          label={({ name, percent }) => `[${(percent * 100).toFixed(0)}%] ${name} `}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartCardContainer>
  );
};
