'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useMounted from '@/stores/hooks/useMounted';
import { useTranslation } from 'react-i18next';

interface DatePickerWithRangeProps {
  from: Date;
  to: Date;
  onSelect: (range: { from: Date; to: Date } | undefined) => void;
  isModified?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
}

const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  from,
  to,
  onSelect,
  isModified,
  hasError,
  disabled,
  className
}) => {
  const isMounted = useMounted();
  const [date, setDate] = React.useState<DateRange | undefined>();
  const { t, i18n } = useTranslation();

  const locales = {
    ptBr: ptBR,
    en: enUS
  };

  // Atualiza o estado local quando as props mudam
  React.useEffect(() => {
    if (isMounted) {
      setDate({ from, to });
    }
  }, [from, to, isMounted]);

  // Não renderiza nada até que o componente esteja montado
  if (!isMounted) {
    return (
      <Button
        id="date"
        variant={'outline'}
        disabled={true}
        className={cn('w-full justify-start text-left font-normal', 'text-muted-foreground')}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>{t('common.loading')}</span>
      </Button>
    );
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              isModified && 'border-alert',
              hasError && 'border-destructive',
              disabled && 'opacity-50'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy', {
                    locale: locales[i18n.language as keyof typeof locales]
                  })}{' '}
                  -{' '}
                  {format(date.to, 'dd/MM/yyyy', {
                    locale: locales[i18n.language as keyof typeof locales]
                  })}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy', {
                  locale: locales[i18n.language as keyof typeof locales]
                })
              )
            ) : (
              <span>{t('contractDialog.fields.period.label')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                const validRange = {
                  from: newDate.from || new Date(),
                  to: newDate.to || new Date()
                };
                setDate(newDate);
                onSelect(validRange);
              }
            }}
            numberOfMonths={2}
            disabled={disabled}
            locale={locales[i18n.language as keyof typeof locales]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
