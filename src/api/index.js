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

export const readNotesRequest = async ({ token }) => {
  const { data } = await axios.get(`${API_URL}/api/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
