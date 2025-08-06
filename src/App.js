import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NameEntry from './components/NameEntry';
import EmailValidation from './components/EmailValidation';
import Dashboard from './components/Dashboard';
import VRTour from './components/VRTour';
import WelcomeMessages from './components/WelcomeMessages';
import AIAssistant from './components/AIAssistant';
import { companyData } from './data/mockData';
import './App.css';

function App() {
  const [companyCode, setCompanyCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [companyValidated, setCompanyValidated] = useState(false);
  const [nameEntered, setNameEntered] = useState(false);

  const handleCompanyCodeSubmit = (code) => {
    if (companyData[code]) {
      setCompanyCode(code);
      setCompanyValidated(true);
    } else {
      alert('Invalid company code. Please try again.');
    }
  };

  const handleNameSubmit = (name) => {
    setEmployeeName(name);
    setNameEntered(true);
  };

  const handleEmailValidation = (email) => {
    // For demo purposes, accept the default email
    if (email === 'kitrismwnili@123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email. Please use the provided email address.');
    }
  };

  const handleLogout = () => {
    setCompanyCode('');
    setEmployeeName('');
    setIsAuthenticated(false);
    setCompanyValidated(false);
    setNameEntered(false);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              !companyValidated ? (
                <LandingPage onSubmit={handleCompanyCodeSubmit} />
              ) : !nameEntered ? (
                <NameEntry onSubmit={handleNameSubmit} />
              ) : !isAuthenticated ? (
                <EmailValidation onSubmit={handleEmailValidation} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard
                  companyCode={companyCode}
                  employeeName={employeeName}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/vr-tour"
            element={
              isAuthenticated ? (
                <VRTour companyCode={companyCode} employeeName={employeeName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/welcome-messages"
            element={
              isAuthenticated ? (
                <WelcomeMessages companyCode={companyCode} employeeName={employeeName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/ai-assistant"
            element={
              isAuthenticated ? (
                <AIAssistant companyCode={companyCode} employeeName={employeeName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
