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
import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import useContracts from '@/stores/hooks/useContracts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ContractDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: Contract | ContractWithId) => void;
  contract?: ContractWithId;
  viewOnly?: boolean;
  showTrigger?: boolean;
}

const ContractDialog: React.FC<ContractDialogProps> = ({
  open = false,
  onOpenChange = () => {},
  onSubmit = () => {},
  contract,
  viewOnly = false,
  showTrigger = false
}) => {
  const { status, type } = useContracts();
  const isEditing = !!contract;

  const { t } = useTranslation();

  const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, t('contractDialog.fields.name.error')),
    type: z.number().min(0, t('contractDialog.fields.type.error')),
    startDate: z.date(),
    endDate: z.date(),
    value: z.number().min(0.01, t('contractDialog.fields.value.error')),
    status: z.number().min(0, t('contractDialog.fields.status.error')),
    clientOrSupplier: z.string().min(1, t('contractDialog.fields.clientOrSupplier.error'))
  });

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
            <Plus strokeWidth="3px" /> {t('contractDialog.add')}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-popover sm:max-w-[600px] flex flex-col max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {viewOnly
              ? t('contractDialog.view')
              : isEditing
                ? t('contractDialog.edit')
                : t('contractDialog.add')}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="space-y-6 p-6 pt-2 overflow-y-auto">
            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="id">ID do Contrato</Label>
                <Input id="id" {...form.register('id')} disabled className="bg-muted-foreground" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('contractDialog.fields.name.label')}</Label>
                <Input
                  id="name"
                  placeholder={t('contractDialog.fields.name.placeholder')}
                  {...form.register('name')}
                  disabled={viewOnly}
                  className={cn(
                    form.formState.errors.name && 'border-destructive',
                    isFieldModified('name') && 'border-alert',
                    viewOnly && 'bg-muted-foreground'
                  )}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">{t('contractDialog.fields.type.label')}</Label>
                <Select
                  value={watchedType?.toString()}
                  onValueChange={(value) =>
                    form.setValue('type', Number(value), { shouldDirty: true })
                  }
                  disabled={viewOnly}
                >
                  <SelectTrigger
                    className={cn(
                      isFieldModified('type') && 'border-alert',
                      form.formState.errors.type && 'border-destructive',
                      viewOnly && 'bg-muted-foreground'
                    )}
                  >
                    <SelectValue placeholder={t('contractDialog.fields.type.placeholder')} />
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
                  <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('contractDialog.fields.period.label')}</Label>
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
                className={cn('rounded-md', viewOnly && 'bg-muted-foreground')}
              />
              {(form.formState.errors.startDate || form.formState.errors.endDate) && (
                <p className="text-sm text-destructive">
                  {t('contractDialog.fields.period.error')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">{t('contractDialog.fields.value.label')} (R$)</Label>
              <Input
                id="value"
                placeholder={t('contractDialog.fields.value.placeholder')}
                type="number"
                {...form.register('value', { valueAsNumber: true })}
                disabled={viewOnly}
                className={cn(
                  isFieldModified('value') && 'border-alert',
                  form.formState.errors.value && 'border-destructive',
                  viewOnly && 'bg-muted-foreground'
                )}
              />
              {form.formState.errors.value && (
                <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientOrSupplier">
                {t('contractDialog.fields.clientOrSupplier.label')}
              </Label>
              <Input
                id="clientOrSupplier"
                placeholder={t('contractDialog.fields.clientOrSupplier.placeholder')}
                {...form.register('clientOrSupplier')}
                disabled={viewOnly}
                className={cn(
                  isFieldModified('clientOrSupplier') && 'border-alert',
                  form.formState.errors.clientOrSupplier && 'border-destructive',
                  viewOnly && 'bg-muted-foreground'
                )}
              />
              {form.formState.errors.clientOrSupplier && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.clientOrSupplier.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('contractDialog.fields.status.label')}</Label>
              <Select
                value={watchedStatus?.toString()}
                onValueChange={(value) =>
                  form.setValue('status', Number(value), { shouldDirty: true })
                }
                disabled={viewOnly}
              >
                <SelectTrigger
                  className={cn(
                    isFieldModified('status') && 'border-alert',
                    form.formState.errors.status && 'border-destructive',
                    viewOnly && 'bg-muted-foreground'
                  )}
                >
                  <SelectValue placeholder={t('contractDialog.fields.status.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {status.map((selectedStatus) => (
                    <SelectItem key={selectedStatus.id} value={selectedStatus.id.toString()}>
                      {t(`common.status.${selectedStatus.name}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-sm text-destructive">{form.formState.errors.status.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="p-6 pt-0">
            {viewOnly ? (
              <Button type="button" onClick={() => onOpenChange(false)}>
                {t('contractDialog.close')}
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  {t('contractDialog.cancel')}
                </Button>
                <Button type="submit">
                  {isEditing ? t('contractDialog.saveChanges') : t('contractDialog.add')}
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
