import React from 'react';
import { motion } from 'framer-motion';
import { FaFolder, FaBriefcase, FaGraduationCap, FaCog, FaEnvelope, FaLaptopCode, FaImages, FaCompass } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/IOSHomeScreen.css';

const apps = [
  {
    id: 'finder',
    name: 'About Me',
    icon: FaFolder,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FaLaptopCode,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    icon: FaImages,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: FaCompass,
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
  },
  {
    id: 'experience',
    name: 'Experience',
    icon: FaBriefcase,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'education',
    name: 'Education',
    icon: FaGraduationCap,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 'contact',
    name: 'Settings',
    icon: FaCog,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'contact-form',
    name: 'Contact',
    icon: FaEnvelope,
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
];

const IOSHomeScreen = ({ onAppOpen, windows = {} }) => {
  const { wallpaper } = useTheme();

  const handleAppClick = (app) => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onAppOpen(app);
  };

  return (
    <div className="ios-home-screen" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="ios-wallpaper-overlay" />

      <div className="ios-app-grid">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            className={`ios-app-icon-container ${windows[app.id]?.isOpen ? 'is-open' : ''}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.05,
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleAppClick(app)}
          >
            <motion.div
              className="ios-app-icon"
              style={{ background: app.gradient }}
              whileHover={{ scale: 1.05 }}
            >
              <app.icon className="ios-app-icon-symbol" />
            </motion.div>
            <span className="ios-app-name">{app.name}</span>
            {windows[app.id]?.isOpen && (
              <motion.div
                className="ios-app-indicator"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="ios-page-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <div className="ios-home-indicator"></div>
    </div>
  );
};

export default IOSHomeScreen;
