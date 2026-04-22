import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      
      {/* --- Header Section --- */}
      <header className="about-header">
        <h1>Empowering Job Seekers with <span className="highlight"> Confidence</span></h1>
        <p className="subtitle">
          We believe everyone deserves the chance to showcase their best self 
          during an interview. SmartMock helps you bridge the gap between skill and presentation.
        </p>
      </header>

      {/* --- The Story / Mission --- */}
      <section className="story-section">
        <div className="story-content">
          <div className="text-block">
            <h2>Our Mission</h2>
            <p>
              Job interviews are stressful. Qualified candidates often miss out on opportunities 
              simply because they are nervous or don't know how they are perceived.
            </p>
            <p>
              <strong>SmartMock</strong> was built to solve this. By leveraging advanced computer vision 
              and natural language processing, we provide a safe, private space to practice 
              and improve before the real deal.
            </p>
          </div>
          <div className="story-stats">
            <div className="stat-card">
              <h3>80%</h3>
              <p>of candidates fail due to nervousness</p>
            </div>
            <div className="stat-card">
              <h3>3x</h3>
              <p>Improvement after 5 practice sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack (Great for Portfolio) --- */}
      <section className="tech-section">
        <h2>Built With Modern Tech</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <h4>React.js</h4>
            <p>Frontend UI</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🤖</span>
            <h4>Spring Boot</h4>
            <p>Backend</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🗣️</span>
            <h4>NLP</h4>
            <p>Speech to Text</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🍃</span>
            <h4>MongoDB</h4>
            <p>Data Persistence</p>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {/* Team Member 1 */}
          <div className="team-member">
            <img src="/assets/r.jpg" alt="Anjali" />
            <h3>Anjali Sahu</h3>
            <p>Backend Developer</p>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <img src="/assets/sneha.jpg" alt="Alfiya" />
            <h3>Alfiya Damor</h3>
            <p>Frontend Developer</p>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <img src="/assets/shubhanshri.jpg" alt="Khushboo" />
            <h3>Khushboo Padmakar</h3>
            <p>AI Developer</p>
          </div>

          {/* Team Member 4 */}
          <div className="team-member">
            <img src="/assets/shreshth.jpg" alt="Srashti" />
            <h3>Srashti Birla</h3>
            <p>Database</p>
          </div>
        </div>
      </section>

      {/* --- Contact / Footer --- */}
      <section className="contact-cta">
        <h2>Have questions or suggestions?</h2>
        <p>We'd love to hear from you.</p>
        <button className="btn-outline">Contact Support</button>
      </section>

    </div>
  );
};

export default About;
