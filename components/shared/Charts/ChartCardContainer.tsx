'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartContainerProps } from '@/interfaces/chats.interface';
import React from 'react';

export const ChartCardContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  labelConfig,
  children
}) => {
  const config = labelConfig satisfies ChartConfig;
  return (
    <Card className="flex h-[300px] flex-col">
      <CardHeader className="items-center pb-0">
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="mt-4 h-full w-full flex-1 px-10">
        <ChartContainer config={config} className="h-full max-h-[80%] w-full">
          {children || <></>}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
