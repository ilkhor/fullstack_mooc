import axios from 'axios';

const login = async (user, pwd) => {

  const userWithToken = await axios.post('/login', { user: user, password: pwd });
  return userWithToken.data;
};

const storeUserLocally = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
};

const fetchUserLocally = () => {
  const userJson = window.localStorage.getItem('user');

  if (userJson !== null) {
    return JSON.parse(userJson);
  }

  return null;
};

const removeLocallyStoredUser = () => {
  window.localStorage.removeItem('user');
};

export default { login, storeUserLocally, fetchUserLocally, removeLocallyStoredUser };
