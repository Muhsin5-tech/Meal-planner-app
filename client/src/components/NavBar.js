import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/meals" className="navbar-link">Meals</Link>
        </li>
        <li className="navbar-item">
          <Link to="/dayplans" className="navbar-link">Day Plans</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
