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
  // Initialize from localStorage or default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark';
  });
  
  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem('app-wallpaper') || defaultWallpaper;
  });

  // Persist theme changes
  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Persist wallpaper changes
  React.useEffect(() => {
    localStorage.setItem('app-wallpaper', wallpaper);
  }, [wallpaper]);

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
