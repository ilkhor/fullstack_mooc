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

export const setNotification = (notification, timeInSeconds) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    notification
  });

  const timeout = timeInSeconds * 1000;

  setTimeout(() => {
    dispatch({
      type: 'CLEAR'
    });
  }, timeout);
};

export default notificationReducer;
