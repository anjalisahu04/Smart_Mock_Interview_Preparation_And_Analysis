// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// import AuthService from '../services/auth.service';

// const Login = ({ setCurrentUser }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       const response = await AuthService.login(formData.email, formData.password);
//       setCurrentUser(response);
//       navigate('/profile');
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-md-6 offset-md-3">
//       <Card className="card-container">
//         <Card.Body>
//           <h2 className="text-center mb-4">Login</h2>
          
//           <Form onSubmit={handleLogin}>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//               />
//             </Form.Group>

//             <Button 
//               variant="primary" 
//               type="submit" 
//               className="w-100"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />
//                   <span className="ms-2">Logging in...</span>
//                 </>
//               ) : (
//                 'Login'
//               )}
//             </Button>

//             {message && (
//               <Alert variant="danger" className="mt-3">
//                 {message}
//               </Alert>
//             )}

//             <div className="text-center mt-3">
//               Don't have an account? <Link to="/register">Sign up</Link>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Login;



// Login.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// import AuthService from '../services/auth.service';

// const Login = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       const response = await AuthService.login(formData.email, formData.password);
//       onLogin(response);
//       navigate('/');
//     } catch (error) {
//       setMessage(error.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-md-6 offset-md-3">
//       <Card className="card-container">
//         <Card.Body>
//           <h2 className="text-center mb-4">Login</h2>
          
//           <Form onSubmit={handleLogin}>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//               />
//             </Form.Group>

//             <Button 
//               variant="primary" 
//               type="submit" 
//               className="w-100"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />
//                   <span className="ms-2">Logging in...</span>
//                 </>
//               ) : (
//                 'Login'
//               )}
//             </Button>

//             {message && (
//               <Alert variant="danger" className="mt-3">
//                 {message}
//               </Alert>
//             )}

//             <div className="text-center mt-3">
//               Don't have an account? <Link to="/register">Sign up</Link>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after mount
    const timer = setTimeout(() => {
      document.querySelector('.login-wrapper')?.classList.add('animate');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await AuthService.login(formData.email, formData.password);
      
      // Check for redirect after login
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin");
        onLogin(response);
        navigate(redirectAfterLogin);
      } else {
        onLogin(response);
        navigate('/');
      }
    } catch (error) {
      setMessage(error.message || 'Login failed');
      // Shake animation on error
      const formCard = document.querySelector('.login-card');
      formCard?.classList.add('shake');
      setTimeout(() => {
        formCard?.classList.remove('shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Login Card */}
      <div className="login-wrapper">
        <div className="login-card">
          {/* Decorative Elements */}
          <div className="card-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dots"></div>
          </div>

          {/* Logo/Brand */}
          <div className="login-brand">
            <div className="brand-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to continue your interview preparation</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            {/* Email Field */}
            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  required
                  className="form-input"
                />
                <label className="input-label">Email Address</label>
                <div className="input-border"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H17V6C17 3.2 14.8 1 12 1C9.2 1 7 3.2 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  required
                  className="form-input"
                />
                <label className="input-label">Password</label>
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <div className="input-border"></div>
              </div>
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <div className="button-loader">
                  <div className="spinner"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                <span className="button-content">
                  Sign In
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
              <div className="button-glow"></div>
            </button>

            {/* Error Message */}
            {message && (
              <div className="error-message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {message}
              </div>
            )}
          </form>

          {/* Sign Up Link */}
          <div className="signup-prompt">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;