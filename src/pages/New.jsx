import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createNoteRequest } from '../api';
import { setAlert } from '../actions';

import Main from '../components/Main';
import Editor from '../components/Editor';

export class New extends Component {
  handleSubmit = async ({ title, content }) => {
    try {
      const { message } = await createNoteRequest({ note: { title, content } });
      this.props.setAlert({ type: 'success', content: message });
      this.props.history.push('/');
    } catch (error) {
      this.props.setAlert({
        type: 'danger',
        content: 'There was an error while creating the note',
      });
    }
  };
  render() {
    const { user } = this.props;
    return !user ? (
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
});

const mapDispatchToProps = {
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
