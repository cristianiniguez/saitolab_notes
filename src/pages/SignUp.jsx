import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from '../components/Main';

import { signUpRequest } from '../api';
import { setAlert } from '../actions';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    const { name, email, password } = this.state;
    e.preventDefault();
    try {
      const data = await signUpRequest({ name, email, password });
      console.log(data);
      this.props.setAlert({ type: 'success', content: 'Sign up succesfull' });
      this.props.history.push('/sign-in');
    } catch (error) {
      this.props.setAlert({ type: 'danger', content: 'User with this email alredy exists' });
      this.setState({
        name: '',
        email: '',
        password: '',
      });
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
                  <h1>Sign Up</h1>
                </div>
                <div className='card-body'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        name='name'
                        placeholder='User Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
