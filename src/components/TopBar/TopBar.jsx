import React, { useState, useEffect } from 'react';
import { FaWifi, FaBatteryFull, FaSearch } from 'react-icons/fa';
import { IoIosSettings } from "react-icons/io";
import { format } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/TopBar.css';

const TopBar = () => {
  const [time, setTime] = useState(new Date());
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-bar glass">
      <div className="left-side">
        <span className="app-name font-bold">Aniket Ikhar</span>
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Go</span>
        <span className="menu-item">Window</span>
        <span className="menu-item">Help</span>
      </div>

      <div className="right-side">
        <span className="status-icon"><FaBatteryFull /></span>
        <span className="status-icon"><FaWifi /></span>
        <span className="status-icon"><FaSearch /></span>
        <span className="control-center"><IoIosSettings /></span>
        <span className="date-time">
          {format(time, 'EEE d MMM h:mm aa')}
        </span>
      </div>
    </div>
  );
};

export default TopBar;
