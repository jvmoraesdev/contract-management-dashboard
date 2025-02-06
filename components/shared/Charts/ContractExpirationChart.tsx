'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { ChartCardContainer } from './ChartCardContainer';
import React from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';
import useMobile from '@/stores/hooks/useMobile';

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
  },
  Jul: {
    label: 'Julho'
  },
  Aug: {
    label: 'Agosto'
  },
  Sep: {
    label: 'Setembro'
  },
  Oct: {
    label: 'Outubro'
  },
  Nov: {
    label: 'Novembro'
  },
  Dec: {
    label: 'Dezembro'
  }
} satisfies ChartConfig;

export const ContractExpirationChart: React.FC<ChartDataProps> = ({ barsChartData }) => {
  const { isMobile } = useMobile();
  if (!barsChartData) return null;

  const displayData = isMobile ? barsChartData.slice(0, 6) : barsChartData;

  return (
    <ChartCardContainer
      title="Linha do Tempo de Expiração de Contratos"
      labelConfig={barsChartConfig}
    >
      <BarChart
        accessibilityLayer
        data={displayData}
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
