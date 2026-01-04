import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManagerContext';
import '../../styles/Dock.css';

// Import macOS-style icons
import finderIcon from '../../assets/finder.png';
import aboutIcon from '../../assets/about.png';
import projectsIcon from '../../assets/projects.png';
import settingsIcon from '../../assets/settings.png';
import terminalIcon from '../../assets/terminal.png';
// Using wallpaper as gallery icon temporary
import photosIcon from '../../assets/wallpaper.png'; 

const apps = [
  { id: 'finder', name: 'Finder', icon: finderIcon },
  { id: 'about', name: 'About', icon: aboutIcon },
  { id: 'projects', name: 'Projects', icon: projectsIcon },
  { id: 'gallery', name: 'Gallery', icon: photosIcon },
  { id: 'safari', name: 'Safari', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg' },
  { id: 'contact', name: 'Settings', icon: settingsIcon },
  { id: 'experience', name: 'Experience', icon: terminalIcon },
];

const Dock = () => {
  const mouseX = useMotionValue(null);
  const { openWindow } = useWindowManager();

  return (
    <div className="dock-container">
      <div 
        className="dock glass"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {apps.map((app, index) => (
          <DockIcon 
            key={app.id} 
            mouseX={mouseX} 
            icon={app.icon}
            index={index}
            onClick={() => openWindow(app.id)}
          />
        ))}
      </div>
    </div>
  );
};

const DockIcon = ({ mouseX, icon, index, onClick }) => {
  const ref = React.useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 85, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-icon"
      onClick={onClick}
    >
      <img 
        src={icon} 
        alt="app icon" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          position: 'relative',
          zIndex: 1
        }} 
      />
    </motion.div>
  );
};

export default Dock;
