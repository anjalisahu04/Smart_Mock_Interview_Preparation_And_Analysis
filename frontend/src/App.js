import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import InterviewSetup from './Components/InterviewSetup';
import InterviewSession from './Components/InterviewSession';
import Dashboard from './Components/Dashboard';
import InterviewDetails from './Components/InterviewDetails';

// Services
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const token = AuthService.getToken();
    
    if (user && token) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData.user || userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={currentUser} 
        onLogout={handleLogout} 
      />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/" /> : 
              <Login onLogin={handleLogin} />
            } 
          />
<Route path="/interview/setup" element={<InterviewSetup />} />
<Route path="/interview/session/:sessionId" element={<InterviewSession />} />
<Route 
  path="/dashboard" 
  element={
    isAuthenticated ? 
    <Dashboard /> : 
    <Navigate to="/login" />
  } 
/>
<Route 
  path="/interviews" 
  element={
    isAuthenticated ? 
    <Dashboard /> : 
    <Navigate to="/login" />
  } 
/>
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
              <Navigate to="/login" /> : 
              <Register />
            } 
          />
          <Route 
            path="/interview/details/:sessionId" 
            element={
              isAuthenticated ? 
              <InterviewDetails /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/interviews" 
            element={
              isAuthenticated ? 
              <div>Interviews Page (Coming Soon)</div> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? 
              <div>Settings Page (Coming Soon)</div> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
