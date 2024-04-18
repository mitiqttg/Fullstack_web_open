import React, { useState, useEffect } from 'react'
import Filter from './components/Filter' 
import countryService from './services/country'
import Notification from './components/Notification'
import Country from './services/country'

const App = () => {
  const [country, setCountry] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])
  const [displayACountry, setDisplayACountry] = useState([])

  const [newCountryName, setNewCountryName] = useState('')
  const [newCapital, setCapital] = useState('')
  const [newArea, setArea] = useState('')
  const [newFlag, setFlag] = useState('') 
  const [newLanguages, setLanguages] = useState([])
  
  const [message, setMessage] = useState(null)
  useEffect(() => {
    countryService 
    .getAll()
    .then(initialcountry => {
      setCountry(initialcountry)
      // setFilteredCountry(initialcountry)
    })
  }, [])
  // useEffect(() => {
  //   localStorage.setItem('phonebookcountry', JSON.stringify(country))
  // }, [country])

  const handleFilterCountry = (event) => {
    const inputValue = event.target.value.toLowerCase().trim()
    console.log("input value is ", inputValue ? true : false)
    if (!inputValue) {
      setFilteredCountry(country)
    } else {
      setFilteredCountry(country.filter(country => country.name.common.toLowerCase().includes(inputValue)))
      if (filteredCountry.length > 1 && filteredCountry.length <= 10) {
        setDisplayACountry(filteredCountry)
      } else if (filteredCountry.length === 1) {
        countryService
        .getCountry(filteredCountry[0].name.common)
        .then(
          returnedCountry => {
            console.log('Navigate to one country', returnedCountry.name.common)
            setNewCountryName(returnedCountry.name.common)
            setCapital(returnedCountry.capital)
            setArea(returnedCountry.area)
            setFlag(returnedCountry.flags.png)
            setLanguages(Object.values(returnedCountry.languages))
          }
        ).catch(error => {
          console.error('There was an error!', error);
        });
      } else {
        setMessage(`Too many matches, specify for another filter`)
        setTimeout(() => {
          setMessage(null)
        }, 10000)
      }
    }
  }

  return (
    <div className='mainBody'>
      <h1>Country</h1>

      <Filter filterName="filterCountry" handleFilterCountry={handleFilterCountry} />
      <Notification message={message} type={"notify"} />
      <h2>Countries</h2>
      <ul>
        { 
          displayACountry.map(country => 
            <li key={ Math.random().toString()}> 
             {country.name.common} </li>
          )
        }
      </ul>
      <Country name={newCountryName} capital={newCapital} area={newArea} flag={newFlag} languages={newLanguages}/>
    </div>
  )
}

export default App
