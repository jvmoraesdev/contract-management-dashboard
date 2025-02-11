export type ThemeColors = 'default' | 'sapphire' | 'ruby' | 'emerald';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColorStateProps {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}
