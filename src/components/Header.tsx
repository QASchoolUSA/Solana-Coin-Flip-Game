import React from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
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