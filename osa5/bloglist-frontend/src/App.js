import React, { useEffect, useRef, useState } from 'react';
import blogService from './services/blogs';
import users from './services/user';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import './App.css';
import MessageBox from './components/MessageBox';
import Toggle from './components/Toggle';

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
    clazz: ''
  });

  const ref = useRef();

  const setMessage = (message, clazz) => {
    const info = { ...infoMessage, message: message, clazz: clazz };
    setInfoMessage(info);

    const clear = { timeout: 5000, message: '', clazz: '' };
    setTimeout(() => {
      setInfoMessage(clear);
    }, infoMessage.timeout);
  };

  const login = async (userName, pwd) => {

    try {
      const authorizedUser = await users.login(userName, pwd);
      users.storeUserLocally(authorizedUser);
      blogService.setToken(authorizedUser.token);
      setUser(authorizedUser);

    } catch (error) {
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
    ref.current.setVisibility(false);
  };

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id);
    if (blog !== undefined) {
      const updated = await blogService.likeBlog(blog);
      setBlogs(blogs.map(b => b.id === id ? updated : b));
      setMessage('Blogi päivitetty', 'success');
    }
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id);
    if (blog !== undefined) {
      await blogService.deleteBlog(blog);
      setBlogs(blogs.filter(b => b.id !== id));
      setMessage('Blogi poistettu', 'success');
    }
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, [user]);

  if (user === null) {
    return ( <div>
      <MessageBox message={ infoMessage.message } clazz={ infoMessage.clazz }/>
      <LoginForm handleLogin={ login }/>
    </div> );
  }

  return (
    <div>
      <MessageBox message={ infoMessage.message } clazz={ infoMessage.clazz }/>
      <UserInfo user={ user } handleLogout={ logout }/>
      <Toggle initialVisibility={ false } showTxt="Lisää uusi blogi" hideTxt="Peruuta" ref={ ref }>
        <BlogForm handleSubmit={ newBlogPost }/>
      </Toggle>
      <BlogList blogs={ blogs } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>
    </div>
  );
};

export default App;
