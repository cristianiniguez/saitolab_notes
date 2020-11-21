export const signIn = (payload) => ({
  type: 'SIGN_IN',
  payload,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const createNote = (payload) => ({
  type: 'CREATE_NOTE',
  payload,
});

export const updateNote = (payload) => ({
  type: 'UPDATE_NOTE',
  payload,
});
