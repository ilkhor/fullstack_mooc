import React, { useState } from 'react';
import Persons from './Persons';
import NewPerson from './NewPerson';
import Filter from './Filter';

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'},
  ]);

  const [filter, setNewFilter] = useState('');

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
