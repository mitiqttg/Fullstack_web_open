import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(baseUrl+"api/all")
  return request.then(response => response.data)
}

const getCountry = (name) => {
  const request = axios.get(baseUrl + `api/name/${name}`)
  return request.then(response => response.data)
}

const getLocationCountryCapital = (city, apiKey) => {
  return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`).then(response => response.data[0])
}
const getWeatherCountryCapital = (lat, lon, apiKey) => {
  const requestWeather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  return requestWeather.then(response => response.data)
}

export default { 
  getAll, getCountry, getWeatherCountryCapital, getLocationCountryCapital
}