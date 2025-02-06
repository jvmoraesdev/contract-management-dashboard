'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { ChartCardContainer } from './ChartCardContainer';
import React from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';

const barsChartConfig = {
  contracts: {
    label: 'Contratos'
  },
  Jan: {
    label: 'Janeiro'
  },
  Feb: {
    label: 'Fevereiro'
  },
  Mar: {
    label: 'Março'
  },
  Apr: {
    label: 'Abril'
  },
  May: {
    label: 'Maio'
  },
  Jun: {
    label: 'Junho'
  }
} satisfies ChartConfig;

export const ContractExpirationChart: React.FC<ChartDataProps> = ({ chartData }) => {
  return (
    <ChartCardContainer title="Contract Expiration Timeline" labelConfig={barsChartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="label" type="category" tickLine={false} tickMargin={4} />
        <YAxis tickMargin={4} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="value"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartCardContainer>
  );
};
