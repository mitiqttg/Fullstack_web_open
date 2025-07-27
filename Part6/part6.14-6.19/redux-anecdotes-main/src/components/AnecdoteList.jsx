import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }

    return anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })


  const dispatch = useDispatch()
  console.log('anecdotes', anecdotes)

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for: "${anecdote.content}"`))
    // console.log(`You voted for: "${anecdotes.find(a => a.id === id).content}"`)
    setTimeout(() => dispatch(clearNotification()), 2000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList