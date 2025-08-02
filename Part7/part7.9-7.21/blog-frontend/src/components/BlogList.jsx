import Blog from "./Blog";

const BlogList = ({ blogs, handleDelete, handleLike, user }) => {
  const containerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} >
            <Blog
              blog={blog}
              handleDelete={handleDelete}
              handleLike={handleLike}
              currentUser={user}
            />
          </div>
        ))}
    </div>
  );
};

export default BlogList;
