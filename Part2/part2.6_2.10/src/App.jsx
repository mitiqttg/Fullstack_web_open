// import { useState } from 'react'
// import Person from './components/Person'

// const App = (props) => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456', id: 1 },
//     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
//   ])

//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [showAll, setShowAll] = useState(true)

//   const addPerson = (event) => {
//     event.preventDefault()
//     const personsObject = {
//       name: newName,
//       number: newNumber,
//       id: persons.length + 1,
//     }

//     setPersons(persons.concat(personsObject))
//     setNewName('')
//     setNewNumber('')
//   }

//   const handleNameChange = (event) => {
//     console.log(event.target.value)
//     setNewName(event.target.value)
//   }
  
//   const handleNumberChange = (event) => {
//     console.log(event.target.value)
//     setNewNumber(event.target.value)
//   }

//   const peopleToShow = showAll
//     ? people
//     : people.filter(person => person.includes())

//   return (
//     <div>
//       <h2>Phonebook</h2>
//         {/* Need to write a filtering function for this form */}
//         <form>
//           <div>Filter shown with  <input value={filterName} key="filterName" id="filterName" onChange={handleFilterName}/></div>
//         </form>
//         <form onSubmit={addPerson}>
//           <div>name: <input value={newName} key="newName" id="newName" onChange={handleNameChange} /></div>
//           <div>number: <input value={newNumber} key="newNumber" id="newNumber" onChange={handleNumberChange} /></div>
//           <div><button type="submit">add</button></div>
//         </form>
//       <h2>Numbers</h2>
//       <ul>
//         {peopleToShow.map(person => 
//           <Person key={person.id} person={persons} />
//         )}
//       </ul>
//     </div>
//   )
// }

// export default App;

// import { useState } from 'react'
// import Person from './components/Person'

// const App = (props) => {

//   const [newName, setNewName] = useState(props.persons)
//   const [newNumber, setNewNumber] = useState('')
//   const [showAll, setShowAll] = useState(true)
//   const addPerson = (event) => {
//     event.preventDefault()
//     const personsObject = {
//       name: newName,
//       number: newNumber,
//       id: props.persons.length + 1,
//     }
//     setPersons(props.persons.concat(personsObject))
//     setNewName('')
//     setNewNumber('')
//   }
//   const handleNameChange = (event) => {
//     console.log(event.target.value)
//     setNewName(event.target.value)
//   }
  
//   const handleNumberChange = (event) => {
//     console.log(event.target.value)
//     setNewNumber(event.target.value)
//   }

//   const handleFilterName = (event) => {
//     showAll
//     ? people
//     : people.filter(person => person.includes((event.target.value).toLowerCase()))
//   }

//   return (
//     <div>
//       <h2>Phonebook</h2>
//         <form>
//           <div>Filter shown with  <input key="filterName" id="filterName" onKeyUp={setShowAll(false)}/></div>
//         </form>
//         <div>
//           <button onClick={() => setShowAll(!showAll)}>
//             show {showAll ? 'important' : 'all' }
//           </button>
//         </div> 
//         <form onSubmit={addPerson}>
//           <div>name: <input value={newName} key="newName" id="newName" onChange={handleNameChange} /></div>
//           <div>number: <input value={newNumber} key="newNumber" id="newNumber" onChange={handleNumberChange} /></div>
//           <div><button type="submit">add</button></div>
//         </form>
//       <h2>Numbers</h2>
//       <ul>
//         {handleFilterName.map(person => 
//           <Person key={person.id} person={person} />
//         )}
//       </ul>
//     </div>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [persons, setPersons] = useState(() => {
    const savedPersons = localStorage.getItem('phonebookPersons')
    return savedPersons ? JSON.parse(savedPersons) : props.persons
  })
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)

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
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    const inputValue = event.target.value.toLowerCase()
    setShowAll(!inputValue) // If the input is empty, show all.
    if (!inputValue) {
      setFilteredPersons(persons)
    } else {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(inputValue)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>Filter shown with  <input key="filterName" id="filterName" onChange={handleFilterName}/></div>
      </form>
 
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} key="newName" id="newName" onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} key="newNumber" id="newNumber" onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
