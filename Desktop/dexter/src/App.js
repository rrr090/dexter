import React, { useState } from 'react';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' или 'app'

  const handleStartApp = () => {
    setCurrentView('app');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage onStartApp={handleStartApp} />;
  }

  return;
}
export default App;