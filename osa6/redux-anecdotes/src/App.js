import React, { useEffect } from 'react';
import ConnectedAnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import ConnectedNotification from './components/Notification';
import ConnectedFilter from './components/Filter';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <ConnectedNotification/>
      <ConnectedFilter/>
      <AnecdoteList/>
      <ConnectedAnecdoteForm/>
    </div>
  );
};

export default App;
