'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  SidebarFooter as Footer,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { ThemeCollors } from '@/interfaces/theme.interface';
import useMounted from '@/stores/hooks/useMounted';
import useThemes from '@/stores/hooks/useThemes';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const SideBarFooter = () => {
  const isMounted = useMounted();
  const { themeColor, themeMode, setThemeColor, setThemeMode } = useThemes();

  return (
    <Footer>
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
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="sapphire">Sapphire</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
              <SelectItem value="emerald">Emerald</SelectItem>
            </SelectContent>
          </Select>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};

export default SideBarFooter;
