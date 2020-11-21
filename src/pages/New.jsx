import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNote } from '../actions';

import Editor from '../components/Editor';

export class New extends Component {
  handleSubmit = ({ content, title }) => {
    const { user } = this.props;
    const newNote = {
      userId: user._id,
      title,
      content,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    console.log(newNote);
    this.props.createNote(newNote);
    this.props.history.push('/');
  };
  render() {
    const { user } = this.props;
    return (
      <main>
        <section className='p-4'>
          <div className='container'>
            <h1>New Note for {user.name}</h1>
            <Editor onSubmit={this.handleSubmit} type='Create' />
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  createNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
