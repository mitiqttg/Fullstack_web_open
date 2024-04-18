const Filter = (props) => {
    return (
        <form>
            <div>Find countries <input key={props.filterCountry} id={props.filterCountry} onChange={props.handleFilterCountry} /></div>
        </form>
    )
}
  
export default Filter