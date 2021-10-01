import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByContent, sortByVotes, voteAnecdote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {

  const anecdotes = useSelector(state => sortByVotes(filterByContent(state.anecdotes, state.filter)));
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted ${ anecdote.content }`, 5));
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
