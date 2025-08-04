import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  
  const submit = async (event) => {
    event.preventDefault()
    console.log('update author...')
    await updateAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(birthYear),
      },
    })
    setAuthor('')
    setBirthYear('')
  }

  if (!props.show) {
    return null
  }
  const authors = useQuery(ALL_AUTHORS).data?.allAuthors || []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
