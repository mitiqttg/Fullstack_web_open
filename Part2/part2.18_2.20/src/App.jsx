import React, { useState, useEffect } from 'react'
import Filter from './components/Filter' 
import countryService from './services/country'
import Notification from './components/Notification'
import Country from './components/Country'


const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [country, setCountry] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])
  const [displayCountry, setDisplayCountry] = useState([])
  const [message, setMessage] = useState(null)
  
  const [newCountryName, setNewCountryName] = useState('')
  const [newCapital, setCapital] = useState('')
  const [newArea, setArea] = useState('')
  const [newFlag, setFlag] = useState('') 
  const [newLanguages, setLanguages] = useState([])
  const [newTemp, setTemp] = useState(0) 
  const [newWeatherIcon, setWeatherIcon] = useState('') 
  const [newWind, setWind] = useState('') 
 
  useEffect(() => {
    countryService
    .getAll()
    .then(initialcountry => {
      setCountry(initialcountry) 
      // setFilteredCountry(null)
    })
  }, [])
  // useEffect(() => {
  //   localStorage.setItem('phonebookcountry', JSON.stringify(country))
  // }, [country])

  const handleFilterCountry = (event) => {
    const inputValue = event.target.value.toLowerCase().trim()
    console.log("input value is ", inputValue ? true : false)
    if (!inputValue) {
      setCountry(country)
      console.log("This is the current country", country)
      setMessage(``)
      setDisplayCountry([])
      setNewCountryName("")
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
            setDisplayCountry(returnedCountry)
            setNewCountryName(returnedCountry.name.common)
            setCapital(returnedCountry.capital)
            setArea(returnedCountry.area)
            setFlag(returnedCountry.flags.png)
            setLanguages(returnedCountry.languages)
            
            console.log('The country is', displayCountry)
            console.log('The country flag is', displayCountry.flags.png) 
          }
        )
        /// Adding temp weather
        countryService
        .getWeatherCountryCapital(filtered[0].name.common, api_key)
        .then(
          returnedWeather => {
            console.log('Navigate to one weather', typeof returnedWeather)
            setTemp(returnedWeather.main.temp -273.15)
            setWeatherIcon(returnedWeather.weather.icon)
            setWind(returnedCountry.languages)
            // console.log('The country is', displayCountry)
            // console.log('The country flag is', displayCountry.flags.png) 
          }
        )
      } else if (filtered.length === 0) {
        setMessage(`No country found for this filter`)
      } else {
        setFilteredCountry([])
        setMessage(`Too many matches, specify for another filter`)
      }
      console.log('The country is after specified', displayCountry.name.common ? displayCountry.name.common : "Empty")
    }
  }

  const showCountry = (country) => {
    setMessage(``)
    setFilteredCountry([])
    setNewCountryName(country.name.common)
    setCapital(country.capital)
    setArea(country.area)
    setFlag(country.flags.png)
    setLanguages(country.languages)
    /// Adding temp weather
  }

  return (
    <div className='mainBody'>
      <h1>Country</h1>

      <Filter filterName="filterCountry" handleFilterCountry={handleFilterCountry} />
      <Notification message={message} type={"notify"} />
      <h2>Countries</h2>
      <ul>
        { 
          filteredCountry.map(country => 
            <li key={ Math.random().toString()}> 
             {country.name.common} <button type="button" onClick={() => showCountry(country)}> Show </button></li>
          )
        }
      </ul>
      {/* <Country country={displayCountry}/> */}
      <Country name={newCountryName ? newCountryName : "undefied"} capital={newCapital} area={newArea} flag={newFlag} languages={newLanguages} temp={newTemp} weatherIcon={newWeatherIcon} wind={newWind}/>
    </div>
  )
}

export default App
