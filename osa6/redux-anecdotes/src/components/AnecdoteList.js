import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByVotes, voteAnecdote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { clearNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {

  const anecdotes = useSelector(state => sortByVotes(state.anecdotes));
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted ${ anecdote.content }`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {
        anecdotes.map(anecdote =>
          <Anecdote key={ anecdote.id } anecdote={ anecdote } vote={ vote }/>
        )
      }
    </div>
  );

};

export default AnecdoteList;
