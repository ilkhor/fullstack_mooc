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

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR',
  };
};
export default notificationReducer;
