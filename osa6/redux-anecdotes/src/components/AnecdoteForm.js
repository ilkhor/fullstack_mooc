import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {

  const add = async (e) => {
    e.preventDefault();
    props.addAnecdote(e.target.anecdoteTxt.value);
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

const mapDispatchToProps = (dispatch) => {
  return {
    addAnecdote: (txt) => {
      dispatch(addAnecdote(txt));
    }
  };
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
