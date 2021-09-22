import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import users from './services/user';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const reply = await users.login(userName, pwd);
    blogService.setToken(reply.token);
    setUser(reply);
  };

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
    return ( [<h2>Blogs</h2>, blogs.map(blog => <Blog key={ blog.id } blog={ blog }/>)] );
  };

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
        { blogList() }
      </div>
  );
};

export default App;
