import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Terminal from './components/Terminal';
import ProfileSection from './components/ProfileSection';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfilePanel = styled.div`
  width: 35%;
  min-width: 400px;
  position: relative;
  z-index: 10;
  
  @media (max-width: 1024px) {
    width: 40%;
    min-width: 350px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 40vh;
    min-width: unset;
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 35vh;
    min-height: 280px;
  }
`;

const TerminalPanel = styled.div`
  flex: 1;
  width: 65%;
  
  @media (max-width: 1024px) {
    width: 60%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 60vh;
  }
  
  @media (max-width: 480px) {
    height: 65vh;
  }
`;

function App() {
  const [currentTheme, setCurrentTheme] = useState('green');

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <AppContainer>
      <ProfilePanel>
        <ProfileSection />
      </ProfilePanel>
      <TerminalPanel>
        <Terminal theme={currentTheme} />
      </TerminalPanel>
    </AppContainer>
  );
}

export default App;
