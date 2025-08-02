import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { useState } from 'react';

const SingleBlog = ({ handleLike, handleDelete, user }) => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  if (!blog) return <p style={{ textAlign: 'center' }}>Blog not found</p>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      dispatch(addComment(blog.id, comment));
      setComment('');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{blog.title} <span style={authorStyle}>by {blog.author}</span></h2>
      <p><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>

      <p>
        <strong>{blog.likes}</strong> likes
        <button onClick={() => handleLike(blog.id)} style={buttonStyle}>like</button>
      </p>

      <p>added by <strong>{blog.user?.name || 'unknown'}</strong></p>

      {user && blog.user?.username === user.username && (
        <button onClick={() => handleDelete(blog.id)} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>delete</button>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} style={commentFormStyle}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
            style={commentInputStyle}
          />
          <button type="submit" style={commentButtonStyle}>Add comment</button>
        </form>

        <ul style={commentListStyle}>
          {blog.comments?.map((c, i) => (
            <li key={i} style={commentItemStyle}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '2rem',
  borderRadius: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#f9f9f9',
};

const titleStyle = {
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
};

const authorStyle = {
  fontSize: '1.1rem',
  color: '#555',
};

const buttonStyle = {
  marginLeft: '10px',
  padding: '6px 12px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
};

const commentFormStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1rem',
};

const commentInputStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: '10px',
  border: '1px solid #ccc',
};

const commentButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
};

const commentListStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: '1rem',
};

const commentItemStyle = {
  backgroundColor: '#fff',
  padding: '8px',
  borderRadius: '10px',
  marginBottom: '0.5rem',
  border: '1px solid #eee',
};

export default SingleBlog;
