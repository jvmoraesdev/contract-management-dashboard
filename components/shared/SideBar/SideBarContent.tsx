'use client';

import {
  SidebarContent as Content,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { FileText, LayoutDashboard, PanelLeft, Settings, Users } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SideBarContent = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t('common.dashboard'),
      active: true
    },
    {
      icon: FileText,
      label: `${t('common.contracts')} [WIP]`,
      active: false,
      onClick: () => {
        console.log('Feature in development');
      }
    },
    {
      icon: Users,
      label: `${t('common.users')} [WIP]`,
      active: false,
      onClick: () => {
        console.log('Feature in development');
      }
    },
    {
      icon: Settings,
      label: `${t('common.settings')} [WIP]`,
      active: false,
      onClick: () => {
        console.log('Feature in development');
      }
    }
  ];

  const { toggleSidebar } = useSidebar();

  return (
    <Content>
      <SidebarGroup>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton tooltip={item.label}>
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              <PanelLeft className="h-4 w-4" />
              <span>{t('sidebar.hide')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </Content>
  );
};

export default SideBarContent;
