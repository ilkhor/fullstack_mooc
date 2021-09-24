import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const MessageBox = ({ message, clazz }) => {

  if (message === undefined || message.length === 0) {
    return null;
  }

  return (
    <div className={ clazz }>
      { message }
    </div>
  );

};

LoginForm.prototypes = {
  message: PropTypes.string,
  clazz: PropTypes.string
};

export default MessageBox;
