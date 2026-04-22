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
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../services/auth.service';

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
  const navigate = useNavigate();

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
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <Card className="card-container">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min. 6 characters)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Registering...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            {message && (
              <Alert variant={successful ? "success" : "danger"} className="mt-3">
                {message}
              </Alert>
            )}

            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;