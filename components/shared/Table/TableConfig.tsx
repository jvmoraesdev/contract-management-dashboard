'use client';

import { ContractWithId, Status, Type } from '@/interfaces/contracts.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreVertical } from 'lucide-react';
import { getStatusName, getTypeName, getStatusStyle } from '@/utils/tableData';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React from 'react';

interface TableConfigProps {
  status: Status[];
  type: Type[];
  onEdit: (contract: ContractWithId) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({
  status,
  type,
  onEdit,
  onDelete
}: TableConfigProps): ColumnDef<ContractWithId>[] => {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="w-full justify-center"
          >
            ID
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome do Contrato
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      }
    },
    {
      accessorKey: 'clientOrSupplier',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Empresa
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusId = row.getValue('status') as number;
        const styleClass = getStatusStyle(statusId);
        return (
          <span
            className={cn(
              'bg-white-100 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-black',
              styleClass
            )}
          >
            {getStatusName(status, statusId)}
          </span>
        );
      }
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }) => {
        const typeId = row.getValue('type') as number;
        return getTypeName(type, typeId);
      }
    },
    {
      accessorKey: 'value',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="w-full justify-center"
          >
            Valor
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">R$ {row.getValue<number>('value').toLocaleString()}</div>
      )
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="w-full justify-center"
          >
            Data Início
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue<Date>('startDate').toLocaleDateString()}</div>
      )
    },
    {
      accessorKey: 'endDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="w-full justify-center"
          >
            Data Fim
            {{
              asc: <ChevronUp className="ml-2 h-4 w-4" />,
              desc: <ChevronDown className="ml-2 h-4 w-4" />
            }[column.getIsSorted() as string] ?? <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue<Date>('endDate').toLocaleDateString()}</div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const contract = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(contract)}>Editar</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete(contract.id.toString())}
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      }
    }
  ];
};
