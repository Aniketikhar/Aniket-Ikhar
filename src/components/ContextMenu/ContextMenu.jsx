import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFolder, FaBriefcase, FaCog, FaEnvelope, FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import { useWindowManager } from '../../context/WindowManagerContext';
import '../../styles/ContextMenu.css';

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { openWindow } = useWindowManager();

  useEffect(() => {
    const handleContextMenu = (e) => {
      // Prevent default right-click menu
      e.preventDefault();
      
      // Calculate position (ensure menu doesn't go off-screen)
      const menuWidth = 220;
      const menuHeight = 300;
      const x = e.pageX + menuWidth > window.innerWidth 
        ? window.innerWidth - menuWidth - 10 
        : e.pageX;
      const y = e.pageY + menuHeight > window.innerHeight 
        ? window.innerHeight - menuHeight - 10 
        : e.pageY;
      
      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const menuItems = [
    {
      label: 'About Me',
      icon: FaFolder,
      action: () => openWindow('finder'),
      divider: false
    },
    {
      label: 'Projects',
      icon: FaBriefcase,
      action: () => openWindow('projects'),
      divider: false
    },
    {
      label: 'Settings',
      icon: FaCog,
      action: () => openWindow('contact'),
      divider: true
    },
    {
      label: 'GitHub',
      icon: FaGithub,
      action: () => window.open('https://github.com', '_blank'),
      divider: false
    },
    {
      label: 'LinkedIn',
      icon: FaLinkedin,
      action: () => window.open('https://linkedin.com', '_blank'),
      // divider: true
    },
    // {
    //   label: 'Close Menu',
    //   icon: FaTimes,
    //   action: () => setIsVisible(false),
    //   divider: false
    // }
  ];

  const handleMenuItemClick = (action) => {
    action();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="context-menu glass"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="context-menu-item"
                onClick={() => handleMenuItemClick(item.action)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="context-menu-icon" />
                <span className="context-menu-label">{item.label}</span>
              </motion.div>
              {item.divider && <div className="context-menu-divider" />}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
