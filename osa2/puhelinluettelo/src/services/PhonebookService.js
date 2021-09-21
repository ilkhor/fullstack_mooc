import axios from 'axios';

const fetchPersons = (url) => () => {
  return axios.get(url)
  .then(response => {
    return response.data;
  });
};

const storePerson = (url) => (person) => {
  return axios.post(url, person)
      .then(r => r.data);
};

const noteService = (url) => {

  return {
    fetchPersons: fetchPersons(url),
    storePerson: storePerson(url),
  };

};
export default noteService;
