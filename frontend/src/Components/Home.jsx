// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, Button, Row, Col } from 'react-bootstrap';

// const Home = () => {
//   return (
//     <div className="text-center">
//       <h1 className="mb-4">Welcome to MockPrep</h1>
//       <p className="lead mb-5">
//         Your ultimate platform for interview preparation and skill enhancement
//       </p>

//       <Row className="g-4">
//         <Col md={4}>
//           <Card className="h-100">
//             <Card.Body>
//               <Card.Title>Practice Interviews</Card.Title>
//               <Card.Text>
//                 Practice with real interview questions and get instant feedback
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="h-100">
//             <Card.Body>
//               <Card.Title>Track Progress</Card.Title>
//               <Card.Text>
//                 Monitor your improvement with detailed analytics
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="h-100">
//             <Card.Body>
//               <Card.Title>Expert Tips</Card.Title>
//               <Card.Text>
//                 Learn from industry experts and improve your skills
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <div className="mt-5">
//         <Link to="/register">
//           <Button variant="primary" size="lg" className="me-3">
//             Get Started
//           </Button>
//         </Link>
//         <Link to="/login">
//           <Button variant="outline-primary" size="lg">
//             Login
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;



// Components/Home.jsx
// import React from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom'; 

// const Home = () => {
//   const navigate = useNavigate(); 
//   const handleSubmit = ()=>{
      
//   }

//   return (
//     <div className="home-container">
      
//       {/* --- Hero Section --- */}
//       <header className="hero-section">
//         <div className="hero-content">
//           <div className="badge">✨ New: Emotion Analysis Added</div>
//           <h1 className="hero-title">
//             Ace Your Interview <br />
//             With <span className="highlight">Smart</span> Feedback
//           </h1>
//           <p className="hero-subtitle">
//             Don't guess how you performed. Get real-time data on your confidence, 
//             speaking pace, and body language. Practice smarter, not harder.
//           </p>
          
//           <div className="hero-cta">
//             <button className="btn-primary btn-large" onClick={handleSubmit}>
//               Start Mock Interview
//             </button>
//             <button className="btn-secondary btn-large">
//               View Demo
//             </button>
//           </div>
          
//           <div className="stats-row">
//             <div className="stat">
//               <strong>10k+</strong> <span>Sessions</span>
//             </div>
//             <div className="divider"></div>
//             <div className="stat">
//               <strong>92%</strong> <span>Success Rate</span>
//             </div>
//           </div>
//         </div>
        
//         {/* CSS-only Visual Representation of the App */}
//         <div className="hero-visual">
//            <div className="app-mockup">
//              <div className="mockup-screen">
//                 <div className="cam-feed">
//                   <div className="cam-badge">🔴 Recording</div>
//                   <div className="face-frame"></div>
//                 </div>
//                 <div className="analysis-sidebar">
//                    <div className="score-card">Confidence: <span className="green">High</span></div>
//                    <div className="score-card">Pace: <span className="orange">Normal</span></div>
//                 </div>
//              </div>
//            </div>
//         </div>
//       </header>

//       {/* --- Features Grid --- */}
//       <section className="features-section">
//         <div className="section-header">
//           <h2>Everything you need to get hired</h2>
//           <p>We analyze the hidden signals that interviewers look for.</p>
//         </div>
        
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="icon-box blue">🗣️</div>
//             <h3>Speech Analysis</h3>
//             <p>Detects filler words ("um", "ah"), pace, and tone clarity instantly.</p>
//           </div>

//           <div className="feature-card">
//             <div className="icon-box purple">🧠</div>
//             <h3>Answer Quality</h3>
//             <p>AI compares your answers against top industry standards for relevance.</p>
//           </div>

//           <div className="feature-card">
//             <div className="icon-box green">📹</div>
//             <h3>Body Language</h3>
//             <p>Tracks eye contact and posture to ensure you look engaged.</p>
//           </div>
//         </div>
//       </section>

