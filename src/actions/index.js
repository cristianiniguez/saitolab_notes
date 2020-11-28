import { signUpRequest, signInRequest, readNotesRequest } from '../api';

export const setAlert = (payload) => ({
  type: 'SET_ALERT',
  payload,
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});

export const removeAlert = () => ({
  type: 'REMOVE_ALERT',
});

export const signIn = (payload) => ({
  type: 'SIGN_IN',
  payload,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const readNotes = (payload) => ({
  type: 'READ_NOTES',
  payload,
});

export const createNote = (payload) => ({
  type: 'CREATE_NOTE',
  payload,
});

export const updateNote = (payload) => ({
  type: 'UPDATE_NOTE',
  payload,
});

export const setError = (error) => {
  return (dispatch) => {
    dispatch(setAlert({ type: 'danger', content: error.message ?? 'An error has ocurred' }));
  };
};

export const signUpReq = (payload) => {
  const { name, email, password } = payload;
  return (dispatch) => {
    signUpRequest({ name, email, password })
      .then(() => dispatch(signInReq({ email, password })))
      .catch((error) => dispatch(setError(error)));
  };
};

export const signInReq = (payload) => {
  const { email, password } = payload;
  return (dispatch) => {
    signInRequest({ email, password })
      .then(({ token, user }) => {
        localStorage.setItem('saitolab-notes-token', token);
        localStorage.setItem('saitolab-notes-user', JSON.stringify(user));
        dispatch(signIn(user));
      })
      .then(() => dispatch(setAlert({ type: 'success', content: 'Sign In Successfull' })))
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const readNotesReq = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    readNotesRequest()
      .then(({ data }) => dispatch(readNotes(data)))
      .catch((error) => {
        dispatch(setError(error));
        localStorage.removeItem('saitolab-notes-token');
        localStorage.removeItem('saitolab-notes-user');
        dispatch(logOut());
      });
  };
};
