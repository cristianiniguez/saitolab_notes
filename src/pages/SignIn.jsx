import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../actions';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn({ email: this.state.email, username: 'saito' });
    this.props.history.push('/');
  };
  render() {
    return (
      <main>
        <section>
          <div className='container p-4'>
            <div className='row'>
              <div className='col-md-4 offset-md-4 p-0 card'>
                <div className='card-header'>
                  <h1>Sign In</h1>
                </div>
                <div className='card-body'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='email'
                        name='email'
                        placeholder='Email'
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <button className='btn btn-primary btn-block' type='submit'>
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapDispatchToPros = {
  signIn,
};

export default connect(null, mapDispatchToPros)(SignIn);
