'use client';

import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import useContracts from '@/stores/hooks/useContracts';
import { ContractWithId, Contract } from '@/interfaces/contracts.interface';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState
} from '@tanstack/react-table';
import { getColumns } from './TableConfig';
import ContractDialog from '../ContractDialog';
import { useTranslation } from 'react-i18next';

interface ContractsTableProps {
  onEditAction?: (contract: ContractWithId | Contract) => void;
  onDeleteAction?: (id: string) => void;
  noActions?: boolean;
  initialFilter?: string;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  onEditAction = () => {},
  onDeleteAction = () => {},
  noActions = false,
  initialFilter = ''
}) => {
  const { contracts, status, type } = useContracts();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<number>();
  const [typeFilter, setTypeFilter] = React.useState<number>();
  const [selectedContract, setSelectedContract] = React.useState<ContractWithId | undefined>();
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [contractToEdit, setContractToEdit] = React.useState<ContractWithId | undefined>();

  const { t } = useTranslation();

  useEffect(() => {
    if (initialFilter) {
      switch (initialFilter) {
        case 'activeContracts':
          setStatusFilter(1);
          break;
        case 'expiringSoon':
          setStatusFilter(4);
          break;
        case 'value':
          setSorting([{ id: 'value', desc: true }]);
          break;
      }
    }
  }, [initialFilter]);

  const columns = React.useMemo(
    () =>
      getColumns({
        status,
        type,
        onEdit: onEditAction,
        onDelete: onDeleteAction,
        noActions,
        t
      }),
    [status, type, onEditAction, onDeleteAction, noActions, t]
  );

  const filteredData = React.useMemo(() => {
    const filtered = contracts.filter((contract) => {
      const matchesStatus = statusFilter ? contract.status === statusFilter : true;
      const matchesType = typeFilter ? contract.type === typeFilter : true;

      if (initialFilter === 'expiringSoon') {
        return contract.status === 4;
      }

      return matchesStatus && matchesType;
    });

    return filtered;
  }, [contracts, statusFilter, typeFilter, initialFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: getColumns({
      status,
      type,
      onEdit: (contract: ContractWithId) => {
        setContractToEdit(contract);
        setIsEditModalOpen(true);
      },
      onDelete: onDeleteAction,
      noActions,
      t
    }),
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const handleRowClick = (contract: ContractWithId) => {
    setSelectedContract(contract);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="w-full rounded-lg border bg-background p-4">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              placeholder={t('table.search')}
              className="w-full sm:w-64"
              type="search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t('common.status.status')} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter(undefined)}>
                    {t('common.all')}
                  </DropdownMenuItem>
                  {status.map((s) => (
                    <DropdownMenuItem key={s.id} onClick={() => setStatusFilter(s.id)}>
                      {t(`common.status.${s.name}`)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t('common.type.type')} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTypeFilter(undefined)}>
                    {t('common.all')}
                  </DropdownMenuItem>
                  {type.map((type) => (
                    <DropdownMenuItem key={type.id} onClick={() => setTypeFilter(type.id)}>
                      {t(`common.type.${type.name}`)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {t('table.previous')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t('table.next')}
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id === 'actions' ? 'sticky right-0 z-20 bg-background' : ''
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      if (!noActions) {
                        handleRowClick(row.original);
                      }
                    }}
                    className={`${noActions ? '' : 'cursor-pointer'} hover:bg-muted/50`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === 'actions' ? 'sticky right-0 z-20 bg-background' : ''
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t('table.noResults')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ContractDialog
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        contract={selectedContract}
        viewOnly
      />

      <ContractDialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        contract={contractToEdit}
        onSubmit={onEditAction}
      />
    </>
  );
};

export default ContractsTable;
