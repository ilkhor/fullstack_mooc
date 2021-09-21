const Weather = ({weatherData}) => {

  if (weatherData.temperature.length === 0) {
    return ( <div></div> );
  }

  return (
      <div>
        <h3>Weather in { weatherData.city }</h3>
        <p>Temperature: {weatherData.temperature}</p>
        <img src={weatherData.picture} alt='Weather image' />
        <p>Wind: { weatherData.wind }</p>
      </div>
  );

};

export default Weather;
