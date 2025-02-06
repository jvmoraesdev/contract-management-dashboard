'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Sun,
  Moon,
  Monitor,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
  theme?: 'light' | 'dark' | 'system';
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
  isMobile?: boolean;
}

const Sidebar = ({
  collapsed = false,
  onCollapse = () => {},
  theme = 'system',
  onThemeChange = () => {},
  isMobile = false
}: SidebarProps) => {
  const menuItems = [
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: 'Dashboard',
      active: true,
      onClick: () => {
        console.log('teste');
      }
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: 'Contracts',
      active: false
    },
    { icon: <Users className="h-4 w-4" />, label: 'Users', active: false },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'Settings',
      active: false
    }
  ];

  return (
    <Card
      className={`flex h-screen flex-col rounded-none border bg-background transition-all duration-300 ${
        isMobile
          ? `fixed inset-y-0 left-0 z-50 ${collapsed ? '-translate-x-full' : 'translate-x-0'} w-[280px]`
          : `${collapsed ? 'w-[80px]' : 'w-[280px]'}`
      } `}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          {!collapsed && <span className="font-semibold">Contract Manager</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={onCollapse} className="h-8 w-8">
          <ChevronLeft className={`h-4 w-4 ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                {!collapsed && <span>Light</span>}
              </div>
              <Switch checked={theme === 'light'} onCheckedChange={() => onThemeChange('light')} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4" />
                {!collapsed && <span>Dark</span>}
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={() => onThemeChange('dark')} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                {!collapsed && <span>System</span>}
              </div>
              <Switch
                checked={theme === 'system'}
                onCheckedChange={() => onThemeChange('system')}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
