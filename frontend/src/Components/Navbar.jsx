import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Navbar.css'

export default function Navbar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };
  
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) {
      onLogout();
    }
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // Use either prop or localStorage token
  const isLoggedIn = isAuthenticated || !!token;

  return (
    <nav className="navbar">
      <div className="logo">SmartMock<span className="dot"></span></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isLoggedIn ? (
          <>
            <Link to="/interviews">Interview</Link>
            <Link to="/profile">Profile</Link>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register"><button className="btn signup-btn">Sign Up</button></Link>
            <Link to="/login"><button className="btn login-btn">Login</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}