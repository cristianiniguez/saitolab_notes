import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from '../components/Main';

import { signUpReq } from '../actions';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    if (password === password2) {
      this.props.signUpReq({ name, email, password });
    } else {
      alert('Passwords are not equal');
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
                      <input
                        className='form-control'
                        type='password'
                        name='password2'
                        placeholder='Rewrite your Password'
                        value={this.state.password2}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <button className='btn btn-primary btn-block' type='submit'>
                        Sign up
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
  signUpReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
