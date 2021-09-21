const Country = ({country}) => {

  return (
      <div>
        <h2>{country.name}</h2>
        <p><b>Capital:</b> {country.capital}</p>
        <h3>Languages</h3>
        <ul>
          {
            country.languages.map(l => (
                <li key={l.iso639_1}>
                  {l.name}
                </li>
            ))
          }
        </ul>
        <img src={country.flag} width={100} height={80} />
      </div>
  )
};

export default Country;
