import useMobile from '@/stores/hooks/useMobile';
import React from 'react';
import { useSidebar } from '../ui/sidebar';
import { Menu } from 'lucide-react';
import { ChildrenProps } from '@/interfaces/general.inteface';

export const Header = ({ children }: ChildrenProps) => {
  const { toggleSidebar } = useSidebar();
  const { isMobile } = useMobile();

  return (
    <div className="flex items-center justify-between">
      <button onClick={toggleSidebar} className="-ml-2 mr-2 rounded-md p-2 hover:bg-accent">
        <Menu className="h-6 w-6 md:hidden" />
      </button>

      <h1 className="text-2xl font-bold">{`${!isMobile ? 'Contract Management ' : 'C.M.'}Dashboard`}</h1>

      {children}
    </div>
  );
};
