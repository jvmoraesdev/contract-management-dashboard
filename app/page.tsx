'use client';

import AddContractDialog from '@/components/shared/ContractDialog';
import ChartsSection from '@/components/shared/Charts/ChartsSelection';
import ContractsTable from '@/components/shared/Table/ContractsTable';
import MetricsGrid from '@/components/shared/MetrictsGrid.tsx/MetricsGrid';
import { SideBar } from '@/components/shared/SideBar/SideBar';
import {
  createContract,
  getAllContracts,
  getAllContractsStatus,
  getAllContractsTypes,
  updateContract,
  deleteContractByID
} from '@/services/contracts.service';
import useContracts from '@/stores/hooks/useContracts';
import { useEffect, useState } from 'react';
import React from 'react';
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import DatePickerWithRange from '@/components/ui/date-picker-with-range';
import { addYears, subYears } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, FilterX } from 'lucide-react';
import { applyFilters } from '@/utils/filterData';
import { AlertDialogModal } from '@/components/shared/AlertDialog';

const getDefaultDateRange = () => {
  const today = new Date();
  return {
    from: subYears(today, 1),
    to: addYears(today, 1)
  };
};

export default function Home() {
  const { contracts, setContracts, setStatus, setType, status, type } = useContracts();
  const [statusFilter, setStatusFilter] = useState<number>();
  const [typeFilter, setTypeFilter] = useState<number>();
  const [allContracts, setAllContracts] = useState<ContractWithId[]>([]);

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

  const [showAddContract, setShowAddContract] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractWithId | undefined>();
  const [date, setDate] = useState(getDefaultDateRange());

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
            <div className="grid grid-cols-1 gap-2 md:flex md:items-center">
              <DatePickerWithRange
                from={date.from}
                to={date.to}
                onSelect={(range) => {
                  if (range?.from) {
                    setDate((prev) => ({ ...prev, from: range.from! }));
                  }
                  if (range?.to) {
                    setDate((prev) => ({ ...prev, to: range.to! }));
                  }
                }}
              />
              {/* Adiciona filtro por status */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {statusFilter ? status.find((s) => s.id === statusFilter)?.name : 'Status'}{' '}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter(undefined)}>
                    Todos
                  </DropdownMenuItem>
                  {status.map((s) => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => setStatusFilter(s.id)}
                      className={statusFilter === s.id ? 'bg-accent' : ''}
                    >
                      {s.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Adiciona filtro por tipo */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {typeFilter ? type.find((t) => t.id === typeFilter)?.name : 'Tipo'}{' '}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTypeFilter(undefined)}>
                    Todos
                  </DropdownMenuItem>
                  {type.map((t) => (
                    <DropdownMenuItem
                      key={t.id}
                      onClick={() => setTypeFilter(t.id)}
                      className={typeFilter === t.id ? 'bg-accent' : ''}
                    >
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botão de Reset - só aparece se houver filtros ativos */}

              <Button
                variant="outline"
                size="icon"
                onClick={resetFilters}
                className={`${hasActiveFilters() ? 'visible' : 'hidden'} h-8_5 text-red-500`}
                title="Limpar filtros"
              >
                <FilterX />
              </Button>

              {/* Adicionar contrato */}
              <AddContractDialog
                open={showAddContract}
                onOpenChange={(open) => {
                  setShowAddContract(open);
                  if (!open) setSelectedContract(undefined);
                }}
                onSubmit={handleContractSubmit}
                contract={selectedContract}
                showTrigger={true}
              />
            </div>
          </Header>

          <MetricsGrid />

          <ChartsSection />

          <ContractsTable
            onEditAction={(contract) => {
              setSelectedContract(contract);
              setShowAddContract(true);
            }}
            onDeleteAction={(id) => handleDeleteContract(id)}
          />
        </div>
      </main>

      <AlertDialogModal
        title="Confirmar Exclusão"
        description="Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita."
        trueLabel="Sim"
        falseLabel="Não"
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
