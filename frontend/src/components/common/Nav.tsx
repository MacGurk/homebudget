import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logo} height="30" loading="lazy" alt="Logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item nav-link active">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-item nav-link">
            <Link to="/transaction">Transactions</Link>
          </li>
          <li className="nav-item nav-link">
            <Link to="/user">Users</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
