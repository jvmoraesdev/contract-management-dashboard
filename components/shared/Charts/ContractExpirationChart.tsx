'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { ChartCardContainer } from './ChartCardContainer';
import React from 'react';
import { ChartDataProps } from '@/interfaces/chats.interface';
import useMobile from '@/stores/hooks/useMobile';
import { useTranslation } from 'react-i18next';

export const ContractExpirationChart: React.FC<ChartDataProps> = ({ barsChartData }) => {
  const { t } = useTranslation('');
  const { isMobile } = useMobile();
  if (!barsChartData) return null;

  const barsChartConfig = {
    contracts: {
      label: t('common.contracts')
    },
    Jan: {
      label: t('common.months.jan')
    },
    Feb: {
      label: t('common.months.feb')
    },
    Mar: {
      label: t('common.months.mar')
    },
    Apr: {
      label: t('common.months.apr')
    },
    May: {
      label: t('common.months.may')
    },
    Jun: {
      label: t('common.months.jun')
    },
    Jul: {
      label: t('common.months.jul')
    },
    Aug: {
      label: t('common.months.aug')
    },
    Sep: {
      label: t('common.months.sep')
    },
    Oct: {
      label: t('common.months.oct')
    },
    Nov: {
      label: t('common.months.nov')
    },
    Dec: {
      label: t('common.months.dec')
    }
  } satisfies ChartConfig;

  const displayData = isMobile ? barsChartData.slice(0, 6) : barsChartData;

  return (
    <ChartCardContainer title={t('charts.timeline')} labelConfig={barsChartConfig}>
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
