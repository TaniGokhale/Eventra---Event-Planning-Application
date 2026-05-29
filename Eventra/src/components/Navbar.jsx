import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">EVENTRA</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Services</li>
        <li>Events</li>
        <li>Vendors</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;