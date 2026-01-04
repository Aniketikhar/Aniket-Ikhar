import React, { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children }) => {
  // windows state: { [id]: { id, title, content, isOpen, isMin, zIndex } }
  const [windows, setWindows] = useState({
    finder: { id: 'finder', title: 'Finder', component: 'AboutMe', isOpen: true, isMin: false, isMaximized: false, zIndex: 1 },
    projects: { id: 'projects', title: 'Projects', component: 'Projects', isOpen: true, isMin: false, isMaximized: false, zIndex: 2 },
    gallery: { id: 'gallery', title: 'Gallery', component: 'Gallery', isOpen: false, isMin: false, isMaximized: false, zIndex: 0 },
    safari: { id: 'safari', title: 'Safari', component: 'Safari', isOpen: false, isMin: false, isMaximized: false, zIndex: 0 },
    contact: { id: 'contact', title: 'Settings', component: 'Settings', isOpen: false, isMin: false, isMaximized: false, zIndex: 0 },
    experience: { id: 'experience', title: 'Terminal', component: 'Experience', isOpen: false, isMin: false, isMaximized: false, zIndex: 0 },
  });

  const [activeWindowId, setActiveWindowId] = useState('finder');
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const openWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMin: false, zIndex: zIndexCounter + 1 },
    }));
    setZIndexCounter(c => c + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMin: true },
    }));
  };

  const maximizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  const focusWindow = (id) => {
    if (activeWindowId === id) return;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: zIndexCounter + 1, isMin: false },
    }));
    setZIndexCounter(c => c + 1);
    setActiveWindowId(id);
  };

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId }}>
      {children}
    </WindowManagerContext.Provider>
  );
};
