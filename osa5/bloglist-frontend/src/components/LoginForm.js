import PropTypes from 'prop-types';
import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {

  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');

  const login = (e) => {
    e.preventDefault();

    handleLogin(userName, pwd);

  };

  return (
    <form onSubmit={ login }>
      <div>
          User: <input type="text" value={ userName } onChange={ (e) => setUserName(e.target.value) }/>
      </div>
      <div>
          password: <input type="password" value={ pwd } onChange={ (e) => setPwd(e.target.value) }/>
      </div>
      <button type="submit">Kirjaudu</button>
    </form> );
};

LoginForm.prototypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
