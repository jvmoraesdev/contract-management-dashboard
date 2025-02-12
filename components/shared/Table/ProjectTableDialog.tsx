'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContractsTable from './ContractsTable';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter: string;
}

const ProjectTableDialog: React.FC<ProjectTableDialogProps> = ({ open, onOpenChange, filter }) => {
  // Determina o título baseado no filtro
  const { t } = useTranslation();

  const getTitleByFilter = () => {
    switch (filter) {
      case 'totalContracts':
        return t('filters.totalContracts');
      case 'activeContracts':
        return t('filters.activeContracts');
      case 'expiringSoon':
        return t('filters.expiringSoon');
      case 'value':
        return t('filters.value');
      default:
        return t('common.contracts');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader className="p-4">
          <DialogTitle className="text-xl font-semibold">{getTitleByFilter()}</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <ContractsTable noActions initialFilter={filter} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTableDialog;
