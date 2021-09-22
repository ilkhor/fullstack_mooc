import axios from 'axios';

const login = async (user, pwd) => {

  const userWithToken = await axios.post('/login', {user: user, password: pwd});
  return userWithToken.data;
};

export default { login };
