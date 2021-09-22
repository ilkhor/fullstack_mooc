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

const setToken = (t) => {
  token = t;
};

export default {getAll, setToken};
