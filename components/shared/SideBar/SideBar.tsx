'use client';

import { Sidebar, SidebarRail } from '@/components/ui/sidebar';
import React from 'react';
import { Separator } from '../../ui/separator';
import useMounted from '@/stores/hooks/useMounted';
import SideBarHeader from './SideBarHeader';
import SideBarContent from './SideBarContent';
import SideBarFooter from './SideBarFooter';

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMounted = useMounted();

  return (
    <Sidebar
      collapsible="icon"
      className="flex h-screen flex-col rounded-none border bg-background transition-all duration-300"
      {...props}
    >
      <SideBarHeader />

      <Separator />

      <SideBarContent />

      <Separator />

      {isMounted && <SideBarFooter />}
      <SidebarRail />
    </Sidebar>
  );
}
