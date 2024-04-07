const Person = (props) => {
  return (
    <ul>
        {props.filteredPersons.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
    </ul>
  )
}

export default Person