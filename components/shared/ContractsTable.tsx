'use client';

import React from 'react';
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
import { ChevronDown, MoreVertical } from 'lucide-react';
import useContracts from '@/stores/hooks/useContracts';
import { ContractWithId } from '@/interfaces/contracts.interface';
import { getStatusName, getTypeName, getStatusStyle } from '@/utils/tableData';

interface ContractsTableProps {
  onEdit?: (contract: ContractWithId) => void;
  onDelete?: (contract: ContractWithId) => void;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  onEdit = () => {},
  onDelete = () => {}
}) => {
  const { contracts, status, type } = useContracts();

  return (
    <div className="w-full rounded-lg border bg-background p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Buscar contratos..." className="w-64" type="search" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Todos</DropdownMenuItem>
              {status.map((s) => (
                <DropdownMenuItem key={s.id}>{s.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Tipo <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Todos</DropdownMenuItem>
              {type.map((t) => (
                <DropdownMenuItem key={t.id}>{t.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome do Contrato</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead className="w-[50px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>{contract.id}</TableCell>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell>{contract.clientOrSupplier}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(contract.status)}`}
                  >
                    {getStatusName(status, contract.status)}
                  </div>
                </TableCell>
                <TableCell>{getTypeName(type, contract.type)}</TableCell>
                <TableCell>R${contract.value.toLocaleString()}</TableCell>
                <TableCell>{contract.startDate.toLocaleDateString()}</TableCell>
                <TableCell>{contract.endDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(contract)}>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => onDelete(contract)}>
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContractsTable;
