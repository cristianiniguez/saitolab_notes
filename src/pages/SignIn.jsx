import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Main from '../components/Main';

import { signIn, setAlert } from '../actions';
import { signInRequest } from '../api';

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
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await signInRequest({
        email: this.state.email,
        password: this.state.password,
      });
      localStorage.setItem('saitolab-notes-token', token);
      localStorage.setItem('saitolab-notes-user', JSON.stringify(user));
      this.props.signIn(user);
      this.props.setAlert({ type: 'success', content: 'Sign In Successfull' });
      this.props.history.push('/');
    } catch (error) {
      alert('User Unauthorized');
      this.setState({ email: '', password: '' });
    }
  };
  render() {
    return this.props.user ? (
      <Redirect to='/' />
    ) : (
      <Main>
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
                        value={this.state.email}
                        onChange={this.handleChange}
                        autoFocus
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
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
      </Main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToPros = {
  setAlert,
  signIn,
};

export default connect(mapStateToProps, mapDispatchToPros)(SignIn);
