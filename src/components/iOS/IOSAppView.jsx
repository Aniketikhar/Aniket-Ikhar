import React from 'react';
import { motion } from 'framer-motion';
import { IoChevronBack, IoClose } from 'react-icons/io5';
import '../../styles/IOSAppView.css';

const IOSAppView = ({ app, children, onClose }) => {
  const handleClose = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onClose();
  };

  return (
    <motion.div
      className="ios-app-view"
      initial={{ 
        scale: 0.1, 
        opacity: 0,
        borderRadius: '20px'
      }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        borderRadius: '0px'
      }}
      exit={{ 
        scale: 0.9, 
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* iOS Navigation Bar */}
      <div className="ios-nav-bar">
        <button className="ios-back-button" onClick={handleClose}>
          <IoChevronBack size={24} />
          <span>Home</span>
        </button>
        <h1 className="ios-nav-title">{app?.name || 'App'}</h1>
        <button className="ios-close-button" onClick={handleClose}>
          <IoClose size={28} />
        </button>
      </div>

      {/* App Content */}
      <div className="ios-app-content">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="ios-home-indicator-bottom"></div>
    </motion.div>
  );
};

export default IOSAppView;
