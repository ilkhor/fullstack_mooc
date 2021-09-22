import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import users from './services/user';

const App = () => {
  const initUser = () => {
    const authorizedUser = users.fetchUserLocally();
    if (authorizedUser !== null ) {
      blogService.setToken(authorizedUser.token);
    }

    return authorizedUser;
  }

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(initUser());
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const authorizedUser = await users.login(userName, pwd);

    users.storeUserLocally(authorizedUser);
    blogService.setToken(authorizedUser.token);
    setUser(authorizedUser);
  };

  const logout = (e) => {
    blogService.clearToken();
    users.removeLocallyStoredUser();
    setUser(null);
  }

  const loginForm = () => (
      <form onSubmit={ login }>
        <div>
          User: <input type="text" value={ userName } onChange={ (e) => setUserName(e.target.value) }/>
        </div>
        <div>
          password: <input type="password" value={ pwd } onChange={ (e) => setPwd(e.target.value) }/>
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
  );

  const blogList = () => {
    return ( <h2>Blogs</h2>, blogs.map(blog => <Blog key={ blog.id } blog={ blog }/>) );
  };

  const userInfo = () => {
    return (<div>{user.name} is logged in
    <button onClick={logout}>Logout</button></div>);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs(blogs),
    );
  }, [user]);

  if (user === null) {
    return ( <div>
      { loginForm() }
    </div> );
  }

  return (
      <div>
        { userInfo() }
        { blogList() }
      </div>
  );
};

export default App;
