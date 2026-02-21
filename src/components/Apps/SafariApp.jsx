import React, { useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaSearch, FaLock, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/SafariApp.css';

const SafariApp = () => {
  const { theme } = useTheme();
  const [url, setUrl] = useState('https://www.google.com');
  const [displayUrl, setDisplayUrl] = useState('google.com');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    let target = displayUrl;
    if (!target.startsWith('http')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = `https://${target}`;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    }
    setUrl(target);
    setIsLoading(true);
  };

  const handleRefresh = () => {
    const current = iframeRef.current;
    if (current) {
      setIsLoading(true);
      current.src = current.src;
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleOpenExternal = () => {
    window.open(url, '_blank');
  };

  const favorites = [
    { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: 'W' },
    { name: 'Portfolio', url: window.location.origin, icon: 'P' },
    { name: 'BBC News', url: 'https://www.bbc.com', icon: 'B' },
  ];

  // Google embed check: Google blocks iframes.
  // We will show a custom "Google" inspired start page if URL mimics google home
  const isGoogleHome = url.includes('google.com') && !url.includes('/search');

  return (
    <div className={`safari-app ${theme}`}>
      {/* Browser Toolbar */}
      <div className="safari-toolbar">
        <div className="safari-controls">
          <button className="control-btn"><FaArrowLeft /></button>
          <button className="control-btn"><FaArrowRight /></button>
          <button className="control-btn" onClick={handleRefresh}><FaRedo /></button>
        </div>

        <form className="safari-address-bar" onSubmit={handleSearch}>
          <FaLock className="lock-icon" size={10} />
          <input
            type="text"
            value={displayUrl}
            onChange={(e) => setDisplayUrl(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </form>

        <button className="control-btn external-link-btn" onClick={handleOpenExternal} title="Open in new tab">
          <FaExternalLinkAlt size={12} />
        </button>
      </div>

      {/* Browser Content */}
      <div className="safari-content">
        {isLoading && <div className="safari-loader-bar"></div>}

        {isGoogleHome ? (
          <div className="google-start-page">
            <div className="google-content">
              <h1>Google</h1>
              <form className="google-search-form" onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search Google or type a URL" />
                </div>
                <div className="google-buttons">
                  <button type="button">Google Search</button>
                  <button type="button">I'm Feeling Lucky</button>
                </div>
              </form>

              {/* Favorites Grid */}
              <div className="favorites-grid">
                {favorites.map(fav => (
                  <div key={fav.name} className="fav-item" onClick={() => { setUrl(fav.url); setDisplayUrl(fav.url); setIsLoading(true); }}>
                    <div className="fav-icon">{fav.icon}</div>
                    <span>{fav.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="iframe-container">
            <div className="iframe-overlay-hint">
              Note: Many websites (like Google, YouTube) block being displayed inside other apps.
            </div>
            <iframe
              ref={iframeRef}
              src={url}
              title="Browser"
              onLoad={handleIframeLoad}
              onError={() => setIsLoading(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
