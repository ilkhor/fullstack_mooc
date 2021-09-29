const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
      break;
    default:
      return state;
  }
  return state;
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  };
}

export default filterReducer;
