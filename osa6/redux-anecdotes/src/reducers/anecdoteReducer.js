import { createAnecdote, fetchAnecdotes, updateAnecdote } from '../services/anecdotes';

const initialState = [];

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'UPDATE':
      return state.map(a => a.id === action.data.id ? action.data : a);
      break;
    case 'ADD':
      return [...state, action.data];
      break;
    case 'INIT':
      return action.data;
    default:
      return state;
  }

  return state;
};

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await fetchAnecdotes();
  console.log(anecdotes);
  dispatch({
    type: 'INIT',
    data: anecdotes
  });
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const voted = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
  dispatch({
    type: 'UPDATE',
    data: voted
  });
};

export const addAnecdote = (text) => async (dispatch) => {
  const anecdote = await createAnecdote(text);
  dispatch({
    type: 'ADD',
    data: anecdote
  });
};

export const filterByContent = (state, filter) => {
  if (filter === undefined || filter === null || filter.length === 0) return state;
  return state.filter(a => a.content.includes(filter));
};

export const sortByVotes = (state) => {
  const sorted = [...state];
  return sorted.sort((a, b) => {
    if (a.votes > b.votes) return -1;
    else if (a.votes < b.votes) return 1;
    return 0;
  });
};

export default reducer;
