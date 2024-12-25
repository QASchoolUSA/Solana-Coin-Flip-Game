'use client';

import { ReactNode } from 'react';
import WalletContextProvider from '@/context/WalletContextProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import '../app/globals.css';
import Header from '@/components/Header';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body>
          <WalletContextProvider>
            <Header />
            <main className="bg-white text-black dark:bg-black dark:text-white">
              {children}
            </main>
          </WalletContextProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}