import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../components/Main';

import '../assets/pages/Home.css';
import { readNotesRequest, deleteNoteRequest } from '../api';
import { setAlert, readNotes, logOut } from '../actions';
export class Home extends Component {
  fetchData = async () => {
    try {
      const { data } = await readNotesRequest();
      this.props.readNotes(data);
    } catch (error) {
      console.log(error);
      this.props.logOut();
      localStorage.removeItem('saitolab-notes-token');
      localStorage.removeItem('saitolab-notes-user');
      this.props.setAlert({ type: 'danger', content: 'There was an error while getting notes' });
    }
  };
  componentDidMount = async () => {
    if (this.props.user) this.fetchData();
  };
  handleDelete = async (e) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this note?\nIt will be lost forever!',
    );
    if (confirmation) {
      const id = e.target.dataset.id;
      try {
        const { message } = await deleteNoteRequest({ noteId: id });
        this.props.setAlert({ type: 'success', content: message });
        await this.fetchData();
      } catch (error) {
        this.props.setAlert({
          type: 'danger',
          content: 'There was an error while deleting the note',
        });
      }
    }
  };
  render() {
    const { user, notes } = this.props;
    const filteredNotes = notes.filter((note) => note.userId === user.id);
    return (
      <Main>
        {user ? (
          <section>
            <div className='container p-4'>
              <h2 className='font-weight-bold'>
                Welcome <span className='text-primary'>{user.name}</span>
              </h2>
              <div>
                {filteredNotes.length > 0 ? (
                  <>
                    <Link className='btn btn-success' to='/new'>
                      New Note
                    </Link>
                    <hr />
                    <div className='notes-container my-4'>
                      {filteredNotes.map((note) => (
                        <div key={note._id} className='card'>
                          <div className='card-header text-center'>
                            <strong>{note.title}</strong>
                          </div>
                          <div className='card-body'>
                            <Markdown>{note.content}</Markdown>
                          </div>
                          <div className='card-footer text-right'>
                            <p>{note.createdAt}</p>
                            <div>
                              <Link className='btn btn-warning mr-2' to={`/update/${note._id}`}>
                                Update
                              </Link>
                              <button
                                className='btn btn-danger'
                                data-id={note._id}
                                onClick={this.handleDelete}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <h2>You don't have notes yet. Create one</h2>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className='p-4 text-center'>
            <div className='container'>
              <h1>Welcome to SaitoLab Notes</h1>
              <p>
                Write notes using <span className='text-info'>Markdown</span> easy
              </p>
              <p>
                <Link className='btn btn-success m-2' to='/sign-in'>
                  Sign In
                </Link>
                <Link className='btn btn-primary m-2' to='/sign-up'>
                  Sign Up
                </Link>
              </p>
            </div>
          </section>
        )}
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
  readNotes,
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
