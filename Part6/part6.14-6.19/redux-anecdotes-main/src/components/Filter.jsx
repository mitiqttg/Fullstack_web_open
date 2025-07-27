import { useDispatch } from 'react-redux'
// import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const content = event.target.value
        console.log(content)
        return dispatch({type:'filter/filterChange' , payload: content})
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter