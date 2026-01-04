import React, { useState, useEffect } from 'react';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';
import '../../styles/IOSStatusBar.css';

const IOSStatusBar = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ios-status-bar">
      <div className="ios-status-left">
        <span className="ios-time">{currentTime}</span>
      </div>
      <div className="ios-status-right">
        <FaSignal className="ios-icon" />
        <FaWifi className="ios-icon" />
        <FaBatteryFull className="ios-icon" />
      </div>
    </div>
  );
};

export default IOSStatusBar;
