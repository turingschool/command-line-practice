import React from 'react';
import './Nav.scss';
import {NavLink} from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h1>Turing Terminal</h1>
        <ul className="nav-options">
          <li class="nav-link">
            <NavLink to="/intro" activeClassName="current-link">Intro</NavLink>
          </li>
          <li class="nav-link">
            <NavLink to="/practice" activeClassName="current-link">Practice</NavLink>
          </li>
          <li class="nav-link">
            <NavLink to="/study" activeClassName="current-link">Study</NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default Nav;
