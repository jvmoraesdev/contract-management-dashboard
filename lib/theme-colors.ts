import { ThemeColors } from '@/interfaces/theme.interface';

export const themes = {
  default: {
    light: {
      background: '0 0% 100%', // #FFFFFF
      foreground: '240 10% 3.9%', // #0A0A0B
      card: '0 0% 100%', // #FFFFFF
      'card-foreground': '240 10% 3.9%', // #0A0A0B
      popover: '0 0% 100%', // #FFFFFF
      'popover-foreground': '240 10% 3.9%', // #0A0A0B
      primary: '240 5.9% 10%', // #191919
      'primary-foreground': '0 0% 98%', // #FAFAFA
      secondary: '240 4.8% 95.9%', // #F4F4F5
      'secondary-foreground': '240 5.9% 10%', // #191919
      muted: '240 4.8% 95.9%', // #F4F4F5
      'muted-foreground': '240 3.8% 46.1%', // #737373
      accent: '240 4.8% 95.9%', // #F4F4F5
      'accent-foreground': '240 5.9% 10%', // #191919
      destructive: '0 84.2% 60.2%', // #EF4444
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 5.9% 90%', // #E4E4E7
      input: '240 5.9% 90%', // #E4E4E7
      ring: '240 10% 3.9%', // #0A0A0B
      'chart-1': '173 58% 39%', // #2A9D8F
      'chart-2': '197 37% 24%', // #264653
      'chart-3': '12 76% 61%', // #E76F51
      'chart-4': '43 74% 66%', // #E9C46A
      radius: '0.5rem', // Não é uma cor
      'sidebar-background': '0 0% 98%', // #FAFAFA
      'sidebar-foreground': '240 5.3% 26.1%', // #404042
      'sidebar-primary': '240 5.9% 10%', // #191919
      'sidebar-primary-foreground': '0 0% 98%', // #FAFAFA
      'sidebar-accent': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-accent-foreground': '240 5.9% 10%', // #191919
      'sidebar-border': '220 13% 91%', // #E6E8EB
      'sidebar-ring': '217.2 91.2% 59.8%' // #3B82F6
    },
    dark: {
      background: '240 10% 3.9%', // #0A0A0B
      foreground: '0 0% 98%', // #FAFAFA
      card: '240 10% 3.9%', // #0A0A0B
      'card-foreground': '0 0% 98%', // #FAFAFA
      popover: '240 10% 3.9%', // #0A0A0B
      'popover-foreground': '0 0% 98%', // #FAFAFA
      primary: '0 0% 98%', // #FAFAFA
      'primary-foreground': '240 5.9% 10%', // #191919
      secondary: '240 3.7% 15.9%', // #282829
      'secondary-foreground': '0 0% 98%', // #FAFAFA
      muted: '240 3.7% 15.9%', // #282829
      'muted-foreground': '240 5% 64.9%', // #A1A1A6
      accent: '240 3.7% 15.9%', // #282829
      'accent-foreground': '0 0% 98%', // #FAFAFA
      destructive: '0 62.8% 30.6%', // #9B1C1C
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 3.7% 20%', // #333333
      input: '240 3.7% 15.9%', // #282829
      ring: '240 4.9% 83.9%', // #D4D4D8
      'chart-1': '173 58% 39%', // #2A9D8F
      'chart-2': '197 37% 24%', // #264653
      'chart-3': '12 76% 61%', // #E76F51
      'chart-4': '43 74% 66%', // #E9C46A
      'sidebar-background': '240 5.9% 10%', // #191919
      'sidebar-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-primary': '0 0% 98%', // #FAFAFA
      'sidebar-primary-foreground': '240 5.9% 10%', // #191919
      'sidebar-accent': '240 3.7% 15.9%', // #282829
      'sidebar-accent-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-border': '240 3.7% 15.9%', // #282829
      'sidebar-ring': '217.2 91.2% 59.8%' // #3B82F6
    }
  },
  sapphire: {
    light: {
      background: '0 0% 100%', // #FFFFFF
      foreground: '222.2 84% 4.9%', // #0C0E14
      card: '0 0% 100%', // #FFFFFF
      'card-foreground': '222.2 84% 4.9%', // #0C0E14
      popover: '0 0% 100%', // #FFFFFF
      'popover-foreground': '222.2 84% 4.9%', // #0C0E14
      primary: '221.2 83.2% 53.3%', // #3B82F6
      'primary-foreground': '210 40% 98%', // #F8FAFC
      secondary: '210 40% 96.1%', // #F1F5F9
      'secondary-foreground': '222.2 47.4% 11.2%', // #1E293B
      muted: '210 40% 96.1%', // #F1F5F9
      'muted-foreground': '215.4 16.3% 44%', // #64748B
      accent: '210 40% 96.1%', // #F1F5F9
      'accent-foreground': '222.2 47.4% 11.2%', // #1E293B
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '210 40% 98%', // #F8FAFC
      alert: '48 96% 53%', // #F4C430
      border: '214.3 31.8% 91.4%', // #E2E8F0
      input: '214.3 31.8% 91.4%', // #E2E8F0
      ring: '221.2 83.2% 53.3%', // #3B82F6
      'chart-1': '221.2 83.2% 53.3%', // #3B82F6
      'chart-2': '212 95% 68%', // #60A5FA
      'chart-3': '216 92% 60%', // #38BDF8
      'chart-4': '210 98% 78%', // #93C5FD
      radius: '0.5rem', // Não é uma cor
      'sidebar-background': '0 0% 98%', // #FAFAFA
      'sidebar-foreground': '240 5.3% 26.1%', // #404042
      'sidebar-primary': '221.2 83.2% 53.3%', // #3B82F6
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-accent-foreground': '240 5.9% 10%', // #191919
      'sidebar-border': '220 13% 91%', // #E6E8EB
      'sidebar-ring': '217.2 91.2% 59.8%' // #3B82F6
    },
    dark: {
      background: '240 10% 3.9%', // #0A0A0B
      foreground: '0 0% 98%', // #FAFAFA
      card: '240 10% 3.9%', // #0A0A0B
      'card-foreground': '0 0% 98%', // #FAFAFA
      popover: '240 10% 3.9%', // #0A0A0B
      'popover-foreground': '0 0% 98%', // #FAFAFA
      primary: '221.2 83.2% 53.3%', // #3B82F6
      'primary-foreground': '210 40% 98%', // #F8FAFC
      secondary: '210 40% 96.1%', // #F1F5F9
      'secondary-foreground': '222.2 47.4% 11.2%', // #1E293B
      muted: '240 3.7% 15.9%', // #282829
      'muted-foreground': '240 5% 64.9%', // #A1A1A6
      accent: '240 3.7% 15.9%', // #282829
      'accent-foreground': '0 0% 98%', // #FAFAFA
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '210 40% 98%', // #F8FAFC
      alert: '48 96% 53%', // #F4C430
      border: '240 3.7% 15.9%', // #282829
      input: '240 3.7% 15.9%', // #282829
      ring: '221.2 83.2% 53.3%', // #3B82F6
      'chart-1': '221.2 83.2% 53.3%', // #3B82F6
      'chart-2': '212 95% 68%', // #60A5FA
      'chart-3': '216 92% 60%', // #38BDF8
      'chart-4': '210 98% 78%', // #93C5FD
      'sidebar-background': '240 5.9% 10%', // #191919
      'sidebar-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-primary': '221.2 83.2% 53.3%', // #3B82F6
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 3.7% 15.9%', // #282829
      'sidebar-accent-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-border': '240 3.7% 15.9%', // #282829
      'sidebar-ring': '217.2 91.2% 59.8%' // #3B82F6
    }
  },
  ruby: {
    light: {
      background: '0 0% 100%', // #FFFFFF
      foreground: '240 10% 3.9%', // #0A0A0B
      card: '0 0% 100%', // #FFFFFF
      'card-foreground': '240 10% 3.9%', // #0A0A0B
      popover: '0 0% 100%', // #FFFFFF
      'popover-foreground': '240 10% 3.9%', // #0A0A0B
      primary: '346.8 77.2% 49.8%', // #E11D48
      'primary-foreground': '355.7 100% 99%', // #FFF1F2
      secondary: '240 4.8% 95.9%', // #F4F4F5
      'secondary-foreground': '240 5.9% 10%', // #191919
      muted: '240 4.8% 95.9%', // #F4F4F5
      'muted-foreground': '240 3.8% 45%', // #71717A
      accent: '240 4.8% 95.9%', // #F4F4F5
      'accent-foreground': '240 5.9% 10%', // #191919
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 5.9% 90%', // #E4E4E7
      input: '240 5.9% 90%', // #E4E4E7
      ring: '346.8 77.2% 49.8%', // #E11D48
      'chart-1': '347 77% 50%', // #E11D48
      'chart-2': '352 83% 91%', // #FDD1D9
      'chart-3': '350 80% 72%', // #F9A8B9
      'chart-4': '351 83% 82%', // #FBC4CF
      'chart-5': '349 77% 62%', // #F26B8A
      radius: '0.5rem', // Não é uma cor
      'sidebar-background': '0 0% 98%', // #FAFAFA
      'sidebar-foreground': '240 5.3% 26.1%', // #404042
      'sidebar-primary': '346.8 77.2% 49.8%', // #E11D48
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-accent-foreground': '240 5.9% 10%', // #191919
      'sidebar-border': '220 13% 91%', // #E6E8EB
      'sidebar-ring': '346.8 77.2% 49.8%' // #E11D48
    },
    dark: {
      background: '240 10% 3.9%', // #0A0A0B
      foreground: '0 0% 98%', // #FAFAFA
      card: '240 10% 3.9%', // #0A0A0B
      'card-foreground': '0 0% 98%', // #FAFAFA
      popover: '240 10% 3.9%', // #0A0A0B
      'popover-foreground': '0 0% 98%', // #FAFAFA
      primary: '346.8 77.2% 49.8%', // #E11D48
      'primary-foreground': '355.7 100% 99%', // #FFF1F2
      secondary: '240 4.8% 95.9%', // #F4F4F5
      'secondary-foreground': '240 5.9% 10%', // #191919
      muted: '240 3.7% 15.9%', // #282829
      'muted-foreground': '240 5% 64.9%', // #A1A1A6
      accent: '240 3.7% 15.9%', // #282829
      'accent-foreground': '0 0% 98%', // #FAFAFA
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 3.7% 15.9%', // #282829
      input: '240 3.7% 15.9%', // #282829
      ring: '346.8 77.2% 49.8%', // #E11D48
      'chart-1': '347 77% 50%', // #E11D48
      'chart-2': '349 77% 62%', // #F26B8A
      'chart-3': '350 80% 72%', // #F9A8B9
      'chart-4': '351 83% 82%', // #FBC4CF
      'chart-5': '352 83% 91%', // #FDD1D9
      'sidebar-background': '240 5.9% 10%', // #191919
      'sidebar-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-primary': '346.8 77.2% 49.8%', // #E11D48
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 3.7% 15.9%', // #282829
      'sidebar-accent-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-border': '240 3.7% 15.9%', // #282829
      'sidebar-ring': '346.8 77.2% 49.8%' // #E11D48
    }
  },
  emerald: {
    light: {
      background: '0 0% 100%', // #FFFFFF
      foreground: '240 10% 3.9%', // #0A0A0B
      card: '0 0% 100%', // #FFFFFF
      'card-foreground': '240 10% 3.9%', // #0A0A0B
      popover: '0 0% 100%', // #FFFFFF
      'popover-foreground': '240 10% 3.9%', // #0A0A0B
      primary: '142 86% 28%', // #15803D
      'primary-foreground': '356 29% 98%', // #FCFCFC
      secondary: '240 4.8% 95.9%', // #F4F4F5
      'secondary-foreground': '240 5.9% 10%', // #191919
      muted: '240 4.8% 95.9%', // #F4F4F5
      'muted-foreground': '240 3.8% 45%', // #71717A
      accent: '240 4.8% 95.9%', // #F4F4F5
      'accent-foreground': '240 5.9% 10%', // #191919
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 5.9% 90%', // #E4E4E7
      input: '240 5.9% 90%', // #E4E4E7
      ring: '142 86% 28%', // #15803D
      'chart-1': '139 65% 20%', // #166534
      'chart-2': '140 74% 44%', // #22C55E
      'chart-3': '142 88% 28%', // #15803D
      'chart-4': '137 55% 15%', // #14532D
      'chart-5': '141 40% 9%', // #052E16
      'sidebar-background': '0 0% 98%', // #FAFAFA
      'sidebar-foreground': '240 5.3% 26.1%', // #404042
      'sidebar-primary': '142 86% 28%', // #15803D
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-accent-foreground': '240 5.9% 10%', // #191919
      'sidebar-border': '220 13% 91%', // #E6E8EB
      'sidebar-ring': '142 86% 28%' // #15803D
    },
    dark: {
      background: '240 10% 3.9%', // #0A0A0B
      foreground: '0 0% 98%', // #FAFAFA
      card: '240 10% 3.9%', // #0A0A0B
      'card-foreground': '0 0% 98%', // #FAFAFA
      popover: '240 10% 3.9%', // #0A0A0B
      'popover-foreground': '0 0% 98%', // #FAFAFA
      primary: '142 86% 28%', // #15803D
      'primary-foreground': '356 29% 98%', // #FCFCFC
      secondary: '240 4.8% 95.9%', // #F4F4F5
      'secondary-foreground': '240 5.9% 10%', // #191919
      muted: '240 3.7% 15.9%', // #282829
      'muted-foreground': '240 5% 64.9%', // #A1A1A6
      accent: '240 3.7% 15.9%', // #282829
      'accent-foreground': '0 0% 98%', // #FAFAFA
      destructive: '0 72% 51%', // #DC2626
      'destructive-foreground': '0 0% 98%', // #FAFAFA
      alert: '48 96% 53%', // #F4C430
      border: '240 3.7% 15.9%', // #282829
      input: '240 3.7% 15.9%', // #282829
      ring: '142 86% 28%', // #15803D
      'chart-1': '142 88% 28%', // #15803D
      'chart-2': '139 65% 20%', // #166534
      'chart-3': '140 74% 24%', // #15803D
      'chart-4': '137 55% 15%', // #14532D
      'chart-5': '141 40% 9%', // #052E16
      'sidebar-background': '240 5.9% 10%', // #191919
      'sidebar-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-primary': '142 86% 28%', // #15803D
      'sidebar-primary-foreground': '0 0% 100%', // #FFFFFF
      'sidebar-accent': '240 3.7% 15.9%', // #282829
      'sidebar-accent-foreground': '240 4.8% 95.9%', // #F4F4F5
      'sidebar-border': '240 3.7% 15.9%', // #282829
      'sidebar-ring': '142 86% 28%' // #15803D
    }
  }
};

export default function setGlobalColorTheme(
  themeMode: 'light' | 'dark' = 'dark',
  color: ThemeColors
) {
  const theme = themes[color][themeMode] as {
    [key: string]: string;
  };

  for (const key in theme) {
    document.documentElement.style.setProperty(`--${key}`, theme[key]);
  }
}
