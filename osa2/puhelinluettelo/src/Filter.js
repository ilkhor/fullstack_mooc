import React from 'react';

const Filter = ({onFilterChange, filter}) => {
  return (
      <div>
        filter: <input onChange={ onFilterChange } value={filter}/>
      </div>
  );

}

export default Filter;
