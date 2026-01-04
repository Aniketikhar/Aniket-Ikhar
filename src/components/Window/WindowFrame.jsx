import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoRemove, IoExpand } from 'react-icons/io5';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/WindowFrame.css';

const WindowFrame = ({ windowId, title, children }) => {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowManager();
  const { theme } = useTheme();
  const winState = windows[windowId];

  // If closed, don't render (AnimatePresence handles the exit anim)
  if (!winState?.isOpen) return null;

  // Determine animation values based on maximize state
  const isMaximized = winState.isMaximized;

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate top offset and height based on device
  const topOffset = isMobile ? 44 : 28;
  const heightCalc = `calc(100vh - ${topOffset}px)`;

  return (
    <AnimatePresence>
      {!winState.isMin && (
        <motion.div
           className={`window-frame glass ${theme} ${winState.zIndex > 10 ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
           drag={!isMaximized}
           dragConstraints={{
             top: 0,
             left: -400,
             right: 400,
             bottom: window.innerHeight - 500
           }}
           dragElastic={0.1}
           dragTransition={{ 
             power: 0.2,
             timeConstant: 200,
             modifyTarget: target => Math.round(target)
           }}
           whileDrag={{ 
             scale: 1.02,
             cursor: 'grabbing',
             boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
           }}
           initial={{ scale: 0.8, opacity: 0, y: 100 }}
           animate={{ 
             scale: 1, 
             opacity: 1, 
             x: isMaximized ? 0 : undefined,
             y: isMaximized ? 0 : undefined,
             top: isMaximized ? topOffset : undefined,
             left: isMaximized ? 0 : undefined,
             width: isMaximized ? '100vw' : undefined,
             height: isMaximized ? heightCalc : undefined,
             borderRadius: isMaximized ? 0 : undefined
           }}
           transition={
             isMaximized 
               ? { type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }
               : { type: 'spring', stiffness: 300, damping: 30 }
           }
           exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
           style={{
             position: isMaximized ? 'fixed' : 'absolute',
             zIndex: isMaximized ? 99999 : winState.zIndex
           }}
           layout={isMaximized}
           onMouseDown={() => focusWindow(windowId)}
        >
          {/* Header */}
          <div className="window-header" onDoubleClick={() => minimizeWindow(windowId)}>
            <div className="traffic-lights">
              <button className="light red" onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}>
                <IoClose size={10} className="icon" />
              </button>
              <button className="light yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}>
                <IoRemove size={10} className="icon" />
              </button>
              <button className="light green" onClick={(e) => { e.stopPropagation(); maximizeWindow(windowId); }}>
                <IoExpand size={10} className="icon" />
              </button>
            </div>
            <span className="window-title">{title}</span>
            <div className="spacer" />
          </div>

          {/* Body */}
          <div className="window-body custom-scrollbar">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindowFrame;
