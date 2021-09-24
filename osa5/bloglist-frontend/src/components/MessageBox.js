
const MessageBox = ({message, clazz}) => {

  if (message === undefined || message.length === 0) {
    return null;
  }

  return (
      <div className={ clazz }>
        { message }
      </div>
  );

};

export default MessageBox;
