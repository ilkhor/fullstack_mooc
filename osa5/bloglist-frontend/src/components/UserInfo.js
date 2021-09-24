import PropTypes from 'prop-types';
import Toggle from './Toggle';

const UserInfo = ({user, handleLogout}) => {
  return ( <div>{ user.name } is logged in
    <button onClick={ handleLogout }>Logout</button></div> );
};

Toggle.prototypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};



export default UserInfo;
