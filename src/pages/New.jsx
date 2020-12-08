import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createNoteReq } from '../actions';

import Main from '../components/Main';
import Editor from '../components/Editor';

export class New extends Component {
  handleSubmit = async ({ title, content }) => {
    this.props.createNoteReq({ title, content });
  };

  render() {
    const { user, redirect } = this.props;
    return !user || redirect ? (
      <Redirect to='/' />
    ) : (
      <Main>
        <section className='p-4'>
          <div className='container'>
            <h2 className='font-weight-bold'>
              New Note for <span className='text-primary'>{user.name}</span>
            </h2>
            <Editor onSubmit={this.handleSubmit} type='Create' />
          </div>
        </section>
      </Main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  redirect: state.redirect,
});

const mapDispatchToProps = {
  createNoteReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
