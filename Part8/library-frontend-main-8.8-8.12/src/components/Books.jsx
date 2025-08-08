import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS)
  const books = data?.allBooks || []

  // if (!props.show) return null
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading books</div>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
