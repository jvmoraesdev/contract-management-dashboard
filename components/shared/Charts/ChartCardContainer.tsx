'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartContainerProps } from '@/interfaces/chats.interface';
import { cn } from '@/lib/utils';
import React from 'react';

export const ChartCardContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  labelConfig,
  children,
  className,
  action
}) => {
  const config = labelConfig satisfies ChartConfig;
  return (
    <Card className={cn('flex h-[300px] flex-col', className)}>
      <CardHeader className="items-center pb-1">
        {title && (
          <CardTitle>
            {title} {action}
          </CardTitle>
        )}
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="h-full w-full flex-1 px-0">
        <ChartContainer config={config} className="h-full max-h-[90%] w-full pr-4">
          {children || <></>}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
