'use client';

import { SunMoon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render component after first mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-400 hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <SunMoon 
        className={`w-6 h-6 ${
          theme === 'dark' 
            ? 'text-yellow-400' 
            : 'text-white'
        }`}
      />
    </button>
  );
};

export default ThemeSwitch;