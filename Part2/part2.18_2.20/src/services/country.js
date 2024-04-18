import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(baseUrl+"api/all")
  return request.then(response => response.data)
}

const getCountry = (name) => {
  const request = axios.get(baseUrl + `api/name/${name}`)
  return request.then(response => response.data)
}

const getWeatherCountryCapital = (city, apiKey) => {
  const requestLocation = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`).then(response => response.data)
  const requestWeather = axios.get(```https://api.openweathermap.org/data/2.5/weather?lat=${requestLocation.lat}&lon=${requestLocation.lon}&appid=${apiKey}```)
  return requestWeather.then(response => response.data)
}

const getWeatherIcon = (code) => {
  const request = axios.get(`https://openweathermap.org/img/wn/${code}@2x.png`).then(response => response.data)
  return request.then(response => response.data)
}

export default { 
  getAll, getCountry, getWeatherCountryCapital, getWeatherIcon
}