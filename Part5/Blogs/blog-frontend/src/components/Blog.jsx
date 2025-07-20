import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDelete, handleLike, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => setShowDetails(!showDetails)

  const canDelete = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <li className='blog'>
      <div className="blog-summary">
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button>
      </div>

      {showDetails && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>
            added by {blog.user?.name || 'unknown'}
          </div>
          {canDelete && (
            <button onClick={() => handleDelete(blog.id)}>delete</button>
          )}
        </div>
      )}
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  currentUser: PropTypes.object
}

export default Blog
