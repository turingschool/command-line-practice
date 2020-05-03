import React from 'react';
import './Nav.scss';
import {NavLink} from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h1>
        <NavLink to="/">Turing Terminal</NavLink>
      </h1>
        <ul className="nav-options">
          <li className="nav-link">
            <NavLink to="/intro" activeClassName="current-link">Learn</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/playground" activeClassName="current-link">Playground</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/challenges" activeClassName="current-link">Challenges</NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default Nav;
