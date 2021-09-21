import React, { useState } from 'react';

const NewPerson = ({handleAddNewPerson}) => {

  const [person, setNewPerson] = useState({
    name: '',
    number: '',
  });

  const onNameChange = (event) => {
    setNewPerson({...person, name: event.target.value});
  };

  const onNumberChange = (event) => {
    setNewPerson({...person, number: event.target.value});
  };

  const buttonDisabled = () => {
    console.log('buttonDisabled', person);
    if (person.name === undefined || person.name.length === 0) {
      return true;
    } else if (person.number === undefined || person.number.length === 0) {
      return true;
    }
    return false;
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    console.log(person);
    if (handleAddNewPerson(person)) {
      setNewPerson({
        name: '',
        number: '',
      });
    }
  };

  return (
      <form onSubmit={ addNewPerson }>
        <h2>Add new person</h2>
        <div>
          name: <input onChange={ onNameChange } value={ person.name }/>
        </div>
        <div>
          number: <input onChange={ onNumberChange } value={ person.number }/>
        </div>
        <div>
          <button type="submit" disabled={ buttonDisabled() }>add</button>
        </div>
      </form>
  );

};

export default NewPerson;
