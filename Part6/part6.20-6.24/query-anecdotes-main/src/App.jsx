import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.payload
    case 'CLEAR_NOTI':
      return ''
    default:
      return state
  }
}

const App = () => {
  const [notification, dispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET_NOTI', payload: `You voted for: "${anecdote.content}"` })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTI' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) return <div>loading data...</div>
  if (result.isError) return <div>anecdote service not available</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm dispatch={dispatch} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
