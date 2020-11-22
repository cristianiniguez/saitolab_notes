export const setAlert = (payload) => ({
  type: 'SET_ALERT',
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
