const getId = () => ( 100000 * Math.random() ).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const anecdote = state.find(a => a.id === action.data);
      if (anecdote !== undefined) {
        const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        return state.map(a => a.id === action.data ? votedAnecdote : a);
      }
      return state;
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

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id
  };
};

export const addAnecdote = (content) => {
  return {
    type: 'ADD',
    data: asObject(content)
  };
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
