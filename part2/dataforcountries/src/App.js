import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://restcountries.eu/rest/v2/all";
const weatherUrl = "http://api.weatherstack.com/current"
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Filter = ({ filter, setFilter }) => (
  <div className="filter">
    Find countries: <input 
      className="filter-input" 
      value={filter} 
      onChange={e => setFilter(e.target.value)} 
    />
  </div>
);

const Country = ({ country, weather }) => (
  <div className="single-country-display">
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(l => <li key={l.nativeName}>{l.name}</li>)}
    </ul>
    <img 
      src={country.flag} 
      alt={`Flag of ${country.name}`}
      width="250vw"
      height="200vw"
    />
    {weather.weather_icons && <>
      <h2>Weather in {country.capital}</h2>
      <p><b>Temperature:</b> {weather.temperature} Celcius</p>
      <img 
        src={weather.weather_icons[0]}
        alt={`weather-icon-${country.capital}`} 
        width="100vw"
        height="100vw"
      />
      <p><b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>}
  </div>
);

const SingleCountries = ({ countries, setFilter }) => (
  countries.map(country => 
    <p key={country.alpha3Code}>
      {country.name}   
      <button 
        className={`${country.name}-choose-btn`}
        onClick={() => setFilter(country.name)}
      >
        show
      </button>
    </p>)
)

const Countries = ({ countriesList, setFilter, weather }) => (
  <>
    {countriesList.length > 10 
      ? <p>Too many matches, specify another filter</p>
      : countriesList.length === 1
        ? <Country country={countriesList[0]} weather={weather} />
        : <SingleCountries countries={countriesList} setFilter={setFilter} />
    }
  </>
)

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => setCountries(res.data))
      .catch(err => console.log(err))
  },[]);

  useEffect(() => {
    const list = filter.length === 0
    ? countries
    : countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    setCountriesList(list)
    if (list.length === 1) {
      axios
        .get(`${weatherUrl}?access_key=${API_KEY}&query=${list[0].name}`)
        .then(res => setWeather(res.data.current))
        .catch(err => console.log(err))
    }
  }, [filter, countries])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries 
        countriesList={countriesList}
        filter={filter} 
        setFilter={setFilter}
        weather={weather}
      />
    </div>
  )
}

export default App
