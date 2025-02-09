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

const SideBarContent = () => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      active: true
    },
    {
      icon: FileText,
      label: 'Contracts [WIP]',
      active: false,
      onClick: () => {
        console.log('Feature in development');
      }
    },
    {
      icon: Users,
      label: 'Users [WIP]',
      active: false,
      onClick: () => {
        console.log('Feature in development');
      }
    },
    {
      icon: Settings,
      label: 'Settings [WIP]',
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
              <span>Hide</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </Content>
  );
};

export default SideBarContent;
