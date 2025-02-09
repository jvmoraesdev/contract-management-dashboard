'use client';

import AddContractDialog from '@/components/shared/ContractDialog';
import { Button } from '@/components/ui/button';
import DatePickerWithRange from '@/components/ui/date-picker-with-range';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import useContracts from '@/stores/hooks/useContracts';
import { ChevronDown, FilterX } from 'lucide-react';
import React from 'react';

interface HeaderContentProps {
  date: { from: Date; to: Date };
  setDate: (date: { from: Date; to: Date }) => void;
  statusFilter?: number;
  setStatusFilter: (status: number | undefined) => void;
  typeFilter?: number;
  setTypeFilter: (type: number | undefined) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  showAddContract: boolean;
  setShowAddContract: (show: boolean) => void;
  selectedContract?: ContractWithId;
  setSelectedContract: (contract: ContractWithId | undefined) => void;
  handleContractSubmit: (data: Contract | ContractWithId) => void;
}

export const HeaderContent = ({
  date,
  setDate,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  hasActiveFilters,
  resetFilters,
  showAddContract,
  setShowAddContract,
  selectedContract,
  setSelectedContract,
  handleContractSubmit
}: HeaderContentProps) => {
  const { status, type } = useContracts();

  return (
    <div className="grid grid-cols-1 gap-2 md:flex md:items-center">
      <DatePickerWithRange
        from={date.from}
        to={date.to}
        onSelect={(range) => {
          if (range?.from) {
            setDate({ ...date, from: range.from });
          }
          if (range?.to) {
            setDate({ ...date, to: range.to });
          }
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            {statusFilter ? status.find((s) => s.id === statusFilter)?.name : 'Status'}{' '}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setStatusFilter(undefined)}>Todos</DropdownMenuItem>
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            {typeFilter ? type.find((t) => t.id === typeFilter)?.name : 'Tipo'}{' '}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTypeFilter(undefined)}>Todos</DropdownMenuItem>
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

      <Button
        variant="outline"
        size="icon"
        onClick={resetFilters}
        className={`${hasActiveFilters ? 'visible' : 'hidden'} h-8_5 text-destructive`}
        title="Limpar filtros"
      >
        <FilterX />
      </Button>

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
  );
};
