import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../actions';

const Header = ({ user, logOut }) => {
  const handleLogOut = () => {
    logOut();
    localStorage.removeItem('saitolab-notes-token');
    localStorage.removeItem('saitolab-notes-user');
  };
  return (
    <header>
      <nav className='navbar navbar-expand navbar-dark bg-primary'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            SLNotes
          </Link>
          <ul className='navbar-nav ml-auto'>
            {user ? (
              <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={handleLogOut}>
                  Log Out
                </Link>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
