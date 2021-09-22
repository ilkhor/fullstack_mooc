import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import NewPerson from './components/NewPerson';
import Filter from './components/Filter';
import phonebookFactory from './services/PhonebookService';
import MessageBox from './components/MessageBox';
import './App.css';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState('');
  const [infoMessage, setInfoMessage] = useState({
    message: '',
    timeout: 10000,
    clazz: '',
  });

  const phonebookService = phonebookFactory('http://localhost:3001/persons');

  const clearInfo = (timeout) => {
    const info = {timeout: 5000, message: '', clazz: ''};

    setTimeout(() => {
      setInfoMessage(info);
      console.log('clearInfo')
    }, infoMessage.timeout);
  }

  useEffect(() => {
    phonebookService.fetchPersons()
    .then(p => setPersons(p));
  }, []);

  const setError = (message) => {
    console.log('setError');
    const error = {...infoMessage, message: message, clazz: 'error'};
    setInfoMessage(error);
    clearInfo(error.timeout);
  };

  const setSuccess = (message) => {

    const success = {...infoMessage, message: message, clazz: 'success'};
    console.log('setSuccess', success);
    setInfoMessage(success);
    clearInfo(success.timeout);
  };

  const onFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = () => {
    if (filter === undefined || filter.length === 0) {
      return persons;
    }

    return persons.filter(p => p.name.toUpperCase().startsWith(filter.toUpperCase()));
  };

  const addNewPerson = (person) => {

    const val = persons.find(p => p.name === person.name);
    const nameAlreadyExists = () => {
      return val !== undefined;
    };

    if (nameAlreadyExists()) {
      if (window.confirm(`Korvataanko ${ person.name } tiedot`)) {

        phonebookService.updatePerson(val.id, person)
        .then(up => setPersons(persons.map(p => p.id === val.id ? up : p)));

        setSuccess(`Henkilö ${ person.name } päivitetty`);
        return true;
      }
    } else {
      phonebookService.storePerson(person)
      .then(p => {
        setPersons(persons.concat(p));
        setSuccess(`Henkilö ${ person.name } lisätty`);
      });

      return true;
    }

    return false;

  };

  const deletePerson = (id) => {

    const p = persons.find(p => p.id === id);
    if (p !== undefined && window.confirm(`Poistetaanko ${ p.name } luettelosta`)) {
      phonebookService.deletePerson(id)
      .then(pid => {
        setPersons(persons.filter(p => p.id !== pid));
        setSuccess(`Henkilö ${ p.name } poistettu`);
      })
      .catch(e => {
        setError(`Virhe poistettaessa ${ p.name } luettelosta`);
        phonebookService.fetchPersons()
        .then(p => setPersons(p));
      });
    }
  };

  console.log('info: ', infoMessage.message, infoMessage.clazz);

  return (
      <div>
        <MessageBox message={infoMessage.message} clazz={infoMessage.clazz}/>
        <h2>Phonebook</h2>
        <Filter onFilterChange={ onFilterChange } filter={ filter }/>
        <NewPerson handleAddNewPerson={ addNewPerson }/>
        <Persons persons={ filteredPersons() } handleDelete={ deletePerson }/>
      </div>
  );

};

export default App;
