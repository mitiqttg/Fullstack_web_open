const Blog = ({ blog, handleDelete, handleLike }) => {
  return (
    <li className='blog'>
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">by {blog.author}</div>
      <div className="blog-url">{blog.url}</div>
      <div className="blog-likes">
        {blog.likes} likes
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <button onClick={() => handleDelete(blog.id)}>delete</button>
    </li>
  )
}

export default Blog