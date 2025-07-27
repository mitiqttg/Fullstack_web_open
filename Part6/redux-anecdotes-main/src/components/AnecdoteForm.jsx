import { useSelector, useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch({type: 'anecdotes/newAnecdote', payload: content})
        dispatch({type: 'notifications/setNotification', payload: `You created: "${content}"`})
        setTimeout(() => {
            dispatch({type: 'notifications/clearNotification'})
        }, 2000)
    }

    return (
        <form onSubmit={newAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm