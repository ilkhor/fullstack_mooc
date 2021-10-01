import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reducer from '../reducers/anecdoteReducer';
import notificationReducer from '../reducers/notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import filterReducer from '../reducers/filterReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
