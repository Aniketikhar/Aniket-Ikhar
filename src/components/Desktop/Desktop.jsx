import React from 'react';
import TopBar from '../TopBar/TopBar';
import Dock from '../Dock/Dock';
import WindowFrame from '../Window/WindowFrame';
import AboutMe from '../Apps/AboutMe';
import ProjectsApp from '../Apps/ProjectsApp';
import SettingsApp from '../Apps/SettingsApp';
import GalleryApp from '../Apps/GalleryApp';
import { WindowManagerProvider, useWindowManager } from '../../context/WindowManagerContext';

import { useTheme } from '../../context/ThemeContext';
import '../../styles/global.css';
import '../../styles/Desktop.css';

const DesktopContent = () => {
  const { windows } = useWindowManager();
  const { wallpaper, theme } = useTheme();

  return (
    <div className={`desktop ${theme}`}>
      <div className="wallpaper" style={{ backgroundImage: `url(${wallpaper})` }} />
      <TopBar />
      <div className="window-area">
        {Object.values(windows).map((win) => (
          <WindowFrame key={win.id} windowId={win.id} title={win.title}>
            {win.id === 'finder' && <AboutMe />}
            {win.id === 'projects' && <ProjectsApp />}
            {win.id === 'gallery' && <GalleryApp />}
            {win.id === 'contact' && <SettingsApp />}
          </WindowFrame>
        ))}
      </div>
      <Dock />
    </div>
  );
};

const Desktop = () => (
  <WindowManagerProvider>
    <DesktopContent />
  </WindowManagerProvider>
);

export default Desktop;
