import axios from 'axios';

export const fetchAnecdotes = async () => {
  try {
    const response = await axios.get('/anecdotes');
    return response.data;
  } catch (e) {
    console.error('Cannot fetch anecdotes', e);
    return [];
  }
};
