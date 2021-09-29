import React from 'react';
import { combineReducers, createStore } from 'redux';
import reducer from '../reducers/anecdoteReducer';
import notificationReducer, { setNotification } from '../reducers/notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer
});

const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;
