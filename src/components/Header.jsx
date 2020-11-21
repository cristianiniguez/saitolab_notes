import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { logOut } from '../actions';

const Header = (props) => {
  const handleLogOut = () => {
    props.logOut();
    return <Redirect to='/sign-in' />;
  };
  return (
    <header>
      <nav className='navbar navbar-expand navbar-dark bg-primary'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            SLNotes
          </Link>
          <ul className='navbar-nav ml-auto'>
            {Object.keys(props.user).length > 0 ? (
              <li className='nav-item'>
                <span className='nav-link' role='button' onClick={handleLogOut}>
                  Log Out
                </span>
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
