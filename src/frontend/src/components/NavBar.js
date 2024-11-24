import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Path to the new CSS file for styling

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear user data on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        Cred Chain
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/holders">Holders</Link>
        </li>
        <li>
          <Link to="/verify">Checkers</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
