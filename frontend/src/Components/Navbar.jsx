// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import './Navbar.css'

// export default function Navbar({ isAuthenticated, user, onLogout }) {
//   const navigate = useNavigate();
//   const getStoredToken = () => {
//     const directToken = localStorage.getItem("token");
//     if (directToken) {
//       return directToken;
//     }

//     const userStr = localStorage.getItem("user");
//     if (!userStr) {
//       return null;
//     }

//     try {
//       const userData = JSON.parse(userStr);
//       return userData?.token || null;
//     } catch (e) {
//       return null;
//     }
//   };

//   const [token, setToken] = useState(getStoredToken());

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const newToken = getStoredToken();
//       setToken(newToken);
//     };
  
//     window.addEventListener("storage", handleStorageChange);
//     handleStorageChange();
  
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     if (onLogout) {
//       onLogout();
//     }
//     window.dispatchEvent(new Event("storage"));
//     navigate("/");
//   };

//   // Use either prop or localStorage token
//   const isLoggedIn = isAuthenticated || !!token;

//   return (
//     <nav className="navbar">
//       <div className="logo">SmartMock<span className="dot"></span></div>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         {isLoggedIn ? (
//           <>
//             <Link to="/interviews">Interview</Link>
//             <Link to="/profile">Profile</Link>
//             <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/register"><button className="btn signup-btn">Sign Up</button></Link>
//             <Link to="/login"><button className="btn login-btn">Login</button></Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Navbar.css'

export default function Navbar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getStoredToken = () => {
    const directToken = localStorage.getItem("token");
    if (directToken) {
      return directToken;
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return null;
    }

    try {
      const userData = JSON.parse(userStr);
      return userData?.token || null;
    } catch (e) {
      return null;
    }
  };

  const [token, setToken] = useState(getStoredToken());

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = getStoredToken();
      setToken(newToken);
    };
  
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
  
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("scroll", handleScroll);
    handleStorageChange();
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) {
      onLogout();
    }
    window.dispatchEvent(new Event("storage"));
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Use either prop or localStorage token
  const isLoggedIn = isAuthenticated || !!token;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo - Top Left Corner */}
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">SmartMock</span>
            <span className="logo-dot"></span>
          </Link>

          {/* Navigation Links - Top Right Corner */}
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="nav-link-text">Home</span>
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="nav-link-text">About</span>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/interviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-link-text">Interview</span>
                </Link>
                <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-link-text">Profile</span>
                </Link>
                <button className="btn logout-btn" onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn signup-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Sign Up
                  </button>
                </Link>
                <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn login-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}
    </>
  );
}