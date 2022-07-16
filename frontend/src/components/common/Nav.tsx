import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/logo.png';

function Nav() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} height="30" loading="lazy" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapsable"
          aria-controls="navbarCollapsable"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapsable">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname.includes('/transaction') ? 'active' : ''}`}
                to="/transaction"
              >
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.includes('/user') ? 'active' : ''}`} to="/user">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
