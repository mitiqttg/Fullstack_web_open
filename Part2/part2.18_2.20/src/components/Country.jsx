const Country = (props) => {
  if (props.name === "undefied") {
    return null
  }
  return (
  <div>
    <h1>{props.name}</h1>
    <p>Capital: {props.capital}</p>
    <p>Area: {props.area}</p>

    <h3>Languages</h3>
    <ul>
        {Object.values(props.languages).map(language => 
          <li key={Math.random().toString()}> 
          {language} 
          </li>
        )}
    </ul>
    <img src={props.flag} width="300" height="200"></img>
    <h3>Weather in {props.capital}</h3>
    <p>Temperature {props.temp} Celcius</p>
    <img src={props.weatherIcon} width="100" height="100"></img>
    <p>Wind {props.wind} m/s</p>

  </div>
  )
}

export default Country
