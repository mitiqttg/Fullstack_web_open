const BlogForm = ({ newBlog, handleBlogChange, addBlog }) => {
  return (
    <form onSubmit={addBlog} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="Write title here"
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="Write author here"
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="Write URL here"
          style={inputStyle}
        />
      </div>
      <button type="submit" style={submitStyle}>Save</button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  borderRadius: '15px',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const inputStyle = {
  width: '95%',
  padding: '8px',
  borderRadius: '15px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const submitStyle = {
  padding: '10px',
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
};

export default BlogForm;
