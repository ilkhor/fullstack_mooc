import Country from './Country';
import CountryDetails from './CountryDetails';

const Countries = ({countries, maxCountries}) => {

  if (countries.length > maxCountries) {
    return (
        <div>
          Too many matches ==> Specify another filter
        </div>
    );
  }
  else if (countries.length === 1) {
    return (
        <CountryDetails country={countries[0]} />
    )
  }
  return (
      countries.map(country => (
          <Country key={ country.cioc } country={ country }/>
      ))
  );
};

export default Countries;
