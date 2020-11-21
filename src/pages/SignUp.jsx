import React, { Component } from 'react';

export class SignUp extends Component {
  state = {
    username: '',
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
    console.log('Sign up succesfull');
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
                  <h1>Sign Up</h1>
                </div>
                <div className='card-body'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        name='username'
                        placeholder='User Name'
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

export default SignUp;
