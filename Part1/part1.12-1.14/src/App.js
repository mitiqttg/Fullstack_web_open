import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  console.log('props value is ' + selected)
  const a = Array(anecdotes.length).fill(0)
  const copy = [...a]
  const [state, setState] = useState(copy)
  
  const handleSelect = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)) )
  }
  // Improvement: need to find a way to display ongoing increases in "vote"
  
  const handleVote = () => {
    state[selected] += 1
    setState(state)
    console.log(state) 
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {state[selected]} votes</p>
      <table>
        <tbody>
          <tr>
            <td><button onClick={handleVote}>vote</button></td>
            <td><button onClick={handleSelect}>next anecdotes</button></td>
          </tr>
        </tbody>
      </table>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[state.indexOf(Math.max(...state))]}</p>
      <p>has {Math.max(...state)} votes</p>
    </div>
  )
}

export default App;
