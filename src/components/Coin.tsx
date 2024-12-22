'use client';

import React, { useEffect, useState } from 'react';

type CoinProps = {
  result: 'heads' | 'tails'; // Result passed from CoinFlip component
};

const Coin: React.FC<CoinProps> = ({ result }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentSide, setCurrentSide] = useState<'heads' | 'tails'>('heads'); // Default to heads

  useEffect(() => {
    // Trigger flip animation when the result changes
    if (result) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSide(result); // Update the displayed side after animation
        setIsFlipping(false);
      }, 1000); // Match animation duration
    }
  }, [result]);

  return (
    <div style={styles.container}>
      <div
        className={`coin ${isFlipping ? 'flipping' : ''}`}
        style={{
          ...styles.coin,
          backgroundImage: `url(${currentSide === 'heads' ? '/heads.png' : '/tails.png'})`,
        }}
      ></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%', // Fill the CardHeader
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  coin: {
    width: '20vw', // Responsive width
    height: '20vw', // Responsive height
    maxWidth: '100px', // Max size for larger screens
    maxHeight: '100px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 1s ease-in-out',
  },
};

export default Coin;