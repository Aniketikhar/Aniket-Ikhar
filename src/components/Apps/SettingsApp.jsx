import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaImage, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Settings.css';

const wallpapers = [
  { id: 1, name: 'Nature Mountain', url: '/src/assets/wallpaper.png' },
  { id: 2, name: 'Dark Gradient', url: 'https://4kwallpapers.com/images/wallpapers/macos-sequoia-dark-6016x6016-19364.jpg' },
  { id: 3, name: 'Blue Abstract', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920' },
  { id: 4, name: 'Purple Waves', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920' },
];

const SettingsApp = () => {
  const { theme, setTheme, wallpaper, changeWallpaper } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="settings-app">
      <div className="settings-sidebar">
        <button 
          className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <FaPalette /> Appearance
        </button>
        <button 
          className={`settings-tab ${activeTab === 'wallpaper' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallpaper')}
        >
          <FaImage /> Wallpaper
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'appearance' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="settings-section"
          >
            <h2>Appearance</h2>
            <p className="section-description">Customize the look of your desktop</p>

            <div className="theme-selector">
              <div 
                className={`theme-option ${theme === 'light' ? 'selected' : ''}`}
                onClick={() => setTheme('light')}
              >
                <div className="theme-preview light">
                  <FaSun className="theme-icon" />
                </div>
                <span>Light</span>
              </div>

              <div 
                className={`theme-option ${theme === 'dark' ? 'selected' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <div className="theme-preview dark">
                  <FaMoon className="theme-icon" />
                </div>
                <span>Dark</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'wallpaper' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="settings-section"
          >
            <h2>Wallpaper</h2>
            <p className="section-description">Choose your desktop background</p>

            <div className="wallpaper-grid">
              {wallpapers.map((wp) => (
                <div
                  key={wp.id}
                  className={`wallpaper-option ${wallpaper === wp.url ? 'selected' : ''}`}
                  onClick={() => changeWallpaper(wp.url)}
                >
                  <img src={wp.url} alt={wp.name} />
                  <span className="wallpaper-name">{wp.name}</span>
                  {wallpaper === wp.url && (
                    <div className="selected-badge">✓</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsApp;
