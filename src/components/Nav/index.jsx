import React from 'react';
import './Nav.scss';
import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h1>Turing Terminal</h1>
        <ul className="nav-options">
          <li class="nav-link">
            <Link to="/intro">Intro</Link>
          </li>
          <li class="nav-link">
            <Link to="/practice">Practice</Link>
          </li>
          <li class="nav-link">
            <Link to="/study">Study</Link>
          </li>
        </ul>
    </nav>
  );
}

export default Nav;
