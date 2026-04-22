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
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate(); 
  const handleSubmit = ()=>{
      
  }

  return (
    <div className="home-container">
      
      {/* --- Hero Section --- */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge">✨ New: Emotion Analysis Added</div>
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
              Start Mock Interview
            </button>
            <button className="btn-secondary btn-large">
              View Demo
            </button>
          </div>
          
          <div className="stats-row">
            <div className="stat">
              <strong>10k+</strong> <span>Sessions</span>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <strong>92%</strong> <span>Success Rate</span>
            </div>
          </div>
        </div>
        
        {/* CSS-only Visual Representation of the App */}
        <div className="hero-visual">
           <div className="app-mockup">
             <div className="mockup-screen">
                <div className="cam-feed">
                  <div className="cam-badge">🔴 Recording</div>
                  <div className="face-frame"></div>
                </div>
                <div className="analysis-sidebar">
                   <div className="score-card">Confidence: <span className="green">High</span></div>
                   <div className="score-card">Pace: <span className="orange">Normal</span></div>
                </div>
             </div>
           </div>
        </div>
      </header>

      {/* --- Features Grid --- */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to get hired</h2>
          <p>We analyze the hidden signals that interviewers look for.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box blue">🗣️</div>
            <h3>Speech Analysis</h3>
            <p>Detects filler words ("um", "ah"), pace, and tone clarity instantly.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box purple">🧠</div>
            <h3>Answer Quality</h3>
            <p>AI compares your answers against top industry standards for relevance.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box green">📹</div>
            <h3>Body Language</h3>
            <p>Tracks eye contact and posture to ensure you look engaged.</p>
          </div>
        </div>
      </section>

      {/* --- Simple CTA Footer --- */}
      <section className="bottom-cta">
        <h2>Ready to land your dream job?</h2>
        <button className="btn-primary">Get Started for Free</button>
      </section>
      
    </div>
  );
};

export default Home;