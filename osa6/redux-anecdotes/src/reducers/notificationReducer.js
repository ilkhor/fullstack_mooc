const initialState = '';

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR':
      return '';
    default:
      return state;
  }

  return state;
};

const data = {
  currentId: null
};

export const setNotification = (notification, timeInSeconds) => (dispatch) => {

  if (data.currentId !== null) {
    clearTimeout(data.currentId);
  }

  dispatch({
    type: 'SET_NOTIFICATION',
    notification
  });

  const timeout = timeInSeconds * 1000;

  data.currentId = setTimeout(() => {
    dispatch({
      type: 'CLEAR'
    });
    data.currentId = null;
  }, timeout);
};

export default notificationReducer;
