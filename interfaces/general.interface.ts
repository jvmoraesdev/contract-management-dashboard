import { ReactElement } from 'react';

export interface Response {
  message: string;
}

export interface ChildrenProps {
  children?: ReactElement | null;
}

export interface AlertDialogModalProps {
  title: string;
  description: string;
  trueLabel: string;
  falseLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export interface LoadingStateProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
