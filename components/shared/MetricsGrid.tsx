import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Clock, DollarSign } from 'lucide-react';

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
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
          <div
            className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsGridProps {
  metrics?: {
    totalContracts: number;
    activeContracts: number;
    expiringSoon: number;
    totalValue: number;
  };
}

const MetricsGrid = ({
  metrics = {
    totalContracts: 156,
    activeContracts: 89,
    expiringSoon: 12,
    totalValue: 1250000
  }
}: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-background p-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Contracts"
        value={metrics.totalContracts.toString()}
        change={8.2}
        icon={<div className="text-primary">📄</div>}
      />
      <MetricCard
        title="Active Contracts"
        value={metrics.activeContracts.toString()}
        change={5.1}
        icon={<div className="text-primary">✓</div>}
      />
      <MetricCard
        title="Expiring Soon"
        value={metrics.expiringSoon.toString()}
        change={-2.4}
        icon={<Clock className="text-primary" size={20} />}
      />
      <MetricCard
        title="Total Value"
        value={`$${(metrics.totalValue / 1000).toFixed(1)}K`}
        change={12.5}
        icon={<DollarSign className="text-primary" size={20} />}
      />
    </div>
  );
};

export default MetricsGrid;
