'use client';

import WalletContextProvider from '@/components/WalletContextProvider';
import { ReactNode } from 'react';
import '../app/globals.css'


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          <main>
            {children}
          </main>
        </WalletContextProvider>
      </body>
    </html>
  );
}