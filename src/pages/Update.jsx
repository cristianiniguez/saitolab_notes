import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from '../components/Main';
import Editor from '../components/Editor';

import { updateNoteRequest } from '../api';
import { setAlert } from '../actions';

class Update extends Component {
  handleSubmit = async (newNote) => {
    const { id } = this.props.match.params;
    try {
      const { message } = await updateNoteRequest({ noteId: id, note: newNote });
      this.props.setAlert({ type: 'success', content: message });
      this.props.history.push('/');
    } catch (error) {
      this.props.setAlert({
        type: 'danger',
        content: 'There was an error while updating the note',
      });
    }
  };
  render() {
    const { user, notes } = this.props;
    const { id: noteId } = this.props.match.params;
    const findedNote = notes.find((note) => note.userId === user.id && note._id === noteId);
    return (
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
              <h2>It seems this note doesn't exist</h2>
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
});

const mapDispatchToProps = {
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
