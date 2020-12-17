import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Main from '../components/Main';

class NotFound extends Component {
  render() {
    return (
      <Main>
        <section className='p-4 text-center'>
          <p className='h1 font-weight-bold' style={{ fontSize: '8em' }}>
            404
          </p>
          <h3 className='h2'>The page you're looking for doesn't exist</h3>
          <Link to='/' className='btn btn-primary m-4'>
            Go Home
          </Link>
        </section>
      </Main>
    );
  }
}

export default NotFound;
