import axios from 'axios';

const testParam = (param) => {
  if (param === undefined || param === null) {
    throw new Error('Invalid argument');
  }
};

export const fetchAnecdotes = async () => {
  try {
    const response = await axios.get('/anecdotes');
    return response.data;
  } catch (e) {
    console.error('Cannot fetch anecdotes', e);
    return [];
  }
};

export const createAnecdote = async (anecdote) => {
  try {
    testParam(anecdote);
    const response = await axios.post('/anecdotes', { content: anecdote, votes: 0 });
    return response.data;
  } catch (e) {
    console.error('Cannot fetch anecdotes', e);
    throw e;
  }
};

export const updateAnecdote = async (anecdote) => {
  try {
    testParam(anecdote);
    const response = await axios.put( `/anecdotes/${anecdote.id}`, anecdote);
    return response.data;

  } catch (e) {
    console.error('Cannot add vote for anecdote', anecdote, e);
    throw e;
  }
};
