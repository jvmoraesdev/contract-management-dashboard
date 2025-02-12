'use client';

import {
  SidebarHeader as Header,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { FileText } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SideBarHeader = () => {
  const { t } = useTranslation();

  return (
    <Header>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary
                text-sidebar-primary-foreground"
            >
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{t('shortTitle')}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Header>
  );
};

export default SideBarHeader;
