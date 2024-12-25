import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Solana-Coin-Flip-Game' : '';
  
  return (
    <header className="flex items-center justify-between p-4 bg-white-400 text-black">
      <div className="flex items-center">
        <img
          src={`${basePath}/logo.svg`}
          alt="Logo"
          className="h-12 mr-2"
        />
        <Link href="/" className="text-xl font-bold">Home</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <ThemeSwitch />
      </nav>
    </header>
  );
};

export default Header;