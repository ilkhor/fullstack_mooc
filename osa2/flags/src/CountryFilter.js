const CountryFilter = ({country, handleChange}) => {
return (
    <div>
      Find countries <input type='text' value={country} onChange={handleChange}/>
    </div>
)
};

export default CountryFilter;
