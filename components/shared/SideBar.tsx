'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { FileText, LayoutDashboard, Moon, Settings, Sun, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    active: true,
    onClick: () => {
      console.log('teste');
    }
  },
  {
    icon: FileText,
    label: 'Contracts',
    active: false
  },
  { icon: Users, label: 'Users', active: false },
  {
    icon: Settings,
    label: 'Settings',
    active: false
  }
];

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  return (
    <Sidebar
      collapsible="icon"
      className="flex h-screen flex-col rounded-none border bg-background transition-all duration-300"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Contract Manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      <SidebarFooter>
        <SidebarGroupLabel>Theme</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center justify-start gap-5">
                <Sun className="h-4 w-4" />

                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
                <Moon className="h-4 w-4" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
