'use client';

import React, { useEffect } from 'react';
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
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import useContracts from '@/stores/hooks/useContracts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

interface ContractDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: Contract | ContractWithId) => void;
  contract?: ContractWithId;
  viewOnly?: boolean;
  showTrigger?: boolean;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome do contrato é obrigatório'),
  type: z.number().min(0, 'Tipo de contrato é obrigatório'),
  startDate: z.date(),
  endDate: z.date(),
  value: z.number().min(0.01, 'Valor do contrato é obrigatório'),
  status: z.number().min(0, 'Status é obrigatório'),
  clientOrSupplier: z.string().min(1, 'Cliente/Fornecedor é obrigatório')
});

const ContractDialog: React.FC<ContractDialogProps> = ({
  open = false,
  onOpenChange = () => {},
  onSubmit = () => {},
  contract,
  viewOnly = false,
  showTrigger = false
}) => {
  const { status, type } = useContracts();
  const { isMobile } = useMobile();
  const isEditing = !!contract;

  const form = useForm<Contract | ContractWithId>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: contract?.id || '',
      name: contract?.name || '',
      type: contract?.type || 1,
      startDate: contract?.startDate || new Date(),
      endDate: contract?.endDate || addDays(new Date(), 30),
      value: contract?.value || 0,
      status: contract?.status || 1,
      clientOrSupplier: contract?.clientOrSupplier || ''
    }
  });

  const watchedType = form.watch('type');
  const watchedStatus = form.watch('status');

  useEffect(() => {
    if (contract) {
      form.reset({
        ...contract,
        startDate: new Date(contract.startDate),
        endDate: new Date(contract.endDate)
      });
    } else {
      form.reset({
        id: '',
        name: '',
        type: 1,
        startDate: new Date(),
        endDate: addDays(new Date(), 30),
        value: 0,
        status: 1,
        clientOrSupplier: ''
      });
    }
  }, [contract, form]);

  const handleSubmit = (data: Contract | ContractWithId) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const isFieldModified = (fieldName: string) => {
    return isEditing && form.formState.dirtyFields[fieldName as keyof (Contract | ContractWithId)];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline">
            {isMobile ? <Plus strokeWidth="3px" /> : 'Adicionar Contrato'}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {viewOnly
              ? 'Visualizar Contrato'
              : isEditing
                ? 'Editar Contrato'
                : 'Adicionar Contrato'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="id">ID do Contrato</Label>
              <Input id="id" {...form.register('id')} disabled className="bg-gray-100" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Contrato</Label>
              <Input
                id="name"
                placeholder="Digite o nome do contrato"
                {...form.register('name')}
                disabled={viewOnly}
                className={cn(
                  isFieldModified('name') && 'border-yellow-500',
                  form.formState.errors.name && 'border-red-500',
                  viewOnly && 'bg-gray-100'
                )}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Contrato</Label>
              <Select
                value={watchedType?.toString()}
                onValueChange={(value) =>
                  form.setValue('type', Number(value), { shouldDirty: true })
                }
                disabled={viewOnly}
              >
                <SelectTrigger
                  className={cn(
                    isFieldModified('type') && 'border-yellow-500',
                    form.formState.errors.type && 'border-red-500',
                    viewOnly && 'bg-gray-100'
                  )}
                >
                  <SelectValue placeholder="Selecione o tipo" />
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
            <Label>Período do Contrato</Label>
            <DatePickerWithRange
              from={form.watch('startDate')}
              to={form.watch('endDate')}
              onSelect={(range) => {
                if (range?.from) {
                  form.setValue('startDate', range.from, { shouldDirty: true });
                }
                if (range?.to) {
                  form.setValue('endDate', range.to, { shouldDirty: true });
                }
              }}
              isModified={isFieldModified('startDate') || isFieldModified('endDate')}
              hasError={!!form.formState.errors.startDate || !!form.formState.errors.endDate}
              disabled={viewOnly}
              className={cn(viewOnly && 'bg-gray-100')}
            />
            {(form.formState.errors.startDate || form.formState.errors.endDate) && (
              <p className="text-sm text-red-500">Data inválida</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor do Contrato</Label>
            <Input
              id="value"
              placeholder="Digite o valor do contrato"
              type="number"
              {...form.register('value', { valueAsNumber: true })}
              disabled={viewOnly}
              className={cn(
                isFieldModified('value') && 'border-yellow-500',
                form.formState.errors.value && 'border-red-500',
                viewOnly && 'bg-gray-100'
              )}
            />
            {form.formState.errors.value && (
              <p className="text-sm text-red-500">{form.formState.errors.value.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientOrSupplier">Cliente/Fornecedor</Label>
            <Input
              id="clientOrSupplier"
              placeholder="Digite o nome do cliente ou fornecedor"
              {...form.register('clientOrSupplier')}
              disabled={viewOnly}
              className={cn(
                isFieldModified('clientOrSupplier') && 'border-yellow-500',
                form.formState.errors.clientOrSupplier && 'border-red-500',
                viewOnly && 'bg-gray-100'
              )}
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
              value={watchedStatus?.toString()}
              onValueChange={(value) =>
                form.setValue('status', Number(value), { shouldDirty: true })
              }
              disabled={viewOnly}
            >
              <SelectTrigger
                className={cn(
                  isFieldModified('status') && 'border-yellow-500',
                  form.formState.errors.status && 'border-red-500',
                  viewOnly && 'bg-gray-100'
                )}
              >
                <SelectValue placeholder="Selecione o status" />
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
            {viewOnly ? (
              <Button type="button" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditing ? 'Salvar Alterações' : 'Adicionar Contrato'}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDialog;
