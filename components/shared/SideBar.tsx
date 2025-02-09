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
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { FileText, LayoutDashboard, Moon, PanelLeft, Settings, Sun, Users } from 'lucide-react';
import React from 'react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import useThemes from '@/stores/hooks/useThemes';
import useMounted from '@/stores/hooks/useMounted';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { ThemeCollors } from '@/interfaces/theme.interface';

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const isMounted = useMounted();
  const { themeColor, setThemeColor, themeMode, setThemeMode } = useThemes();

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
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary
                  text-sidebar-primary-foreground"
              >
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
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleSidebar}>
                <PanelLeft className="h-4 w-4" />
                <span>Hide</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      {isMounted && (
        <SidebarFooter>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                {isMounted && (
                  <div className="flex items-center justify-start gap-5">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={themeMode === 'dark'}
                      onCheckedChange={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Select
                onValueChange={(value) => setThemeColor(value as ThemeCollors)}
                defaultValue={themeColor}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
