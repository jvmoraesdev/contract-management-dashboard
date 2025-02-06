import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import ContractsProvider from '@/stores/contracts.provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import MobileProvider from '@/stores/mobile.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Contract Management Dashboard',
  description: 'A dashboard for managing contracts'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MobileProvider>
          <SidebarProvider>
            <ContractsProvider>{children}</ContractsProvider>
          </SidebarProvider>
        </MobileProvider>
      </body>
    </html>
  );
}
