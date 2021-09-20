import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import NewPerson from './NewPerson';
import Filter from './Filter';
import axios from 'axios';

const App = () => {

  const fetchPersons = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
  };

  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState('');

  useEffect( fetchPersons, []);

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

    setPersons(persons.concat(person));
    return true;
  };

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter onFilterChange={ onFilterChange } filter={ filter }/>
        <NewPerson handleAddNewPerson={ addNewPerson }/>
        <Persons persons={ filteredPersons() }/>
      </div>
  );

};

export default App;
