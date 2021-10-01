import React from 'react';
import { connect, useSelector } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const notification = props.notification;

  if (notification === undefined || notification === null || notification.length === 0) {
    return null;
  }

  return (
    <div style={ style }>
      { notification }
    </div>
  );
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
