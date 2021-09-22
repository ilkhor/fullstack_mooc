const UserInfo = ({user, handleLogout}) => {
  return ( <div>{ user.name } is logged in
    <button onClick={ handleLogout }>Logout</button></div> );
};

export default UserInfo;
