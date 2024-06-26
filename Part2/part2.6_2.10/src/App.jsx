import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm' 

const App = (props) => {
  const [persons, setPersons] = useState(() => {
    const savedPersons = localStorage.getItem('phonebookPersons')
    return savedPersons ? JSON.parse(savedPersons) : props.persons
  })
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    localStorage.setItem('phonebookPersons', JSON.stringify(persons))
  }, [persons])

  const addPerson = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
    const inputValue = document.getElementById('filterName').value.toLowerCase()
    if (!inputValue) {
      setFilteredPersons(persons.concat(personsObject))
    } else {
      setFilteredPersons(persons.concat(personsObject).filter(person => person.name.toLowerCase().includes(inputValue)))
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
      
      <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addPerson={addPerson}/>

      <h2>Numbers</h2>

      <Person filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
