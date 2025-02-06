'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/shared/SideBar';
import AddContractDialog from '@/components/shared/AddContractDialog';
import MetricsGrid from '@/components/shared/MetricsGrid';
import ChartsSection from '@/components/shared/Charts/ChartsSelection';
import ContractsTable from '@/components/shared/ContractsTable';
import {
  getAllContracts,
  getAllContractsStatus,
  getAllContractsTypes
} from '@/services/contracts.service';
import useContracts from '@/stores/hooks/useContracts';
import { Menu } from 'lucide-react';

export default function Home() {
  const { setContracts, setStatus, setType } = useContracts();

  useEffect(() => {
    getAllContracts().then((data) => {
      setContracts(data);
    });
    getAllContractsStatus().then((data) => {
      setStatus(data);
    });
    getAllContractsTypes().then((data) => {
      setType(data);
    });
  }, []);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddContract, setShowAddContract] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window?.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarCollapsed(true);
  }, [isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={isMobile}
      />
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarCollapsed(true)} />
      )}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto space-y-4 p-4">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="-ml-2 mr-2 rounded-md p-2 hover:bg-accent md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold">Contract Management Dashboard</h1>
            <AddContractDialog
              open={showAddContract}
              onOpenChange={setShowAddContract}
              onSubmit={(data) => {
                console.log('New contract data:', data);
                setShowAddContract(false);
              }}
            />
          </div>

          <MetricsGrid />

          <ChartsSection />

          <ContractsTable
            onEdit={(contract) => {
              console.log('Edit contract:', contract);
            }}
            onDelete={(contract) => {
              console.log('Delete contract:', contract);
            }}
          />
        </div>
      </main>
    </div>
  );
}
