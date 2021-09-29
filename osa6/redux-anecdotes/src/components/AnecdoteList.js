import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByVotes, voteAnecdote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {

  const anecdotes = useSelector(state => sortByVotes(state));
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
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
