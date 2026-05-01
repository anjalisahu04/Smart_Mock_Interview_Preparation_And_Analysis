import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ stat1: 0, stat2: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      });
    });
    
    const statsSection = document.querySelector('.story-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const animateNumbers = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const target1 = 80;
    const target2 = 3;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        stat1: Math.floor(target1 * progress),
        stat2: (target2 * progress).toFixed(1)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters({ stat1: target1, stat2: target2 });
      }
    }, stepTime);
  };
  
  const handleContactClick = () => {
    window.location.href = "mailto:support@smartmock.com";
  };

  return (
    <div className="about-container">
      
      {/* --- Hero Section --- */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <span className="badge-icon">🎯</span>
            <span>About SmartMock</span>
          </div>
          <h1 className="hero-title">
            Empowering Job Seekers with{' '}
            <span className="gradient-text">Confidence</span>
          </h1>
          <div className="hero-line"></div>
          <p className="hero-subtitle">
            We believe everyone deserves the chance to showcase their best self 
            during an interview. SmartMock helps you bridge the gap between skill and presentation.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleContactClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Get in Touch
            </button>
            <button className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* --- Mission Section --- */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              <div className="placeholder-image">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="mission-content">
            <div className="section-badge">Our Mission</div>
            <h2>Why We Built <span className="gradient-text">SmartMock</span></h2>
            <p>
              Job interviews are stressful. Qualified candidates often miss out on opportunities 
              simply because they are nervous or don't know how they are perceived.
            </p>
            <p className="mission-highlight">
              <strong>SmartMock</strong> was built to solve this. By leveraging advanced computer vision 
              and natural language processing, we provide a safe, private space to practice 
              and improve before the real deal.
            </p>
            <div className="mission-stats">
              <div className="stat-item">
                <div className="stat-number">{counters.stat1}%</div>
                <div className="stat-label">of candidates fail due to nervousness</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">{counters.stat2}x</div>
                <div className="stat-label">Improvement after 5 practice sessions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack Section --- */}
      <section className="tech-section">
        <div className="section-header">
          <div className="section-badge">Technology Stack</div>
          <h2>Built With <span className="gradient-text">Modern Tech</span></h2>
          <p>Cutting-edge technologies powering your interview preparation</p>
        </div>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon-wrapper">
              <span className="tech-icon">⚛️</span>
            </div>
            <h4>React.js</h4>
            <p>Frontend UI</p>
            <div className="tech-hover-effect"></div>
          </div>
          <div className="tech-card">
            <div className="tech-icon-wrapper">
              <span className="tech-icon">🤖</span>
            </div>
            <h4>Spring Boot</h4>
            <p>Backend</p>
            <div className="tech-hover-effect"></div>
          </div>
          <div className="tech-card">
            <div className="tech-icon-wrapper">
              <span className="tech-icon">🗣️</span>
            </div>
            <h4>NLP</h4>
            <p>Speech to Text</p>
            <div className="tech-hover-effect"></div>
          </div>
          <div className="tech-card">
            <div className="tech-icon-wrapper">
              <span className="tech-icon">🍃</span>
            </div>
            <h4>MongoDB</h4>
            <p>Data Persistence</p>
            <div className="tech-hover-effect"></div>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="team-section">
        <div className="section-header">
          <div className="section-badge">Meet Our Team</div>
          <h2>The Minds Behind <span className="gradient-text">SmartMock</span></h2>
          <p>Passionate developers and innovators working to transform interview preparation</p>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-image">
              <img src="/assets/r.jpg" alt="Anjali" />
              <div className="team-overlay">
                <div className="social-links">
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 3C22.1 3.9 21 4.5 20 4.7C19 3.7 17.7 3 16.3 3C13.4 3 11 5.4 11 8.3C11 8.7 11 9.1 11.1 9.5C7.5 9.3 4.3 7.2 2.2 4C1.8 4.7 1.5 5.5 1.5 6.3C1.5 8 2.4 9.5 3.7 10.5C2.9 10.5 2.1 10.3 1.4 9.9C1.4 9.9 1.4 10 1.4 10.1C1.4 12.7 3.3 14.9 5.8 15.4C5.4 15.5 5 15.5 4.6 15.5C4.3 15.5 4 15.5 3.7 15.4C4.3 17.6 6.4 19.2 8.8 19.3C6.9 20.8 4.5 21.6 2 21.6C1.6 21.6 1.3 21.6 1 21.5C3.4 23.1 6.3 24 9.3 24C16.3 24 20.2 18.2 20.2 13.2C20.2 13 20.2 12.8 20.1 12.6C21.1 11.9 22 10.9 22.7 9.8C21.8 10.2 20.8 10.5 19.8 10.6C20.9 10 21.7 9 22.1 7.8C21.1 8.4 20 8.8 18.8 9C19.9 8.3 20.7 7.2 21 6" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C12.2 2 10 4.2 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.5 14.2 6 14.6 5.6C15 5.2 15.5 5 16 5H18V2Z" stroke="white" strokeWidth="2"/></svg></a>
                </div>
              </div>
            </div>
            <div className="team-info">
              <h3>Anjali Sahu</h3>
              <p className="team-role">Backend Developer</p>
              <div className="team-underline"></div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image">
              <img src="/assets/sneha.jpg" alt="Alfiya" />
              <div className="team-overlay">
                <div className="social-links">
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 3C22.1 3.9 21 4.5 20 4.7C19 3.7 17.7 3 16.3 3C13.4 3 11 5.4 11 8.3C11 8.7 11 9.1 11.1 9.5C7.5 9.3 4.3 7.2 2.2 4C1.8 4.7 1.5 5.5 1.5 6.3C1.5 8 2.4 9.5 3.7 10.5C2.9 10.5 2.1 10.3 1.4 9.9C1.4 9.9 1.4 10 1.4 10.1C1.4 12.7 3.3 14.9 5.8 15.4C5.4 15.5 5 15.5 4.6 15.5C4.3 15.5 4 15.5 3.7 15.4C4.3 17.6 6.4 19.2 8.8 19.3C6.9 20.8 4.5 21.6 2 21.6C1.6 21.6 1.3 21.6 1 21.5C3.4 23.1 6.3 24 9.3 24C16.3 24 20.2 18.2 20.2 13.2C20.2 13 20.2 12.8 20.1 12.6C21.1 11.9 22 10.9 22.7 9.8C21.8 10.2 20.8 10.5 19.8 10.6C20.9 10 21.7 9 22.1 7.8C21.1 8.4 20 8.8 18.8 9C19.9 8.3 20.7 7.2 21 6" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C12.2 2 10 4.2 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.5 14.2 6 14.6 5.6C15 5.2 15.5 5 16 5H18V2Z" stroke="white" strokeWidth="2"/></svg></a>
                </div>
              </div>
            </div>
            <div className="team-info">
              <h3>Alfiya Damor</h3>
              <p className="team-role">Frontend Developer</p>
              <div className="team-underline"></div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image">
              <img src="/assets/shubhanshri.jpg" alt="Khushboo" />
              <div className="team-overlay">
                <div className="social-links">
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 3C22.1 3.9 21 4.5 20 4.7C19 3.7 17.7 3 16.3 3C13.4 3 11 5.4 11 8.3C11 8.7 11 9.1 11.1 9.5C7.5 9.3 4.3 7.2 2.2 4C1.8 4.7 1.5 5.5 1.5 6.3C1.5 8 2.4 9.5 3.7 10.5C2.9 10.5 2.1 10.3 1.4 9.9C1.4 9.9 1.4 10 1.4 10.1C1.4 12.7 3.3 14.9 5.8 15.4C5.4 15.5 5 15.5 4.6 15.5C4.3 15.5 4 15.5 3.7 15.4C4.3 17.6 6.4 19.2 8.8 19.3C6.9 20.8 4.5 21.6 2 21.6C1.6 21.6 1.3 21.6 1 21.5C3.4 23.1 6.3 24 9.3 24C16.3 24 20.2 18.2 20.2 13.2C20.2 13 20.2 12.8 20.1 12.6C21.1 11.9 22 10.9 22.7 9.8C21.8 10.2 20.8 10.5 19.8 10.6C20.9 10 21.7 9 22.1 7.8C21.1 8.4 20 8.8 18.8 9C19.9 8.3 20.7 7.2 21 6" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C12.2 2 10 4.2 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.5 14.2 6 14.6 5.6C15 5.2 15.5 5 16 5H18V2Z" stroke="white" strokeWidth="2"/></svg></a>
                </div>
              </div>
            </div>
            <div className="team-info">
              <h3>Khushboo Padmakar</h3>
              <p className="team-role">AI Developer</p>
              <div className="team-underline"></div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image">
              <img src="/assets/shreshth.jpg" alt="Srashti" />
              <div className="team-overlay">
                <div className="social-links">
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 3C22.1 3.9 21 4.5 20 4.7C19 3.7 17.7 3 16.3 3C13.4 3 11 5.4 11 8.3C11 8.7 11 9.1 11.1 9.5C7.5 9.3 4.3 7.2 2.2 4C1.8 4.7 1.5 5.5 1.5 6.3C1.5 8 2.4 9.5 3.7 10.5C2.9 10.5 2.1 10.3 1.4 9.9C1.4 9.9 1.4 10 1.4 10.1C1.4 12.7 3.3 14.9 5.8 15.4C5.4 15.5 5 15.5 4.6 15.5C4.3 15.5 4 15.5 3.7 15.4C4.3 17.6 6.4 19.2 8.8 19.3C6.9 20.8 4.5 21.6 2 21.6C1.6 21.6 1.3 21.6 1 21.5C3.4 23.1 6.3 24 9.3 24C16.3 24 20.2 18.2 20.2 13.2C20.2 13 20.2 12.8 20.1 12.6C21.1 11.9 22 10.9 22.7 9.8C21.8 10.2 20.8 10.5 19.8 10.6C20.9 10 21.7 9 22.1 7.8C21.1 8.4 20 8.8 18.8 9C19.9 8.3 20.7 7.2 21 6" stroke="white" strokeWidth="2"/></svg></a>
                  <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C12.2 2 10 4.2 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.5 14.2 6 14.6 5.6C15 5.2 15.5 5 16 5H18V2Z" stroke="white" strokeWidth="2"/></svg></a>
                </div>
              </div>
            </div>
            <div className="team-info">
              <h3>Srashti Birla</h3>
              <p className="team-role">Database</p>
              <div className="team-underline"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact CTA --- */}
      <section className="contact-cta">
        <div className="cta-content">
          <div className="cta-badge">Get in Touch</div>
          <h2>Have questions or <span className="gradient-text">suggestions?</span></h2>
          <p>We'd love to hear from you. Our team is ready to help you succeed.</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={handleContactClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Contact Support
            </button>
            <button className="btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Schedule Demo
            </button>
          </div>
        </div>
        <div className="cta-glow"></div>
      </section>

    </div>
  );
};

export default About;