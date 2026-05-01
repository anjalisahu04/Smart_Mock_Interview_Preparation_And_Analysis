// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// import AuthService from '../services/auth.service';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [successful, setSuccessful] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setMessage('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setMessage('Password must be at least 6 characters long');
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       await AuthService.register(
//         formData.name,
//         formData.email,
//         formData.password
//       );
//       setSuccessful(true);
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Registration failed');
//       setSuccessful(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-md-6 offset-md-3">
//       <Card className="card-container">
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign Up</h2>
          
//           <Form onSubmit={handleRegister}>
//             <Form.Group className="mb-3" controlId="name">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </Form.Group>

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
//                 placeholder="Password (min. 6 characters)"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="confirmPassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
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
//                   <span className="ms-2">Registering...</span>
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>

//             {message && (
//               <Alert variant={successful ? "success" : "danger"} className="mt-3">
//                 {message}
//               </Alert>
//             )}

//             <div className="text-center mt-3">
//               Already have an account? <Link to="/login">Login</Link>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Register;












// Register.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// import AuthService from '../services/auth.service';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [successful, setSuccessful] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setMessage('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setMessage('Password must be at least 6 characters long');
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       await AuthService.register(
//         formData.name,
//         formData.email,
//         formData.password
//       );
//       setSuccessful(true);
//       setMessage('Registration successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setMessage(error.message || 'Registration failed');
//       setSuccessful(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-md-6 offset-md-3">
//       <Card className="card-container">
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign Up</h2>
          
//           <Form onSubmit={handleRegister}>
//             <Form.Group className="mb-3" controlId="name">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </Form.Group>

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
//                 placeholder="Password (min. 6 characters)"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="confirmPassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
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
//                   <span className="ms-2">Registering...</span>
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>

//             {message && (
//               <Alert variant={successful ? "success" : "danger"} className="mt-3">
//                 {message}
//               </Alert>
//             )}

//             <div className="text-center mt-3">
//               Already have an account? <Link to="/login">Login</Link>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Register;



import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after mount
    const timer = setTimeout(() => {
      document.querySelector('.register-wrapper')?.classList.add('animate');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate password strength
    const calculateStrength = () => {
      let strength = 0;
      if (formData.password.length >= 6) strength++;
      if (formData.password.length >= 10) strength++;
      if (/[A-Z]/.test(formData.password)) strength++;
      if (/[0-9]/.test(formData.password)) strength++;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
      setPasswordStrength(strength);
    };
    calculateStrength();
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return false;
    }
    if (formData.name.length < 2) {
      setMessage('Name must be at least 2 characters long');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      // Shake animation on error
      const formCard = document.querySelector('.register-card');
      formCard?.classList.add('shake');
      setTimeout(() => {
        formCard?.classList.remove('shake');
      }, 500);
      return;
    }

    try {
      await AuthService.register(
        formData.name,
        formData.email,
        formData.password
      );
      setSuccessful(true);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.message || 'Registration failed');
      setSuccessful(false);
      // Shake animation on error
      const formCard = document.querySelector('.register-card');
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return '#ef4444';
    if (passwordStrength <= 3) return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="register-container">
      {/* Animated Background */}
      <div className="register-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Register Card */}
      <div className="register-wrapper">
        <div className="register-card">
          {/* Decorative Elements */}
          <div className="card-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dots"></div>
          </div>

          {/* Logo/Brand */}
          <div className="register-brand">
            <div className="brand-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Create Account</h2>
            <p>Join SmartMock and start your interview preparation journey</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="register-form">
            {/* Full Name Field */}
            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  required
                  className="form-input"
                />
                <label className="input-label">Full Name</label>
                <div className="input-border"></div>
              </div>
            </div>

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
                  <path d="M18 8H17V6C17 3.2 14.8 1 12 1C9.2 1 7 3.2 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{ 
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                    Password Strength: {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H17V6C17 3.2 14.8 1 12 1C9.2 1 7 3.2 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  required
                  className="form-input"
                />
                <label className="input-label">Confirm Password</label>
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>
                <div className="input-border"></div>
              </div>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword.length > 0 && (
              <div className="password-match">
                {formData.password === formData.confirmPassword ? (
                  <span className="match-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Passwords match
                  </span>
                ) : (
                  <span className="match-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                      <path d="M12 8V12M12 16H12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Passwords do not match
                  </span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              {loading ? (
                <div className="button-loader">
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span className="button-content">
                  Create Account
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
              <div className="button-glow"></div>
            </button>

            {/* Message Alert */}
            {message && (
              <div className={`message-alert ${successful ? 'success' : 'error'}`}>
                {successful ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {message}
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="login-prompt">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;