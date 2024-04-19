import React, { useState, useEffect } from 'react'
import Filter from './components/Filter' 
import countryService from './services/country'
import Notification from './components/Notification'
import Country from './components/Country'


const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [country, setCountry] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])
  const [message, setMessage] = useState(null)
  
  const [newCountryName, setNewCountryName] = useState('')
  const [newCapital, setCapital] = useState('')
  const [newArea, setArea] = useState('')
  const [newFlag, setFlag] = useState('') 
  const [newLanguages, setLanguages] = useState([])

  const [newTemp, setTemp] = useState(0) 
  const [newWeatherIcon, setWeatherIcon] = useState('') 
  const [newWind, setWind] = useState('') 

  const [newLat, setLat] = useState(0) 
  const [newLon, setLon] = useState(0) 
 
  useEffect(() => {
    countryService
    .getAll()
    .then(initialcountry => {
      setCountry(initialcountry) 
    })
  }, [])

  const handleFilterCountry = (event) => {
    const inputValue = event.target.value.toLowerCase().trim()
    if (!inputValue) {
      setCountry(country)
      setMessage(``)

      setNewCountryName("")
      setCapital('')
      setArea('')
      setFlag('')
      setLanguages('')

      setTemp(0)
      setWeatherIcon('')
      setWind('')
      
      setLat('')
      setLon('')
      setFilteredCountry([])
    } else {
      setFilteredCountry([])
      setNewCountryName("")
      const filtered = country.filter(country => country.name.common.toLowerCase().includes(inputValue))
      console.log("This is the length filtered country", filtered.length)
      
      if (filtered.length > 1 && filtered.length <= 10) {
        setMessage(``)
        setFilteredCountry(filtered)
      } else if (filtered.length === 1) {
        setMessage(``)

        countryService
        .getCountry(filtered[0].name.common)
        .then(
          returnedCountry => {
            console.log('Navigate to one country', typeof returnedCountry)
            setNewCountryName(returnedCountry.name.common)
            setCapital(returnedCountry.capital)
            setArea(returnedCountry.area)
            setFlag(returnedCountry.flags.png)
            setLanguages(returnedCountry.languages)            
          }
        )
        console.log('API KEY is', api_key)
        /// Adding temp weather
        countryService
        .getLocationCountryCapital(newCapital, api_key)
        .then(
          returnedCountry => {
            setLat(returnedCountry.lat)
            setLon(returnedCountry.lon)
          }
        )
        countryService
        .getWeatherCountryCapital(newLat, newLon, api_key)
        .then(
          returnedWeather => {

            setTemp(Number(returnedWeather.main.temp -273.15).toFixed(2));
            setWeatherIcon(`https://openweathermap.org/img/wn/${returnedWeather.weather[0].icon}@2x.png`)
            setWind(returnedWeather.wind.speed)
          }
        )
      } else if (filtered.length === 0) {
        setMessage(`No country found for this filter`)
        setLat('')
        setLon('')
        setFilteredCountry([])
        setNewCountryName('')
        setCapital('')
        setArea('')
        setFlag('')
        setLanguages('')
      } else {
        setFilteredCountry([])
        setMessage(`Too many matches, specify for another filter`)
      }
    }
  }
  
  const showCountry = (countryObject) => {
    setMessage(``)
    setFilteredCountry([])
    
    setNewCountryName(countryObject.name.common)
    setCapital(countryObject.capital[0])
    setArea(countryObject.area)
    setFlag(countryObject.flags.png)
    setLanguages(countryObject.languages)

    //  Promise cannot be executyed here somehow, only the data not from promises got loaded
    countryService
      .getWeatherCountryCapital(countryObject.capitalInfo.latlng[0], countryObject.capitalInfo.latlng[1], api_key)
      .then(
        returnedWeather => {
          setTemp(Number(returnedWeather.main.temp -273.15).toFixed(2));
          setWeatherIcon(`https://openweathermap.org/img/wn/${returnedWeather.weather[0].icon}@2x.png`)
          setWind(returnedWeather.wind.speed)
        }
    )
  }

  return (
    <div className='mainBody'>
      <div className='fixFilter'>
        <div>
        <h3 className='fixHead'>Filter countries</h3>
        <Filter filterName="filterCountry" handleFilterCountry={handleFilterCountry} />
        </div>
        <Notification message={message} type={"notify"} />
      </div>
      <div>
      { filteredCountry.length >= 2 ? <h2 className='fixMatches'>Countries match</h2> : null }
      <div className='fixList'>
      <ul>
        { 
          filteredCountry.map(country => 
            <li key={ Math.random().toString()}> 
             {country.name.common} <button type="button" onClick={() => showCountry(country)}> Show </button></li>
          )
        }
      </ul>
      </div>
      <div className='fixCountry'>
      <Country name={newCountryName ? newCountryName : "undefied"} capital={newCapital} area={newArea} flag={newFlag} languages={newLanguages} temp={newTemp} weatherIcon={newWeatherIcon} wind={newWind}/>
      </div>
      </div>
    </div>
  )
}

export default App
