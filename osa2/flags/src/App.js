import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryFilter from './CountryFilter';
import Countries from './Countries';

function App () {

  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);

  const handleChange = (event) => {
    console.log('handleChange', event.target.value);
    setCountryName(event.target.value);
  };

  const handleDetails = (country) => {
    setCountryName(country);
  }

  useEffect(() => {
    const url = `https://restcountries.eu/rest/v2/name/${ countryName }`;

    if (countryName.length === 0) {
      setCountries([]);
      return;
    }

    console.log(`Issue request to ${ url }`);

    axios.get(url)
    .then(r => setCountries(r.data))
    .catch(e => setCountries([] ));
  }, [countryName]);


  return (
      <div>
        <CountryFilter country={ countryName } handleChange={ handleChange }/>
        <Countries countries={ countries } maxCountries={ 5 } handleDetails={handleDetails}/>
      </div>
  );
}

export default App;
