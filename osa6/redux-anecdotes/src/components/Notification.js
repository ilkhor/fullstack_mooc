
import React from 'react'
import { useSelector } from 'react-redux';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notification);

  if (notification === undefined || notification === null || notification.length === 0) {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
