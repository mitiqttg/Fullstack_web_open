const Filter = (props) => {
    return (
        <form>
            <div>Filter shown with  <input key={props.filterName} id={props.filterName} onChange={props.handleFilterName} /></div>
        </form>
    )
}
  
export default Filter