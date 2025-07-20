const BlogForm = ({ newBlog, handleBlogChange, addBlog }) => {
  return (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        id="title"
        name="title"
        value={newBlog.title}
        onChange={handleBlogChange}
        placeholder='write title here'
      />
    </div>
    <div>
      author:
      <input
        id="author"
        name="author"
        value={newBlog.author}
        onChange={handleBlogChange}
        placeholder='write author here'
      />
    </div>
    <div>
      url:
      <input
        id="url"
        name="url"
        value={newBlog.url}
        onChange={handleBlogChange}
        placeholder='write url here'
      />
    </div>
    <button type="submit">save</button>
  </form>
)
}

export default BlogForm
