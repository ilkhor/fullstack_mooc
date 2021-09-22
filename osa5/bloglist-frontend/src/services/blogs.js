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
}

const setToken = (t) => {
  token = t;
};

const clearToken = () => token = null;

export default {getAll, create, setToken, clearToken};
