import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const config = () => {
  if (token === null) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  };
};

const getAll = () => {
  const cfg = config();
  const request = axios.get(baseUrl, cfg);
  return request.then(response => response.data);
};

const create = (blog) => {
  const cfg = config();
  const request = axios.post(baseUrl, blog, cfg);
  return request.then(response => response.data);
};

const likeBlog = (blog) => {
  const cfg = config();

  const like = () => {
    if (blog.likes === undefined) {
      return {...blog, likes: 1};
    }
    return {...blog, likes: blog.likes + 1};
  };

  const url = `${baseUrl}/${ blog.id }`;

  const request = axios.put(url, like(), cfg);
  return request.then(response => response.data);
};

const setToken = (t) => {
  token = t;
};

const clearToken = () => token = null;

export default {getAll, create, setToken, clearToken, likeBlog};
