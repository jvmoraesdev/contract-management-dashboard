import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import ContractsProvider from '@/stores/contracts.provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import MobileProvider from '@/stores/mobile.provider';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import ThemeProvider from '@/stores/theme.provider';
import LoadingProvider from '@/stores/loading.provider';
import MetadataTitle from '@/components/shared/MetadataTitle';

const interFont = Inter({
  weight: ['400', '700'],
  variable: '--font-ubuntu',
  subsets: ['latin']
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={interFont.className} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>
          <NextThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeProvider>
              <MobileProvider>
                <SidebarProvider>
                  <ContractsProvider>
                    <MetadataTitle />
                    {children}
                  </ContractsProvider>
                </SidebarProvider>
              </MobileProvider>
            </ThemeProvider>
          </NextThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
