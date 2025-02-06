import { ReactElement } from 'react';

export interface Response {
  message: string;
}

export interface ChildrenProps {
  children?: ReactElement | null;
}