//       {/* --- Simple CTA Footer --- */}
//       <section className="bottom-cta">
//         <h2>Ready to land your dream job?</h2>
//         <button className="btn-primary">Get Started for Free</button>
//       </section>
      
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      if (token) {
        setIsAuthenticated(true);
      } else if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          if (userData?.token) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (e) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const handleSubmit = () => {
    // Check if user is authenticated
    if (isAuthenticated) {
      navigate('/interviews');
    } else {
      // Save the intended destination to redirect after login
      localStorage.setItem("redirectAfterLogin", "/interviews");
      navigate('/login');
    }
  }

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="home-container">
      
      {/* --- Hero Section --- */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge floating-badge">
            <span className="badge-icon">✨</span> 
            New: Emotion Analysis Added
            <span className="badge-pulse"></span>
          </div>
          <h1 className="hero-title">
            Ace Your Interview <br />
            With <span className="highlight">Smart</span> Feedback
          </h1>
          <p className="hero-subtitle">
            Don't guess how you performed. Get real-time data on your confidence, 
            speaking pace, and body language. Practice smarter, not harder.
          </p>
          
          <div className="hero-cta">
            <button className="btn-primary btn-large" onClick={handleSubmit}>
              <span className="btn-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start Mock Interview
              </span>
              <span className="btn-ripple"></span>
            </button>
            <button className="btn-secondary btn-large" onClick={scrollToFeatures}>
              <span className="btn-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Demo
              </span>
            </button>
          </div>
          
          <div className="stats-row">
            <div className="stat">
              <div className="stat-number" data-target="10000">0</div>
              <span>Sessions</span>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <div className="stat-number" data-target="92">0</div>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
        
        {/* CSS-only Visual Representation of the App */}
        <div className="hero-visual">
          <div className="app-mockup floating-mockup">
            <div className="mockup-screen">
              <div className="cam-feed">
                <div className="cam-badge">
                  <span className="recording-dot"></span>
                  Recording
                </div>
                <div className="face-frame">
                  <div className="face-scan"></div>
                </div>
              </div>
              <div className="analysis-sidebar">
                <div className="score-card confidence">
                  <span className="score-label">Confidence:</span>
                  <span className="score-value green">High</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="score-card pace">
                  <span className="score-label">Pace:</span>
                  <span className="score-value orange">Normal</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="score-card clarity">
                  <span className="score-label">Clarity:</span>
                  <span className="score-value blue">Excellent</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: '92%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mockup-glow"></div>
          </div>
        </div>
      </header>

      {/* --- Features Grid --- */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Everything you need to get hired</h2>
          <p>We analyze the hidden signals that interviewers look for.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box blue">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C7 1 3 5 3 10V17C3 18.66 4.34 20 6 20H9V12H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V12H15V20H18C19.66 20 21 18.66 21 17V10C21 5 17 1 12 1Z" fill="currentColor"/>
                <path d="M13 22H11V20H13V22Z" fill="currentColor"/>
              </svg>
            </div>
            <h3>Speech Analysis</h3>
            <p>Detects filler words ("um", "ah"), pace, and tone clarity instantly.</p>
            <div className="card-hover-effect"></div>
          </div>

          <div className="feature-card">
            <div className="icon-box purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Answer Quality</h3>
            <p>AI compares your answers against top industry standards for relevance.</p>
            <div className="card-hover-effect"></div>
          </div>

          <div className="feature-card">
            <div className="icon-box blue">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 9.5L18 12M18 12L15.5 14.5M18 12H14M12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V11L14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Body Language</h3>
            <p>Tracks eye contact and posture to ensure you look engaged.</p>
            <div className="card-hover-effect"></div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>SmartMock</span>
            </div>
            <p className="footer-description">
              Revolutionizing interview preparation with AI-powered feedback and real-time analytics.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/interviews">Interviews</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.2 2 2 4.2 2 7V17C2 19.8 4.2 22 7 22H17C19.8 22 22 19.8 22 17V7C22 4.2 19.8 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.1 3.9 21 4.5 20 4.7C19 3.7 17.7 3 16.3 3C13.4 3 11 5.4 11 8.3C11 8.7 11 9.1 11.1 9.5C7.5 9.3 4.3 7.2 2.2 4C1.8 4.7 1.5 5.5 1.5 6.3C1.5 8 2.4 9.5 3.7 10.5C2.9 10.5 2.1 10.3 1.4 9.9C1.4 9.9 1.4 10 1.4 10.1C1.4 12.7 3.3 14.9 5.8 15.4C5.4 15.5 5 15.5 4.6 15.5C4.3 15.5 4 15.5 3.7 15.4C4.3 17.6 6.4 19.2 8.8 19.3C6.9 20.8 4.5 21.6 2 21.6C1.6 21.6 1.3 21.6 1 21.5C3.4 23.1 6.3 24 9.3 24C16.3 24 20.2 18.2 20.2 13.2C20.2 13 20.2 12.8 20.1 12.6C21.1 11.9 22 10.9 22.7 9.8C21.8 10.2 20.8 10.5 19.8 10.6C20.9 10 21.7 9 22.1 7.8C21.1 8.4 20 8.8 18.8 9C19.9 8.3 20.7 7.2 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C12.2 2 10 4.2 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.5 14.2 6 14.6 5.6C15 5.2 15.5 5 16 5H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 SmartMock. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;