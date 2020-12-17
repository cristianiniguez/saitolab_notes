import {
  signUpRequest,
  signInRequest,
  readNotesRequest,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
} from '../api';
import * as TYPES from '../types';

// Async Action Creators

export const signUpReq = ({ name, email, password }) => async (dispatch) => {
  try {
    await signUpRequest({ name, email, password });
    dispatch(signInReq({ email, password }));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const signInReq = ({ email, password }) => async (dispatch) => {
  try {
    const { token, user } = await signInRequest({ email, password });
    localStorage.setItem('saitolab-notes-token', token);
    localStorage.setItem('saitolab-notes-user', JSON.stringify(user));
    dispatch({ type: TYPES.SIGN_IN, payload: user });
    dispatch(setAlert({ type: 'success', content: 'Sign In Successfull' }));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const readNotesReq = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await readNotesRequest();
    dispatch({ type: TYPES.READ_NOTES, payload: data });
  } catch (error) {
    dispatch(setError(error));
    localStorage.removeItem('saitolab-notes-token');
    localStorage.removeItem('saitolab-notes-user');
    dispatch(logOut());
  }
};

export const createNoteReq = ({ title, content }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { message } = await createNoteRequest({ note: { title, content } });
    dispatch({ type: TYPES.CREATE_NOTE });
    dispatch(setAlert({ type: 'success', content: message }));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const updateNoteReq = ({ noteId, note }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { message } = await updateNoteRequest({ noteId, note });
    dispatch({ type: TYPES.UPDATE_NOTE });
    dispatch(setAlert({ type: 'success', content: message }));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteNoteReq = ({ noteId }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { message } = await deleteNoteRequest({ noteId });
    dispatch({ type: TYPES.DELETE_NOTE });
    dispatch(setAlert({ type: 'success', content: message }));
  } catch (error) {
    dispatch(setError(error));
  }
};

// Auxiliar Action Creators

export const setAlert = (payload) => ({
  type: TYPES.SET_ALERT,
  payload,
});

export const removeAlert = () => ({
  type: TYPES.REMOVE_ALERT,
});

export const logOut = () => ({
  type: TYPES.LOG_OUT,
});

const setLoading = (payload) => ({
  type: TYPES.SET_LOADING,
  payload,
});

const setError = (error) => (dispatch) => {
  dispatch(setAlert({ type: 'danger', content: error.message ?? 'An error has ocurred' }));
};
