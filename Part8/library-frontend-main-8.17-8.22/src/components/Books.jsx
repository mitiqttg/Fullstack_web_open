import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { data: allBooksData } = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })

  const { loading, data: filteredBooksData, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  if (loading) return <p>Loading...</p>

  const allBooks = allBooksData?.allBooks || []
  const genres = [...new Set(allBooks.flatMap(b => b.genres))]
  const displayedBooks = filteredBooksData?.allBooks || []

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre)
    refetch({ genre })
  }

  return (
    <div>
      <h2>Books</h2>

      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => handleGenreClick(g)}
            style={{
              backgroundColor: selectedGenre === g ? 'darkgray' : '',
              color: selectedGenre === g ? 'white' : ''
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => handleGenreClick(null)}
          style={{
            backgroundColor: selectedGenre === null ? 'darkgray' : '',
            color: selectedGenre === null ? 'white' : ''
          }}
        >
          all genres
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map((b) => (
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

export default Books
