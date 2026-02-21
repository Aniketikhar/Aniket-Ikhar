import React from 'react'
import ReactDOM from 'react-dom/client'
import Desktop from './components/Desktop/Desktop'
import IOSContainer from './components/iOS/IOSContainer'
import { ThemeProvider } from './context/ThemeContext'
import { WindowManagerProvider } from './context/WindowManagerContext'
import { useIsMobile } from './hooks/useIsMobile'
import './styles/global.css'

const App = () => {
  const isMobile = useIsMobile(768);

  return (
    <ThemeProvider>
      <WindowManagerProvider>
        {isMobile ? <IOSContainer /> : <Desktop />}
      </WindowManagerProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
