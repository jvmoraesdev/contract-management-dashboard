'use client';

import React, { useState } from 'react';
import { Check, ClockAlert, DollarSign, FileText } from 'lucide-react';
import MetricCard from './MetricCard';
import { getMetrics } from '@/utils/metricsData';
import useContracts from '@/stores/hooks/useContracts';
import ProjectTableDialog from '../Table/ProjectTableDialog';

const MetricsGrid = () => {
  const { contracts } = useContracts();
  const metrics = getMetrics(contracts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<string>('');

  const handleMetricClick = (filter: string) => {
    setFilter(filter);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-background py-2 md:grid-cols-2 lg:grid-cols-4">
        <div onClick={() => handleMetricClick('totalContracts')} className="cursor-pointer">
          <MetricCard
            title="Total Contracts"
            value={metrics.totalContracts.toString()}
            change={metrics.totalContractsChange}
            icon={<FileText className="text-primary" size={22} strokeWidth={1} />}
          />
        </div>
        <div onClick={() => handleMetricClick('activeContracts')} className="cursor-pointer">
          <MetricCard
            title="Active Contracts"
            value={metrics.activeContracts.toString()}
            change={metrics.activeContractsChange}
            icon={<Check className="text-primary" size={22} />}
          />
        </div>
        <div onClick={() => handleMetricClick('expiringSoon')} className="cursor-pointer">
          <MetricCard
            title="Expiring Soon"
            value={metrics.expiringSoon.toString()}
            change={metrics.expiringSoonChange}
            icon={<ClockAlert className="text-primary" size={22} />}
          />
        </div>
        <div onClick={() => handleMetricClick('value')} className="cursor-pointer">
          <MetricCard
            title="Total Value"
            value={`$${(metrics.totalValue / 1000).toFixed(1)}K`}
            change={metrics.totalValueChange}
            icon={<DollarSign className="text-primary" size={22} />}
          />
        </div>
      </div>

      <ProjectTableDialog open={dialogOpen} onOpenChange={setDialogOpen} filter={filter} />
    </>
  );
};

export default MetricsGrid;
