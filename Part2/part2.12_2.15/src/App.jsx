import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm' 
import axios from 'axios'
import personService from './services/persons'


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
    noteService
      .create(personsObject)
        .then(returnedPerson => {
        setNotes(notes.concat(returnedPerson))
        setNewNote('')
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
  }

  const deletePerson = id => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // delete function
    noteService
      .deletePerson(id)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        confirm(`Delete ${person.name} ?`)
      })
      .catch(error => {
        alert(
          ` '${person.name}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  //Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number.
  const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
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
