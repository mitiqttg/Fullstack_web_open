import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = ({ dispatch }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value.trim()
    e.target.anecdote.value = ''

    if (content.length < 5) {
      dispatch({ type: 'SET_NOTI', payload: 'Anecdote must be at least 5 characters long' })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTI' }), 5000)
      return
    }

    mutation.mutate({ content, votes: 0 })
    dispatch({ type: 'SET_NOTI', payload: `You created: "${content}"` })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTI' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
