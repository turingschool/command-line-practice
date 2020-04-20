import React from 'react';
import './Nav.scss';

const Nav = () => {
  return (
    <nav>
      <h1>Turing Terminal</h1>
        <ul className="nav-options">
          <li>Intro</li>
          <li>Practice</li>
          <li>Study</li>
        </ul>
    </nav>
  );
}

export default Nav;
