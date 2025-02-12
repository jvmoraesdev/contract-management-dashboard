'use client';

import { AlertDialogModal } from '@/components/shared/AlertDialog';
import ChartsSection from '@/components/shared/Charts/ChartsSelection';
import { Header } from '@/components/shared/Header';
import MetricsGrid from '@/components/shared/MetrictsGrid.tsx/MetricsGrid';
import ContractsTable from '@/components/shared/Table/ContractsTable';
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import {
  createContract,
  deleteContractByID,
  getAllContracts,
  getAllContractsStatus,
  getAllContractsTypes,
  updateContract
} from '@/services/contracts.service';
import useContracts from '@/stores/hooks/useContracts';
import { applyFilters } from '@/utils/filterData';
import { addYears, subYears } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { HeaderContent } from './HeaderContent';
import { SideBar } from '@/components/shared/SideBar/SideBar';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const getDefaultDateRange = () => {
    const today = new Date();
    return {
      from: subYears(today, 1),
      to: addYears(today, 1)
    };
  };

  const { contracts, setContracts, setStatus, setType } = useContracts();
  const [statusFilter, setStatusFilter] = useState<number>();
  const [typeFilter, setTypeFilter] = useState<number>();
  const [allContracts, setAllContracts] = useState<ContractWithId[]>([]);
  const [showAddContract, setShowAddContract] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractWithId | undefined>();
  const [date, setDate] = useState(getDefaultDateRange());

  useEffect(() => {
    getAllContracts().then((data) => {
      setAllContracts(data);
      setContracts(data);
    });
    getAllContractsStatus().then((data) => {
      setStatus(data);
    });
    getAllContractsTypes().then((data) => {
      setType(data);
    });
  }, []);

  useEffect(() => {
    const filteredContracts = applyFilters(allContracts, {
      dateRange: {
        from: date.from,
        to: date.to
      },
      status: statusFilter,
      type: typeFilter
    });

    setContracts(filteredContracts);
  }, [allContracts, date.from, date.to, statusFilter, typeFilter]);

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

  const resetFilters = () => {
    setDate(getDefaultDateRange());
    setStatusFilter(undefined);
    setTypeFilter(undefined);
    setContracts(allContracts);
  };

  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    const defaultRange = getDefaultDateRange();

    // Normaliza as datas removendo as horas/minutos/segundos para comparação
    const normalizeDate = (date: Date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      return normalized.getTime();
    };

    const isDefaultDateRange =
      normalizeDate(date.from) === normalizeDate(defaultRange.from) &&
      normalizeDate(date.to) === normalizeDate(defaultRange.to);

    const hasCustomStatus = statusFilter !== undefined;
    const hasCustomType = typeFilter !== undefined;

    return !isDefaultDateRange || hasCustomStatus || hasCustomType;
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [contractToDelete, setContractToDelete] = useState<string>('');

  const handleConfirmDelete = async () => {
    if (contractToDelete) {
      deleteContractByID(contractToDelete).then(() => {
        setContracts(contracts.filter((c) => c.id !== contractToDelete));
      });
      setContractToDelete('');
    }
    setShowDeleteDialog(false);
  };

  const handleDeleteContract = async (id: string) => {
    setContractToDelete(id);
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar />

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto space-y-4 p-4">
          <Header>
            <HeaderContent
              date={date}
              setDate={setDate}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              hasActiveFilters={hasActiveFilters()}
              resetFilters={resetFilters}
              showAddContract={showAddContract}
              setShowAddContract={setShowAddContract}
              selectedContract={selectedContract}
              setSelectedContract={setSelectedContract}
              handleContractSubmit={handleContractSubmit}
            />
          </Header>

          <MetricsGrid />

          <ChartsSection />

          <ContractsTable
            onEditAction={(contract: Contract | ContractWithId) => {
              setSelectedContract(contract as ContractWithId);
              setShowAddContract(true);
            }}
            onDeleteAction={(id) => handleDeleteContract(id)}
          />
        </div>
      </main>

      <AlertDialogModal
        title={t('alertDialog.delete.title')}
        description={t('alertDialog.delete.description')}
        trueLabel={t('alertDialog.delete.confirm')}
        falseLabel={t('alertDialog.delete.cancel')}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Home;
