'use client';

import AddContractDialog from '@/components/shared/AddContractDialog';
import ChartsSection from '@/components/shared/Charts/ChartsSelection';
import ContractsTable from '@/components/shared/Table/ContractsTable';
import MetricsGrid from '@/components/shared/MetrictsGrid.tsx/MetricsGrid';
import { SideBar } from '@/components/shared/SideBar';
import { useSidebar } from '@/components/ui/sidebar';
import {
  createContract,
  getAllContracts,
  getAllContractsStatus,
  getAllContractsTypes,
  updateContract
} from '@/services/contracts.service';
import useContracts from '@/stores/hooks/useContracts';
import useMobile from '@/stores/hooks/useMobile';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';

export default function Home() {
  const { contracts, setContracts, setStatus, setType } = useContracts();

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

  const [showAddContract, setShowAddContract] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractWithId | undefined>();

  const { isMobile } = useMobile();
  const { toggleSidebar } = useSidebar();

  const handleContractSubmit = async (data: Contract | ContractWithId) => {
    try {
      if ('id' in data && data.id) {
        const updatedContract = await updateContract(data as ContractWithId);
        setContracts(contracts.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
      } else {
        const newContract = await createContract(data as Contract);
        setContracts([...contracts, newContract]);
      }
      setShowAddContract(false);
      setSelectedContract(undefined);
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto space-y-4 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="-ml-2 mr-2 rounded-md p-2 hover:bg-accent md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-2xl font-bold">{`${!isMobile ? 'Contract Management ' : 'C.M.'}Dashboard`}</h1>
            <AddContractDialog
              open={showAddContract}
              onOpenChange={(open) => {
                setShowAddContract(open);
                if (!open) setSelectedContract(undefined);
              }}
              onSubmit={handleContractSubmit}
              contract={selectedContract}
            />
          </div>

          <MetricsGrid />

          <ChartsSection />

          <ContractsTable
            onEdit={(contract) => {
              setSelectedContract(contract);
              setShowAddContract(true);
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
