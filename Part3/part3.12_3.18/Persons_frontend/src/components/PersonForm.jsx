const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>Name: <input value={props.newName} key={props.newName} id={props.newName} onChange={props.handleNameChange} autoFocus/></div>
        <div>Number: <input value={props.newNumber} key={props.newNumber} id={props.newNumber} onChange={props.handleNumberChange} autoFocus/></div>
        <div><button type="submit">Add</button></div>
      </form>
    )
}
  
export default PersonForm