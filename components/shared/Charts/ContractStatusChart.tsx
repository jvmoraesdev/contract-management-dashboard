'use client';

import { ChartCardContainer } from '@/components/shared/Charts/ChartCardContainer';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import React from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';
import useMobile from '@/stores/hooks/useMobile';

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
  const { isMobile } = useMobile();
  return (
    <ChartCardContainer title="Contract Status Control" labelConfig={pieChartConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            dataKey="value"
            nameKey="label"
            innerRadius={25}
            outerRadius={70}
            strokeWidth={1}
            labelLine={true}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              marginTop: isMobile ? '10px' : '0'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCardContainer>
  );
};
