import React from 'react';

const Country = ({ country, weather }) => {
  return (
    <div className="container">
      <div className="output-container">
        <div className="box left-column">
          <h2>{country.name}</h2>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Area:</strong> {country.area.toLocaleString('en', { useGrouping: true })} km²</p>
          <p><strong>Population:</strong> {country.population.toLocaleString('en', { useGrouping: true })}</p>
          <p><strong>Languages:</strong> {country.languages}</p>
          <img src={country.flag} alt="flag" width="50%" />
        </div>

        {weather && (
          <div className="box right-column">
            <h2>Weather in {country.capital}</h2>
            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
            <p>{weather.description}</p>
            <img src={weather.icon} alt="weather icon" className="weather-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
