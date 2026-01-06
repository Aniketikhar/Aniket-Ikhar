import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IOSStatusBar from './IOSStatusBar';
import IOSHomeScreen from './IOSHomeScreen';
import IOSAppView from './IOSAppView';
import AboutMe from '../Apps/AboutMe';
import ProjectsApp from '../Apps/ProjectsApp';
import GalleryApp from '../Apps/GalleryApp';
import SafariApp from '../Apps/SafariApp';
import SettingsApp from '../Apps/SettingsApp';
import ExperienceApp from '../Apps/ExperienceApp';
import { useWindowManager } from '../../context/WindowManagerContext';
import '../../styles/iOS.css';

const IOSContainer = () => {
  const [activeApp, setActiveApp] = useState(null);
  const { windows } = useWindowManager();

  const handleAppOpen = (app) => {
    setActiveApp(app);
  };

  const handleAppClose = () => {
    setActiveApp(null);
  };

  const renderAppContent = () => {
    if (!activeApp) return null;

    switch (activeApp.id) {
      case 'finder':
        return <AboutMe />;
      case 'projects':
        return <ProjectsApp />;
      case 'gallery':
        return <GalleryApp />;
      case 'safari':
        return <SafariApp />;
      case 'contact':
        return <SettingsApp />;
      case 'experience':
        return <ExperienceApp />;
      default:
        return (
          <div style={{ 
            padding: '40px 20px', 
            color: 'white',
            textAlign: 'center' 
          }}>
            <h2>{activeApp.name}</h2>
            <p>Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="ios-container">
      <IOSStatusBar />
      
      {!activeApp && (
        <IOSHomeScreen onAppOpen={handleAppOpen} windows={windows} />
      )}

      <AnimatePresence>
        {activeApp && (
          <IOSAppView app={activeApp} onClose={handleAppClose}>
            {renderAppContent()}
          </IOSAppView>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IOSContainer;
