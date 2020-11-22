import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import '../assets/pages/Home.css';
import { readNotesRequest } from '../api';
import { readNotes, logOut } from '../actions';
export class Home extends Component {
  fetchData = async () => {
    const token = localStorage.getItem('saitolab-notes-token');
    try {
      const { data } = await readNotesRequest({ token });
      this.props.readNotes(data);
    } catch (error) {
      this.props.logOut();
      localStorage.removeItem('saitolab-notes-token');
      localStorage.removeItem('saitolab-notes-user');
    }
  };
  componentDidMount = async () => {
    if (this.props.user) this.fetchData();
  };
  handleDelete = (e) => {
    console.log(e.target.dataset.id);
  };
  render() {
    const { user, notes } = this.props;
    const filteredNotes = notes.filter((note) => note.userId === user.id);
    return !user ? (
      <main>
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
      </main>
    ) : (
      <main>
        <section>
          <div className='container p-4'>
            <h1>Welcome {user.name}</h1>
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
                        <div className='card-header'>{note.title}</div>
                        <div className='card-body'>
                          <Markdown>{note.content}</Markdown>
                        </div>
                        <div className='card-footer'>
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
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  notes: state.notes,
});

const mapDispatchToProps = {
  readNotes,
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
