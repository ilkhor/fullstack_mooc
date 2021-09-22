import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';
import users from './services/user';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import './App.css'
import MessageBox from './components/MessageBox';

const App = () => {
  const initUser = () => {
    const authorizedUser = users.fetchUserLocally();
    if (authorizedUser !== null) {
      blogService.setToken(authorizedUser.token);
    }

    return authorizedUser;
  };

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(initUser());
  const [infoMessage, setInfoMessage] = useState({
    message: '',
    timeout: 5000,
    clazz: '',
  });

  const clearInfo = (timeout) => {
    const info = {timeout: 5000, message: '', clazz: ''};

    setTimeout(() => {
      setInfoMessage(info);
      console.log('clearInfo')
    }, infoMessage.timeout);
  }

  const setMessage = (message, clazz) => {
    const info = {...infoMessage, message: message, clazz: clazz};
    setInfoMessage(info);
    clearInfo(info.timeout);
  };

  const login = async (userName, pwd) => {

    try {
      const authorizedUser = await users.login(userName, pwd);
      users.storeUserLocally(authorizedUser);
      blogService.setToken(authorizedUser.token);
      setUser(authorizedUser);

    } catch(error) {
      setMessage('Sisäänkirjautuminen epäonnistui', 'error');
    }
  };

  const logout = () => {
    blogService.clearToken();
    users.removeLocallyStoredUser();
    setUser(null);
    setMessage('Uloskirjautuminen suoritettu', 'error');
  };

  const newBlogPost = async (blog) => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
    setMessage('Blogi lisätty onnistuneesti', 'success');
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs(blogs),
    );
  }, [user]);

  if (user === null) {
    return ( <div>
      <MessageBox message={infoMessage.message} clazz={infoMessage.clazz} />
      <LoginForm handleLogin={ login }/>
    </div> );
  }

  return (
      <div>
        <MessageBox message={infoMessage.message} clazz={infoMessage.clazz} />
        <UserInfo user={ user } handleLogout={ logout }/>
        <BlogForm handleSubmit={ newBlogPost }/>
        <BlogList blogs={ blogs }/>
      </div>
  );
};

export default App;
