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
import { ChevronDown, Search, MoreVertical } from 'lucide-react';

interface Contract {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'pending';
  value: number;
  startDate: string;
  endDate: string;
  company: string;
}

interface ContractsTableProps {
  contracts?: Contract[];
  onEdit?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
}

const defaultContracts: Contract[] = [
  {
    id: '1',
    name: 'Service Agreement A',
    status: 'active',
    value: 50000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    company: 'Tech Corp'
  },
  {
    id: '2',
    name: 'Maintenance Contract B',
    status: 'pending',
    value: 25000,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    company: 'Service Inc'
  },
  {
    id: '3',
    name: 'License Agreement C',
    status: 'expired',
    value: 75000,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    company: 'Software Ltd'
  }
];

const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts = defaultContracts,
  onEdit = () => {},
  onDelete = () => {}
}) => {
  return (
    <div className="w-full rounded-lg border bg-background p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search contracts..."
            className="w-64"
            type="search"
            icon={<Search className="h-4 w-4" />}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Expired</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell>{contract.company}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${contract.status === 'active' ? 'bg-green-100 text-green-800' : ''} ${contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''} ${contract.status === 'expired' ? 'bg-red-100 text-red-800' : ''} `}
                  >
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>${contract.value.toLocaleString()}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(contract)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => onDelete(contract)}>
                        Delete
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
