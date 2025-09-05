import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ME } from '../queries'
import { useNavigate } from 'react-router-dom'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
      setTimeout(() => setError(null), 2000)
    },

    update: (cache, { data }) => {
      if (!data?.addBook) return
      const addBook = data.addBook

      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        (d) => {
          if (!d?.allBooks) return { allBooks: [addBook] }
          return { allBooks: d.allBooks.concat(addBook) }
        }
      )

      let me
      try {
        me = cache.readQuery({ query: ME })
      } catch {
        me = null
      }
      if (me?.me?.favoriteGenre && addBook.genres.includes(me.me.favoriteGenre)) {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: me.me.favoriteGenre } },
          (d) => {
            if (!d?.allBooks) return { allBooks: [addBook] }
            return { allBooks: d.allBooks.concat(addBook) }
          }
        )
      }

      cache.updateQuery({ query: ALL_AUTHORS }, (d) => {
        if (!d?.allAuthors) return { allAuthors: [addBook.author] }
        if (
          addBook.author &&
          !d.allAuthors.find((a) => a.name === addBook.author.name)
        ) {
          return { allAuthors: d.allAuthors.concat(addBook.author) }
        }
        return d
      })
    }

  })

  const submit = async (event) => {
    event.preventDefault()

    try {
      await addBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        }
      })

      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      navigate('/books')
      
    } catch (err) {
      console.error(err)
    }
  }


  const addGenre = () => {
    if (genre.trim() !== '') {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }

  return (
    <div>
      <h2>Add a new book</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button type="button" onClick={addGenre}>add genre</button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
