const {useState} = require('react');
const LoginForm = ({handleLogin}) => {

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

export default LoginForm;
