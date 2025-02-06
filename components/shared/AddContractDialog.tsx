'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import DatePickerWithRange from '@/components/ui/date-picker-with-range';
import { addDays } from 'date-fns';
import { Plus } from 'lucide-react';
import useMobile from '@/stores/hooks/useMobile';
import { Contract } from '@/interfaces/contracts.interface';
import useContracts from '@/stores/hooks/useContracts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

interface AddContractDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: Contract) => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome do contrato é obrigatório'),
  type: z.number().min(0, 'Tipo de contrato é obrigatório'),
  startDate: z.date(),
  endDate: z.date(),
  value: z.number().min(0.01, 'Valor do contrato é obrigatório'),
  status: z.number().min(0, 'Status é obrigatório'),
  clientOrSupplier: z.string().min(1, 'Cliente/Fornecedor é obrigatório')
});

const AddContractDialog: React.FC<AddContractDialogProps> = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {}
}) => {
  const { status, type } = useContracts();
  const { isMobile } = useMobile();

  const form = useForm<Contract>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 1,
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      value: 0,
      status: 1,
      clientOrSupplier: ''
    }
  });

  const handleSubmit = (data: Contract) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isMobile ? <Plus strokeWidth="3px" /> : 'Add New Contract'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Contract Name</Label>
              <Input
                id="name"
                placeholder="Enter contract name"
                {...form.register('name')}
                className={cn(form.formState.errors.name && 'border-red-500')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Contract Type</Label>
              <Select
                value={form.getValues('type').toString()}
                onValueChange={(value) => form.setValue('type', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {type.map((selectedType) => (
                    <SelectItem key={selectedType.id} value={selectedType.id.toString()}>
                      {selectedType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">{form.formState.errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Contract Period</Label>
            <DatePickerWithRange
              from={form.getValues('startDate')}
              to={form.getValues('endDate')}
              onSelect={(range: { from: Date; to: Date }) => {
                if (range?.from && range?.to) {
                  form.setValue('startDate', range.from);
                  form.setValue('endDate', range.to);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Contract Value</Label>
            <Input
              id="value"
              placeholder="Enter contract value"
              type="number"
              {...form.register('value', { valueAsNumber: true })}
              className={cn(form.formState.errors.value && 'border-red-500')}
            />
            {form.formState.errors.value && (
              <p className="text-sm text-red-500">{form.formState.errors.value.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientOrSupplier">Client/Supplier</Label>
            <Input
              id="clientOrSupplier"
              placeholder="Enter client or supplier name"
              {...form.register('clientOrSupplier')}
              className={cn(form.formState.errors.clientOrSupplier && 'border-red-500')}
            />
            {form.formState.errors.clientOrSupplier && (
              <p className="text-sm text-red-500">
                {form.formState.errors.clientOrSupplier.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.getValues('status').toString()}
              onValueChange={(value) => form.setValue('status', Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {status.map((selectedStatus) => (
                  <SelectItem key={selectedStatus.id} value={selectedStatus.id.toString()}>
                    {selectedStatus.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Contract</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContractDialog;
