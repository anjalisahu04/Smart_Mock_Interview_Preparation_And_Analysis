// import axios from 'axios';
// import { toast } from 'react-toastify';

// const API_URL = 'http://localhost:8080/api/auth/';

// class AuthService {
//   async login(email, password) {
//     try {
//       const response = await axios.post(API_URL + 'login', {
//         email,
//         password
//       });
      
//       if (response.data.token) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//         toast.success('Login successful!');
//       }
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       throw error;
//     }
//   }

//   logout() {
//     localStorage.removeItem('user');
//     toast.info('Logged out successfully');
//   }

//   async register(name, email, password) {
//     try {
//       const response = await axios.post(API_URL + 'register', {
//         name,
//         email,
//         password
//       });
//       toast.success('Registration successful! Please login.');
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Registration failed';
//       toast.error(message);
//       throw error;
//     }
//   }

//   getCurrentUser() {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       return JSON.parse(userStr);
//     }
//     return null;
//   }

//   getToken() {
//     const user = this.getCurrentUser();
//     return user?.token;
//   }
// }

// export default new AuthService();


// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';

// class AuthService {
//   async login(email, password) {
//     try {
//       console.log('Attempting login for:', email);
      
//       // Create a new axios instance with specific config
//       const instance = axios.create({
//         baseURL: API_URL,
//         timeout: 10000,
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         // withCredentials: true // Important for CORS with credentials
//       });

//       // Log the request details
//       console.log('Sending request to:', API_URL + 'login');
//       console.log('Request payload:', { email, password: '***' });

//       const response = await instance.post('login', {
//         email: email.trim().toLowerCase(),
//         password: password
//       });
      
//       console.log('Login response:', response.data);
//       console.log('Response headers:', response.headers);
      
//       if (response.data.token) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Full error object:', error);
      
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
        
//         const message = error.response.data?.message || 
//                        `Server error: ${error.response.status}`;
//         throw new Error(message);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         throw new Error('No response from server. Please check if backend is running.');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error('Request setup error:', error.message);
//         throw new Error('Error setting up request: ' + error.message);
//       }
//     }
//   }

//   async register(name, email, password) {
//     try {
//       console.log('Attempting registration for:', email);
      
//       const response = await axios.post(API_URL + 'register', {
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         password: password
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         withCredentials: true
//       });
      
//       console.log('Registration response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Registration error details:', error.response?.data || error.message);
//       const message = error.response?.data?.message || 'Registration failed';
//       throw new Error(message);
//     }
//   }

//   logout() {
//     localStorage.removeItem('user');
//   }

//   getCurrentUser() {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   }

//   getToken() {
//     const user = this.getCurrentUser();
//     return user?.token;
//   }
// }

// export default new AuthService();









// services/auth.service.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const getStoredAuthData = () => {
  const userStr = localStorage.getItem('user');
  const legacyToken = localStorage.getItem('token');

  if (!userStr) {
    return legacyToken ? { token: legacyToken } : null;
  }

  try {
    const userData = JSON.parse(userStr);
    if (userData?.token) {
      return userData;
    }

    if (legacyToken) {
      return { ...userData, token: legacyToken };
    }
  } catch (e) {
    console.error('Error parsing stored user:', e);
  }

  return legacyToken ? { token: legacyToken } : null;
};

class AuthService {
  async login(email, password) {
    try {
      console.log('Attempting login for:', email);
      
      const response = await axios.post(API_URL + 'login', {
        email: email.trim().toLowerCase(),
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        // Store in consistent format
        const userData = {
          token: response.data.token,
          user: response.data.user || {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email
          }
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.token);
        return userData;
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server. Please check if backend is running.');
      } else {
        throw new Error('Error setting up request: ' + error.message);
      }
    }
  }

  async register(name, email, password) {
    try {
      console.log('Attempting registration for:', email);
      
      const response = await axios.post(API_URL + 'register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getCurrentUser() {
    const userData = getStoredAuthData();
    return userData?.user || null;
  }

  getToken() {
    return getStoredAuthData()?.token || null;
  }
}

export default new AuthService();
