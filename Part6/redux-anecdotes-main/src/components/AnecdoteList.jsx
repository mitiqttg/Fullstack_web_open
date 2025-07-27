import { useSelector, useDispatch } from 'react-redux'

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
    dispatch({ type: 'anecdotes/vote', payload: { id } })
    dispatch({ type: 'notifications/setNotification', payload: `You voted for: "${anecdotes.find(a => a.id === id).content}"`})
    console.log(`You voted for: "${anecdotes.find(a => a.id === id).content}"`)
    setTimeout(() => {
      dispatch({type: 'notifications/clearNotification'})
    }, 2000)
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