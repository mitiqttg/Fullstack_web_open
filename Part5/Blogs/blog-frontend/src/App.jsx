import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: '' }), 5000)
  }

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome back, ${user.name}`)
    } catch {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    showNotification('Logged out successfully')
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        const blogWithUser = {
          ...returnedBlog,
          user: {
            name: user.name,
            username: user.username,
            id: user.id
          }
        }
        setBlogs(blogs.concat(blogWithUser))
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: '' })
        showNotification(`Blog "${returnedBlog.title}" by "${returnedBlog.author}" was added`)
      })
      .catch(() => {
        showNotification('Error adding blog', 'error')
      })
  }

  const handleLike = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        showNotification(`You liked "${returnedBlog.title}"`)
      })
      .catch(() => {
        showNotification('Error updating blog', 'error')
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService.remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          showNotification('Blog deleted successfully')
        })
        .catch(() => {
          showNotification('Error deleting blog', 'error')
        })
    }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <div className="container">
      <Notification message={notification.message} type={notification.type} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="Add new blog">
            <BlogForm
              newBlog={newBlog}
              handleBlogChange={handleBlogChange}
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      )}

      <h2>Blog list</h2>
      <ul className="blog-list">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleLike={handleLike}
            currentUser={user}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
