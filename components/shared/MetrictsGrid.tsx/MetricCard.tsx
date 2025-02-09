'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({ title = 'Metric', value = '0', change = 0, icon }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-background">
      <CardContent className="p-6">
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-4xl font-bold text-[---primary]">{value}</p>
          <div className="flex items-center gap-1">
            {icon}
            <h3 className="text-sm text-black text-muted-foreground">{title}</h3>
            <div
              className={`text-3x1 flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
            >
              <span>{Math.abs(change)}%</span>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
