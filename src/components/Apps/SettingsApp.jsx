import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaImage, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Settings.css';
import defaultWallpaper from '../../assets/wallpaper.png';

const wallpaperCategories = [
  {
    category: 'Nature',
    wallpapers: [
      { id: 1, name: 'Mountain Peaks', url: defaultWallpaper },
      { id: 2, name: 'Forest Path', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80' },
      { id: 3, name: 'Ocean Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80' },
      { id: 4, name: 'Desert Dunes', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80' },
      { id: 5, name: 'Northern Lights', url: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1920&q=80' },
    ]
  },
  {
    category: 'Abstract',
    wallpapers: [
      { id: 6, name: 'Blue Gradient', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80' },
      { id: 7, name: 'Purple Waves', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80' },
      { id: 8, name: 'Pink Flow', url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&q=80' },
      { id: 9, name: 'Orange Burst', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80' },
      { id: 10, name: 'Neon Glow', url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1920&q=80' },
    ]
  },
  {
    category: 'Dark Mode',
    wallpapers: [
      { id: 11, name: 'macOS Sequoia', url: 'https://4kwallpapers.com/images/wallpapers/macos-sequoia-dark-6016x6016-19364.jpg' },
      { id: 12, name: 'Night City', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80' },
      { id: 13, name: 'Starry Night', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80' },
      { id: 14, name: 'Dark Forest', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80' },
      { id: 15, name: 'Black Abstract', url: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=1920&q=80' },
    ]
  },
  {
    category: 'Gradients',
    wallpapers: [
      { id: 16, name: 'Sunset Gradient', url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80' },
      { id: 17, name: 'Ocean Blue', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80' },
      { id: 18, name: 'Purple Dream', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80' },
      { id: 19, name: 'Coral Pink', url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80' },
      { id: 20, name: 'Mint Fresh', url: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1920&q=80' },
    ]
  }
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

            {wallpaperCategories.map((categoryData, categoryIndex) => (
              <div key={categoryData.category} className="wallpaper-category">
                <h3 className="category-title">{categoryData.category}</h3>
                <div className="wallpaper-grid">
                  {categoryData.wallpapers.map((wp, index) => (
                    <motion.div
                      key={wp.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                      className={`wallpaper-option ${wallpaper === wp.url ? 'selected' : ''}`}
                      onClick={() => changeWallpaper(wp.url)}
                    >
                      <img src={wp.url} alt={wp.name} />
                      <span className="wallpaper-name">{wp.name}</span>
                      {wallpaper === wp.url && (
                        <div className="selected-badge">✓</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsApp;
