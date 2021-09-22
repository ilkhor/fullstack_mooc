import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';
import users from './services/user';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

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

  const login = async (userName, pwd) => {

    const authorizedUser = await users.login(userName, pwd);

    users.storeUserLocally(authorizedUser);
    blogService.setToken(authorizedUser.token);
    setUser(authorizedUser);
  };

  const logout = () => {
    blogService.clearToken();
    users.removeLocallyStoredUser();
    setUser(null);
  };

  const newBlogPost = async (blog) => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs(blogs),
    );
  }, [user]);

  if (user === null) {
    return ( <div>
      <LoginForm handleLogin={ login }/>
    </div> );
  }

  return (
      <div>
        <UserInfo user={ user } handleLogout={ logout }/>
        <BlogForm handleSubmit={ newBlogPost }/>
        <BlogList blogs={ blogs }/>
      </div>
  );
};

export default App;
