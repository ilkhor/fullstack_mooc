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

const updatePerson = (url) => (id, person) => {
  const itemUrl = `${ url }/${ id }`;
  return axios.put(itemUrl, person)
  .then(resp => resp.data);
};

const noteService = (url) => {

  return {
    fetchPersons: fetchPersons(url),
    storePerson: storePerson(url),
    deletePerson: deletePerson(url),
    updatePerson: updatePerson(url),
  };

};
export default noteService;
