import personService from '../services/persons'

const Person = (props) => {
  return (
    <ul>
        {props.filteredPersons.map(person => 
          <li key={person.id}> 
            {person.name} {person.number}
            {<form onSubmit={personService.deletePerson(person.id)} >
              <input type="submit" value="Delete"/>
            </form>}
          </li>
        )}
    </ul>
  )
}

export default Person
