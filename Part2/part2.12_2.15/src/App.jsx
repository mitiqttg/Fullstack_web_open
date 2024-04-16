import React, { useState, useEffect } from 'react'
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm' 
import personService from './services/persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }, [])
  let i = persons.length
  useEffect(() => {
    localStorage.setItem('phonebookPersons', JSON.stringify(persons))
  }, [persons])

  const addPerson = (event) => {
    let allPersons = persons.map(({ name }) => name)
    if (!allPersons.includes(newName)) {
      event.preventDefault()
      console.log('Name is not in the list')
      const personsObject = {
        name: newName,
        number: newNumber,
        id: Math.random().toString(),
      }
      personService
      .create(personsObject)
      .then(returnedPerson => {
        console.log('Added person', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        const inputValue = document.getElementById('filterName').value.toLowerCase()
        if (!inputValue) {
          setFilteredPersons(persons.concat(returnedPerson))
        } else {
          setFilteredPersons(persons.concat(returnedPerson).filter(person => person.name.toLowerCase().includes(inputValue)))
        }
      })
    } else {
      event.preventDefault()
      console.log('Name is IN the list')
      const oldPerson = persons.filter((person) => person.name === newName)
      console.log("The existing person is", oldPerson[0].name)
      let result = confirm(`${oldPerson[0].name} is already added to phonebook, replace the old number with a new one?`)
      if (result === true)  {
        const personsObject = {
          name: oldPerson[0].name,
          number: newNumber,
          id: oldPerson[0].id,
        }
        personService
        .updatePerson(personsObject.id, personsObject)
        .then(returnedPerson => {
          console.log('Added person', returnedPerson)
          const updatedPerson = persons.filter(person => person.id !== returnedPerson.id).concat(returnedPerson)
          setNewName('')
          setNewNumber('')
          const inputValue = document.getElementById('filterName').value.toLowerCase()
          if (!inputValue) {
            setFilteredPersons(updatedPerson)
          } else {
            setFilteredPersons(updatedPerson.filter(person => person.name.toLowerCase().includes(inputValue)))
          }
        })
        .catch(error => {
          console.error('There was an error updating number', error);
        });
      } else {
        console.log('User number is not updated');
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson = (id) => { 
    const thePerson = persons.filter(person => person.id === id)
    console.log("we are checking", thePerson[0].name)
    let result = confirm(`Delete ${thePerson[0].name}?`)
    if (result === true)  {
        axios.delete(`http://localhost:3001/persons/${id}/`)
          .then((response) => {
          const newPerson = persons.filter((person) => person.id !== id)
          setPersons(newPerson)
          setFilteredPersons(newPerson)
          console.log('User deleted successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
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
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterName="filterName" handleFilterName={handleFilterName} />
    
      <h2>Add a new</h2>
      
      <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <ul>
        { filteredPersons.map(person => 
          <li key={person.id}> 
             {person.name} {person.number } 
            <button type="button" onClick={() => deletePerson(person.id)}> Delete </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
