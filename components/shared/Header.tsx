import useMobile from '@/stores/hooks/useMobile';
import React from 'react';
import { useSidebar } from '../ui/sidebar';
import { Menu } from 'lucide-react';
import { ChildrenProps } from '@/interfaces/general.interface';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';

export const Header = ({ children }: ChildrenProps) => {
  const { toggleSidebar } = useSidebar();
  const { isMobile } = useMobile();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-between xl:flex-row">
      <div className="flex w-full items-center justify-between xl:w-auto">
        <button
          onClick={toggleSidebar}
          className="-ml-2 mr-2 rounded-md p-2 hover:bg-accent xl:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-2xl font-bold">{`${isMobile ? t('shortTitle') : t('title')}`}</h1>
      </div>

      {isMobile ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters">
            <AccordionTrigger className="py-2">{t('header.moreOptions')}</AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="mt-4 w-full md:mt-0 md:w-auto">{children}</div>
      )}
    </div>
  );
};
