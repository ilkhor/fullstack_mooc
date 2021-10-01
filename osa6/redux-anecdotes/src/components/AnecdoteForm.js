import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { createAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {

  const dispatch = useDispatch();
  const add = async (e) => {
    e.preventDefault();
    console.log(e.target.anecdoteTxt.value);
    const anecdote = await createAnecdote(e.target.anecdoteTxt.value);
    dispatch(addAnecdote(anecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ add }>
        <div><input name="anecdoteTxt"/></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
