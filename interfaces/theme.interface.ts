export type ThemeCollors = 'blue' | 'red';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColorStateProps {
  themeColor: ThemeCollors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeCollors>>;
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}
