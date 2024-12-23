'use client';

import WalletContextProvider from '@/context/WalletContextProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactNode } from 'react';
import '../app/globals.css';
import Header from '@/components/Header';

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