import axios from 'axios';

const fetchPersons = (url) => () => {
  return axios
  .get(url)
  .then(response => {
    return response.data;
  });
};

const storePerson = (url) => (person) => {
  return axios.post(url, person)
  .then(r => r.data);
};

const deletePerson = (url) => (id) => {
  const itemUrl = `${ url }/${ id }`;
  return axios.delete(itemUrl)
  .then(resp => id);
};

const noteService = (url) => {

  return {
    fetchPersons: fetchPersons(url),
    storePerson: storePerson(url),
    deletePerson: deletePerson(url),
  };

};
export default noteService;
