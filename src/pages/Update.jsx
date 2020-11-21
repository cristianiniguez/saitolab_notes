import React, { Component } from 'react';
import { connect } from 'react-redux';

import Editor from '../components/Editor';

import { updateNote } from '../actions';

class Update extends Component {
  handleSubmit = ({ content, title }) => {
    const { id } = this.props.match.params;
    this.props.updateNote({ _id: id, content, title, updatedAt: new Date().toString() });
    this.props.history.push('/');
  };
  render() {
    const { user, notes } = this.props;
    const { id: noteId } = this.props.match.params;
    const findedNote = notes.find((note) => note.userId === user._id && note._id === noteId);
    return (
      <main>
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
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  notes: state.notes,
});

const mapDispatchToProps = {
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
