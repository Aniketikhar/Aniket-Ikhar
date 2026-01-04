import React from 'react'
import ReactDOM from 'react-dom/client'
import Desktop from './components/Desktop/Desktop'
import IOSContainer from './components/iOS/IOSContainer'
import { ThemeProvider } from './context/ThemeContext'
import { useIsMobile } from './hooks/useIsMobile'
import './styles/global.css'

const App = () => {
  const isMobile = useIsMobile(768);
  
  return (
    <ThemeProvider>
      {isMobile ? <IOSContainer /> : <Desktop />}
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
