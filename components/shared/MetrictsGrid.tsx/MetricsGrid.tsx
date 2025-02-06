'use client';

import React from 'react';
import { Check, ClockAlert, DollarSign, FileText } from 'lucide-react';
import MetricCard from './MetricCard';
import { getMetrics } from '@/utils/metricsData';
import useContracts from '@/stores/hooks/useContracts';

const MetricsGrid = () => {
  const { contracts } = useContracts();
  const metrics = getMetrics(contracts);

  return (
    <div className="grid grid-cols-1 gap-4 bg-background py-2 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Contracts"
        value={metrics.totalContracts.toString()}
        change={metrics.totalContractsChange}
        icon={<FileText className="text-primary" size={22} strokeWidth={1} />}
      />
      <MetricCard
        title="Active Contracts"
        value={metrics.activeContracts.toString()}
        change={metrics.activeContractsChange}
        icon={<Check className="text-primary" size={22} />}
      />
      <MetricCard
        title="Expiring Soon"
        value={metrics.expiringSoon.toString()}
        change={metrics.expiringSoonChange}
        icon={<ClockAlert className="text-primary" size={22} />}
      />
      <MetricCard
        title="Total Value"
        value={`$${(metrics.totalValue / 1000).toFixed(1)}K`}
        change={metrics.totalValueChange}
        icon={<DollarSign className="text-primary" size={22} />}
      />
    </div>
  );
};

export default MetricsGrid;
