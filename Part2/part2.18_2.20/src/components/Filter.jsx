const Filter = (props) => {
    return (
        <form>
            <div><input className="filterInput" key={props.filterCountry} id={props.filterCountry} onChange={props.handleFilterCountry} /></div>
        </form>
    )
}
  
export default Filter