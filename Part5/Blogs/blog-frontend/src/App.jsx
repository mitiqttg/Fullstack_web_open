import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ 
    title: '', 
    author: '', 
    url: '' 
  })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setErrorMessage('Logged out successfully')
    setTimeout(() => setErrorMessage(null), 3000)
  }


  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: '' })
        setErrorMessage(`Blog "${returnedBlog.title}" added successfully!`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage('Error adding blog')
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>      
  // )

  const handleLike = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setErrorMessage(`You liked "${returnedBlog.title}"!`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage('Error updating blog')
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setErrorMessage('Blog deleted successfully')
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage('Error deleting blog')
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }
  // -------------------------- LOGIN FORM ----------------------------------
  // if (user === null) {
  //   return (
      <div>
        <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>     
      </div>
  //   )
  // }

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      
      <p>{user.name} logged in</p> 

      <button onClick={handleLogout}>
        logout
      </button>

      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
            />
        </div>
        <div>
          url:
          <input
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
            />
        </div>
        <button type="submit">save</button>
      </form>

      <h2>Blog list</h2>
      <ul className="blog-list">
        {blogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        )}
      </ul>
      <Footer />
    </div>
  )

}

export default App