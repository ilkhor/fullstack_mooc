import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import NewPerson from './components/NewPerson';
import Filter from './components/Filter';
import phonebookFactory from './services/PhonebookService';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState('');

  const phonebookService = phonebookFactory('http://localhost:3001/persons');

  useEffect(() => {
    phonebookService.fetchPersons()
    .then(p => setPersons(p));
  }, []);

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

    console.log(`addNewPerson ${ person }`);
    const nameAlreadyExists = () => {
      const val = persons.find(p => p.name === person.name);
      return val !== undefined;
    };

    if (nameAlreadyExists()) {
      alert(`${ person.name } is already added to phonebook`);
      return false;
    }

    phonebookService.storePerson(person)
    .then(p => {
      setPersons(persons.concat(p));
    });

    return true;
  };

  const deletePerson = (id) => {

    const p = persons.find(p => p.id === id);
    if (p !== undefined && window.confirm(`Poistetaanko ${ p.name } luettelosta`)) {
      phonebookService.deletePerson(id)
      .then(pid => setPersons(persons.filter(p => p.id !== pid)));
    }

  };

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter onFilterChange={ onFilterChange } filter={ filter }/>
        <NewPerson handleAddNewPerson={ addNewPerson }/>
        <Persons persons={ filteredPersons() } handleDelete={ deletePerson }/>
      </div>
  );

};

export default App;
