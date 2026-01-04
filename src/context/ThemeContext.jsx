import React, { createContext, useContext, useState } from 'react';
import defaultWallpaper from '../assets/wallpaper.png';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeWallpaper = (wallpaperUrl) => {
    setWallpaper(wallpaperUrl);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      wallpaper,
      changeWallpaper 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
