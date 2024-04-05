import { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)

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
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const peopleToShow = showAll
    ? people
    : people.filter(person => person.includes())

  return (
    <div>
      <h2>Phonebook</h2>
        {/* Need to write a filtering function for this form */}
        <form>
          <div>Filter shown with  <input value={filterName} key="filterName" id="filterName" onChange={handleFilterName}/></div>
        </form>
        <form onSubmit={addPerson}>
          <div>name: <input value={newName} key="newName" id="newName" onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} key="newNumber" id="newNumber" onChange={handleNumberChange} /></div>
          <div><button type="submit">add</button></div>
        </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(person => 
          <Person key={person.id} person={persons} />
        )}
      </ul>
    </div>
  )
}

export default App;