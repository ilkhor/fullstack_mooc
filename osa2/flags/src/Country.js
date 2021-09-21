const Country = ({country, handleDetails}) => {

  const onClick = (event) => {
    handleDetails(country.name);
  }

  return (
      <div>
        <p>{country.name} <button onClick={onClick}>Details</button></p>
      </div>
  )
};

export default Country;
