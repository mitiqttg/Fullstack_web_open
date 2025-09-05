import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const { data: meData, loading: meLoading } = useQuery(ME)
  const favoriteGenre = meData?.me?.favoriteGenre

  const { data: booksData, loading: booksLoading } = useQuery(
    ALL_BOOKS,
    {
      variables: { genre: favoriteGenre },
      skip: !favoriteGenre
    }
  )

  if (meLoading || booksLoading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks?.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommendations
