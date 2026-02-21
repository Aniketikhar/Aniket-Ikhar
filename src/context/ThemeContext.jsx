import React, { createContext, useContext, useState } from 'react';

const defaultDesktopWallpaper = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80';
const defaultMobileWallpaper = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80';

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

  const isMobile = window.innerWidth < 768;
  const wallpaperKey = isMobile ? 'app-wallpaper-mobile' : 'app-wallpaper';
  const defaultWallpaper = isMobile ? defaultMobileWallpaper : defaultDesktopWallpaper;

  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem(wallpaperKey) || defaultWallpaper;
  });

  // Persist theme changes
  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Persist wallpaper changes
  React.useEffect(() => {
    localStorage.setItem(wallpaperKey, wallpaper);
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
