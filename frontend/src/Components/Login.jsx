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
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../services/auth.service';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      onLogin(response);
      navigate('/');
    } catch (error) {
      setMessage(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <Card className="card-container">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          
          <Form onSubmit={handleLogin}>
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
                placeholder="Password"
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
                  <span className="ms-2">Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>

            {message && (
              <Alert variant="danger" className="mt-3">
                {message}
              </Alert>
            )}

            <div className="text-center mt-3">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;