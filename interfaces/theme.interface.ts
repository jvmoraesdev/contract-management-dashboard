export type ThemeCollors = 'default' | 'sapphire' | 'ruby' | 'emerald';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColorStateProps {
  themeColor: ThemeCollors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeCollors>>;
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}
