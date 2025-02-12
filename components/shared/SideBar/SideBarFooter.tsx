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
  useSidebar
} from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeColors, ThemeMode } from '@/interfaces/theme.interface';
import { themes } from '@/lib/theme-colors';
import useMounted from '@/stores/hooks/useMounted';
import useThemes from '@/stores/hooks/useThemes';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SideBarFooter = () => {
  const isMounted = useMounted();
  const { themeColor, themeMode, setThemeColor, setThemeMode } = useThemes();
  const { t, i18n } = useTranslation();
  const { open: isSidebarOpen } = useSidebar();

  console.log(isSidebarOpen);
  return (
    <Footer className={isSidebarOpen ? 'block' : 'hidden'}>
      <SidebarGroupLabel>{t('sidebar.language')}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Tabs defaultValue={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
            <TabsList>
              <TabsTrigger value="ptBr">🇧🇷</TabsTrigger>
              <TabsTrigger value="en">🇬🇧</TabsTrigger>
            </TabsList>
          </Tabs>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarGroupLabel>Theme Color</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          {isMounted && (
            <Tabs
              defaultValue={themeMode}
              onValueChange={(value) => setThemeMode(value as ThemeMode)}
            >
              <TabsList>
                <TabsTrigger value="light">
                  <Sun className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="dark">
                  <Moon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
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
