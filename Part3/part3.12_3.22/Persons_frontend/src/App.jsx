import React, { useState, useEffect } from 'react'
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm' 
import personService from './services/persons'
import axios from 'axios'
import Notification from './components/Notification'

const baseUrl = '/api/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newMessage, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    let allPersons = persons.map(({ name }) => name)
    if (!allPersons.includes(newName)) {
      // This part is for adding non-existed person
      event.preventDefault()
      console.log('Name is not in the list')
      const personsObject = {
        name: newName,
        number: newNumber,
        id: Math.random().toString(),
      }

      axios.post(baseUrl, personsObject)
      .then(returnedPerson => {

          console.log('Added person', returnedPerson)
          console.log('Old persons', persons)
          
          setPersons(persons.push(returnedPerson.data))
          console.log('New persons', persons)

          const inputValue = document.getElementById('filterName').value.toLowerCase()
          
          if (!inputValue) {
            setFilteredPersons(persons)
          } else {
            setFilteredPersons(persons.concat(returnedPerson.data).filter(person => person.name.toLowerCase().includes(inputValue)))
          }
          setMessage(`Added ${personsObject.name} to phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 10000)
          setNewName('')
          setNewNumber('')
          return returnedPerson.data
      })
      .catch(error => {
        // console.log("this is my error creating person the whole thing", error);
        // console.log("this is my error creating person", error.response.data.error);
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 10000)
        console.error('There was an error!', error.response.data.error);
      });
    } else {
      // This part is for updating an existing person in the phonebook
      event.preventDefault()
      console.log('Name is IN the list')
      const oldPerson = persons.filter((person) => person.name === newName)
      // console.log("The existing person is", oldPerson[0].name)
      let result = confirm(`${oldPerson[0].name} is already added to phonebook, replace the old number with a new one?`)
      if (result === true)  {
        const personsObject = {
          name: oldPerson[0].name,
          number: newNumber,
          id: oldPerson[0].id,
        }

        axios.put(`${baseUrl}/`+personsObject.id, personsObject)
        .then(returnedPerson => {
          console.log('Updating person', returnedPerson.data)
          const updatedPerson = persons.filter(person => person.id !== returnedPerson.data.id).concat(returnedPerson.data)
          setNewName('')
          setNewNumber('')
          const inputValue = document.getElementById('filterName').value.toLowerCase()
          if (!inputValue) {
            setFilteredPersons(updatedPerson)
          } else {
            setFilteredPersons(updatedPerson.filter(person => person.name.toLowerCase().includes(inputValue)))
          }
          setMessage(
            `Updated number of '${personsObject.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('There was an error updating number', error);
          console.log('There was an error updating number', error);
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 10000)
        });
      } else {
        console.log('User number is not updated');
      }
    }
  }

  const deletePerson = (id) => {
    const thePerson = persons.filter(person => person.id === id)
    // console.log("we are checking", thePerson[0].name)
    let result = confirm(`Delete ${thePerson[0].name}?`)
    if (result === true) {
        axios.delete(`/api/persons/${id}/`)
          .then((response) => {
          const newPerson = persons.filter((person) => person.id !== id)
          setPersons(newPerson)
          setFilteredPersons(newPerson)
          console.log('User deleted successfully:', response.data);
          setMessage(`Delete ${thePerson[0].name} successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          console.error('There was an error deleting a person!', error);
        });
    } else {
      console.log('User deleted unsuccessfully:');
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    const inputValue = event.target.value.toLowerCase()
    if (!inputValue) {
      setFilteredPersons(persons)
    } else {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(inputValue)))
    }
  }

  return (
    <div className='mainBody'>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} type={'error'} />
      <Notification message={newMessage} type={'notify'} />

      <Filter filterName='filterName' handleFilterName={handleFilterName} />
    
      <h2>Add a new</h2>
      
      <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <ul>
        { filteredPersons.map(person => 
          <li key={person.id}> 
             {person.name} {person.number } 
            <button type='button' onClick={() => deletePerson(person.id)}> Delete </button>
          </li>
        ) }
      </ul>
    </div>
  )
}

export default App
