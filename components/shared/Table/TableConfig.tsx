'use client';

import { ContractWithId, Status, Type } from '@/interfaces/contracts.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreVertical } from 'lucide-react';
import { getStatusName, getTypeName, getStatusStyle } from '@/utils/tableData';
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
  noActions?: boolean;
  t: (key: string) => string;
}

export const getColumns = ({
  status,
  type,
  onEdit,
  onDelete,
  noActions,
  t
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
            {t('table.columns.id')}
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
            {t('table.columns.name')}
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
            {t('table.columns.company')}
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
      header: t('common.status.status'),
      cell: ({ row }) => {
        const statusId = row.getValue('status') as number;
        const styleClass = getStatusStyle(statusId);
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass}`}
            style={{
              backgroundColor: styleClass.backgroundColor,
              color: styleClass.color
            }}
          >
            {t(`common.status.${getStatusName(status, statusId)}`)}
          </span>
        );
      }
    },
    {
      accessorKey: 'type',
      header: t('common.type.type'),
      cell: ({ row }) => {
        const typeId = row.getValue('type') as number;
        return t(`common.type.${getTypeName(type, typeId)}`);
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
            {t('table.columns.value')}
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
            {t('table.columns.startDate')}
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
            {t('table.columns.endDate')}
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

        if (noActions) return null;

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4} className="z-[100]" forceMount>
                <DropdownMenuItem onClick={() => onEdit(contract)}>
                  {t('actions.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(contract.id.toString())}
                >
                  {t('actions.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ];
};
