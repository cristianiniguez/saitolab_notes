import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            SLNotes
          </Link>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/sign-in'>
                Sign in
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/sign-up'>
                Sign-up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
