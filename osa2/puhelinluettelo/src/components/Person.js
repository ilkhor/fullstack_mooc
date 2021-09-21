const Person = ({person, handleDelete}) => {

  const onClick = (id) => (event) => {
    handleDelete(id);
  }

  return (
      <div>
        {person.name} {person.number}
        <button onClick={onClick(person.id)}>Delete</button>
      </div>
  )
};

export default Person;
