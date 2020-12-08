import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from '../components/Main';
import Editor from '../components/Editor';

import { updateNoteReq } from '../actions';

class Update extends Component {
  handleSubmit = async ({ title, content }) => {
    const { id } = this.props.match.params;
    this.props.updateNoteReq({ noteId: id, note: { title, content } });
  };

  render() {
    const { user, notes, redirect } = this.props;
    const { id: noteId } = this.props.match.params;
    const findedNote = notes.find((note) => note.userId === user.id && note._id === noteId);
    return !user || redirect ? (
      <Redirect to='/' />
    ) : (
      <Main>
        <section className='p-4'>
          <div className='container'>
            {findedNote ? (
              <>
                <h1>Update Your Note</h1>
                <Editor
                  onSubmit={this.handleSubmit}
                  type='Update'
                  default={{ title: findedNote.title, content: findedNote.content }}
                />
              </>
            ) : (
              <div className='text-center p-4'>
                <h2>It seems this note doesn't exist</h2>
                <Link to='/' className='btn btn-danger m-2'>
                  Go Home
                </Link>
              </div>
            )}
          </div>
        </section>
      </Main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  notes: state.notes,
  redirect: state.redirect,
});

const mapDispatchToProps = {
  updateNoteReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
