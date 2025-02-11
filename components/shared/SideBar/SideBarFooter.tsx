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
import { ThemeColors } from '@/interfaces/theme.interface';
import { themes } from '@/lib/theme-colors';
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
            onValueChange={(value) => setThemeColor(value as ThemeColors)}
            defaultValue={themeColor}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(themes).map((theme) => (
                <SelectItem key={theme} value={theme}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `hsl(${themes[theme as keyof typeof themes][themeMode]['primary']})`
                      }}
                    />
                    {theme}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};

export default SideBarFooter;
