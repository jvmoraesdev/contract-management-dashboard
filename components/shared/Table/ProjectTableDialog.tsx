'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContractsTable from './ContractsTable';
import React from 'react';

interface ProjectTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter: string;
}

const ProjectTableDialog: React.FC<ProjectTableDialogProps> = ({ open, onOpenChange, filter }) => {
  // Determina o título baseado no filtro
  const getTitleByFilter = () => {
    switch (filter) {
      case 'totalContracts':
        return 'Total de Contratos';
      case 'activeContracts':
        return 'Contratos Ativos';
      case 'expiringSoon':
        return 'Contratos a Vencer';
      case 'value':
        return 'Contratos por Valor';
      default:
        return 'Contratos';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>{getTitleByFilter()}</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <ContractsTable noActions initialFilter={filter} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTableDialog;
