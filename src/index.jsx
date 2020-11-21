import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import App from './App';

import reducer from './reducers';

import 'bootswatch/dist/yeti/bootstrap.min.css';

const initialState = {
  user: {},
  notes: [
    {
      _id: 'N1',
      userId: 'U1',
      title: 'test note 1',
      content: 'test content 1',
      createdAt: '2020-11-21T15:20:26.038Z',
      updatedAt: '2020-11-21T15:20:26.038Z',
    },
    {
      _id: 'N2',
      userId: 'U1',
      title: 'test note 2',
      content: 'test content 2',
      createdAt: '2020-11-21T15:20:26.038Z',
      updatedAt: '2020-11-21T15:20:26.038Z',
    },
    {
      _id: 'N3',
      userId: 'U2',
      title: 'test note 3',
      content: 'test content 3',
      createdAt: '2020-11-21T15:20:26.038Z',
      updatedAt: '2020-11-21T15:20:26.038Z',
    },
  ],
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
