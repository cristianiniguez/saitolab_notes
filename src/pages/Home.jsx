import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faUserCheck,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import Markdown from 'markdown-to-jsx';
import moment from 'moment';

import Main from '../components/Main';
import Spinner from '../components/Spinner';

import '../assets/pages/Home.css';
import { readNotesReq, deleteNoteReq } from '../actions';

export class Home extends Component {
  componentDidMount = () => {
    const { user, notes } = this.props;
    if (user && !notes.length) this.props.readNotesReq();
  };

  componentDidUpdate = () => {
    const { deleted, loading } = this.props;
    if (deleted && !loading) this.props.readNotesReq();
  };

  handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?\nIt will be lost forever!')) {
      this.props.deleteNoteReq({ noteId: id });
    }
  };

  render() {
    const { loading, user, notes } = this.props;
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
                {loading ? (
                  <Spinner />
                ) : filteredNotes.length > 0 ? (
                  <>
                    <Link className='btn btn-success' to='/new'>
                      New Note <FontAwesomeIcon icon={faPlus} />
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
                          <div className='card-footer d-flex justify-content-between align-items-center'>
                            <div>
                              <p className='m-0 text-muted'>
                                {note.createdAt === note.updatedAt ? 'Created' : 'Updated'}{' '}
                                {moment(note.updatedAt).fromNow()}
                              </p>
                            </div>
                            <div>
                              <Link className='btn btn-warning mr-2' to={`/update/${note._id}`}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                              </Link>
                              <button
                                className='btn btn-danger'
                                onClick={() => this.handleDelete(note._id)}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className='py-4'>
                    You don't have notes yet. <Link to='/new'>Create one</Link>
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className='p-4 text-center'>
            <div className='container p-4'>
              <h1 className='font-weight-bold'>
                Welcome to <span className='text-primary'>SaitoLab Notes</span> 📝
              </h1>
              <h3 className='p-4'>
                Write notes using{' '}
                <span className='text-info'>
                  Markdown <FontAwesomeIcon icon={faMarkdown} />
                </span>{' '}
                easy
              </h3>
              <p>
                <Link className='btn btn-success m-2' to='/sign-in'>
                  Sign In <FontAwesomeIcon icon={faUserCheck} />
                </Link>
                <Link className='btn btn-primary m-2' to='/sign-up'>
                  Sign Up <FontAwesomeIcon icon={faUserPlus} />
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
  loading: state.loading,
  user: state.user,
  notes: state.notes,
  deleted: state.deleted,
});

const mapDispatchToProps = {
  readNotesReq,
  deleteNoteReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
