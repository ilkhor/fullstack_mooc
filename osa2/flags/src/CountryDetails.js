import Weather from './Weather';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({country}) => {

  const [weatherData, setWeatherData] = useState({
    city: country.capital,
    temperature: '',
    picture: '',
    wind: '',
  });

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${ process.env.REACT_APP_WEATHER_API_KEY }&query=${ country.capital }`;

    console.log('Issue request to', url)
    axios.get(url)
    .then(resp => {
      setWeatherData({
        city: country.capital,
        temperature: `${ resp.data.current.temperature }`,
        picture: `${ resp.data.current.weather_icons }`,
        wind: `${ resp.data.current.wind_speed } ${ resp.data.current.wind_dir }`,
      });
    })
    .catch(e => {
      setWeatherData({
        city: country.capital,
        temperature: '',
        picture: '',
        wind: '',
      });
    });
  }, []);

  return (
      <div>
        <h2>{ country.name }</h2>
        <p><b>Capital:</b> { country.capital }</p>
        <h3>Languages</h3>
        <ul>
          {
            country.languages.map(l => (
                <li key={ l.iso639_1 }>
                  { l.name }
                </li>
            ))
          }
        </ul>
        <img src={ country.flag } width={ 100 } height={ 80 } alt={ 'Flag' }/>
        <Weather weatherData={ weatherData }/>
      </div>
  );
};

export default Country;
