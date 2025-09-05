import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'
import { useState } from 'react'

const Authors = ({ canEdit }) => {
  const [author, setAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const authors = useQuery(ALL_AUTHORS).data?.allAuthors || []

  const submit = async (event) => {
    event.preventDefault()
    await updateAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(birthYear),
      },
    })
    setAuthor('')
    setBirthYear('')
  }

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

      {canEdit && (
        <>
          <h3>Set birth year</h3>
          <form onSubmit={submit}>
            <select
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            >
              <option value="">Select author</option>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
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
        </>
      )}
    </div>
  )
}

export default Authors
