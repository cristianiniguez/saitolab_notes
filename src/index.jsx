import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import App from './App';

import reducer from './reducers';

import 'bootswatch/dist/yeti/bootstrap.min.css';

const initialState = {
  user: JSON.parse(localStorage.getItem('saitolab-notes-user')),
  notes: [],
  alert: null,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
