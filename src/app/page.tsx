'use client';

import React from 'react';
import CoinFlip from '../components/CoinFlip';

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CoinFlip />
    </div>
  );
};

export default HomePage;