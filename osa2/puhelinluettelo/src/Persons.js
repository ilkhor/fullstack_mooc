import Person from './Person';
import React from 'react';

const Persons = ({persons}) => {
 return (
     <div>
       <h2>Numbers</h2>
       {
         persons.map((p, idx) => {
           return (<Person key={idx} person={p}/>);
         })
       }
     </div>
 );
}
export default Persons;
