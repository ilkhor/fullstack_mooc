import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByContent, sortByVotes, updateAnecdote as update } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { clearNotification, setNotification } from '../reducers/notificationReducer';
import { updateAnecdote } from '../services/anecdotes';

const AnecdoteList = () => {

  const anecdotes = useSelector(state => sortByVotes(filterByContent(state.anecdotes, state.filter)));
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    const voted = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch(update(voted));
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
