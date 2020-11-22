import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signInRequest = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/api/auth/sign-in`, null, {
    auth: {
      username: email,
      password,
    },
  });
  return data;
};

export const signUpRequest = async ({ name, email, password }) => {
  const { data } = await axios.post(`${API_URL}/api/auth/sign-up`, {
    name,
    email,
    password,
  });
  return data;
};

export const readNotesRequest = async () => {
  const token = localStorage.getItem('saitolab-notes-token');
  const { data } = await axios.get(`${API_URL}/api/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createNoteRequest = async ({ note }) => {
  const token = localStorage.getItem('saitolab-notes-token');
  const { data } = await axios.post(`${API_URL}/api/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateNoteRequest = async ({ noteId, note }) => {
  const token = localStorage.getItem('saitolab-notes-token');
  const { data } = await axios.put(`${API_URL}/api/notes/${noteId}`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteNoteRequest = async ({ noteId }) => {
  const token = localStorage.getItem('saitolab-notes-token');
  const { data } = await axios.delete(`${API_URL}/api/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
